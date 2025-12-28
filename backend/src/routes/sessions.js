const express = require('express');
const router = express.Router();
const WorkoutSession = require('../models/WorkoutSession');
const Exercise = require('../models/Exercise');
const auth = require('../middleware/auth');

// Create a session (log workout)
router.post('/', auth, async (req, res) => {
  try {
    const { muscle, date, sets, notes } = req.body;
    if (!muscle || !sets || !Array.isArray(sets) || sets.length === 0) return res.status(400).json({ message: 'Muscle and sets required' });
    // validate sets
    for (const s of sets) {
      if (!s.exercise || typeof s.weight !== 'number' || typeof s.reps !== 'number') return res.status(400).json({ message: 'Invalid set format' });
    }
    const session = new WorkoutSession({ user: req.user._id, muscle, date: date || Date.now(), sets, notes });
    await session.save();
    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recent sessions for user
router.get('/', auth, async (req, res) => {
  const sessions = await WorkoutSession.find({ user: req.user._id }).populate('muscle').sort({ date: -1 }).limit(50);
  res.json(sessions);
});

// Get history for specific exercise (personal best and sessions containing exercise)
router.get('/exercise/:exerciseId', auth, async (req, res) => {
  const exerciseId = req.params.exerciseId;
  const sessions = await WorkoutSession.find({ user: req.user._id, 'sets.exercise': exerciseId }).sort({ date: -1 });
  // compute personal best
  let max = 0;
  const history = [];
  for (const s of sessions) {
    const sets = s.sets.filter(x => x.exercise.toString() === exerciseId);
    for (const st of sets) {
      if (st.weight > max) max = st.weight;
    }
    history.push({ date: s.date, sets });
  }
  res.json({ personalBest: max, history });
});

module.exports = router;
