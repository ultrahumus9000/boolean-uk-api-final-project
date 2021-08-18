import "../styles/login.css";

import React from "react";
import "../styles/posts.css";
import Header from "../components/Header";
import Post from "../components/Post";
import useStore from "../store";
import { useEffect } from "react";

function Posts() {
  const comments = useStore((store) => store.comments);
  const posts = useStore((store) => store.posts);
  const fetchPosts = useStore((store) => store.fetchPosts);

  useEffect(() => {
    fetchPosts();
  }, [posts.length, comments.length]);
  console.log(posts);
  return (
    <main className="post_page">
      <Header />
      <section className="feed">
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </section>
    </main>
  );
}

export default Posts;
