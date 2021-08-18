import React, { useReducer } from "react";

import "../styles/profile.css";
import useStore from "../store";

function Profile() {
  return (
    <main className="profile-page">
      <div className="profile-to-edit">
        <h2 className="edit-profile-title">Your profile:</h2>
        <div className="edit-avatar">
          <img
            className="avatar"
            src="https://www.adorama.com/alc/wp-content/uploads/2017/06/1-shutterstock_588634790.jpg"
            alt="avatar"
          ></img>
          <button className="edit-profile">Edit</button>
        </div>
        <div className="edit-element">
          <p>Username</p>
          <button className="edit-profile">Edit</button>
        </div>
        <div className="edit-element">
          <p>firstName</p>
          <button className="edit-profile">Edit</button>
        </div>

        <div className="edit-element">
          <p>lastName</p>
          <button className="edit-profile">Edit</button>
        </div>

        <div className="edit-element">
          <p>email</p>
          <button className="edit-profile">Edit</button>
        </div>
        <button className="edit-profile-submit">Submit</button>
      </div>
    </main>
  );
}

export default Profile;
