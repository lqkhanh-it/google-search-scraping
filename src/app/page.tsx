"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import ImportCSV from "./components/ImportCSV";
import ResultTable from "./components/ResultTable";

function App() {
  const pathname = usePathname();

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      if (pathname !== "/auth/login") {
        window.location.href = "/auth/login";
        return null;
      }
    },
  });

  console.log(status, data);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-2xl mb-4">
        <h2>Hi there: {data?.user?.email}</h2>
      </div>
      <div>
        <h3 className="text-center text-xl">Import and Read CSV File</h3>

        <div className="mt-4 w-[70vw]">
          <ImportCSV />
        </div>
      </div>
      <div>
        <ResultTable />
      </div>
    </div>
  );
}

export default App;
