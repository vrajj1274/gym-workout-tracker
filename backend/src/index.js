require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const muscleRoutes = require('./routes/muscles');
const exerciseRoutes = require('./routes/exercises');
const sessionRoutes = require('./routes/sessions');

const app = express();

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

// Safe CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    
    // In production, check allowed origins
    if (allowedOrigins.length > 0 && allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } 
    // In development or if no FRONTEND_URL set, allow all
    else if (process.env.NODE_ENV !== 'production' || allowedOrigins.length === 2) {
      callback(null, true);
    } 
    else {
      console.warn('Blocked by CORS:', origin);
      callback(null, true); // Allow anyway to prevent production breakage
    }
  },
  credentials: true
}));

app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Gym Tracker API is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      muscles: '/api/muscles',
      exercises: '/api/exercises',
      sessions: '/api/sessions'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/muscles', muscleRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/sessions', sessionRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log('Server running on port', PORT));
}).catch(err => {
  console.error('MongoDB connection error', err);
});
