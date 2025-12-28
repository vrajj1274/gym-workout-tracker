# Gym Workout Tracker

Modern full-stack web app for logging and tracking your gym workouts with personal bests, session history, and progress analytics.

## Features
- User registration & JWT auth
- Muscle group selection
- Default and custom exercises
- Log sets, reps, weights
- Personal max tracking
- Session history

## Tech Stack
**Backend**: Node.js + Express + MongoDB + Mongoose + JWT  
**Frontend**: React + Vite + Tailwind + React Router + Axios + Chart.js

---

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
# Copy and edit .env file
cp .env.example .env
# Update MONGODB_URI and JWT_SECRET in .env
npm run seed
npm run dev
```

Backend runs on http://localhost:4000

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173

### 3. Test User

After seeding, login with:
- **Email**: test@example.com
- **Password**: password123

---

## Project Structure

```
gym project/
├── backend/
│   ├── src/
│   │   ├── index.js            # Express entry
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API endpoints
│   │   ├── middleware/         # Auth middleware
│   │   └── seed/               # DB seeding
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── main.jsx            # React entry
│   │   ├── App.jsx
│   │   ├── pages/              # Login, Register, Muscles, Exercises, ExerciseDetail
│   │   ├── state/              # Auth context
│   │   └── utils/              # API client
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## API Endpoints

| Method | Endpoint                        | Description                 |
|--------|---------------------------------|-----------------------------|
| POST   | /api/auth/register              | Register user               |
| POST   | /api/auth/login                 | Login user                  |
| GET    | /api/muscles                    | List muscle groups          |
| GET    | /api/exercises/muscle/:id       | Exercises for muscle        |
| POST   | /api/exercises                  | Create custom exercise      |
| POST   | /api/sessions                   | Log workout session         |
| GET    | /api/sessions                   | User's recent sessions      |
| GET    | /api/sessions/exercise/:id      | Exercise history + PR       |

---

## Development Notes

- MongoDB must be running locally or provide a remote URI
- JWT secret should be strong and secret
- Frontend proxies API calls to backend on port 4000
- Mobile responsive and dark mode by default

---

## Future Enhancements
- Progress charts (Chart.js integration)
- Weekly/monthly volume tracking
- Workout plans
- Trainer mode
- Social sharing

---

**Built with ❤️ for fitness enthusiasts**
