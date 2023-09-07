"use client";

import { createContext, Dispatch, SetStateAction } from "react";

interface SearchTextContextProps {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

// Provide a default value to the context
export const SearchText = createContext<SearchTextContextProps>({
  searchText: "",
  setSearchText: () => {},
});
