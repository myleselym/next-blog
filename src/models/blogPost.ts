import { Schema, model, models } from "mongoose";

const BlogPostSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    post: {
      type: String,
      required: [true, "Post is required"],
    },
    tags: {
      type: Array<String>,
    },
    likes: {
      type: Number,
    },
    dislikes: {
      type: Number,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const BlogPost = models.BlogPost || model("BlogPost", BlogPostSchema);

export default BlogPost;
