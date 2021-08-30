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
  const display = useStore((store) => store.display);
  const search = useStore((store) => store.search);

  useEffect(() => {
    fetchUsers();
    fetchPosts();
    fetchTags();
  }, [posts.length, tagLength, search]);

  const data = localStorage.getItem("userInfo");
  const savedInfo = JSON.parse(data === null ? "" : data);

  let filteredPosts = posts;
  if (search !== "") {
    // can search username/post content/address
    //tags are special, need know postToTag Id etc,which require backend coperation therefor we ignore for now
    const targetUser = users.find((user) =>
      user?.username.toLowerCase().includes(search.toLowerCase())
    );

    if (targetUser) {
      filteredPosts = posts.filter((post) => post.userId === targetUser.id);
    } else {
      filteredPosts = posts.filter((post) =>
        post.text_content.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  return (
    <>
      <Headline />
      {tags === undefined ? (
        <h1>we are loading for you!!!</h1>
      ) : (
        <main className="post_page">
          <Header users={users} savedInfo={savedInfo} />

          <section className={`${display ? "feed" : "feed-mason"}`}>
            {filteredPosts.map((post) => {
              return (
                <Post key={post.id} post={post} users={users} tags={tags} />
              );
            })}
          </section>
        </main>
      )}
    </>
  );
}

export default Posts;
