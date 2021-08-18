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
  const users = useStore((store) => store.users);
  const fetchUsers = useStore((store) => store.fetchUsers);
  const fetchPosts = useStore((store) => store.fetchPosts);

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, [posts.length, comments.length]);

  console.log(posts);
  return (
    <main className="post_page">
      <Header users={users} />
      <section className="feed">
        {posts.map((post) => {
          return <Post key={post.id} post={post} users={users} />;
        })}
      </section>
    </main>
  );
}

export default Posts;
