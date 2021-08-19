import React, { useReducer } from "react";
import { useState } from "react";

import "../styles/profile.css";
import useStore from "../store";

import EditProfileForm from "../components/EditProfileForm";
import Headline from "../components/Headline";

function Profile() {
  const [editForm, setEditForm] = useState(false);

  function handleClick() {
    const editForm = true;
  }
  const data = localStorage.getItem("userInfo");
  const savedInfo = JSON.parse(data === null ? "" : data);

  return (
    <main className="profile-page-big">
      <Headline />
      <div className="wrapper">
        <h2 className="edit-profile-title">Your profile:</h2>

        <div className="profile-to-edit">
          <div className="edit-avatar">
            <img
              className="edit-avatar"
              src={savedInfo.avatar}
              alt="avatar"
            ></img>
          </div>
          <div className="edit-element">
            <p>username: {savedInfo.username}</p>
          </div>
          <div className="edit-element">
            <p>first name: {savedInfo.first_name}</p>
          </div>
          <div className="edit-element">
            <p>last name: {savedInfo.last_name}</p>
          </div>

          <div className="edit-element">
            <p>email: {savedInfo.email}</p>
          </div>
          <div className="edit-profile-buttons">
            <button className="edit-profile" onClick={handleClick}>
              Edit
            </button>
          </div>
        </div>
      </div>

      {editForm && <EditProfileForm />}
    </main>
  );
}

export default Profile;
