import React, { SyntheticEvent } from "react";
import useStore from "../store";
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
    <form onSubmit={handleSubmit}>
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
      <input type="submit" value="Submit" required />
    </form>
  );
}

export default SignUpForm;
