"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useContext, useState } from "react";
import { SearchText } from "@/context/SearchTextContext";
interface ProviderProps {
  children?: ReactNode;
  session?: Session;
}
const Provider: React.FC<ProviderProps> = ({ children, session }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <SessionProvider session={session}>
      <SearchText.Provider value={{ searchText, setSearchText }}>
        {children}
      </SearchText.Provider>
    </SessionProvider>
  );
};

export default Provider;
