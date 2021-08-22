import React, { SyntheticEvent } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Headline from "../components/Headline";
import Post from "../components/Post";
import useStore from "../store";
import "../styles/posts.css";

type UserObj = {
  userId: string;
};

export default function OtherUserPage() {
  const userObj: UserObj = useParams();
  let userId = Number(userObj.userId);
  const users = useStore((store) => store.users);
  const tags = useStore((store) => store.tags);
  const userPosts = useStore((store) => store.userPosts);
  const fetchPostsByUserId = useStore((store) => store.fectchPostByUserId);

  useEffect(() => {
    fetchPostsByUserId(userId);
  }, [userPosts.length]);

  const currentPostUser = users.find((user) => user?.id === userId);

  return (
    <>
      <Headline />
      <section className="other-profile-page">
        <h2>{currentPostUser?.username}</h2>
        <div className="feed">
          {userPosts.map((post) => {
            return <Post post={post} users={users} tags={tags} />;
          })}
        </div>
      </section>
    </>
  );
}
