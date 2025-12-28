# System Architecture

## Overview

Full-stack MERN application with JWT authentication, RESTful API, and responsive React frontend.

---

## Tech Stack

### Backend
- **Runtime**: Node.js v20+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT + bcrypt
- **Dev Tools**: nodemon

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Charts**: Chart.js + react-chartjs-2 (ready for future use)

---

## Database Schema

### User
\`\`\`javascript
{
  _id: ObjectId,
  email: String (unique, lowercase),
  password: String (hashed with bcrypt),
  name: String,
  createdAt: Date
}
\`\`\`

### MuscleGroup
\`\`\`javascript
{
  _id: ObjectId,
  name: String,          // e.g., "Chest"
  slug: String (unique), // e.g., "chest"
  description: String,
  createdAt: Date
}
\`\`\`

### Exercise
\`\`\`javascript
{
  _id: ObjectId,
  name: String,                      // e.g., "Bench Press"
  muscle: ObjectId (ref: MuscleGroup),
  user: ObjectId (ref: User),        // null for default exercises
  description: String,
  createdAt: Date
}
\`\`\`

**Design**: Default exercises have `user: null`. Custom exercises belong to a specific user.

### WorkoutSession
\`\`\`javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  muscle: ObjectId (ref: MuscleGroup),
  date: Date,
  sets: [
    {
      exercise: ObjectId (ref: Exercise),
      weight: Number,
      reps: Number,
      notes: String
    }
  ],
  notes: String,
  createdAt: Date
}
\`\`\`

**Design**: A session can contain multiple sets for different exercises in the same muscle group.

---

## API Endpoints

### Auth (`/api/auth`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/register` | No | Create new user |
| POST | `/login` | No | Authenticate user |

### Muscle Groups (`/api/muscles`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | No | List all muscle groups |

### Exercises (`/api/exercises`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/:id` | No | Get single exercise |
| GET | `/muscle/:muscleId` | No | List exercises for muscle group |
| POST | `/` | Yes | Create custom exercise |

### Workout Sessions (`/api/sessions`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/` | Yes | Log new workout session |
| GET | `/` | Yes | Get user's recent sessions |
| GET | `/exercise/:exerciseId` | Yes | Get history + PR for exercise |

---

## Authentication Flow

1. User registers or logs in
2. Server generates JWT (7-day expiry)
3. Frontend stores token in localStorage
4. Frontend sends token in `Authorization: Bearer <token>` header
5. Backend middleware validates token and attaches user to request
6. Protected routes return 401 if token invalid/missing

---

## Frontend Architecture

### State Management
- **Auth**: Context API (`AuthProvider`)
  - Stores: user, token
  - Persists token to localStorage
  - Injects token into axios headers

### Routing
\`\`\`
/ → Muscles (public)
/login → Login
/register → Register
/muscles/:id → Exercises (public)
/exercise/:id → ExerciseDetail (protected)
\`\`\`

### Component Structure
\`\`\`
App.jsx
├── Nav (logout, login/register links)
└── Routes
    ├── Muscles (muscle group grid)
    ├── Exercises (exercise list + add custom)
    ├── ExerciseDetail (logging + history)
    ├── Login
    └── Register
\`\`\`

---

## Data Flow Examples

### Logging a Workout

**Frontend**:
1. User navigates to `/exercise/:id`
2. Loads exercise details (`GET /api/exercises/:id`)
3. Loads history (`GET /api/sessions/exercise/:id`)
4. User adds sets and clicks "Save"
5. Sends `POST /api/sessions` with:
   \`\`\`json
   {
     "muscle": "abc123",
     "sets": [
       { "exercise": "xyz789", "weight": 60, "reps": 10 },
       { "exercise": "xyz789", "weight": 65, "reps": 8 }
     ]
   }
   \`\`\`

**Backend**:
1. Validates JWT token
2. Creates WorkoutSession document
3. Returns saved session
4. Frontend reloads history to show new session + updated PR

---

### Personal Best Calculation

**Logic** (in `/api/sessions/exercise/:exerciseId`):
1. Find all sessions containing the exercise
2. Loop through all sets for that exercise
3. Track max weight
4. Return history + personalBest

---

## Security Considerations

✅ **Implemented**:
- Password hashing (bcrypt, salt rounds: 10)
- JWT with 7-day expiry
- Protected routes (middleware checks)
- Input validation on critical endpoints
- CORS enabled
- Environment variables for secrets

⚠️ **Production Recommendations**:
- Add rate limiting (express-rate-limit)
- Add helmet.js for security headers
- Use HTTPS only
- Implement refresh tokens
- Add password strength requirements
- Add email verification
- Add CSRF protection
- Sanitize inputs (express-validator)
- Add logging (winston/morgan)

---

## Scalability Considerations

### Current Design
- Single MongoDB instance
- Stateless JWT auth (horizontally scalable)
- REST API (can add caching)

### Future Enhancements
- **Caching**: Redis for muscle groups, exercises
- **CDN**: Static assets (React build)
- **Load Balancer**: Multiple Express instances
- **Database**: MongoDB replica set
- **Storage**: S3 for exercise images/videos
- **Analytics**: Separate analytics database
- **Microservices**: Split auth, workout tracking, analytics

---

## File Structure

\`\`\`
gym project/
├── backend/
│   ├── src/
│   │   ├── index.js              # Express app entry
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── MuscleGroup.js
│   │   │   ├── Exercise.js
│   │   │   └── WorkoutSession.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── muscles.js
│   │   │   ├── exercises.js
│   │   │   └── sessions.js
│   │   ├── middleware/
│   │   │   └── auth.js           # JWT validation
│   │   └── seed/
│   │       └── seed.js           # DB seeding script
│   ├── package.json
│   ├── .env
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Muscles.jsx
│   │   │   ├── Exercises.jsx
│   │   │   └── ExerciseDetail.jsx
│   │   ├── state/
│   │   │   └── auth.jsx          # Auth context
│   │   └── utils/
│   │       └── api.js            # Axios instance
│   ├── package.json
│   ├── vite.config.mjs
│   ├── tailwind.config.js
│   └── postcss.config.js
├── README.md
├── TESTING.md
└── ARCHITECTURE.md
\`\`\`

---

## Development Workflow

1. Start MongoDB: `mongod`
2. Backend: `cd backend && npm run dev`
3. Frontend: `cd frontend && npm run dev`
4. Access: http://localhost:5173

---

## Deployment Checklist

- [ ] Set production MongoDB URI
- [ ] Generate strong JWT secret
- [ ] Set NODE_ENV=production
- [ ] Build frontend: `npm run build`
- [ ] Configure reverse proxy (nginx)
- [ ] Set up SSL certificates
- [ ] Configure firewall
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Add error tracking (Sentry)
- [ ] Set up CI/CD pipeline
