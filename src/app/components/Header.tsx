"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Header = () => {
  const { data } = useSession();

  return (
    <div>
      {data?.user && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex gap-4">
            <p
              className="cursor-pointer hover:underline"
              onClick={() => (window.location.href = "/")}
            >
              Home
            </p>
            <p
              className="cursor-pointer hover:underline"
              onClick={() => (window.location.href = "/result")}
            >
              Result
            </p>
          </div>
          <div className="flex gap-4">
            <p>Hi there {data.user.email}</p>
            <p
              className="cursor-pointer hover:underline"
              onClick={() => signOut()}
            >
              Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
