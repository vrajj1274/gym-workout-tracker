const mongoose = require('mongoose');

const SetSchema = new mongoose.Schema({
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  weight: { type: Number, required: true },
  reps: { type: Number, required: true },
  notes: { type: String }
}, { _id: false });

const WorkoutSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  muscle: { type: mongoose.Schema.Types.ObjectId, ref: 'MuscleGroup', required: true },
  date: { type: Date, default: Date.now },
  sets: [SetSchema],
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WorkoutSession', WorkoutSessionSchema);
