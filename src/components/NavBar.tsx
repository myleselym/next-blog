"use client";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useState, useEffect, useContext } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SearchText } from "@/context/SearchTextContext";
import SearchInput from "./SearchInput";

interface Provider {
  name: string;
  id: string;
}

export default function App() {
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null
  );
  const { searchText, setSearchText } = useContext(SearchText);

  const handleNavigation = (path: string) => {
    searchText !== "" && setSearchText("");
    router.push(path);
  };

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  return (
    <Navbar id="navbar" isBlurred={false} shouldHideOnScroll maxWidth="2xl">
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold text-xl px-2 text-transparent bg-clip-text bg-gradient-to-r to-amber-600 from-violet-700">
            NEXT BLOG
          </p>
          <Image src="/favicon.ico" alt="Favicon" width="20" height="20" />
        </Link>
      </NavbarBrand>
      {session?.user && (
        <NavbarContent
          className="max-sm:hidden flex gap-6 font-bold"
          justify="center"
        >
          <NavbarItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/");
            }}
          >
            Feed
          </NavbarItem>
          <NavbarItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/profile");
            }}
          >
            Profile
          </NavbarItem>
          <NavbarItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/compose");
            }}
          >
            Compose
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        {session?.user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={session.user.name}
                size="sm"
                src={session.user.image}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session.user.name}</p>
              </DropdownItem>

              <DropdownItem
                key="user-profile"
                onClick={() => handleNavigation("/profile")}
              >
                My Profile
              </DropdownItem>

              <DropdownItem
                key="compose"
                onClick={() => handleNavigation("/compose")}
              >
                Compose
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  onClick={() =>
                    signIn(provider.id, { callbackUrl: "/profile" })
                  }
                  color="primary"
                  variant="bordered"
                >
                  Sign In
                </Button>
              ))}
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
