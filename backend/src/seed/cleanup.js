require('dotenv').config();
const mongoose = require('mongoose');
const MuscleGroup = require('../models/MuscleGroup');
const Exercise = require('../models/Exercise');

async function cleanup() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to database');
  
  // Find and delete the Arms muscle group
  const arms = await MuscleGroup.findOne({ slug: 'arms' });
  if (arms) {
    console.log('Found Arms muscle group:', arms.name);
    // Delete exercises associated with Arms
    const deletedExercises = await Exercise.deleteMany({ muscle: arms._id });
    console.log('Deleted', deletedExercises.deletedCount, 'exercises for Arms');
    // Delete the Arms muscle group
    await MuscleGroup.deleteOne({ _id: arms._id });
    console.log('✅ Deleted Arms muscle group');
  } else {
    console.log('✅ No Arms muscle group found');
  }
  
  // List all muscle groups
  const allGroups = await MuscleGroup.find({});
  console.log('\nCurrent muscle groups:', allGroups.map(g => g.name).join(', '));
  
  await mongoose.connection.close();
  console.log('\nCleanup complete!');
}

cleanup().catch(console.error);
