import { connectToDB } from "@/utils/database";
import BlogPost from "@/models/blogPost";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  // Await POST request with new post data.
  const postData = await req.json();
  // Initialize likes and dislikes to 0,
  // and likeBy and dislikedBy empty arrays for the new post.
  postData.likes = 0;
  postData.dislikes = 0;
  postData.likedBy = [];
  postData.dislikedBy = [];
  // Create a new blog post object from BlogPost model.
  const newBlogPost = new BlogPost(postData);
  // Try to connect and save post to the database.
  // If error, log and send response with error code.
  try {
    //Connect
    await connectToDB();
    //Save Post
    await newBlogPost.save();

    return NextResponse.json({ message: postData });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
}
