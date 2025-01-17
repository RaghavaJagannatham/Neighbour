// // app/utils/dbConnect.ts
// import mongoose from 'mongoose';

// const dbConnect = async () => {
//   const MONGODB_URI = 'mongodb+srv://raghavajagannatham9:raghava$9143@neighbourapp.prm58.mongodb.net/?retryWrites=true&w=majority&appName=neighbourapp'
//   if (mongoose.connection.readyState >= 1) {
//     return;
//   }

//   try {
//     await mongoose.connect(MONGODB_URI as string);
//     console.log('Database connected successfully');
//   } catch (error) {
//     console.error('Database connection error:', error);
//   }
// };

// export default dbConnect;

import mongoose from 'mongoose';

const dbConnect = async () => {
  const MONGODB_URI = 'mongodb+srv://raghavajagannatham9:raghava$9143@neighbourapp.prm58.mongodb.net/?retryWrites=true&w=majority&appName=neighbourapp'
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI as string);
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection error:', error);
  }
};

export default dbConnect;

