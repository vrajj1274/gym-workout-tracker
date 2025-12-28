import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { Link } from 'react-router-dom'

const muscleEmojis = {
  'chest': '💪',
  'back': '🔙',
  'shoulders': '🏋️',
  'biceps': '💪',
  'triceps': '💪',
  'legs': '🦵',
  'core': '⚡',
  'cardio': '❤️'
}

export default function Muscles() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { 
    api.getMuscles().then(g => {
      setGroups(g)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="text-center mt-8">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-400">Loading muscle groups...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 animate-fadeIn">
      <div className="text-center mb-8 animate-slideDown">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">Select Muscle Group</h1>
        <p className="text-gray-400 text-base md:text-lg animate-slideUp" style={{ animationDelay: '200ms' }}>Tap a muscle group to view exercises and start logging</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {groups.map((g, idx) => (
          <Link 
            to={`/muscles/${g._id}`} 
            key={g._id} 
            className="group p-6 md:p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl hover:from-indigo-900 hover:to-purple-900 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center shadow-xl border-2 border-gray-700 hover:border-indigo-500 hover:shadow-indigo-500/50 touch-manipulation animate-scaleIn"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform duration-300 filter group-hover:drop-shadow-lg">
              {muscleEmojis[g.slug] || '🏋️'}
            </div>
            <div className="font-bold text-lg md:text-xl group-hover:text-indigo-300 transition-colors">
              {g.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
