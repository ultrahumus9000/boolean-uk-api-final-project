import "../styles/login.css";

import React from "react";

import { Link } from "react-router-dom";

import { useEffect } from "react";

function Login() {
  return (
    <section className="login">
      <main>
        <h1>Food Journal</h1>
        <Link to="/signup">
          <button className="signup">Sign up</button>
        </Link>

        <button className="login">Log in</button>
        <form>
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
