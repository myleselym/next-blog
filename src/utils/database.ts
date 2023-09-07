import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "blog_posts",
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
