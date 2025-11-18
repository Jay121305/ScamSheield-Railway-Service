# 🛡️ ScamShield Rail - Railway Food Vendor Complaint System

A multi-language, polyglot application for Indian railway passengers to report food vendor scams and malpractices. Built with a diverse technology stack to demonstrate modern microservices architecture.

## 📸 Application Screenshots

### Login Screen
![Login Screen](https://github.com/Jay121305/ScamSheield-Railway-Service/blob/main/assets/Screenshot%202025-11-06%20093629.png)
*Simple email-based authentication with dark theme support*

### Complaint List Dashboard
![Complaint Dashboard](https://github.com/Jay121305/ScamSheield-Railway-Service/blob/main/assets/Screenshot%202025-11-06%20093645.png)
*Browse recent complaints with status indicators, voting counts, and overcharge detection*

### Complaint Details View
![Complaint Details](https://github.com/Jay121305/ScamSheield-Railway-Service/blob/main/assets/Screenshot%202025-11-06%20093709.png)
*Detailed complaint view with AI analysis, community validation, and location tracking*

### File Complaint Form
![File Complaint](https://github.com/Jay121305/ScamSheield-Railway-Service/blob/main/assets/Screenshot%202025-11-06%20093737.png)
*Easy-to-use form with AI-powered analysis and evidence upload*

## � Key Features

### 🔐 User Authentication
- **Simple Email Login**: Quick access with email-based authentication
- **Role-Based Access**: Passenger and admin accounts (use `admin@example.com` for admin dashboard)
- **Persistent Sessions**: Stay logged in across visits

### 📝 Complaint Management
- **Easy Filing**: Intuitive form with guided input fields
- **Train Tracking**: Link complaints to specific train numbers
- **Vendor Details**: Record vendor names and food items
- **Price Comparison**: MRP vs. charged price with automatic overcharge calculation
- **Evidence Upload**: Attach photos (PNG, JPG, GIF, WEBP up to 10MB)
- **Location Tracking**: Automatic GPS coordinates capture

### 🤖 AI-Powered Analysis
- **Instant Analysis**: Click "Analyze Complaint with AI" for automated insights
- **Category Detection**: 
  - 🔴 **Overpricing**: Detects price-related complaints
  - 🟡 **Quality Issues**: Identifies stale/expired food
  - 🟠 **Hygiene Concerns**: Flags cleanliness violations
- **Smart Extraction**: Automatically extracts food items, prices, and patterns
- **Confidence Scoring**: High/medium/low confidence levels
- **Summary Generation**: Clear, actionable summaries

### 👥 Community Validation
- **Upvote/Downvote**: Community-driven complaint verification
- **Vote Count Display**: See how many passengers support each complaint
- **Trending Complaints**: Sort by popularity and recency
- **Discussion Section**: Add comments and share experiences

### 📊 Status Tracking
- **Filed**: Initial complaint status
- **Escalated**: High-priority issues (25+ upvotes shown in yellow)
- **Resolved**: Completed complaints (shown in green)
- **Visual Indicators**: Color-coded status badges

### 🎨 Modern UI/UX
- **Dark Mode**: Eye-friendly dark theme (default)
- **Light Mode**: Traditional light theme option
- **Theme Toggle**: One-click switching with persistence
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Polished user experience
- **Accessibility**: ARIA labels and keyboard navigation

### 📈 Real-Time Insights
- **Overcharge Detection**: Visual alerts showing exact overcharge amount and percentage
- **Price Analysis**: Compare charged price vs. MRP
- **Location Display**: GPS coordinates for verification
- **Timestamp Tracking**: Filing date and time
- **User Attribution**: See who filed each complaint

## �🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React 19.2.0 + Vite 6.4.1 (JavaScript)              │  │
│  │  - Complaint Management UI                           │  │
│  │  - Dark/Light Theme Toggle                           │  │
│  │  - Real-time Analysis Display                        │  │
│  │  - Tailwind CSS Styling                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                         ↓ HTTP                              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                     Backend Layer                           │
│  ┌────────────────────────┐  ┌─────────────────────────┐   │
│  │ Python Flask 3.0.0     │  │ Go 1.21 Microservice    │   │
│  │ REST API (Port 5000)   │  │ File Service (Port 8080)│   │
│  │ ├─ Complaint CRUD      │  │ ├─ File Validation      │   │
│  │ ├─ Text Analysis       │  │ ├─ Upload Handler       │   │
│  │ ├─ Voting System       │  │ ├─ Size/Type Checks     │   │
│  │ └─ Pattern Detection   │  │ └─ CORS Support         │   │
│  └────────────────────────┘  └─────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                   Deployment Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Bash (deploy.sh) / Batch (deploy.bat)              │  │
│  │  - Multi-service orchestration                       │  │
│  │  - Dependency checks                                 │  │
│  │  - Build automation                                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer (Port 3000)              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React 19.2.0 + Vite 6.4.1 (JavaScript)              │  │
│  │  ├─ Complaint Management UI                          │  │
│  │  ├─ Backend API Integration                          │  │
│  │  ├─ Dark/Light Theme Toggle                          │  │
│  │  ├─ Real-time Validation Display                     │  │
│  │  ├─ Trust Score Visualization                        │  │
│  │  └─ Tailwind CSS Styling                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                         ↓ HTTP/REST API                     │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                     Backend Layer                           │
│  ┌────────────────────────┐  ┌─────────────────────────┐   │
│  │ Python Flask 3.0.0     │  │ Go 1.21 Microservice    │   │
│  │ REST API (Port 5000)   │  │ File Service (Port 8080)│   │
│  │ ├─ Complaint CRUD      │  │ ├─ File Validation      │   │
│  │ ├─ Train Validation    │  │ ├─ Upload Handler       │   │
│  │ ├─ IRCTC Pricing       │  │ ├─ Size/Type Checks     │   │
│  │ ├─ Voting + Auto-ESC   │  │ └─ CORS Support         │   │
│  │ ├─ Trust Scores        │  │                          │   │
│  │ ├─ Similar Complaints  │  │                          │   │
│  │ └─ Pattern Detection   │  │                          │   │
│  └────────────────────────┘  └─────────────────────────┘   │
│         │                                                    │
│         ├─ 8 Train Schedules (Rajdhani, Vande Bharat, etc) │
│         ├─ 40+ IRCTC Menu Items with Official Prices       │
│         └─ Community Validation Algorithm (0-100 scores)    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                   Deployment Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Bash (deploy.sh) / Batch (deploy.bat)              │  │
│  │  ├─ Multi-service orchestration                      │  │
│  │  ├─ Dependency checks                                │  │
│  │  └─ Build automation                                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🌐 Technology Stack

### Frontend (JavaScript)
- **Framework**: React 19.2.0
- **Build Tool**: Vite 6.4.1
- **Styling**: Tailwind CSS (via CDN)
- **Validation**: PropTypes 15.8.1
- **State Management**: Context API (AuthContext, ThemeContext)
- **API Client**: Custom fetch-based service (`apiService.js`)

### Backend (Python)
- **Framework**: Flask 3.0.0
- **CORS**: flask-cors
- **Environment**: python-dotenv
- **Analysis**: Regex-based pattern matching

### File Service (Go)
- **Runtime**: Go 1.21
- **Server**: net/http standard library
- **Features**: Multipart upload, MIME validation

### Deployment (Bash/Batch)
- **Linux/Mac**: `deploy.sh` (Bash)
- **Windows**: `deploy.bat` (Batch)

## 📁 Project Structure

```
scamshield-rail/
├── components/              # React components
│   ├── ComplaintCard.jsx
│   ├── ComplaintDetail.jsx
│   ├── ComplaintForm.jsx
│   ├── ComplaintList.jsx
│   ├── Header.jsx
│   ├── admin/
│   │   └── AdminDashboard.jsx
│   ├── auth/
│   │   └── Login.jsx
│   └── common/
│       ├── Button.jsx
│       ├── Icon.jsx
│       └── Spinner.jsx
├── contexts/                # React context providers
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── services/                # Business logic & API clients
│   ├── apiService.js        # Backend API integration
│   ├── geminiService.js     # Local complaint analysis
│   └── validationService.js # Community validation logic
├── hooks/                   # Custom React hooks
│   └── useGeolocation.js
├── backend/                 # Python Flask API
│   ├── app.py
│   └── requirements.txt
├── file-service/            # Go microservice
│   ├── main.go
│   └── go.mod
├── deploy.sh                # Linux/Mac deployment
├── deploy.bat               # Windows deployment
├── App.jsx                  # Root component
├── main.jsx                 # Entry point
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Node.js dependencies
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.8+ ([Download](https://www.python.org/downloads/))
- **Go** 1.21+ ([Download](https://go.dev/dl/)) *(optional)*
- **Git** ([Download](https://git-scm.com/downloads))

### Quick Start (Frontend Only)

#### Step 1: Clone and Install
```bash
# Clone repository
git clone https://github.com/Jay121305/ScamSheield-Railway-Service.git
cd ScamSheield-Railway-Service

# Install dependencies
npm install
```

#### Step 2: Start Development Server
```bash
npm run dev
```

#### Step 3: Open Browser
Visit **http://localhost:3000**

You should see the login screen. Use any email to sign in as a passenger, or use `admin@example.com` for admin access.

> **Note**: Frontend works standalone with sample data. For full features (train validation, IRCTC pricing, trust scores), start the backend (see below).

### Full Installation (All Services)

#### Option 1: Automated Deployment

**Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

**Windows:**
```cmd
deploy.bat
```

#### Option 2: Manual Installation

1. **Install Frontend Dependencies**
```bash
npm install
```

2. **Install Python Backend Dependencies**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

3. **Build Go File Service** *(optional)*
```bash
cd file-service
go build -o file-validator main.go
cd ..
```

4. **Build Frontend**
```bash
npm run build
```

### Running with Full Backend Integration

For complete features including train validation, IRCTC pricing, and community validation, start all services:

**Terminal 1 - Frontend (Port 3000)**
```bash
npm run dev
```

**Terminal 2 - Python Backend API (Port 5000)**
```bash
cd backend
python app.py
```

**Terminal 3 - Go File Service (Port 8080)** *(optional)*
```bash
cd file-service
# Linux/Mac
./file-validator

# Windows
file-validator.exe
```

Access the application at: **http://localhost:3000**

✅ **Backend Connected**: No warning banner, full features active  
⚠️ **Backend Offline**: Yellow warning banner, fallback to sample data

## �️ What You'll See

### 1. **Welcome Screen** 
When you first visit the app, you'll see a clean login interface with:
- Email input field
- Sign-in button
- Instructions for passenger vs. admin access
- Dark theme by default (toggle available after login)

### 2. **Complaint Dashboard**
After logging in, browse recent complaints showing:
- **Train Numbers**: e.g., "Train No: 12951"
- **Food Items**: Tea, Veg Sandwich, Water Bottle
- **Vendors**: Rajdhani Express Pantry, Vande Bharat Express Catering
- **Descriptions**: Brief complaint summaries
- **Vote Counts**: ↑ 5 ↓ 2 (upvotes and downvotes)
- **Overcharge Alerts**: Red badges showing "Overcharged by ₹10"
- **Status Indicators**: 
  - Blue "Filed" for new complaints
  - Yellow "Escalated" for high-priority issues
  - Green "Resolved" for completed cases
- **Filing Info**: "Filed by Amit Singh on 7/22/2024"
- **Sort Options**: Newest First dropdown

### 3. **Detailed Complaint View**
Click any complaint to see full details:
- **Ticket ID**: SCAM-2024-000003
- **Complaint Title**: Food item name
- **Train & Vendor**: Full details with train number
- **Description**: Complete complaint text
- **Community Validation**: 
  - Upvote button with count (e.g., "↑ Upvote (5)")
  - Downvote button with count (e.g., "↓ Downvote (2)")
- **AI Summary**:
  - 🏷️ **Item**: Detected food item (e.g., "Tea")
  - 💰 **Price Charged**: Amount paid (e.g., "₹20")
  - 📊 **MRP**: Market rate (e.g., "₹10")
  - 🔴 **Overcharge Alert**: "Overcharged by ₹10 (100%)"
  - 📍 **Location**: GPS coordinates (e.g., "22.5726, 88.3639")
- **Status History**: Timeline of status changes
- **Discussion**: Comment section with "Post" button
- **Back to List**: Easy navigation

### 4. **File New Complaint Form**
Click "File Complaint" to access:
- **Train Number**: Text input
- **Vendor Name**: Vendor identification
- **Food Item**: Product name field
- **Price Charged (₹)**: Amount paid
- **MRP (if known, ₹)**: Expected price
- **Description of Issue**: Large text area
- **"Analyze Complaint with AI"**: Purple button for instant analysis
- **Upload Evidence (Photo)**: Drag-and-drop zone
  - "Upload a file or drag and drop"
  - "PNG, JPG, GIF up to 10MB"
- **"Add Current Location"**: GPS capture button
- **Submit Button**: File the complaint

## 💡 Usage Examples

### Example 1: Overpriced Tea
```
Train Number: 12951
Vendor: Rajdhani Express Pantry
Item: Tea
Price Charged: ₹20
MRP: ₹10
Description: "Overpriced tea, and the vendor was rude when I asked for the menu card."

AI Analysis Result:
- Category: Overpricing
- Overcharge: ₹10 (100%)
- Summary: "Overpricing issue detected for tea"
```

### Example 2: Stale Sandwich
```
Train Number: 22439
Vendor: Vande Bharat Express Catering
Item: Veg Sandwich
Price Charged: ₹80
MRP: ₹20
Description: "The sandwich was stale and cold. The price was exorbitant for the quality provided."

AI Analysis Result:
- Category: Quality Issue
- Overcharge: ₹60 (300%)
- Summary: "Quality concern detected for veg sandwich"
```

### Example 3: Overpriced Water
```
Train Number: 12138
Vendor: Punjab Mail Pantry
Item: Water Bottle
Price Charged: ₹20
MRP: ₹15
Description: "Charged Rs. 20 for a water bottle with an MRP of Rs. 15. The vendor refused to provide a bill."

AI Analysis Result:
- Category: Overpricing
- Overcharge: ₹5 (33%)
- Summary: "Overpricing detected for water bottle"
```

## 🎨 Theme System

The application supports both dark and light themes:

### Dark Mode (Default)
- Navy blue background (#1e293b, #0f172a)
- White text for high contrast
- Blue accents for interactive elements
- Easy on eyes during night travel

### Light Mode
- White background
- Dark text for readability
- Same blue accent colors
- Perfect for daytime use

**Toggle**: Click the moon/sun icon (🌙/☀️) in the top navigation bar

## 🎯 Quick Reference Card

### As a Passenger, You Can:

| Feature | What It Does | Where to Find It |
|---------|-------------|------------------|
| **Browse Complaints** | View all recent complaints | Main dashboard after login |
| **File Complaint** | Report a food vendor scam | Blue "File Complaint" button (top right) |
| **AI Analysis** | Get instant complaint categorization with train/price validation | Purple "Analyze Complaint with AI" button in form |
| **Train Validation** | Verify train number against 8 major Indian trains | Auto-checked when analyzing complaint |
| **Price Checking** | Compare charged price vs IRCTC official menu prices | Shows overcharge amount automatically |
| **Upload Evidence** | Attach photos of the incident | Drag-and-drop zone in complaint form |
| **Add Location** | Capture GPS coordinates | "Add Current Location" button in form |
| **Vote on Complaints** | Upvote or downvote others' complaints | ↑ Upvote / ↓ Downvote buttons in detail view |
| **View Trust Score** | See 0-100 credibility rating with breakdown | Trust Score section in complaint detail |
| **Find Similar Complaints** | Discover pattern of scams | Similar Complaints section (when patterns detected) |
| **View Details** | See full complaint analysis | Click any complaint card |
| **Comment** | Discuss complaints | "Add your comment" in detail view |
| **Sort Complaints** | Organize by date or popularity | "Sort by" dropdown (top right of dashboard) |
| **Toggle Theme** | Switch dark/light mode | Moon/sun icon (top navigation bar) |

### Status Badge Colors

| Status | Color | Meaning |
|--------|-------|---------|
| **Filed** | 🔵 Blue | New complaint, awaiting review |
| **Escalated** | 🟡 Yellow | High-priority (25+ upvotes) |
| **Resolved** | 🟢 Green | Issue addressed and closed |

### Overcharge Alert Colors

| Alert | Color | Example |
|-------|-------|---------|
| **Overcharged** | 🔴 Red | "Overcharged by ₹10" |
| **No Overcharge** | � Green | Price matches MRP |

### Login Credentials

| Role | Email | Dashboard Access |
|------|-------|------------------|
| **Passenger** | Any email (e.g., `you@example.com`) | View, file, vote on complaints |
| **Admin** | `admin@example.com` | Admin dashboard + all passenger features |

## �📡 API Endpoints

### Python Backend (Port 5000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/analyze` | Analyze complaint with train & IRCTC price validation |
| GET | `/api/complaints` | Get all complaints |
| POST | `/api/complaints` | Create new complaint |
| GET | `/api/complaints/:id` | Get complaint by ID |
| PUT | `/api/complaints/:id` | Update complaint |
| DELETE | `/api/complaints/:id` | Delete complaint |
| POST | `/api/complaints/:id/vote` | Vote on complaint (upvote/downvote with auto-escalation) |
| GET | `/api/complaints/:id/validation` | Get validation insights & similar complaints |
| GET | `/api/trains/:number` | Get train schedule and pantry information |
| GET | `/api/menu/:item` | Get official IRCTC menu price |

**Example - Analyze Complaint with Train & Price Validation:**
```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Overpriced samosa for Rs 80",
    "trainNumber": "12951",
    "itemName": "samosa"
  }'
```

**Response:**
```json
{
  "category": "Overpricing",
  "summary": "Passenger reports overpricing issue with samosa, charged ₹80 (₹65 over IRCTC price)...",
  "entities": {
    "itemName": "Samosa",
    "price": 80,
    "trainInfo": {
      "valid": true,
      "number": "12951",
      "name": "Mumbai Rajdhani",
      "route": "Mumbai Central - New Delhi",
      "pantryAvailable": true
    },
    "irctcPrice": 15,
    "irctcPriceDetails": {
      "price": 15,
      "item": "Samosa (2 pcs)",
      "category": "Snack"
    }
  },
  "trainInfo": { "valid": true, "name": "Mumbai Rajdhani" },
  "irctcPrice": 15
}
```

**Example - Get Validation Insights:**
```bash
curl http://localhost:5000/api/complaints/1/validation
```

**Response:**
```json
{
  "validationStatus": {
    "level": "verified",
    "label": "Community Verified",
    "autoEscalate": false
  },
  "netVotes": 13,
  "trustScore": {
    "score": 85,
    "rating": "High",
    "factors": [
      {"factor": "Vote Ratio", "impact": "+25.7"},
      {"factor": "Photo Evidence", "impact": "+15"}
    ]
  },
  "similarComplaints": [
    {"id": 4, "similarity": 75, "upvotes": 8}
  ],
  "recommendations": [
    "✓ 3 similar complaints found - pattern detected!",
    "⭐ High trust score - reliable complaint."
  ]
}
```

### Go File Service (Port 8080)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/validate` | Validate file size/type |
| POST | `/upload` | Upload file (max 10MB, images only) |

**File Validation Rules:**
- Maximum size: 10MB
- Allowed extensions: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- MIME types: `image/jpeg`, `image/png`, `image/gif`, `image/webp`

## 🧠 Analysis Features

The complaint analysis system uses heuristic pattern matching combined with official IRCTC data:

### 🚂 Train Schedule Integration
- **Train Validation**: Verifies train numbers against Indian Railways database
- **Pantry Information**: Shows if pantry car is available on the train
- **Route Details**: Displays complete train route and stops
- **Train Types**: Identifies Rajdhani, Shatabdi, Vande Bharat, Mail/Express
- **8 Major Trains**: Database includes popular routes (12951, 22439, 12138, etc.)

### 💰 IRCTC Official Menu Pricing
- **Real-time Price Lookup**: Matches items with official IRCTC menu prices
- **Category-wise Pricing**: Beverages, Snacks, Meals, Breakfast
- **40+ Menu Items**: Tea (₹10), Coffee (₹15), Samosa (₹15), Thali (₹120), etc.
- **Automatic Overcharge Calculation**: Shows exact overcharge amount and percentage
- **Example**: If charged ₹20 for tea (IRCTC: ₹10) → Shows "₹10 overcharge (100%)"

### ✓ Community Validation System
- **Net Vote Calculation**: Upvotes minus downvotes determines credibility
- **Auto-Escalation**: 25+ net votes → Automatically escalates to "Escalated" status
- **Verification Levels**:
  - **Verified**: 10+ net votes - Community validated complaint
  - **Escalated**: 25+ net votes - High-priority, auto-escalated
  - **Disputed**: -5 or lower net votes - Questionable complaint
  - **Pending**: Between -5 and 10 - Awaiting community feedback

- **Trust Score Algorithm** (0-100):
  - Base score: 50 points
  - Vote ratio: Up to +30 points
  - Photo evidence: +15 points
  - GPS location: +10 points
  - High engagement (20+ votes): +10 points
  - Trusted reporter badge: +15 points

- **Similar Complaint Detection**:
  - Matches by train number (30% weight)
  - Matches by vendor name (25% weight)
  - Matches by food item (20% weight)
  - Matches by price range (15% weight)
  - Patterns identified when 3+ similar complaints found

- **Validation Insights**:
  - Real-time recommendations based on complaint analysis
  - Cross-validation with similar complaints
  - Trust score breakdown with contributing factors
  - Auto-escalation notifications

### Category Detection
- **Overpricing**: Keywords like "overpriced", "expensive", "costly", "₹", "Rs"
  - *Example from screenshot*: "Overpriced tea" → Detected as overpricing with ₹10 overcharge
- **Quality Issues**: Keywords like "stale", "rotten", "expired", "bad quality"
  - *Example*: "Stale and cold sandwich" → Quality concern detected
- **Hygiene Concerns**: Keywords like "dirty", "unhygienic", "contaminated"

### Price Extraction
Detects currency amounts in formats:
- `Rs 100`, `₹100`, `100 rupees`
- Calculates overcharge percentage automatically
- *Example from screenshot*: MRP ₹10, Charged ₹20 → **Overcharged by ₹10 (100%)**

### Item Recognition
Identifies 50+ common food items including:
- **Beverages**: tea, coffee, water, juice, cold drink
- **Snacks**: samosa, pakora, vada pav, chips, sandwich
- **Meals**: thali, rice, dal, curry, biryani
- **Sweets**: jalebi, gulab jamun, ladoo, barfi

### Real Examples from Screenshots

1. **Tea Complaint**:
   - Item detected: Tea
   - Price charged: ₹20
   - MRP: ₹10
   - Result: "Overcharged by ₹10 (100%)"
   - Category: Overpricing

2. **Veg Sandwich Complaint**:
   - Item detected: Veg Sandwich
   - Overcharge: ₹60
   - Status: Escalated (25 upvotes)
   - Category: Quality Issue + Overpricing

3. **Water Bottle Complaint**:
   - Item detected: Water Bottle
   - Overcharge: ₹5
   - Status: Resolved (15 upvotes)
   - Category: Overpricing

## 🎨 Theme System

The application supports dark and light themes with:
- **Manual Toggle**: Header button to switch themes
- **Persistence**: Theme choice saved to localStorage
- **Synchronized Styling**: Body background and text colors update instantly

**Implementation:**
- Context API provider: `contexts/ThemeContext.jsx`
- Local storage key: `theme`
- CSS class: `dark` on `documentElement`
- Tailwind dark mode: `class` strategy

## 🔒 Security Features

- **CORS Protection**: Configured for all backend services
- **File Validation**: Size and type checks on uploads
- **Input Sanitization**: Pattern matching prevents injection
- **Environment Variables**: Sensitive config via `.env` files

## 🐛 Development

### Running Tests
```bash
npm run test
```

### Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👥 Authors

ScamShield Rail Development Team

## 🙏 Acknowledgments

- Indian Railways for inspiration
- Open source community for tools and frameworks
- Contributors and testers

---

## 🎬 See It In Action

### User Journey

1. **Login** → Enter email at the welcome screen
2. **Browse Complaints** → View the dashboard with recent complaints sorted by date
3. **Check Details** → Click any complaint card to see full analysis
4. **File Complaint** → Click "File Complaint" button to report an issue
5. **AI Analysis** → Click "Analyze Complaint with AI" for instant insights
6. **Upload Evidence** → Drag and drop photos of the incident
7. **Add Location** → Click "Add Current Location" to capture GPS
8. **Submit** → File your complaint and track community votes
9. **Vote** → Support or question other complaints with upvote/downvote
10. **Toggle Theme** → Switch between dark and light mode anytime

### Sample Workflow (Based on Screenshots)

**Scenario**: You bought overpriced tea on train 12951

1. **Login Screen** (Screenshot 1)
   - Enter your email: `passenger@example.com`
   - Click "Sign In"

2. **Dashboard** (Screenshot 2)
   - See existing complaints from other passengers
   - Notice the tea complaint with "Overcharged by ₹10" badge
   - 5 upvotes, 2 downvotes showing community validation

3. **View Details** (Screenshot 3)
   - Click the tea complaint card
   - See complete analysis:
     - Item: Tea
     - Price Charged: ₹20
     - MRP: ₹10
     - Location: 22.5726, 88.3639
     - Status: Filed
   - Add your comment or vote

4. **File Your Own** (Screenshot 4)
   - Click "File Complaint" button
   - Fill in details:
     - Train Number: 12951
     - Vendor: Rajdhani Express Pantry
     - Food Item: Tea
     - Price Charged: ₹20
     - MRP: ₹10
     - Description: Your complaint details
   - Click "Analyze Complaint with AI"
   - Upload photo evidence
   - Add GPS location
   - Submit!

### Expected Results

✅ **Instant Analysis**: AI categorizes as "Overpricing"  
✅ **Overcharge Calculation**: Shows "Overcharged by ₹10 (100%)"  
✅ **Community Visibility**: Your complaint appears in the dashboard  
✅ **Vote Tracking**: Other passengers can validate your complaint  
✅ **Status Updates**: Track progress from Filed → Escalated → Resolved  

---

**Note**: This is a demonstration project showcasing multi-language architecture. For production use, implement proper database storage, authentication, and security measures.
