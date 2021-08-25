import React, { SyntheticEvent } from "react";
import { useHistory } from "react-router-dom";
import useStore from "../store";
import "../styles/sign_up_form.css";

function SignUpForm() {
  const createUser = useStore((store) => store.createUser);
  const history = useHistory();
  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const targetEvent = event.target as HTMLFormElement;

    let newUser = {
      first_name: targetEvent.first_name.value,
      last_name: targetEvent.last_name.value,
      username: targetEvent.username.value,
      password: targetEvent.password.value,
      avatar: targetEvent.avatar.value,
      email: targetEvent.email.value,
    };
    createUser(newUser);
    targetEvent.reset();
    history.push("/");
  }

  return (
    <form className="signup_form" onSubmit={handleSubmit}>
      <h3 className="form-title">
        <svg
          width="50px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
        >
          <g id="Layer_28" data-name="Layer 28">
            <path d="M22.24,8.12a1.29,1.29,0,0,0,0,2.57A1.29,1.29,0,0,0,22.24,8.12Z" />
            <path d="M31.34,7.11a1.29,1.29,0,0,0,0,2.57A1.29,1.29,0,0,0,31.34,7.11Z" />
            <path d="M21.3,15.71a1.29,1.29,0,0,0,0,2.57A1.29,1.29,0,0,0,21.3,15.71Z" />
            <path d="M35.42,13.61a1.29,1.29,0,0,0,0,2.57A1.29,1.29,0,0,0,35.42,13.61Z" />
            <path d="M27.42,13.85a1.29,1.29,0,0,0,0,2.57A1.29,1.29,0,0,0,27.42,13.85Z" />
            <path d="M47.14,6.6a1.29,1.29,0,0,0,0,2.57A1.29,1.29,0,0,0,47.14,6.6Z" />
            <path d="M41.06,15.36a1.29,1.29,0,0,0,2.57,0A1.29,1.29,0,0,0,41.06,15.36Z" />
            <path d="M40.53,8.76a1.29,1.29,0,0,0,0,2.57A1.29,1.29,0,0,0,40.53,8.76Z" />
            <path d="M51.44,19.45h-2v-6.3c6-1.17,5.28-10-.9-10.15H15.47a5.08,5.08,0,0,0-3.61,1.5,5.15,5.15,0,0,0,2.71,8.64v6.31h-2A9.57,9.57,0,0,0,3,29V53.15a4,4,0,0,0,4,4h4V60a1,1,0,0,0,1,1h4.85a1,1,0,0,0,1-1V57.15h28.3V60a1,1,0,0,0,1,1H52a1,1,0,0,0,1-1V57.15h4a4,4,0,0,0,4-4V29A9.57,9.57,0,0,0,51.44,19.45Zm-34.87,0V12.23a1.09,1.09,0,0,0-1.1-1,3.12,3.12,0,0,1,0-6.23H48.53a3.12,3.12,0,1,1-.1,6.23,1,1,0,0,0-1,1v7.22Zm33,31.25a.15.15,0,0,1-.11,0A6.89,6.89,0,1,1,47.32,37.3C55.09,37.42,56.81,48.1,49.58,50.7Z" />
            <path d="M47.32,39.3a4.89,4.89,0,0,0-2.48,9.09l1.53-4.51a1,1,0,0,1,1.9,0l1.52,4.52A4.9,4.9,0,0,0,47.32,39.3Z" />
          </g>
        </svg>
        <span>Sign Up</span>
      </h3>
      <label>
        First name:
        <input type="text" name="first_name" required />
      </label>
      <label>
        Last name:
        <input type="text" name="last_name" required />
      </label>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <label>
        Username:
        <input type="text" name="username" required />
      </label>
      <label>
        Avatar:
        <input type="text" name="avatar" required />
      </label>
      <label>
        Password:
        <input type="text" name="password" required />
      </label>

      <input className="signup_submit" type="submit" value="Submit" required />
    </form>
  );
}

export default SignUpForm;
