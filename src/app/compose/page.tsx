"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "../../components/Form";
import { IPost } from "../../../types";

const Compose = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPost>({
    creator: "",
    author: "",
    post: "",
    tags: [],
  });

  const router = useRouter();
  const { data: session } = useSession();

  const createPost = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/blog-post/new", {
        method: "POST",
        body: JSON.stringify(post),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    session &&
      setPost((post) => ({
        ...post,
        creator: session.user.id,
        author: session.user.name,
      }));
  }, [session]);
  return (
    <Form
      type="Create"
      postData={post}
      setPostData={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default Compose;
