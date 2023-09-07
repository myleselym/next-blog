import { connectToDB } from "@/utils/database";
import BlogPost from "@/models/blogPost";

export const GET = async (req: Request) => {
  try {
    await connectToDB();

    const prompts = await BlogPost.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
