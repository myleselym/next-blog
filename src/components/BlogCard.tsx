"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IPost, IUser } from "../../types";
import parse from "html-react-parser";
import AuthorSection from "./AuthorSection";
import PostTags from "./PostTags";
import AdminActions from "./AdminActions";
import VotingButtons from "./VotingButtons";

interface BlogCardProps {
  post: IPost;
  handleTagClick?: (tag: string) => void;
  handleDelete?: (tag: string) => void;
}

const BlogCard = ({ post, handleTagClick, handleDelete }: BlogCardProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const creator = post.creator as IUser;
  const [likes, setLikes] = useState<number | undefined>(post.likes);
  const [dislikes, setDislikes] = useState<number | undefined>(post.dislikes);
  const [hasLiked, setHasLiked] = useState<boolean>(
    post.likedBy?.includes(session?.user?.id || "") || false
  );
  const [hasDisliked, setHasDisliked] = useState<boolean>(
    post.dislikedBy?.includes(session?.user?.id || "") || false
  );

  const handleProfileClick = () => {
    if (creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${creator._id}?name=${post.author}`);
  };

  const editPost = async (postData: IPost) => {
    router.push(`/update-post/?id=${postData._id}`);
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`/api/blog-post/${post._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Successfully removed post!");
        if (handleDelete) handleDelete(post._id || "");
      } else {
        console.log("Failed to remove post!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVote = async (action: "like" | "dislike") => {
    if (!session?.user?.id) {
      console.error("User ID is undefined");
      return;
    }
    try {
      const response = await fetch(`/api/blog-post/${post._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: action,
          userId: session.user.id, // Using non-null assertion
        }),
      });
      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error("Network error: " + errorMsg);
      }
      const updatedPost: IPost = await response.json();
      setLikes(updatedPost.likes);
      setDislikes(updatedPost.dislikes);
      setHasLiked(updatedPost.likedBy?.includes(session.user.id) || false);
      setHasDisliked(
        updatedPost.dislikedBy?.includes(session.user.id) || false
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setHasLiked(post.likedBy?.includes(session?.user?.id || "") || false);
    setHasDisliked(post.dislikedBy?.includes(session?.user?.id || "") || false);
  }, [session, post]);

  return (
    <section
      id="blog-card"
      className="text-left w-[70dvw] flex flex-col bg-white/50 
                border border-blue-950 rounded-md p-4 m-4 shadow-2xl"
    >
      <div
        id="post-details"
        className="mb-4 flex justify-evenly max-lg:items-center max-lg:flex-col"
      >
        <p className="text-sm">
          Published:
          {post.createdAt && new Date(post.createdAt).toLocaleString()}
        </p>
        <AuthorSection
          author={post.author}
          email={creator.email}
          image={creator.image}
          onClick={handleProfileClick}
        />
        {post.updatedAt &&
        post.updatedAt?.toLocaleString() !==
          post.createdAt?.toLocaleString() ? (
          <p className="text-sm">
            Updated: {new Date(post.updatedAt).toLocaleString()}
          </p>
        ) : (
          <div className="w-52"></div>
        )}
      </div>
      <div className="mb-4 post-content grid gap-2 relative flex-wrap">
        {parse(post.post)}
      </div>
      <PostTags
        tags={post.tags}
        onTagClick={(tag) => handleTagClick && handleTagClick(tag)}
      />
      {session?.user.id === creator._id ? (
        <AdminActions onEdit={() => editPost(post)} onDelete={deletePost} />
      ) : (
        <VotingButtons
          hasLiked={hasLiked}
          hasDisliked={hasDisliked}
          likes={likes}
          dislikes={dislikes}
          onVote={handleVote}
        />
      )}
    </section>
  );
};

export default BlogCard;
