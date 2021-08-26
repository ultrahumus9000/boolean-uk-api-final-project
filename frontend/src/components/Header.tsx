import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import NewPostForm from "../components/NewPostForm";
import useStore, { User } from "../store";
type HeaderProp = {
  users: User[];
  savedInfo: User;
};

function Header({ users, savedInfo }: HeaderProp) {
  const [newPost, setNewPost] = useState(true);
  const setSearch = useStore((store) => store.setSearch);
  const history = useHistory();
  function toggleNewPostDisplay() {
    setNewPost(!newPost);
  }

  function handleInput(e: SyntheticEvent) {
    const targetEvent = e.target as HTMLInputElement;
    setSearch(targetEvent.value);
  }

  function handleLogout() {
    localStorage.clear();
    fetch("http://localhost:4000/logout", {
      credentials: "include",
    }).then(() => {
      history.push("/login");
    });
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

      <button className="logout-btn" onClick={handleLogout}>
        Log Out
      </button>
      <section className="search-section">
        <form action="">
          <input type="text" onInput={handleInput} />
          <label htmlFor="">Search</label>
        </form>
      </section>
    </header>
  );
}

export default Header;
