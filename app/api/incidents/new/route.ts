import { NextResponse } from 'next/server';
import dbConnect from '@/app/utils/dbConnect';
import Incident from '@/app/models/Incident';

export async function POST(req: Request) {
  try {
    // Parse the request body to get userId, username, and incident data
    const { userId, username, title, description, image } = await req.json();

    // Log the received details
    console.log('Received userId:', userId);
    console.log('Received username:', username);

    if (!userId || !username) {
      return NextResponse.json({ error: 'User ID and username are required.' }, { status: 400 });
    }

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Create a new incident with received user details
    const newIncident = new Incident({
      title,
      description,
      image: image || null, // Optional image
      user: {
        id: userId,
        name: username,
      },
      status: 'Raised', // Default status for new incidents
    });

    // Save the new incident to the database
    await newIncident.save();

    return NextResponse.json({ message: 'Incident created successfully', incident: newIncident });
  } catch (error) {
    console.error('Error creating incident:', error);
    return NextResponse.json({ error: 'Failed to create incident' }, { status: 500 });
  }
}
