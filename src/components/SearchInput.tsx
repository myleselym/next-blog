"use client";

import { SearchText } from "@/context/SearchTextContext";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
interface SearchInputProps {
  allTags: string[];
  handleTagClick: (tagName: string) => void;
}
const SearchInput: FC<SearchInputProps> = ({ allTags, handleTagClick }) => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const { searchText, setSearchText } = useContext(SearchText);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div
        id="mobile-search"
        className="flex flex-col justify-center items-center mx-auto relative"
      >
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          onFocus={() => setInputFocused && setInputFocused(true)}
          onBlur={() =>
            setInputFocused &&
            setTimeout(() => {
              setInputFocused(false);
            }, 150)
          }
          className="p-1 w-[15.2rem] bg-white h-9 border-2 border-gray-300 rounded-md"
        />
        <div
          className={`
                    absolute top-10 w-[15.1rem] p-2 my-2 max-h-40 bg-white rounded-md
                    outline outline-blue-950  flex flex-col gap-2 overflow-y-auto 
                    ${
                      inputFocused ? "opacity-100 z-20" : "opacity-0 -z-20"
                    } transition-opacity duration-1000
                  `}
        >
          {allTags
            .filter((tag) => searchText === "" || tag.includes(searchText))
            .map((tag) => (
              <p
                key={tag}
                className="tag cursor-pointer hover:text-blue-400 active:text-blue-800 transition-all duration-300 ease-in transform hover:scale-105"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </p>
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchInput;
