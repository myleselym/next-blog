"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import TextArea from "./TextArea";
import { IPost } from "../../types";

interface INewPost {
  creator: string;
  author: string;
  post: string;
  tags: string[];
}

type Props = {
  type: string;
  postData: IPost;
  setPostData: (value: IPost) => void;
  submitting: boolean;
  handleSubmit: (e: FormEvent) => Promise<void>;
};

const Form = ({
  type,
  postData,
  setPostData,
  submitting,
  handleSubmit,
}: Props) => {
  return (
    <section className="flex flex-col w-full max-w-full items-center">
      <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text p-4 bg-gradient-to-r to-amber-600 from-violet-700">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="text-lg text-center text-transparent bg-clip-text bg-gradient-to-r to-amber-600 from-violet-700">
        {type} and share your amazing posts with the world.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 glassmorphism p-8"
      >
        <TextArea
          post={postData.post}
          updateForm={(postString) =>
            setPostData({ ...postData, post: postString })
          }
        />
        <label className="font-bold" htmlFor="author">
          Author
        </label>
        <input
          type="text"
          value={postData.author}
          onChange={(e) => {
            setPostData({ ...postData, author: e.target.value });
          }}
          className="border border-blue-950 p-1 rounded-md"
          name="author"
          id="author"
        />
        <label htmlFor="tags">
          <p className="text-base font-semibold font-satoshi text-grey-700">
            Tag {` `}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </p>
        </label>
        <input
          type="text"
          id="tags"
          className="border border-blue-950 p-1.5 rounded-md"
          value={postData.tags.join(" ")}
          onChange={(e) => {
            let tags = e.target.value
              .split(/[\s,]+/)
              .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));
            if (e.target.value.endsWith(" ")) {
              tags[tags.length - 1] = tags[tags.length - 1].substring(1);
            }
            setPostData({ ...postData, tags });
          }}
          placeholder="#tag"
        />
        <div className="gap-8 mx-3 mt-8 flex justify-center">
          <Link
            href="/"
            className="px-5 py-1.5 text-sm border border-blue-950 rounded-full "
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm border border-blue-950 rounded-full"
          >
            {submitting ? "Submitting..." : type === "Edit" ? "Update" : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
