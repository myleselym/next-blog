// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      try {
        if (session?.user?.email) {
          const sessionUser = await User.findOne({
            email: session.user.email,
          });

          if (sessionUser) {
            session.user.id = sessionUser._id.toString();
          }
        }

        return session;
      } catch (error) {
        console.log(error);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        if (!profile || !profile.email) {
          throw new Error("Profile is undefined or email is missing");
        }

        await connectToDB();
        // check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });
        // if not, create a new user
        if (!userExists) {
          await User.create({
            name: profile.name,
            email: profile.email,
            username: (profile.name || "unknown")
              .replace(" ", "")
              .toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
