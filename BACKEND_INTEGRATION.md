# Backend Integration Complete ✅

## What Changed

The frontend is now connected to the Python Flask backend API!

### New Files Created

1. **`services/apiService.js`** - Complete API client with all backend endpoints:
   - `fetchComplaints()` - Get all complaints
   - `createComplaint()` - Submit new complaint
   - `voteOnComplaint()` - Upvote/downvote complaints
   - `analyzeComplaint()` - AI analysis with train/IRCTC validation
   - `getValidationInsights()` - Trust scores and similar complaints
   - `getTrainInfo()` - Train schedule lookup
   - `getMenuPrice()` - IRCTC official pricing
   - `checkHealth()` - Backend status check

### Updated Files

1. **`App.jsx`**
   - Added backend health check on startup
   - Loads complaints from API when backend available
   - Shows warning banner when backend is offline
   - Falls back to sample data gracefully

2. **`ComplaintForm.jsx`**
   - Integrated with `/api/analyze` endpoint
   - Sends trainNumber and itemName for enhanced analysis
   - Displays train info (name, route) from validation
   - Shows IRCTC official price with overcharge calculation
   - Falls back to local analysis if backend unavailable

3. **`ComplaintDetail.jsx`**
   - Integrated voting with `/api/complaints/:id/vote` endpoint
   - Loads validation insights automatically
   - Displays trust score (0-100) with breakdown
   - Shows similar complaints count
   - Auto-escalation feedback when thresholds reached

## How to Run

### 1. Start Backend (Terminal 1)
```bash
cd backend
python app.py
```
Backend runs on: **http://localhost:5000**

### 2. Start Frontend (Terminal 2)
```bash
npm run dev
```
Frontend runs on: **http://localhost:3000**

### 3. (Optional) Start Go File Service (Terminal 3)
```bash
cd file-service
go run main.go
```
File service runs on: **http://localhost:8080**

## Features Now Available

### ✅ Train Validation
- 8 Indian Railway trains with official schedules
- Automatic route and pantry status display
- "Unknown Train" warning for invalid numbers

### ✅ IRCTC Menu Pricing
- 40+ official menu items with prices
- Automatic overcharge calculation
- Real-time price comparison display

### ✅ Community Validation System
- Trust score (0-100) with 5 contributing factors:
  - Vote ratio (up to 30 points)
  - Photo evidence (+15 points)
  - GPS location (+10 points)
  - High engagement (+10 points)
  - Trusted reporter badge (+15 points)
- Similar complaint detection (40%+ similarity threshold)
- Auto-escalation at 25+ net votes

### ✅ Graceful Degradation
- Backend offline? No problem - uses local sample data
- API call fails? Falls back to client-side analysis
- Warning banner shows backend connection status

## API Endpoints in Use

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health` | GET | Check backend status |
| `/api/complaints` | GET | Fetch all complaints |
| `/api/complaints/:id` | GET | Get single complaint |
| `/api/complaints` | POST | Submit new complaint |
| `/api/complaints/:id/vote` | POST | Upvote/downvote |
| `/api/analyze` | POST | AI analysis with train/price validation |
| `/api/complaints/:id/validation` | GET | Trust score & similar complaints |
| `/api/trains/:number` | GET | Train schedule info |
| `/api/menu/:item` | GET | IRCTC official price |

## Testing the Integration

1. **Login** to the app (any email)
2. **Click "File Complaint"**
3. Enter details:
   - Train Number: `12951` (Mumbai Rajdhani)
   - Item Name: `Tea`
   - Price Charged: `₹25`
4. **Click "Analyze Complaint with AI"**
5. You should see:
   - Train info: "Mumbai Rajdhani (Mumbai to New Delhi)"
   - IRCTC Price: ₹10
   - **Overcharge: ₹15!** (highlighted in red)

## Architecture

```
┌─────────────────┐
│  React Frontend │ Port 3000
│   (Vite Dev)    │
└────────┬────────┘
         │ HTTP
         │ fetch()
         ▼
┌─────────────────┐
│  Flask Backend  │ Port 5000
│  (Python 3.x)   │
└─────────────────┘
         │
         ├─ Train Schedules (8 trains)
         ├─ IRCTC Menu Prices (40+ items)
         └─ Validation Algorithm (trust scores)
```

## What's Next?

The integration is complete! You can now:
- Start both services and use the full-featured app
- File complaints with AI analysis
- See train validation and price checking in action
- View trust scores and validation insights
- Test auto-escalation by adding votes

Enjoy your multi-language ScamShield Rail platform! 🚂
