import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import useStore from "../store";
import "../styles/sign_up_form.css";

function SignUpForm() {
  const createUser = useStore((store) => store.createUser);

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
  }

  return (
    <form className="signup_form" onSubmit={handleSubmit}>
      <h3 className="form-title">Sign Up</h3>
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
      <Link to="/">
        <input className="signup_submit" type="submit" value="Submit" required />
      </Link>
    </form>
  );
}

export default SignUpForm;
