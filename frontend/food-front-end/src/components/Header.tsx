import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import NewPostForm from "../components/NewPostForm";
import { User } from "../store";
type HeaderProp = {
  users: User[];
  savedInfo: User;
};

function Header({ users, savedInfo }: HeaderProp) {
  const [newPost, setNewPost] = useState(true);
  const history = useHistory();
  function toggleNewPostDisplay() {
    setNewPost(!newPost);
  }

  return (
    <header className={`${newPost ? "" : "shorter-header"}`}>
      <div className="profile">
        <img
          className="avatar"
          src={savedInfo?.avatar}
          alt="user avatar"
          onClick={() => {
            history.push(`/posts/${savedInfo?.id}`);
          }}
        ></img>
        <h3 className="name">{savedInfo?.username}</h3>
        <div className="head-buttons">
          <button
            onClick={() => {
              history.push("/profile");
            }}
          >
            Edit Profile
          </button>
          <button className="crimsion-color" onClick={toggleNewPostDisplay}>
            Post New
          </button>
        </div>
      </div>

      {newPost && <NewPostForm />}

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.clear();
          history.push("/");
        }}
      >
        Log Out
      </button>
      <section className="search-section">
        <form action="">
          <input type="text" />
          <label htmlFor="">Search</label>
        </form>
      </section>
    </header>
  );
}

export default Header;
