import React from "react";
import { useState } from "react";
import NewPostForm from "../components/NewPostForm";
import { User } from "../store";
type HeaderProp = {
  users: User[];
  savedInfo: User;
};

function Header({ users, savedInfo }: HeaderProp) {
  const [newPost, setNewPost] = useState(true);
  return (
    <header>
      <div className="profile">
        <img className="avatar" src={savedInfo?.avatar} alt="user avatar"></img>
        <h3 className="name">{savedInfo?.username}</h3>
        <div className="head-buttons">
          <button>Edit Profile</button>
          <button className="crimsion-color">Post New</button>
        </div>
      </div>

      {newPost && <NewPostForm />}
    </header>
  );
}

export default Header;
