require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const MuscleGroup = require('../models/MuscleGroup');
const Exercise = require('../models/Exercise');

const groups = [
  { name: 'Chest', slug: 'chest' },
  { name: 'Back', slug: 'back' },
  { name: 'Shoulders', slug: 'shoulders' },
  { name: 'Biceps', slug: 'biceps' },
  { name: 'Triceps', slug: 'triceps' },
  { name: 'Legs', slug: 'legs' },
  { name: 'Core', slug: 'core' },
  { name: 'Cardio', slug: 'cardio' }
];

const exercises = {
  chest: ['Bench Press', 'Incline Bench Press', 'Dumbbell Fly', 'Chest Press Machine'],
  back: ['Pull Up', 'Bent Over Row', 'Lat Pulldown', 'Seated Cable Row'],
  shoulders: ['Overhead Press', 'Lateral Raise', 'Rear Delt Fly'],
  biceps: ['Barbell Curl', 'Dumbbell Curl', 'Hammer Curl', 'Preacher Curl'],
  triceps: ['Tricep Pushdown', 'Skullcrusher', 'Overhead Extension', 'Close Grip Bench'],
  legs: ['Squat', 'Leg Press', 'Romanian Deadlift', 'Leg Extension'],
  core: ['Plank', 'Hanging Leg Raise', 'Russian Twist'],
  cardio: ['Treadmill', 'Rowing', 'Bike']
};

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected');
  await Promise.all(Object.keys(exercises).map(async (slug) => {
    let mg = await MuscleGroup.findOne({ slug });
    if (!mg) mg = await MuscleGroup.create(groups.find(g => g.slug === slug));
    const exList = exercises[slug];
    for (const name of exList) {
      const exists = await Exercise.findOne({ name, muscle: mg._id });
      if (!exists) await Exercise.create({ name, muscle: mg._id });
    }
  }));

  // create sample user
  const testEmail = 'test@example.com';
  let user = await User.findOne({ email: testEmail });
  if (!user) {
    user = new User({ email: testEmail, password: 'password123', name: 'Test User' });
    await user.save();
    console.log('Created test user', testEmail, 'password: password123');
  } else {
    console.log('Test user exists');
  }

  console.log('Seeding complete');
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
