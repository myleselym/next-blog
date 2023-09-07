"use client";

import React, { FC, useEffect, useState } from "react";
import { IPost } from "../../types";
import BlogCard from "./BlogCard";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { MdFilterList, MdSort } from "react-icons/md";
import SearchInput from "./SearchInput";

interface BlogCardListProps {
  data: IPost[];
  allTags: string[];
  handleTagClick: (tagName: string) => void;
  handleDelete: (tagName: string) => void;
}

const BlogCardList: FC<BlogCardListProps> = ({
  data,
  allTags,
  handleTagClick,
  handleDelete,
}) => {
  const [posts, setPosts] = useState(data);
  const [sortType, setSortType] = useState("createdAt");
  const [sortOrderReverse, setSortOrderReverse] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  const getValue = (post: IPost, type: string) => {
    switch (type) {
      case "author":
        return post.author;
      case "createdAt":
      case "updatedAt":
        return new Date(post[type] || "").getTime();
      case "likes":
        return post.likes || 0; // Return likes count or 0 if undefined
      case "dislikes":
        return post.dislikes || 0; // Return dislikes count or 0 if undefined
      default:
        return post.author;
    }
  };

  useEffect(() => {
    const sortedData = [...data].sort((a: IPost, b: IPost) => {
      const valueA = getValue(a, sortType);
      const valueB = getValue(b, sortType);

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrderReverse
          ? valueB.localeCompare(valueA)
          : valueA.localeCompare(valueB);
      }

      // Ensure both are numbers before doing arithmetic operations
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrderReverse ? valueA - valueB : valueB - valueA;
      }

      return 0; // Default return in case neither condition is met (unlikely)
    });

    setPosts(sortedData);
  }, [data, sortType, sortOrderReverse]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition > lastScrollPosition) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);
  return (
    <section id="sort-posts" className="grid items-center ">
      <div
        id="search-field"
        className={`p-2 w-full sticky bg_img ${
          scrollDirection === "up" ? "scrolling-up" : ""
        } z-20 flex max-lg:flex-col justify-center items-center gap-4`}
      >
        <SearchInput allTags={allTags} handleTagClick={handleTagClick} />
        <div className="flex lg:absolute lg:top-1.5 lg:right-4 gap-2">
          <Popover className="" placement="bottom">
            <PopoverTrigger>
              <Button className="bg-white" variant="bordered">
                <MdFilterList />
                Sort By
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <RadioGroup
                value={sortType}
                onChange={(event) => setSortType(event.target.value)}
              >
                <Radio value="author">Author</Radio>
                <Radio value="createdAt">Created At</Radio>
                <Radio value="updatedAt">Updated At</Radio>
                <Radio value="likes">Likes</Radio>
                <Radio value="dislikes">Dislikes</Radio>
              </RadioGroup>
            </PopoverContent>
          </Popover>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button className="bg-white" variant="bordered">
                <MdSort />
                Order
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <RadioGroup
                value={sortOrderReverse ? "reverse" : "normal"}
                onChange={(event) =>
                  setSortOrderReverse(event.target.value === "reverse")
                }
              >
                <Radio value="normal">A-Z / Most Recent</Radio>
                <Radio value="reverse">Z-A / Oldest</Radio>
              </RadioGroup>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <BlogCard
            handleDelete={handleDelete}
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </section>
  );
};

export default BlogCardList;
