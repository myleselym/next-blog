import { connectToDB } from "@/utils/database";
import BlogPost from "@/models/blogPost";

//GET
export const GET = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const post = await BlogPost.findById(id).populate("creator");

    if (!post)
      return new Response(JSON.stringify({ message: "Post Not Found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    error instanceof Error &&
      console.error(`Error fetching post: ${error.message}`);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

//PATCH
const handleVoting = (existingPost: any, action: string, userId: string) => {
  if (action === "like") {
    if (!existingPost.likedBy.includes(userId)) {
      existingPost.likedBy.addToSet(userId);
      existingPost.likes += 1;
    }
    if (existingPost.dislikedBy.includes(userId)) {
      existingPost.dislikes -= 1;
      existingPost.dislikedBy.pull(userId);
    }
  } else if (action === "dislike") {
    if (!existingPost.dislikedBy.includes(userId)) {
      existingPost.dislikedBy.addToSet(userId);
      existingPost.dislikes += 1;
    }
    if (existingPost.likedBy.includes(userId)) {
      existingPost.likes -= 1;
      existingPost.likedBy.pull(userId);
    }
  }
};

const handlePostEdit = (
  existingPost: any,
  post: string,
  tags: string[],
  author: string
) => {
  existingPost.post = post || existingPost.post;
  existingPost.tags = tags || existingPost.tags;
  existingPost.author = author || existingPost.author;
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const requestData = await req.json();
  const { action, userId, post, tags, author } = requestData;

  try {
    await connectToDB();

    let existingPost: any = await BlogPost.findById(params.id);
    // Check if the post is already in the database
    if (!existingPost) {
      return new Response("Post not found", { status: 404 });
    }
    // Check if the PATCH is receiving an action or post data.
    if (action === "like" || action === "dislike") {
      handleVoting(existingPost, action, userId);
    } else if (post || tags || author) {
      handlePostEdit(existingPost, post, tags, author);
    } else {
      return new Response("Invalid request data", { status: 400 });
    }
    // Save updates to database.
    try {
      await existingPost.save();
      return new Response(JSON.stringify(existingPost), { status: 200 });
    } catch (error) {
      console.error("Error saving post:", error);
      return new Response("Error saving post", { status: 500 });
    }
  } catch (error) {
    return new Response("Error Updating Post", { status: 500 });
  }
};

//DELETE
export const DELETE = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    await BlogPost.findByIdAndRemove(id);

    return new Response(
      JSON.stringify({ message: "Post deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    error instanceof Error &&
      console.error(`Error deleting post: ${error.message}`);
    return new Response(JSON.stringify({ message: "Error deleting post" }), {
      status: 500,
    });
  }
};
