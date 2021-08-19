import React from "react";
import { useState } from "react";
import NewPostForm from "../components/NewPostForm";
import useStore, { User } from "../store";
type HeaderProp = {
  users: User[];
  savedInfo: User;
};

function Header({ users, savedInfo }: HeaderProp) {
  // const activeUserId = useStore((store) => store.activeUser);

  // const activeUserInfo = users.find((user) => user?.id === activeUserId);

  return (
    <header>
      <div className="profile">
        <img className="avatar" src={savedInfo?.avatar} alt="user avatar"></img>
        <h3 className="name">{savedInfo?.username}</h3>
      </div>
      <NewPostForm />
    </header>
  );
}

export default Header;
