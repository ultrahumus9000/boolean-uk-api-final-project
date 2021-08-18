import React from "react";
import NewPostForm from "../components/NewPostForm";
import useStore from "../store";

function Header() {
  const users = useStore((store) => store.users);
  const activeUserId = useStore((store) => store.activeUser);

  const activeUserInfo = users.find((user) => user.id === activeUserId);
  console.log(activeUserInfo?.avatar);
  return (
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
  );
}

export default Header;
