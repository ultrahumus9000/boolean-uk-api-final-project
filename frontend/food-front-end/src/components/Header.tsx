import React from "react";
import NewPostForm from "../components/NewPostForm";
import useStore, { User } from "../store";
type HeaderProp = {
  users: User[];
};

function Header({ users }: HeaderProp) {
  const activeUserId = useStore((store) => store.activeUser);

  const activeUserInfo = users.find((user) => user?.id === activeUserId);
  console.log(activeUserInfo?.avatar);
  return (
    localStorage.getItem("username") && (
      <header>
        <div className="profile">
          <img
            className="avatar"
            src={activeUserInfo?.avatar}
            alt="user avatar"
          ></img>
          <h3 className="name">{activeUserInfo?.username}</h3>
        </div>
        <NewPostForm />
      </header>
    )
  );
}

export default Header;
