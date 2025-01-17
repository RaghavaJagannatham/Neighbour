import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  const token = jwt.sign({ id: newUser._id },JWT_SECRET as string, { expiresIn: '1d' });

  return NextResponse.json({ token });
}
