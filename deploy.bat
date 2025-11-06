@echo off
REM ScamShield Rail - Multi-Service Deployment Script (Windows)
REM This script orchestrates deployment of all services

echo ============================================
echo ScamShield Rail - Multi-Service Deployment
echo ============================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: Python not found. Please install Python 3.8+
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: Node.js not found. Please install Node.js 18+
    exit /b 1
)

echo Installing dependencies...
echo.

REM Install Node.js dependencies
echo Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    exit /b 1
)

REM Install Python dependencies
echo Installing Python backend dependencies...
cd backend
python -m pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Python dependencies
    exit /b 1
)
cd ..

REM Check if Go is installed
go version >nul 2>&1
if %errorlevel% equ 0 (
    echo Building Go file service...
    cd file-service
    go build -o file-validator.exe main.go
    cd ..
) else (
    echo WARNING: Go not found. Skipping Go service build.
)

echo.
echo Building frontend...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Failed to build frontend
    exit /b 1
)

echo.
echo ============================================
echo Deployment complete!
echo ============================================
echo.
echo To start all services:
echo   1. Frontend: npm run dev (port 3000)
echo   2. Python API: cd backend ^&^& python app.py (port 5000)
echo   3. Go File Service: cd file-service ^&^& file-validator.exe (port 8080)
echo.
