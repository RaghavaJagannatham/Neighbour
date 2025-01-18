// app/api/profile/[id]/route.ts

import { NextResponse } from 'next/server';
import User from '@/app/models/User'; // Assuming User model is in models/User.ts

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await User.findById(params.id).select('username email bio profilePicture contactInfo location');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Format user data as needed for frontend
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio || 'No bio available',
      profilePicture: user.profilePicture || '/default-profile.png',
      contactInfo: user.contactInfo || 'Not provided',
      location: user.location || 'Location not specified',
    };

    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching user data' }, { status: 500 });
  }
}
