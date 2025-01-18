// /app/api/profile/[id]/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/app/utils/dbConnect';
import User from '@/app/models/User';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    console.log('Connecting to the database...');
    await dbConnect(); // Ensure DB is connected

    const user = await User.findById(id).select('-password'); // Exclude password
    if (!user) {
      console.error('User not found for ID:', id);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User found:', user);
    res.status(200).json(user); // Return user data
  } catch (error) {
    console.error('Error while fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}
