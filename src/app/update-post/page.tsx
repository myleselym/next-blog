"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "../../components/Form";
import { IPost } from "../../../types";

const EditPost = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPost>({
    creator: "",
    author: "",
    post: "",
    tags: [],
  });
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const router = useRouter();

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/blog-post/${postId}`);
      const data = await response.json();
      setPost(data);
    };
    if (postId) getPostDetails();
  }, [postId]);

  const updatePost = async (e: FormEvent) => {
    e.preventDefault();
    if (!postId) return alert("Post ID not found");
    try {
      setSubmitting(true);
      const response = await fetch(`/api/blog-post/${postId}`, {
        method: "PATCH",
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

  return (
    <Form
      type="Edit"
      postData={post}
      submitting={submitting}
      setPostData={(value: IPost) => setPost(value)}
      handleSubmit={(e: FormEvent) => updatePost(e)}
    />
  );
};

export default EditPost;
