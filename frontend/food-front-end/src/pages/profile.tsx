import React, { useReducer } from "react";

import "../styles/profile.css";
import useStore from "../store";

function Profile() {
  return (
    <main className="profile-page">
      <h2 className="edit-profile-title">Your profile:</h2>

      <div className="profile-to-edit">
        <div className="edit-avatar">
          <img
            className="edit-avatar"
            src="https://www.adorama.com/alc/wp-content/uploads/2017/06/1-shutterstock_588634790.jpg"
            alt="avatar"
          ></img>
        </div>
        <div className="edit-element">
          <p>Username</p>
        </div>
        <div className="edit-element">
          <p>firstName</p>
        </div>

        <div className="edit-element">
          <p>lastName</p>
        </div>

        <div className="edit-element">
          <p>email</p>
        </div>
        <div className="edit-profile-buttons">
          <button className="edit-profile">Edit</button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
