# 📱 ScamShield Rail - Visual Feature Guide

## 🎯 Main Features (Shown in Screenshots)

### 1️⃣ Login Screen
![Login Interface](screenshots/login.png)

**What You See:**
- Clean, centered login form
- ScamShield Rail branding with shield icon
- Email input field with placeholder
- Blue "Sign In" button
- Theme toggle (moon icon) in top-right
- Instructions for passenger vs. admin access

**Key Elements:**
- Email: Use any email for passenger access
- Admin: Use `admin@example.com` for admin dashboard
- Dark theme by default

---

### 2️⃣ Complaint List Dashboard
![Dashboard View](screenshots/dashboard.png)

**What You See:**
- **Header**: "Recent Complaints" with sort dropdown
- **Complaint Cards** showing:
  - Train number (e.g., "Train No: 12951")
  - Food item title (e.g., "Tea", "Veg Sandwich", "Water Bottle")
  - Vendor name (e.g., "vs. Rajdhani Express Pantry")
  - Brief description
  - Vote counts: ↑ 5 ↓ 2 (green/red indicators)
  - Overcharge badges: 🔴 "Overcharged by ₹10"
  - Status badges: 🔵 Filed, 🟡 Escalated, 🟢 Resolved
  - Filing info: "Filed by Amit Singh on 7/22/2024"

**Real Examples from Screenshot:**

| Item | Train | Overcharge | Status | Votes |
|------|-------|-----------|--------|-------|
| Tea | 12951 | ₹10 | Filed (Blue) | ↑5 ↓2 |
| Veg Sandwich | 22439 | ₹60 | Escalated (Yellow) | ↑25 ↓0 |
| Water Bottle | 12138 | ₹5 | Resolved (Green) | ↑15 ↓1 |

**Navigation:**
- Sort by: Newest First (dropdown)
- File Complaint: Blue button (top-right)
- Theme toggle: Moon icon
- Welcome message: "Welcome, Jaygaautam"
- Logout button

---

### 3️⃣ Detailed Complaint View
![Complaint Details](screenshots/detail.png)

**What You See:**

**Header Section:**
- ← Back to List (navigation)
- Ticket #: SCAM-2024-000003
- Title: "Tea"
- Subtitle: "Complaint against Rajdhani Express Pantry on Train 12951"
- Status Badge: "Status: Filed" (blue)

**Main Content Area:**

**1. Complaint Details (Left Side)**
```
Description:
"Overpriced tea, and the vendor was rude when I asked 
for the menu card."
```

**2. Community Discussion**
- "No comments yet."
- Comment textarea: "Add your comment..."
- Blue "Post" button

**3. Community Validation (Right Side - Top)**
- ↑ Upvote (5) - Green button with count
- ↓ Downvote (2) - Red button with count

**4. Summary Panel (Right Side - Middle)**
- 🏷️ Item: **Tea**
- 💰 Price Charged: **₹20**
- 📊 MRP: **₹10**
- 🔴 **Alert**: "Overcharged by ₹10 (100%)" (red background)
- 📍 Location: **22.5726, 88.3639**

**5. Filing Information (Right Side - Bottom)**
- Filed by: **Amit Singh**
- Date: **7/22/2024, 1:45:00 PM**

**6. Status History Timeline**
- 🔵 Filed - 7/22/2024, 1:45:00 PM

---

### 4️⃣ File Complaint Form
![File Complaint](screenshots/file-complaint.png)

**What You See:**

**Form Title:**
"File a New Complaint"

**Input Fields:**

1. **Train Number** (text input)
2. **Vendor Name** (text input)
3. **Food Item** (text input)
4. **Price Charged (₹)** (number input)
5. **MRP (if known, ₹)** (number input)
6. **Description of Issue** (large textarea)

**Action Buttons:**

7. **🔮 Analyze Complaint with AI** (purple button, full-width)
   - Triggers instant AI analysis
   - Detects category, item, price
   - Shows overcharge calculation

**File Upload Section:**

8. **Upload Evidence (Photo)**
   - Drag-and-drop zone with upload icon
   - "Upload a file or drag and drop"
   - "PNG, JPG, GIF up to 10MB"
   - Supported: .png, .jpg, .jpeg, .gif, .webp

**Location Section:**

9. **📍 Add Current Location** (gray button, full-width)
   - Captures GPS coordinates automatically
   - Shows latitude and longitude

**Final Actions:**
- Submit button (not visible in screenshot, appears after filling)

---

## 🎨 Color Scheme Reference

### Status Colors
```
Filed      → #3B82F6 (Blue)
Escalated  → #F59E0B (Amber/Yellow)
Resolved   → #10B981 (Green)
```

### Alert Colors
```
Overcharge → #DC2626 (Red background)
Upvote     → #10B981 (Green)
Downvote   → #EF4444 (Red)
```

### Theme Colors
```
Dark Mode:
- Background: #0F172A (slate-900)
- Card BG:    #1E293B (slate-800)
- Text:       #FFFFFF (white)
- Accent:     #3B82F6 (blue-500)

Light Mode:
- Background: #FFFFFF (white)
- Card BG:    #F8FAFC (slate-50)
- Text:       #0F172A (slate-900)
- Accent:     #3B82F6 (blue-500)
```

