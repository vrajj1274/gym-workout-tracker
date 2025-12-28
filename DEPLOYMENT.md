# Deployment Guide

## 🚀 Deploying Your Gym Workout Tracker

This guide will help you deploy your application to production.

---

## 📋 Prerequisites

1. **GitHub Account** - https://github.com
2. **MongoDB Atlas Account** - https://www.mongodb.com/cloud/atlas
3. **Vercel Account** - https://vercel.com (or Railway, Render, etc.)

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Production Database)

### 1. Create MongoDB Atlas Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Click "Build a Database"
4. Choose "M0 Free" tier
5. Select a cloud provider and region (closest to you)
6. Name your cluster (e.g., "gym-tracker")
7. Click "Create"

### 2. Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and password (save these!)
5. Give "Read and write to any database" permission
6. Click "Add User"

### 3. Whitelist IP Addresses
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 4. Get Connection String
1. Go to "Database" → Click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `gym-tracker`

Example: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/gym-tracker?retryWrites=true&w=majority`

---

## 🔧 Step 2: Push to GitHub

### 1. Initialize Git (if not already done)
```bash
cd /Users/khushipatel/Desktop/gym\ project
git init
```

### 2. Create .gitignore (already created)
Verify `.gitignore` includes:
- `node_modules/`
- `.env`
- `dist/`

### 3. Stage and Commit Files
```bash
git add .
git commit -m "Initial commit: Gym Workout Tracker with animations"
```

### 4. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `gym-workout-tracker`
3. Description: "Full-stack MERN gym workout tracking app with advanced animations"
4. Choose "Public" or "Private"
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 5. Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/gym-workout-tracker.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 3: Deploy Backend

### Option A: Railway (Recommended - Easy)

1. **Sign up at https://railway.app**
2. **Click "New Project"**
3. **Choose "Deploy from GitHub repo"**
4. **Select your `gym-workout-tracker` repository**
5. **Add Environment Variables:**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a secure secret (e.g., `openssl rand -base64 32`)
   - `PORT`: Leave blank (Railway auto-assigns)
6. **Configure Root Directory:**
   - Settings → Root Directory: `/backend`
7. **Railway will auto-deploy!**
8. **Copy the Railway URL** (e.g., `https://your-app.railway.app`)

### Option B: Render

1. **Sign up at https://render.com**
2. **Click "New" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure:**
   - Name: `gym-tracker-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Add Environment Variables:**
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT`: 4000
6. **Click "Create Web Service"**
7. **Copy the Render URL**

### Option C: Heroku

1. **Install Heroku CLI:** https://devcenter.heroku.com/articles/heroku-cli
2. **Login:**
   ```bash
   heroku login
   ```
3. **Create App:**
   ```bash
   cd backend
   heroku create gym-tracker-backend
   ```
4. **Set Environment Variables:**
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_uri"
   heroku config:set JWT_SECRET="your_secret"
   ```
5. **Deploy:**
   ```bash
   git subtree push --prefix backend heroku main
   ```

---

## 🎨 Step 4: Deploy Frontend to Vercel

### 1. Update API URL in Frontend

**Edit:** `frontend/src/utils/api.js`

Replace:
```javascript
const BASE_URL = 'http://localhost:4000';
```

With:
```javascript
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
```

**Create:** `frontend/.env.production`
```
VITE_API_URL=https://your-backend-url.railway.app
```

**Create:** `frontend/.env.example`
```
VITE_API_URL=http://localhost:4000
```

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard (Easiest)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your `gym-workout-tracker` repository
5. Configure:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL from Railway
7. Click "Deploy"
8. Done! Your app is live! 🎉

#### Option B: Vercel CLI
```bash
npm i -g vercel
cd frontend
vercel
# Follow prompts
# Set VITE_API_URL environment variable
```

### 3. Alternative: Netlify
1. Go to https://netlify.com
2. Drag and drop your `frontend/dist` folder (after `npm run build`)
3. Or connect GitHub repo
4. Configure environment variables
5. Deploy!

---

## 🔒 Step 5: Configure CORS for Production

**Edit:** `backend/src/index.js`

Update CORS to include your Vercel domain:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

Redeploy backend after this change.

---

## ✅ Step 6: Verify Deployment

### Test Checklist:
- [ ] Backend API is accessible (visit `/api/health` or similar)
- [ ] Frontend loads without errors
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Can view muscle groups
- [ ] Can view exercises
- [ ] Can log workouts
- [ ] Animations are smooth
- [ ] Mobile-responsive works
- [ ] No console errors

---

## 🎯 Quick Deployment Summary

```bash
# 1. Setup MongoDB Atlas
# - Get connection string

# 2. Push to GitHub
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/gym-workout-tracker.git
git push -u origin main

# 3. Deploy Backend (Railway)
# - Connect GitHub repo
# - Add environment variables
# - Set root directory to /backend
# - Auto-deploys

# 4. Deploy Frontend (Vercel)
# - Import GitHub repo
# - Set root directory to /frontend
# - Add VITE_API_URL environment variable
# - Deploy
```

---

## 🌟 Post-Deployment

### Custom Domain (Optional)
- **Vercel:** Settings → Domains → Add domain
- **Railway:** Settings → Domains → Add custom domain

### Monitoring
- **Vercel Analytics:** Enable in project settings
- **Railway Logs:** View in dashboard
- **MongoDB Atlas:** Monitor database performance

### Seeding Production Database
```bash
# SSH into your backend server or run locally with production DB
MONGODB_URI="your_production_uri" node backend/src/seed/seed.js
```

---

## 🆘 Troubleshooting

### Backend Not Connecting to MongoDB
- Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- Verify connection string format
- Check database user permissions

### Frontend Can't Reach Backend
- Verify VITE_API_URL is set correctly
- Check CORS configuration
- Ensure backend is deployed and running

### Animations Not Working
- Check browser console for errors
- Verify Tailwind CSS is building correctly
- Clear browser cache

---

## 📊 Environment Variables Summary

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gym-tracker
JWT_SECRET=your-super-secret-key-here
PORT=4000
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend.railway.app
```

---

## 🎉 You're Live!

Your gym workout tracker is now accessible worldwide! 🌍

**Frontend URL:** https://your-app.vercel.app  
**Backend URL:** https://your-backend.railway.app

Share with friends and start tracking workouts! 💪

---

*Last updated: December 28, 2025*
