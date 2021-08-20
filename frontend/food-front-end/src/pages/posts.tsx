import "../styles/posts.css";

import React, { useState } from "react";
import "../styles/posts.css";
import Header from "../components/Header";
import Post from "../components/Post";
import useStore from "../store";
import { useEffect } from "react";
import Headline from "../components/Headline";

function Posts() {
  const posts = useStore((store) => store.posts);
  const users = useStore((store) => store.users);
  const fetchUsers = useStore((store) => store.fetchUsers);
  const fetchPosts = useStore((store) => store.fetchPosts);
  const tags = useStore((store) => store.tags);
  const tagLength = useStore((store) => store.tagLength);
  const fetchTags = useStore((store) => store.fetchTags);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchPosts();
    fetchTags();
  }, [posts.length]);

  useEffect(() => {
    fetchTags();
  }, [tagLength]);

  console.log("tagLength", tagLength);

  const data = localStorage.getItem("userInfo");
  const savedInfo = JSON.parse(data === null ? "" : data);

  function handleDisplay() {
    setDisplay(!display);
  }

  // console.log("tagLength", tagLength);
  return (
    <>
      <Headline />
      <main className="post_page">
        <Header users={users} savedInfo={savedInfo} />

        <section className={`${display ? "feed" : "feed-mason"}`}>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                post={post}
                users={users}
                display={display}
                handleDisplay={handleDisplay}
                tags={tags}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}

export default Posts;
