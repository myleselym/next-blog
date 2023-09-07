import "next-auth";
import { Schema, Document } from "mongoose";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      id: string;
    };
  }

  interface Profile {
    id: string;
    name: string;
    email: string;
    picture: string;
  }
}

export interface IPost {
  _id?: string;
  creator: IUser | string;
  author: string;
  tags: string[];
  post: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes?: number;
  dislikes?: number;
  likedBy?: string[]; // Array of user IDs who've liked the post
  dislikedBy?: string[]; // Array of user IDs who've disliked the post
}

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  username: string;
  image: string;
}