---

## 📊 Data Flow Example

### Scenario: Filing a Tea Overcharge Complaint

**Step 1: User Input**
```
Train Number: 12951
Vendor: Rajdhani Express Pantry
Food Item: Tea
Price Charged: ₹20
MRP: ₹10
Description: "Overpriced tea, and the vendor was rude..."
```

**Step 2: AI Analysis (Click Purple Button)**
```javascript
{
  category: "Overpricing",
  confidence: "high",
  detectedItem: "tea",
  priceCharged: 20,
  mrp: 10,
  overcharge: 10,
  overchargePercent: 100
}
```

**Step 3: Display Result**
```
✅ Category: Overpricing
✅ Item: Tea
✅ Price Charged: ₹20
✅ MRP: ₹10
✅ Overcharged by ₹10 (100%)
```

**Step 4: Submit → Dashboard Card**
```
┌─────────────────────────────────┐
│ Train No: 12951        Filed    │
│ Tea                             │
│ vs. Rajdhani Express Pantry     │
│                                  │
│ Overpriced tea, and the vendor  │
│ was rude when I asked for...    │
│                                  │
│ ↑ 0  ↓ 0   Overcharged by ₹10  │
│                                  │
│ Filed by You on 11/6/2025       │
└─────────────────────────────────┘
```

---

## 🔍 UI Component Breakdown

### Complaint Card Anatomy
```
┌──────────────────────────────────────┐
│ Train No: {number}    [{Status}]     │  ← Header with status badge
│ {Food Item}                          │  ← Main title (clickable)
│ vs. {Vendor Name}                    │  ← Vendor info
│                                       │
│ {Description text preview...}        │  ← Truncated description
│                                       │
│ ↑ {up} ↓ {down}  [Overcharge Badge] │  ← Votes & overcharge
│                                       │
│ Filed by {Name} on {Date}            │  ← Meta info
└──────────────────────────────────────┘
```

### Summary Panel Anatomy
```
┌──────────────────────┐
│ Summary              │
│                      │
│ 🏷️ Item             │
│    {Food Item}       │
│                      │
│ 💰 Price Charged    │
│    ₹{amount}         │
│                      │
│ 📊 MRP              │
│    ₹{amount}         │
│                      │
│ ┌──────────────────┐ │
│ │ Overcharged by   │ │
│ │ ₹{X} ({Y}%)      │ │
│ └──────────────────┘ │
│                      │
│ 📍 Location         │
│    {lat}, {long}     │
└──────────────────────┘
```

---

## 🎭 Responsive Design

### Desktop View (As Shown in Screenshots)
- Full-width layout
- Three-column grid for complaint cards
- Side-by-side detail view (complaint + summary)
- Ample spacing and padding

### Mobile View (Responsive)
- Single-column layout
- Stacked cards
- Collapsible summary panel
- Touch-friendly buttons
- Hamburger menu

---

## 🚀 Interactive Elements

### Buttons
| Button | Color | Icon | Action |
|--------|-------|------|--------|
| Sign In | Blue | - | Authenticate user |
| File Complaint | Blue | 📄 | Open complaint form |
| Analyze with AI | Purple | 🔮 | Run AI analysis |
| Upvote | Green | ↑ | +1 vote |
| Downvote | Red | ↓ | -1 vote |
| Post Comment | Blue | - | Submit comment |
| Add Location | Gray | 📍 | Capture GPS |
| Theme Toggle | Gray | 🌙/☀️ | Switch theme |
| Logout | Gray | - | Sign out |

### Interactive States
- **Hover**: Slight color change
- **Active**: Pressed effect
- **Disabled**: Grayed out
- **Loading**: Spinner animation

---

## 📈 Stats & Metrics Display

### Vote Display Format
```
↑ {count} ↓ {count}
```
Examples:
- `↑ 5 ↓ 2` - More upvotes (legitimate complaint)
- `↑ 25 ↓ 0` - High validation (escalated)
- `↑ 1 ↓ 8` - Questionable (low credibility)

### Overcharge Display Format
```
Overcharged by ₹{amount} ({percent}%)
```
Examples:
- `Overcharged by ₹10 (100%)` - 100% markup
- `Overcharged by ₹60 (300%)` - 300% markup
- `Overcharged by ₹5 (33%)` - 33% markup

### Location Display Format
```
{latitude}, {longitude}
```
Example:
- `22.5726, 88.3639` - Kolkata coordinates

---

## 🎯 Key Takeaways from Screenshots

1. **Clean UI**: Minimal, focused design with clear hierarchy
2. **Dark Theme**: Professional, eye-friendly default
3. **Data Density**: Lots of info without clutter
4. **Visual Feedback**: Color-coded badges and alerts
5. **Community-Driven**: Voting system prominent
6. **AI Integration**: Purple "Analyze" button stands out
7. **Real Data**: Authentic Indian railway context
8. **Status Tracking**: Clear complaint lifecycle
9. **Location Awareness**: GPS coordinates included
10. **User-Friendly**: Simple forms, clear actions

---

**All screenshots demonstrate a production-ready, professional UI designed for real-world railway passenger use!** 🚂🛡️
