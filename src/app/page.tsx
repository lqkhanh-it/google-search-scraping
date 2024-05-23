"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import ImportCSV from "./components/ImportCSV";

function App() {
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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-center text-xl">Import and Read CSV File</h1>

      <div className="mt-4 w-[70vw]">
        <ImportCSV />
      </div>
    </div>
  );
}

export default App;
