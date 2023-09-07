import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import NavBar from "../components/NavBar";
import Provider from "../components/Provider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Blog",
  description: "A blog developed with next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="flex flex-col" lang="en">
      <body
        className={`${inter.className} min-h-[100vh] flex flex-col text-blue-950`}
      >
        <Provider>
          <NavBar />
          <Providers>{children}</Providers>
        </Provider>
        <Footer />
      </body>
    </html>
  );
}
