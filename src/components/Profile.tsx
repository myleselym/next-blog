"use client";
import { useContext, useEffect, useState } from "react";
import { IPost } from "../../types";
import BlogCard from "./BlogCard";
import LoadSpinner from "./LoadSpinner";
import { SearchText } from "@/context/SearchTextContext";
import { useRouter } from "next/navigation";

interface ProfileProps {
  name: string;
  desc: string;
  data: IPost[];
}

const Profile: React.FC<ProfileProps> = ({ name, desc, data }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const { setSearchText } = useContext(SearchText);
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
    router.push("/");
  };

  const handleDelete = (postId: string) => {
    setPosts(
      (prevPosts) =>
        prevPosts && prevPosts.filter((post) => post._id !== postId)
    );
  };

  useEffect(() => {
    if (data) {
      setPosts(data);
      setTimeout(() => setLoading(false), 2000);
    }
  }, [data]);

  return (
    <section className="text-center w-full">
      <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text p-4 bg-gradient-to-r to-amber-600 from-violet-700">
        <span>{name} Profile</span>
      </h1>
      <p className="text-lg text-transparent bg-gradient-to-r from-violet-700 to-amber-500 bg-clip-text">
        {desc}
      </p>
      <div className="mt-10 grid justify-center items-center gap-8">
        {loading ? (
          <LoadSpinner />
        ) : posts && posts.length ? (
          posts.map((post) => (
            <BlogCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="">You have not published any posts.</p>
        )}
      </div>
    </section>
  );
};

export default Profile;
