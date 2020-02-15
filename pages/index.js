import React from "react";
import Head from "next/head";
import TextBuffer from "../components/TextBuffer";

const Home = () => (
  <div>
    <Head>
      <title>flok-yjs-test</title>
      <link rel="icon" href="/favicon.ico" importance="low" />
    </Head>
    <div>
      <TextBuffer />
    </div>
    <style jsx global>{`
      html,
      body {
        margin: 0;
        padding: 0;
      }
    `}</style>
  </div>
);

export default Home;
