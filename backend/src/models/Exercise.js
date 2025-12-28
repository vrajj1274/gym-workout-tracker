const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  muscle: { type: mongoose.Schema.Types.ObjectId, ref: 'MuscleGroup', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional: custom exercises belong to a user
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
