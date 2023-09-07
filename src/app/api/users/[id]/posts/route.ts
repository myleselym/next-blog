import { connectToDB } from "@/utils/database";
import BlogPost from "@/models/blogPost";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const posts = await BlogPost.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
};
