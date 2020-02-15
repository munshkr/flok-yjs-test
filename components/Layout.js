import Head from "next/head";
import React from "react";

export default ({ children }) => (
  <div>
    <Head>
      <title>flok-yjs-test</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" importance="low" />
    </Head>
    {children}
  </div>
);
