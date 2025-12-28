# Gym Backend

Express + MongoDB backend for Workout Logging app.

Setup

1. Copy `.env.example` to `.env` and set `MONGODB_URI` and `JWT_SECRET`.
2. npm install
3. npm run seed
4. npm run dev

APIs

- POST /api/auth/register { email, password } -> { token }
- POST /api/auth/login { email, password } -> { token }
- GET /api/muscles -> list
- GET /api/exercises/muscle/:muscleId -> list
- POST /api/exercises (auth) -> create custom exercise
- POST /api/sessions (auth) -> create workout session
- GET /api/sessions (auth) -> recent sessions
- GET /api/sessions/exercise/:exerciseId (auth) -> history + personal best
