import React from "react";

function SignUpForm() {
  return (
    <form>
      <label>
        First name:
        <input type="text" name="first_name" />
      </label>
      <label>
        Last name:
        <input type="text" name="last_name" />
      </label>
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Avatar:
        <input type="file" name="avatar" />
      </label>
      <label>
        Password:
        <input type="text" name="password" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default SignUpForm;
