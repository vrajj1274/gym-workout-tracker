import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../state/auth.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setToken } = useAuth()
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.login({ email, password })
      setToken(res.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      setTimeout(() => setError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6 animate-fadeIn">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 text-indigo-400 mb-6 p-3 rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-200 touch-manipulation group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium">Back to Home</span>
      </button>

      <div className="text-center mb-8">
        <div className="text-6xl mb-4 animate-bounceIn">🏋️</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent animate-slideDown">Welcome Back!</h2>
        <p className="text-gray-400 animate-slideUp">Login to track your fitness journey</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-gradient-to-r from-red-900/50 to-red-800/50 border-2 border-red-700 rounded-lg animate-shake flex items-center gap-3 shadow-lg shadow-red-500/30">
          <span className="text-2xl">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={submit} className="space-y-4 animate-scaleIn">
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-300 uppercase tracking-wide">Email</label>
          <input 
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
            placeholder="your@email.com" 
            type="email"
            required
            className="w-full p-3 md:p-4 rounded-lg bg-gray-800 border-2 border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-base touch-manipulation" 
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-300 uppercase tracking-wide">Password</label>
          <input 
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
            placeholder="••••••••" 
            type="password" 
            required
            className="w-full p-3 md:p-4 rounded-lg bg-gray-800 border-2 border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-base touch-manipulation" 
          />
        </div>
        <button 
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-xl hover:shadow-indigo-500/50 touch-manipulation text-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Logging in...</span>
            </>
          ) : (
            <span>🔓 Login</span>
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-indigo-500 transition-all animate-slideUp">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline transition-colors">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}
