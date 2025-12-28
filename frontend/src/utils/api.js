import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000/api' })
let token = null

export default {
  setToken(t) { token = t; if (t) api.defaults.headers.common['Authorization'] = `Bearer ${t}`; else delete api.defaults.headers.common['Authorization']; },
  async register(data) { return api.post('/auth/register', data).then(r => r.data); },
  async login(data) { return api.post('/auth/login', data).then(r => r.data); },
  async getMuscles() { return api.get('/muscles').then(r => r.data); },
  async getExercise(id) { return api.get(`/exercises/${id}`).then(r => r.data); },
  async getExercisesByMuscle(id) { return api.get(`/exercises/muscle/${id}`).then(r => r.data); },
  async createExercise(data) { return api.post('/exercises', data).then(r => r.data); },
  async createSession(data) { return api.post('/sessions', data).then(r => r.data); },
  async getSessions() { return api.get('/sessions').then(r => r.data); },
  async getExerciseHistory(id) { return api.get(`/sessions/exercise/${id}`).then(r => r.data); }
}
