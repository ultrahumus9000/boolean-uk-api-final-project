import "../styles/login.css";

import React from "react";

function Signup() {
  return (
    <section className="login">
      <main>
        <h1>Food Journal</h1>
        <button className="signup">Sign up</button>
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

export default Signup;
