import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "../providers/nextAuthProvider";
import ReactQueryProvider from "../providers/reactQueryProvider";
import { serverAuth } from "../libs/serverAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Google Search Scraping",
  description: "Google Search Scraping",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
