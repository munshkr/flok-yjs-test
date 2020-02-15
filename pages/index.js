import React from "react";

import Layout from "../components/Layout";
import TextBuffer from "../components/TextBuffer";

const Index = () => (
  <Layout>
    <TextBuffer />
    <style jsx global>{`
      html,
      body {
        margin: 0;
        padding: 0;
      }
    `}</style>
  </Layout>
);

export default Index;
