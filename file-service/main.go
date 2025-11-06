package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

type FileValidationRequest struct {
	Filename string `json:"filename"`
	Size     int64  `json:"size"`
	MimeType string `json:"mimeType"`
}

type FileValidationResponse struct {
	Valid   bool     `json:"valid"`
	Message string   `json:"message"`
	Errors  []string `json:"errors,omitempty"`
}

const (
	MaxFileSize       = 10 * 1024 * 1024 // 10MB
	AllowedExtensions = ".jpg,.jpeg,.png,.gif,.webp"
)

func validateFile(req FileValidationRequest) FileValidationResponse {
	var errors []string

	// Check file size
	if req.Size > MaxFileSize {
		errors = append(errors, fmt.Sprintf("File size %d bytes exceeds maximum allowed size of %d bytes", req.Size, MaxFileSize))
	}

	// Check file extension
	ext := strings.ToLower(filepath.Ext(req.Filename))
	if !strings.Contains(AllowedExtensions, ext) {
		errors = append(errors, fmt.Sprintf("File extension %s not allowed. Allowed: %s", ext, AllowedExtensions))
	}

	// Check MIME type
	allowedMimes := []string{"image/jpeg", "image/png", "image/gif", "image/webp"}
	validMime := false
	for _, mime := range allowedMimes {
		if strings.HasPrefix(req.MimeType, mime) {
			validMime = true
			break
		}
	}
	if !validMime {
		errors = append(errors, fmt.Sprintf("MIME type %s not allowed", req.MimeType))
	}

	if len(errors) > 0 {
		return FileValidationResponse{
			Valid:   false,
			Message: "File validation failed",
			Errors:  errors,
		}
	}

	return FileValidationResponse{
		Valid:   true,
		Message: "File is valid",
	}
}

func enableCORS(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func validateFileHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(&w)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req FileValidationRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	response := validateFile(req)
	w.Header().Set("Content-Type", "application/json")
	
	statusCode := http.StatusOK
	if !response.Valid {
		statusCode = http.StatusBadRequest
	}
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(response)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(&w)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":  "healthy",
		"service": "ScamShield File Validator",
	})
}

func uploadHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(&w)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse multipart form (32MB max memory)
	if err := r.ParseMultipartForm(32 << 20); err != nil {
		http.Error(w, "Failed to parse form", http.StatusBadRequest)
		return
	}

	file, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Failed to get file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Validate file
	validation := validateFile(FileValidationRequest{
		Filename: handler.Filename,
		Size:     handler.Size,
		MimeType: handler.Header.Get("Content-Type"),
	})

	if !validation.Valid {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(validation)
		return
	}

	// Create uploads directory if it doesn't exist
	uploadsDir := "./uploads"
	if err := os.MkdirAll(uploadsDir, 0755); err != nil {
		http.Error(w, "Failed to create upload directory", http.StatusInternalServerError)
		return
	}

	// Save file
	dst, err := os.Create(filepath.Join(uploadsDir, handler.Filename))
	if err != nil {
		http.Error(w, "Failed to create file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	if _, err := io.Copy(dst, file); err != nil {
		http.Error(w, "Failed to save file", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":  true,
		"filename": handler.Filename,
		"size":     handler.Size,
		"url":      fmt.Sprintf("/uploads/%s", handler.Filename),
	})
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.HandleFunc("/health", healthHandler)
	http.HandleFunc("/validate", validateFileHandler)
	http.HandleFunc("/upload", uploadHandler)

	log.Printf("File validation service starting on port %s...\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
