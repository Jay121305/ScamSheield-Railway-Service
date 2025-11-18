# Backend Deployment Guide

Your Vercel frontend is live at: https://scamshield-railway-service.vercel.app/

But the backend needs separate deployment. Here's how:

## 🚀 Deploy Backend to Render.com (Free & Easy)

### Step 1: Push Backend Changes to GitHub

```bash
git add backend/runtime.txt backend/app.py services/apiService.js
git commit -m "feat: prepare backend for cloud deployment"
git push origin main
```

### Step 2: Deploy to Render.com

1. **Go to**: https://render.com/
2. **Sign up** with your GitHub account
3. **Click**: "New +" → "Web Service"
4. **Connect**: Your `ScamSheield-Railway-Service` repository
5. **Configure**:
   - **Name**: `scamshield-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
   - **Plan**: Free

6. **Click**: "Create Web Service"
7. **Wait**: ~2-3 minutes for deployment

### Step 3: Update Vercel Environment Variable

After Render deploys, you'll get a URL like: `https://scamshield-backend.onrender.com`

1. **Go to**: https://vercel.com/dashboard
2. **Select**: Your `scamshield-railway-service` project
3. **Go to**: Settings → Environment Variables
4. **Add Variable**:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://scamshield-backend.onrender.com/api`
   - **Scope**: Production, Preview, Development

5. **Redeploy**: Go to Deployments → Click "..." on latest → "Redeploy"

### Step 4: Test

Visit: https://scamshield-railway-service.vercel.app/

- ✅ No yellow warning banner = Backend connected!
- Try filing a complaint with train #12951 to test

---

## 🔄 Alternative: Railway.app (Also Free)

### Quick Steps:

1. Go to: https://railway.app/
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `ScamSheield-Railway-Service`
5. Add service → Select `backend` folder
6. Railway auto-detects Python
7. Add environment variable: `PORT=5000`
8. Get the URL and update Vercel's `VITE_API_URL`

---

## 🆘 Temporary: Use Your Local Backend

If you want to test immediately without deploying:

**Not recommended for production** - Your backend URL will change each time your IP changes.

1. Install ngrok: https://ngrok.com/download
2. Run backend: `cd backend && python app.py`
3. In new terminal: `ngrok http 5000`
4. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)
5. Update Vercel environment variable `VITE_API_URL` to `https://abc123.ngrok.io/api`
6. Redeploy on Vercel

---

## ✅ What Changed

### Files Updated:

1. **`backend/runtime.txt`** - Specifies Python version for hosting platforms
2. **`backend/app.py`** - Uses PORT environment variable (required by Render/Railway)
3. **`services/apiService.js`** - Uses `VITE_API_URL` environment variable

### How It Works:

```
Vercel (Frontend)
    ↓ fetch()
Render.com (Backend API)
    ↓ data
Vercel (Frontend displays results)
```

When `VITE_API_URL` is set, frontend calls your deployed backend.
When not set, it falls back to `localhost:5000` for local development.

---

## 🎯 Recommended: Deploy to Render

**Why Render?**
- ✅ Free tier available
- ✅ Auto-deploys from GitHub
- ✅ Keeps app awake (with some limitations)
- ✅ Easy setup
- ✅ HTTPS included

Follow Step 2 above to get started!
