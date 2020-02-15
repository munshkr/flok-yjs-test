import React from "react";

import Layout from "../components/Layout";
import TextBuffer from "../components/TextBuffer";

const Index = ({ host, username }) => (
  <Layout>
    <TextBuffer host={host} username={username} />
    <style jsx global>{`
      html,
      body {
        margin: 0;
        padding: 0;
      }
    `}</style>
  </Layout>
);

Index.getInitialProps = ({ req, query }) => {
  const host = req && req.headers && req.headers.host;
  return { host, username: query.username };
};

export default Index;
