"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      if (pathname !== "/auth/login") {
        window.location.href = "/auth/login";
        return null;
      }
    },
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>{children}</>
  );
}
