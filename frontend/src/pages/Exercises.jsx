import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../state/auth.jsx'

export default function Exercises() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [exercises, setExercises] = useState([])
  const [muscleName, setMuscleName] = useState('')
  const [name, setName] = useState('')
  const { token } = useAuth()

  useEffect(() => { 
    loadExercises()
    loadMuscleInfo()
  }, [id])

  async function loadExercises() {
    const list = await api.getExercisesByMuscle(id)
    setExercises(list)
  }

  async function loadMuscleInfo() {
    const muscles = await api.getMuscles()
    const muscle = muscles.find(m => m._id === id)
    if (muscle) setMuscleName(muscle.name)
  }

  async function add(e) {
    e.preventDefault()
    if (!name) return
    if (!token) {
      navigate('/login')
      return
    }
    try {
      await api.createExercise({ name, muscle: id })
      setName('')
      await loadExercises()
    } catch (err) {
      console.error(err)
      alert('Failed to add exercise')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fadeIn">
      {/* Enhanced Back Button - Mobile Friendly */}
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 text-indigo-400 mb-6 p-3 rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-200 touch-manipulation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium">Back to Muscles</span>
      </button>

      <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-slideDown">{muscleName} Exercises</h1>
      <p className="text-gray-400 mb-6 text-sm md:text-base animate-slideUp">Tap an exercise to start logging your workout</p>
      
      <ul className="space-y-3 mb-6">
        {exercises.map((ex, idx) => (
          <li 
            key={ex._id} 
            className="transform transition-all duration-300 hover:scale-[1.02] active:scale-95 animate-slideIn"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <Link 
              to={`/exercise/${ex._id}`} 
              className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg hover:from-indigo-900 hover:to-purple-900 transition-all shadow-lg hover:shadow-indigo-500/30 border border-gray-700 hover:border-indigo-500 touch-manipulation group"
            >
              <span className="text-lg font-medium group-hover:text-indigo-300 transition-colors">{ex.name}</span>
              <svg className="w-6 h-6 text-indigo-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>

      {token && (
        <div className="p-4 md:p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-xl border border-gray-700 hover:border-indigo-500 transition-all animate-bounceIn">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="text-2xl animate-pulse">➕</span>
            <span>Add Custom Exercise</span>
          </h3>
          <form onSubmit={add} className="flex flex-col sm:flex-row gap-3">
            <input 
              value={name} 
              onChange={e=>setName(e.target.value)} 
              placeholder="Exercise name" 
              className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-base touch-manipulation" 
            />
            <button className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 active:scale-95 transition-all font-semibold shadow-lg hover:shadow-green-500/50 touch-manipulation">
              Add Exercise
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
