import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/app/utils/dbConnect';
import User from '@/app/models/User';

export async function POST(req: Request) {
  const { username, email, password, bio, profilePicture, contactInfo, location } = await req.json();

  // Check if the user already exists
  await dbConnect();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    bio,
    profilePicture,
    contactInfo,
    location,
  });

  await newUser.save();

  return NextResponse.json({ message: 'Signup successful' });
}
