"use client";

import React, { useState, useEffect, useContext, FC } from "react";
import { IPost } from "../../types";
import { SearchText } from "@/context/SearchTextContext";
import BlogCardList from "./BlogCardList";
import LoadSpinner from "./LoadSpinner";
import SearchInput from "./SearchInput";

const Feed: FC = () => {
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [searchedResults, setSearchedResults] = useState<IPost[]>([]);
  const { searchText, setSearchText } = useContext(SearchText);

  const fetchPosts = async () => {
    const response = await fetch("/api/blog-post");
    const data = await response.json();

    setAllPosts(data);

    // Extract all unique tags
    const tags: any = [
      ...new Set(data.flatMap((post: IPost) => post.tags)),
    ].sort();
    setAllTags(tags);

    setLoading(false);
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
    const searchResult = filterPosts(tagName);
    setSearchedResults(searchResult);
  };

  const handleDelete = (postId: string) => {
    setAllPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  const filterPosts = (searchText: string) => {
    const regex = new RegExp(searchText, "i");
    return allPosts.filter(
      (item) =>
        (typeof item.creator === "string"
          ? regex.test(item.creator)
          : regex.test(item.creator.username) ||
            regex.test(item.creator.email)) ||
        regex.test(item.tags.join(" ")) ||
        regex.test(item.post)
    );
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (allPosts.length) {
      const searchResult = filterPosts(searchText);
      setSearchedResults(searchResult);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, allPosts]);

  return (
    <section className="grid items-center justify-center">
      {loading ? (
        <LoadSpinner />
      ) : (
        <>
          {searchText ? (
            <BlogCardList
              handleDelete={handleDelete}
              data={searchedResults}
              allTags={allTags}
              handleTagClick={handleTagClick}
            />
          ) : (
            <BlogCardList
              handleDelete={handleDelete}
              data={allPosts}
              allTags={allTags}
              handleTagClick={handleTagClick}
            />
          )}
        </>
      )}
    </section>
  );
};

export default Feed;
