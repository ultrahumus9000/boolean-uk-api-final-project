import "../styles/login.css";

import React, { SyntheticEvent } from "react";

import { Link, useHistory } from "react-router-dom";

import { useEffect } from "react";
import useStore from "../store";
import Headline from "../components/Headline";

type CheckUser = {
  username: string;
  password: string;
};

function Login() {
  const history = useHistory();
  const users = useStore((store) => store.users);
  const fetchUsers = useStore((store) => store.fetchUsers);
  const setActiveUser = useStore((store) => store.setActiveUser);
  const activeUser = useStore((store) => store.activeUser);

  useEffect(() => {
    fetchUsers();
  }, []);

  // const activeUserInfo = users.find((user) => user?.id === activeUser);

  function frontendCheckUser(data: CheckUser) {
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((resp) => {
        localStorage.clear();
        return resp.json();
      })
      .then((dataCheckResult) => {
        if (typeof dataCheckResult === "string") {
          alert("user info doesnt match");
        } else if (dataCheckResult.error) {
          alert("user info doenst match");
        } else {
          StoreUser(JSON.stringify(dataCheckResult));
          setActiveUser(dataCheckResult.id);
          history.push("/posts");
        }
      });
  }

  const StoreUser = (info: string) => {
    localStorage.setItem("userInfo", info);
  };

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const targetEvent = event.target as HTMLFormElement;

    let loginUser = {
      username: targetEvent.username.value,
      password: targetEvent.password.value,
    };
    frontendCheckUser(loginUser);

    targetEvent.reset();
  }
  return (
    <>
      <Headline />
      <section className="login">
        <main className="login_main">
          <h1>Food Journal</h1>
          <Link to="/signup">
            <button className="signup">Sign up</button>
          </Link>

          <form className="login_form" onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" name="username" />
            </label>
            <label>
              Password:
              <input type="text" name="password" className="passwordInput" />
            </label>
            <input type="submit" value="Submit" className="submit-input" />
          </form>
        </main>
      </section>
    </>
  );
}

export default Login;
