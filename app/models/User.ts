// app/models/User.ts

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  profilePicture: { type: String },
  contactInfo: { type: String },
  location: { type: String }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
