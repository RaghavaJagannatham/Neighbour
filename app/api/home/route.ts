import { NextResponse } from 'next/server';
import dbConnect from '@/app/utils/dbConnect';
import Post from '@/app/models/Post';
import Incident from '@/app/models/Incident';

export async function GET(req: Request) {
  await dbConnect();

  const url = new URL(req.url);
  const filter = url.searchParams.get('filter') || 'for-you';

  let posts = [];
  let incidents = [];

  // Fetch data based on filter
  if (filter === 'for-you') {
    posts = await Post.find().limit(10);
    incidents = await Incident.find().limit(10);
  } else if (filter === 'trending') {
    posts = await Post.find().sort({ likes: -1 }).limit(10);
    incidents = await Incident.find().sort({ upvotes: -1 }).limit(10);
  } else if (filter === 'incidents') {
    incidents = await Incident.find().limit(20);
  }

  return NextResponse.json({ posts, incidents });
}
