"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";

interface UserProfileProps {
  params: { id: string };
}

const UserProfile: React.FC<UserProfileProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };
    if (params?.id) fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);
  return (
    <Profile
      name={userName + "'s" || "User"}
      desc={`Welcome to ${
        userName ? userName + "'s" : "User's"
      } personalized profile page.`}
      data={userPosts}
    />
  );
};

export default UserProfile;
