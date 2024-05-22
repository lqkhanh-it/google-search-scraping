"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

function Home({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps?.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default Home;
