import React from "react";
import "../styles/edit-profile-form.css";

function EditProfileForm() {
  return (
    <form className="editing-profile">
      <input type="text" name="avatar" placeholder="insert new avatar" />
      <input type="text" name="username" placeholder="user.username" />
      <input type="text" name="firstName" placeholder="user.firstName" />
      <input type="text" name="lastName" placeholder="user.lastName" />
      <input type="email" name="email" placeholder="user.email" />
      <div className="edit-form-buttons">
        <button>Save</button>
        <button>Cancel</button>
      </div>
    </form>
  );
}

export default EditProfileForm;
