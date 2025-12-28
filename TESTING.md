# Testing Guide

## 🧪 Manual Testing Instructions

### Prerequisites
- Both backend and frontend servers running
- MongoDB running locally
- Database seeded with default data

### Test User Credentials
- **Email**: test@example.com
- **Password**: password123

---

## Test Flow

### 1. Authentication Flow

#### Register New User
1. Open http://localhost:5173
2. Click "Register" in nav
3. Fill in:
   - Name: "Test User 2"
   - Email: "test2@example.com"
   - Password: "password123"
4. Click "Register"
5. ✅ Should redirect to muscle groups page
6. ✅ Should show "Logout" button in nav

#### Login Existing User
1. Click "Logout"
2. Click "Login"
3. Enter test@example.com / password123
4. ✅ Should redirect to muscle groups page
5. ✅ Should show "Logout" button

#### Error Handling
1. Try logging in with wrong password
2. ✅ Should show error message
3. Try registering with existing email
4. ✅ Should show "Email in use" error

---

### 2. Muscle Group Selection

1. On home page, view muscle groups
2. ✅ Should see 8 muscle groups:
   - Chest 💪
   - Back 🔙
   - Shoulders 🏋️
   - Biceps 💪
   - Triceps 💪
   - Legs 🦵
   - Core ⚡
   - Cardio ❤️
3. Click on "Chest"
4. ✅ Should navigate to exercises page

---

### 3. Exercise List

1. On Chest exercises page:
2. ✅ Should see default exercises:
   - Bench Press
   - Incline Bench Press
   - Dumbbell Fly
   - Chest Press Machine
3. ✅ Should see "Add Custom Exercise" form
4. Add custom exercise: "Cable Fly"
5. ✅ Should appear in list

---

### 4. Workout Logging (CORE FEATURE)

#### First Workout Session
1. Click "Bench Press"
2. ✅ Should show:
   - Exercise name: "Bench Press"
   - Personal Best: 0 kg (first time)
   - Empty history
3. Log workout:
   - Set 1: 60 kg, 10 reps
   - Click "+ Add Set"
   - Set 2: 65 kg, 8 reps
   - Set 3: 70 kg, 6 reps
4. Click "Save Session"
5. ✅ Should show success
6. ✅ Personal Best should update to 70 kg
7. ✅ History should show today's session with 3 sets

#### Second Workout Session
1. Same exercise page
2. ✅ Should still show Personal Best: 70 kg
3. ✅ Should show previous session in history
4. Add new workout:
   - Set 1: 70 kg, 10 reps
   - Set 2: 75 kg, 8 reps (NEW PR!)
   - Set 3: 80 kg, 5 reps (NEW PR!)
5. Save
6. ✅ Personal Best should update to 80 kg
7. ✅ History should show both sessions

#### Progress Tracking
1. View history section
2. ✅ Sessions sorted by date (newest first)
3. ✅ Each session shows:
   - Date
   - All sets with reps and weights
4. ✅ Personal best highlighted in green

---

### 5. Data Validation

#### Empty Sets
1. Try saving without adding sets
2. ✅ Should show error: "Please add at least one valid set"

#### Zero Values
1. Add set with 0 weight and 0 reps
2. Try to save
3. ✅ Should show validation error

#### Delete Set
1. Add 3 sets
2. Click "Delete" on set 2
3. ✅ Should remove that set
4. ✅ Should not affect other sets

---

### 6. Navigation & UX

#### Back Navigation
1. From any page, look for the back button (arrow icon)
2. ✅ Should have smooth hover effects
3. ✅ Should navigate to previous page
4. ✅ Icon should slide on hover (desktop)
5. ✅ Should have scale effect on tap (mobile)

#### Mobile Touch Interactions
1. Resize browser to mobile width (or test on phone)
2. ✅ Back buttons should be large and easy to tap
3. ✅ Buttons should scale down slightly when tapped
4. ✅ Forms should have proper input types (number pads for weights/reps)
5. ✅ All interactive elements should have touch-manipulation class

#### Animations
1. Navigate between pages
2. ✅ Pages should fade in smoothly
3. ✅ Lists should slide in with staggered delays
4. ✅ Muscle group cards should have bounce effect
5. ✅ Error messages should shake
6. ✅ Success messages should slide down

#### Direct URL Access
1. While logged out, try accessing:
   - http://localhost:5173/exercise/[any-id]
2. ✅ Should redirect to login

#### Responsive Design
1. Resize browser to mobile width
2. ✅ Muscle groups grid should adjust (2 columns on mobile)
3. ✅ Forms should stack vertically on small screens
4. ✅ All buttons accessible and properly sized
5. ✅ Text sizes should be readable (16px minimum)
6. ✅ Touch targets should be at least 44x44px

---

## 🔍 Backend API Testing

Use curl or Postman to test APIs:

### Register
\`\`\`bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"api@test.com","password":"test123","name":"API Test"}'
\`\`\`

### Login
\`\`\`bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
\`\`\`

### Get Muscles
\`\`\`bash
curl http://localhost:4000/api/muscles
\`\`\`

### Get Exercises for Chest
\`\`\`bash
# Replace MUSCLE_ID with actual ID from muscles endpoint
curl http://localhost:4000/api/exercises/muscle/MUSCLE_ID
\`\`\`

### Create Session (with auth)
\`\`\`bash
# Replace TOKEN with actual JWT from login
curl -X POST http://localhost:4000/api/sessions \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "muscle": "MUSCLE_ID",
    "sets": [
      {"exercise": "EXERCISE_ID", "weight": 60, "reps": 10},
      {"exercise": "EXERCISE_ID", "weight": 65, "reps": 8}
    ]
  }'
\`\`\`

---

## ✅ Test Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Protected routes redirect when not logged in
- [ ] Muscle groups display correctly
- [ ] Exercise list shows default exercises
- [ ] Custom exercise creation works
- [ ] Workout logging saves correctly
- [ ] Personal best updates automatically
- [ ] History shows all past sessions
- [ ] History sorted by date (newest first)
- [ ] Sets can be added dynamically
- [ ] Sets can be deleted
- [ ] Input validation works
- [ ] Error messages display properly
- [ ] Logout clears token
- [ ] Navigation works correctly
- [ ] UI is responsive on mobile
- [ ] Dark mode displays correctly

---

## 🐛 Known Limitations

1. No chart visualization yet (Chart.js imported but not implemented)
2. No workout plans feature
3. No social sharing
4. No export/import data
5. No exercise images or demos

These are planned future enhancements.
