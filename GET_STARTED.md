# 🏋️‍♂️ GYM WORKOUT TRACKER

## Your Personal Fitness Logger - Digital, Clean, and Fast

---

## 🎯 What This App Does

Track every rep, every set, and every PR. This is your complete gym logbook that:

- 📝 Logs your workouts with precision
- 📊 Tracks your personal records
- 📈 Shows your progress over time  
- 💪 Covers all major muscle groups
- 🎨 Looks beautiful on any device

---

## ⚡ Quick Start (3 Steps)

### 1️⃣ Install & Seed

\`\`\`bash
# Backend
cd backend && npm install && npm run seed

# Frontend (new terminal)
cd frontend && npm install
\`\`\`

### 2️⃣ Run Servers

\`\`\`bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
\`\`\`

### 3️⃣ Login

Open **http://localhost:5173**

**Email:** test@example.com  
**Password:** password123

---

## 🎮 How to Use

### First Time User

1. **Register** → Create your account
2. **Choose Muscle** → Pick from 7 muscle groups
3. **Select Exercise** → 25+ preloaded exercises
4. **Log Workout** → Add your sets, reps, and weights
5. **Track Progress** → See your PRs and history

### Returning User

1. **Login** → Welcome back!
2. **Jump Right In** → 2 clicks to log a workout
3. **View Progress** → See how much you've improved

---

## 💡 Key Features

### ✨ Smart Tracking
- Automatically calculates your personal best
- Shows your last workout for reference
- Stores complete session history

### 🎯 User-Friendly
- Dark mode by default (easy on the eyes)
- Mobile responsive (use at the gym)
- Fast navigation (no wasted time)

### 🔒 Secure
- Your data is private
- Passwords are encrypted
- Session tokens expire safely

---

## 📱 App Screens

### Home Screen
**Muscle Groups Grid**
- 7 colorful cards
- Emoji icons
- Click to view exercises

### Exercise List
**All Exercises for Muscle**
- Default exercises preloaded
- Add your own custom exercises
- Quick navigation to logging

### Exercise Detail (★ MAIN SCREEN ★)
**Everything You Need**
- 🏆 Personal Best (highlighted)
- ➕ Add Sets (dynamic rows)
- 💾 Save Session
- 📜 Complete History

---

## 🏗️ Tech Stack

**Frontend:** React + Vite + Tailwind CSS  
**Backend:** Node.js + Express  
**Database:** MongoDB  
**Auth:** JWT + bcrypt

---

## 📖 Documentation

| File | Purpose |
|------|---------|
| README.md | Overview & setup |
| QUICKSTART.md | Quick reference |
| ARCHITECTURE.md | System design |
| TESTING.md | Test guide |
| CHECKLIST.md | Feature verification |
| SUMMARY.md | Delivery summary |

---

## 🎓 For Developers

### API Endpoints
\`\`\`
POST   /api/auth/register
POST   /api/auth/login
GET    /api/muscles
GET    /api/exercises/:id
GET    /api/exercises/muscle/:id
POST   /api/exercises
POST   /api/sessions
GET    /api/sessions
GET    /api/sessions/exercise/:id
\`\`\`

### Database Models
- User (auth)
- MuscleGroup (7 groups)
- Exercise (default + custom)
- WorkoutSession (with embedded sets)

---

## 🚀 Production Deployment

Ready to deploy! Just:
1. Set production MongoDB URI
2. Generate strong JWT secret
3. Build frontend
4. Deploy to your favorite platform

---

## 💪 Start Logging Your Gains!

This is more than just a tracker—it's your **digital gym partner** that:

✅ Never forgets a workout  
✅ Always shows your progress  
✅ Keeps you motivated with PRs  
✅ Works on any device  

**Your fitness journey starts here.** 🏋️‍♀️

---

## 🙌 Credits

Built with modern web technologies and fitness in mind.

**Stack:** MERN (MongoDB, Express, React, Node.js)  
**Design:** Tailwind CSS dark theme  
**Auth:** JWT + bcrypt security  
**Quality:** Production-ready code  

---

## 📞 Need Help?

Check the documentation files:
- Setup issues → README.md
- Testing → TESTING.md  
- Architecture → ARCHITECTURE.md
- Quick tips → QUICKSTART.md

---

**Now go crush those PRs! 💪🔥**
