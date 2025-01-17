import { NextResponse } from 'next/server';
import dbConnect from '@/app/utils/dbConnect';
import Post from '@/app/models/Post';

export async function POST(req, { params }) {
  try {
    const { id } = params; // Post ID from URL
    const { text } = await req.json(); // New comment text

    // Connect to the database
    await dbConnect();

    // Find the post and add a new comment
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const newComment = {
      text,
      createdAt: new Date(),
    };
    post.comments.push(newComment);
    await post.save();

    return NextResponse.json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}
