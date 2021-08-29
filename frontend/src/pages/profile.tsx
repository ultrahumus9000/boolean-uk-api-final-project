import React, { SyntheticEvent, useReducer } from "react";
import { useState } from "react";
import clown from "../assets/clown.jpeg";
import goback from "../assets/goback.svg";
import "../styles/profile.css";
import useStore from "../store";

import Headline from "../components/Headline";
import { useHistory } from "react-router-dom";

function Profile() {
  const updateUser = useStore((store) => store.updateUser);
  const deleteUser = useStore((store) => store.deleteUser);
  const [editForm, setEditForm] = useState(false);
  const [leaveDisplay, setleaveDisplay] = useState(false);
  const data = localStorage.getItem("userInfo");
  const savedInfo = JSON.parse(data === null ? "" : data);
  const history = useHistory();

  const [form, setForm] = useState(savedInfo);

  function handleClick() {
    setEditForm(!editForm);
  }

  function deleteAccount() {
    deleteUser(savedInfo.id);
    setTimeout(() => {
      history.push("/");
    }, 1500);
  }

  function handleChange(event: SyntheticEvent) {
    const targetEvent = event.target as HTMLInputElement;

    const key = targetEvent.name;
    let newForm = savedInfo;

    switch (key) {
      case "avatar":
        newForm = { ...savedInfo, avatar: targetEvent.value };
        setForm(newForm);
        localStorage.clear();
        localStorage.setItem("userInfo", JSON.stringify(newForm));
        break;
      case "username":
        newForm = { ...savedInfo, username: targetEvent.value };
        setForm(newForm);
        localStorage.clear();
        localStorage.setItem("userInfo", JSON.stringify(newForm));
        break;
      case "first_name":
        newForm = { ...savedInfo, first_name: targetEvent.value };
        setForm(newForm);
        localStorage.clear();
        localStorage.setItem("userInfo", JSON.stringify(newForm));
        break;
      case "last_name":
        newForm = { ...savedInfo, last_name: targetEvent.value };
        setForm(newForm);
        localStorage.clear();
        localStorage.setItem("userInfo", JSON.stringify(newForm));
        break;
      case "email":
        newForm = { ...savedInfo, email: targetEvent.value };
        setForm(newForm);
        localStorage.clear();
        localStorage.setItem("userInfo", JSON.stringify(newForm));
        break;
    }
  }

  function handleSaveData() {
    console.log("line 74", form);
    updateUser(form);
    handleClick();
  }

  return (
    <>
      <Headline />
      <main className="profile-page-big">
        <img className="gobackimg" src={goback} />
        <button
          className="go-back-btn"
          onClick={() => {
            history.push("/posts");
          }}
        >
          Go back To Post
        </button>
        {editForm ? (
          <form className="editing-profile">
            <input
              className="editform-input"
              type="text"
              name="avatar"
              placeholder="insert new avatar"
              value={form.avatar}
              onChange={handleChange}
            />
            <input
              className="editform-input"
              type="text"
              name="username"
              placeholder="user.username"
              value={form.username}
              onChange={handleChange}
            />
            <input
              className="editform-input"
              type="text"
              name="first_name"
              placeholder="user.firstName"
              value={form.first_name}
              onChange={handleChange}
            />
            <input
              className="editform-input"
              type="text"
              name="last_name"
              placeholder="user.lastName"
              value={form.last_name}
              onChange={handleChange}
            />
            <input
              className="editform-input"
              type="email"
              name="email"
              placeholder="user.email"
              value={form.email}
              onChange={handleChange}
            />
            <div className="edit-form-buttons">
              <button className="save" onClick={handleSaveData}>
                Save
              </button>
              <button className="cancel" onClick={handleClick}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="wrapper">
            {leaveDisplay ? (
              <section className="modal-section">
                <img src={clown} />
                <h2> Are you sure ? </h2>
                <button className="let-go-btn" onClick={deleteAccount}>
                  Okay I let you go
                </button>
                <button
                  className="stay-btn"
                  onClick={() => {
                    setleaveDisplay(false);
                  }}
                >
                  Okay I ll stay
                </button>
              </section>
            ) : null}
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
                <button
                  className="delete-account"
                  onClick={() => {
                    setleaveDisplay(true);
                  }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Profile;
