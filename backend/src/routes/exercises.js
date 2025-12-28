const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');
const auth = require('../middleware/auth');

// Get exercise by ID
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id).populate('muscle');
    if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
    res.json(exercise);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get exercises by muscle group
router.get('/muscle/:muscleId', async (req, res) => {
  const exercises = await Exercise.find({ muscle: req.params.muscleId }).sort('name');
  res.json(exercises);
});

// Create custom exercise for user
router.post('/', auth, async (req, res) => {
  try {
    const { name, muscle, description } = req.body;
    if (!name || !muscle) return res.status(400).json({ message: 'Name and muscle required' });
    const ex = new Exercise({ name, muscle, description, user: req.user._id });
    await ex.save();
    res.json(ex);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
