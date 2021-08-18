import React from "react";
import NewPostForm from "../components/NewPostForm";

function Header() {
  return (
    <header>
      <div className="profile">
        <img
          className="avatar"
          src="https://static01.nyt.com/images/2017/10/22/magazine/22waititi1/22waititi1-superJumbo.jpg"
          alt="user avatar"
        ></img>
        <h3 className="name">Joe Bloggs</h3>
      </div>
      <NewPostForm />
    </header>
  );
}

export default Header;
