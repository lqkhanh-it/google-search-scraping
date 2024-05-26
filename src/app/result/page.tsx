"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import ResultTable from "../components/ResultTable";
import Header from "../components/Header";

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
        <div className="flex gap-4 mb-4">
          <p>Keyword History</p>
        </div>
        <ResultTable />
      </div>
    </div>
  );
}

export default App;
