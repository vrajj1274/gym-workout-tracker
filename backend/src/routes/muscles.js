const express = require('express');
const router = express.Router();
const MuscleGroup = require('../models/MuscleGroup');
const auth = require('../middleware/auth');

// Get all muscle groups
router.get('/', async (req, res) => {
  try {
    const groups = await MuscleGroup.find().sort('name');
    res.json(groups);
  } catch (err) {
    console.error('Error fetching muscle groups:', err);
    res.status(500).json({ 
      error: 'Failed to fetch muscle groups',
      message: err.message 
    });
  }
});

// Admin / seed only: create muscle groups
router.post('/', auth, async (req, res) => {
  const { name, slug, description } = req.body;
  try {
    const mg = new MuscleGroup({ name, slug, description });
    await mg.save();
    res.json(mg);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
