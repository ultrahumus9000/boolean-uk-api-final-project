import React from "react";
import { User } from "../store";
import "../styles/postuser.css";
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
      <h3 className="postuser-name">{postUser?.username}</h3>
    </div>
  );
}

export default UserForPost;
