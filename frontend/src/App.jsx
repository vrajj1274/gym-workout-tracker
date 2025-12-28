import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Muscles from './pages/Muscles'
import Exercises from './pages/Exercises'
import ExerciseDetail from './pages/ExerciseDetail'
import { AuthProvider, useAuth } from './state/auth.jsx'

function Nav() {
  const { token, setToken } = useAuth()
  const navigate = useNavigate()

  function logout() {
    setToken(null)
    navigate('/login')
  }

  return (
    <nav className="p-4 border-b border-gray-800 flex justify-between items-center">
      <div>
        <Link to="/" className="mr-4 text-lg font-bold">💪 Gym Tracker</Link>
      </div>
      <div>
        {token ? (
          <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <Nav />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Muscles />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/muscles/:id" element={<Exercises />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}
