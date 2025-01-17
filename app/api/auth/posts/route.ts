import { NextResponse } from "next/server";
import connectDb from "@/utils/db";
import Post from "@/utils/postModel";

export async function POST(req: Request) {
  try {
    await connectDb();

    const { title, content, image } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const newPost = await Post.create({
      title,
      content,
      image,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
