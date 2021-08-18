import "../styles/login.css";

import React from "react";

import { Link } from "react-router-dom";

import { useEffect } from "react";

// function handleSubmit(event: SyntheticEvent) {
//   event.preventDefault();
//   const targetEvent = event.target as HTMLFormElement;

//   let user = {
//     username: targetEvent.username.value,
//     password: targetEvent.password.value,
//   };
//   getUser(user);
//   targetEvent.reset();
// }

function Login() {
  return (
    <section className="login">
      <main className="login_main">
        <h1>Food Journal</h1>
        <Link to="/signup">
          <button className="signup">Sign up</button>
        </Link>

        <form className="login_form">
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          <label>
            Password:
            <input type="text" name="password" />
          </label>
          <input type="submit" value="Submit" className="submit-input" />
        </form>
      </main>
    </section>
  );
}

export default Login;
