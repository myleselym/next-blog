"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@/components/Profile";
import { IPost } from "../../../types";

const MyProfile = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      if (session) {
        const response = await fetch(`/api/users/${session.user.id}/posts`, {
          method: "GET",
        });
        const data: IPost[] = await response.json();
        setPosts(data);
      }
    };
    session && fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <Profile
      name={"Your"}
      desc="View and edit your posts on your personalized profile page."
      data={posts}
    />
  );
};

export default MyProfile;
