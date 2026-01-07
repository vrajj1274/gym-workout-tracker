import axios from 'axios'

// FIXED: Use correct environment variable name and fallback
// Production: VITE_API_BASE should be set in Vercel to https://gym-workout-tracker-248v.onrender.com/api
const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

console.log('🔧 API Base URL:', baseURL) // Debug log for troubleshooting

const api = axios.create({ 
  baseURL,
  timeout: 15000, // 15 second timeout for slow Render cold starts
  headers: {
    'Content-Type': 'application/json'
  }
})

let token = null

// Add response interceptor for better error logging
api.interceptors.response.use(
  response => response,
  error => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.error || error.message
    })
    return Promise.reject(error)
  }
)

export default {
  setToken(t) { 
    token = t
    if (t) {
      api.defaults.headers.common['Authorization'] = `Bearer ${t}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  },
  
  // FIXED: Changed /muscles to /musclegroups to match backend route
  async getMuscles() { 
    try {
      const response = await api.get('/musclegroups')
      console.log('✅ Muscle groups loaded:', response.data.length)
      return response.data
    } catch (error) {
      console.error('❌ Failed to fetch muscle groups:', error.message)
      throw error
    }
  },
  
  async register(data) { return api.post('/auth/register', data).then(r => r.data) },
  async login(data) { return api.post('/auth/login', data).then(r => r.data) },
  async getExercise(id) { return api.get(`/exercises/${id}`).then(r => r.data) },
  async getExercisesByMuscle(id) { return api.get(`/exercises/muscle/${id}`).then(r => r.data) },
  async createExercise(data) { return api.post('/exercises', data).then(r => r.data) },
  async createSession(data) { return api.post('/sessions', data).then(r => r.data) },
  async getSessions() { return api.get('/sessions').then(r => r.data) },
  async getExerciseHistory(id) { return api.get(`/sessions/exercise/${id}`).then(r => r.data) }
}
