import "../styles/login.css";

import React from "react";

function Login() {
  return (
    <section className="login">
      <main>
        <h1>Food Journal</h1>

        <button>Sign up</button>
        <button>Log in</button>

        <form>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          <label>
            Password:
            <input type="text" name="password" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </main>
    </section>
  );
}

export default Login;
