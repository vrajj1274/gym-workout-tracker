import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../state/auth.jsx'

export default function ExerciseDetail(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [exercise, setExercise] = useState(null)
  const [historyData, setHistoryData] = useState([])
  const [personalBest, setPersonalBest] = useState(0)
  const [sets, setSets] = useState([{ weight: 0, reps: 0 }])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { token } = useAuth()

  useEffect(()=> {
    if (!token) {
      navigate('/login')
      return
    }
    loadExercise()
    loadHistory()
  }, [id, token])

  async function loadExercise() {
    try {
      const ex = await api.getExercise(id)
      setExercise(ex)
    } catch (err) {
      console.error(err)
    }
  }

  async function loadHistory(){
    try {
      const res = await api.getExerciseHistory(id)
      setPersonalBest(res.personalBest)
      setHistoryData(res.history || [])
    } catch (err) {
      console.error(err)
    }
  }

  function addRow(){ setSets(s=>[...s, { weight:0, reps:0 }]) }
  function update(i, field, v){ setSets(s=> { const ns=[...s]; ns[i][field]=Number(v); return ns }) }
  function remove(i){ setSets(s=>s.filter((_,idx)=>idx!==i)) }

  async function save(){
    if (sets.length === 0 || sets.every(s => s.weight === 0 && s.reps === 0)) {
      setError('Please add at least one valid set')
      setTimeout(() => setError(''), 3000)
      return
    }
    if (!exercise) {
      setError('Exercise data not loaded')
      return
    }
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      const payload = { 
        muscle: exercise.muscle._id || exercise.muscle,
        sets: sets.map(s=>({ exercise: id, weight: s.weight, reps: s.reps })) 
      }
      await api.createSession(payload)
      setSets([{ weight: 0, reps: 0 }])
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      await loadHistory()
    } catch (err) {
      console.error(err)
      setError('Failed to save session. Please try again.')
      setTimeout(() => setError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  if (!token) return null

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fadeIn">
      {/* Enhanced Back Button with Animation */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-indigo-400 mb-6 p-3 rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-200 touch-manipulation group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium">Back to Exercises</span>
      </button>

      {/* Exercise Header */}
      <div className="mb-6 animate-slideDown">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{exercise ? exercise.name : 'Exercise Log'}</h1>
        <div className="p-4 md:p-6 bg-gradient-to-r from-green-900/50 to-gray-800 rounded-xl border-2 border-green-700/50 shadow-lg hover:shadow-green-500/30 transform hover:scale-[1.02] transition-all animate-glow">
          <div className="flex items-center gap-3">
            <span className="text-4xl animate-bounce">🏆</span>
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wide">Personal Best</p>
              <p className="text-3xl md:text-4xl font-bold text-green-400">{personalBest} <span className="text-xl">kg</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-4 bg-gradient-to-r from-green-900/50 to-green-800/50 border-2 border-green-700 rounded-lg animate-bounceIn flex items-center gap-3 shadow-lg shadow-green-500/30">
          <span className="text-2xl">✅</span>
          <span className="font-semibold">Workout logged successfully!</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-gradient-to-r from-red-900/50 to-red-800/50 border-2 border-red-700 rounded-lg animate-shake flex items-center gap-3 shadow-lg shadow-red-500/30">
          <span className="text-2xl">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Workout Logging Section */}
      <div className="mt-6 p-4 md:p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl border border-gray-700 hover:border-indigo-500 transition-all animate-scaleIn">
        <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl animate-pulse">💪</span>
          <span>Log Today's Workout</span>
        </h3>
        <div className="space-y-3">
          {sets.map((s,i)=> (
            <div key={i} className="flex flex-col sm:flex-row gap-2 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all animate-slideIn border border-gray-600" style={{ animationDelay: `${i * 80}ms` }}>
              <span className="text-indigo-400 font-bold text-sm sm:w-12 flex items-center">Set {i+1}</span>
              <input 
                value={s.weight || ''} 
                onChange={e=>update(i,'weight',e.target.value)} 
                className="flex-1 p-3 rounded-lg bg-gray-800 border-2 border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-base touch-manipulation" 
                placeholder="Weight (kg)" 
                type="number" 
                inputMode="decimal"
              />
              <input 
                value={s.reps || ''} 
                onChange={e=>update(i,'reps',e.target.value)} 
                className="flex-1 p-3 rounded-lg bg-gray-800 border-2 border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-base touch-manipulation" 
                placeholder="Reps" 
                type="number" 
                inputMode="numeric"
              />
              <button 
                onClick={()=>remove(i)} 
                className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 rounded-lg hover:from-red-700 hover:to-red-800 active:scale-95 transition-all font-semibold shadow-lg hover:shadow-red-500/50 touch-manipulation whitespace-nowrap"
              >
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button 
            onClick={addRow} 
            className="flex-1 bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-600 active:scale-95 transition-all font-semibold shadow-lg touch-manipulation flex items-center justify-center gap-2"
          >
            <span className="text-xl">➕</span>
            <span>Add Set</span>
          </button>
          <button 
            onClick={save} 
            disabled={loading} 
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-xl touch-manipulation flex items-center justify-center gap-2 text-lg"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>💾</span>
                <span>Save Session</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* History Section */}
      <div className="mt-8">
        <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">📈</span>
          <span>Workout History</span>
        </h3>
        {historyData.length === 0 ? (
          <div className="p-8 bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-700 text-center">
            <p className="text-xl mb-2">📊</p>
            <p className="text-gray-400">No previous sessions found.</p>
            <p className="text-gray-500 text-sm mt-1">Start logging to track your progress!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {historyData.map((h,idx)=> (
              <li 
                key={idx} 
                className="p-4 md:p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-700 transition-all transform hover:scale-[1.01] animate-slideIn"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">📅</span>
                  <div className="font-semibold text-indigo-400 text-lg">
                    {new Date(h.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div className="space-y-2 pl-7">
                  {h.sets.map((st,i)=> (
                    <div key={i} className="flex items-center gap-2 text-gray-300">
                      <span className="text-gray-500 font-mono text-sm">Set {i+1}:</span>
                      <span className="font-semibold text-white">{st.reps} reps</span>
                      <span className="text-gray-500">@</span>
                      <span className="font-bold text-yellow-400 text-lg">{st.weight} kg</span>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
