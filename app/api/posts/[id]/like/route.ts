import { NextResponse } from 'next/server';
import dbConnect from '@/app/utils/dbConnect';
import Post from '@/app/models/Post';

export async function POST(req, { params }) {
  try {
    const { id } = params; // Post ID from URL
    const { likes } = await req.json(); // Updated like count

    // Connect to the database
    await dbConnect();

    // Find the post by ID and update the like count
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    post.likes = likes;
    await post.save();

    return NextResponse.json({ message: 'Likes updated successfully', post });
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
  }
}
