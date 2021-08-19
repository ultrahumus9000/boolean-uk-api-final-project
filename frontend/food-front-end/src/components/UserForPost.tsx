import React from "react";
import { User } from "../store";

type UserProps = {
  postUser: User;
};
function UserForPost({ postUser }: UserProps) {
  return (
    <div className="post-user">
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
