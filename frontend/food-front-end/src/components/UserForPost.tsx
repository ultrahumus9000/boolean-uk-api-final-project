import React from "react";
import { useHistory } from "react-router-dom";
import { User } from "../store";

type UserProps = {
  postUser: User;
};
function UserForPost({ postUser }: UserProps) {
  const history = useHistory();
  return (
    <div
      className="post-user"
      onClick={() => {
        history.push(`/posts/${postUser?.id}`);
      }}
    >
      <img
        className="postuser-avatar"
        src={postUser?.avatar}
        alt="user avatar"
      ></img>
      <span className="postuser-name">{postUser?.username}</span>
    </div>
  );
}

export default UserForPost;
