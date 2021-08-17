import "../styles/login.css";

import React from "react";
import "../styles/posts.css";
import Header from "../components/Header";

function Posts() {
  return (
    <main className="post_page">
      <Header />
      <section className="feed">
        <article className="post"></article>
      </section>
    </main>
  );
}

export default Posts;
