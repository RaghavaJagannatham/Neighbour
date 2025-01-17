

import { NextResponse } from 'next/server';
import dbConnect from '@/app/utils/dbConnect';
import Post from '@/app/models/Post';

export async function POST(req: Request) {
  try {
    // Parse the request body to get userId, username, and post data
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

    // Create a new post with received user details
    const newPost = new Post({
      title,
      description,
      image: image || null, // Optional image
      user: {
        id: userId,
        name: username,
      },
    });

    // Save the new post to the database
    await newPost.save();

    return NextResponse.json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}




// import { NextResponse } from 'next/server';
// import dbConnect from '@/app/utils/dbConnect';
// import Post from '@/app/models/Post';

// export async function GET(req) {
//   try {
//     const { filter, page = 1 } = req.nextUrl.searchParams; // Get filter and page from query params
//     const postsPerPage = 5;
//     const skip = (page - 1) * postsPerPage; // Skip previous posts

//     // Connect to the database
//     await dbConnect();

//     // Fetch posts with pagination
//     const posts = await Post.find({})
//       .skip(skip)
//       .limit(postsPerPage)
//       .sort({ createdAt: -1 }); // Sort by most recent posts

//     // Assuming you also want to fetch incidents, adjust as needed
//     const incidents = []; // Placeholder for incidents fetch, adjust this as per your logic

//     return NextResponse.json({
//       posts,
//       incidents,
//     });
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
//   }
// }



// import { NextResponse } from 'next/server';
// import dbConnect from '@/app/utils/dbConnect';
// import Post from '@/app/models/Post';

// export async function POST(req: Request) {
//   try {
//     await dbConnect(); // Ensure DB connection is established

//     const { title, description, image, userId, username } = await req.json();

//     // Validate required fields
//     if (!title || !description || !userId || !username) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     // Create a new post
//     const newPost = new Post({
//       title,
//       description,
//       image,
//       userId,
//       username,
//     });

//     const savedPost = await newPost.save(); // Save post to DB

//     return NextResponse.json({ success: true, post: savedPost });
//   } catch (error) {
//     console.error('Error saving post:', error);
//     return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
//   }
// }
