"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import ImportCSV from "./components/ImportCSV";
import ResultTable from "./components/ResultTable";
import Header from "./components/Header";

function App() {
  const pathname = usePathname();

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      if (pathname !== "/auth/signin") {
        window.location.href = "/auth/signin";
        return null;
      }
    },
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-screen w-full">
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div>
          <h3 className="text-center text-xl">Import and Read CSV File</h3>
          <div className="mt-4 w-[70vw]">
            <ImportCSV />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
