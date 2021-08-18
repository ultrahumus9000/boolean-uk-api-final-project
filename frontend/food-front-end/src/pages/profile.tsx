import React, { useReducer } from "react";

import "../styles/profile.css";
import useStore from "../store";

function Profile() {
  const user = useStore((store) => store.activeUser);


  return (
    <main className="profile-page">
      <h2 className="edit-profile-title">Edit your profile:</h2>
      <form className="edit-profile-form">
        <label className="edit-profile-label">
          Avatar:
          <input type="text" name="avatar" placeholder="" />
        </label>
        <label className="edit-profile-label">
          Username:
          <input type="text" name="username" placeholder="clair456" />
        </label>
        <label className="edit-profile-label">
          First name:
          <input type="text" name="firstName" placeholder="Clarie" />
        </label>
        <label className="edit-profile-label">
          Last name:
          <input type="text" name="lastName" placeholder="Smith" />
        </label>
        <label className="edit-profile-label">
          Email:
          <input type="email" name="email" placeholder="clarie@email.com" />
        </label>
        <button className="edit-profile-submit">Submit</button>
      </form>
    </main>
  );
}

export default Profile;
