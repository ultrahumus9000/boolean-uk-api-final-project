import "../styles/login.css";

import React, { SyntheticEvent } from "react";

import { Link, useHistory } from "react-router-dom";
import { User } from "../store";
import { useEffect } from "react";
import useStore from "../store";

function Login() {
  const history = useHistory();
  const users = useStore((store) => store.users);
  const fetchUsers = useStore((store) => store.fetchUsers);
  const setActiveUser = useStore((store) => store.setActiveUser);
  const activeUser = useStore((store) => store.activeUser);

  useEffect(() => {
    fetchUsers();
  }, []);

  const activeUserInfo = users.find((user) => user?.id === activeUser);

  const StoreUser = (info: string) => {
    localStorage.setItem("userInfo", info);
  };

  console.log(localStorage.getItem("userInfo"));
  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const targetEvent = event.target as HTMLFormElement;

    let loginUser = {
      username: targetEvent.username.value,
      password: targetEvent.password.value,
    };
    const activeUserInfo: User | undefined = users.find(
      (user) => user?.username === loginUser.username
    );

    if (activeUserInfo === undefined) {
      alert("user information doesnt match");
      return;
    }

    if (activeUserInfo.password !== loginUser.password) {
      alert("user information doesnt match");
      return;
    }
    setActiveUser(activeUserInfo.id);
    StoreUser(JSON.stringify(activeUserInfo));
    console.log(activeUserInfo);
    history.push("/posts");
    targetEvent.reset();
  }
  return (
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
  );
}

export default Login;
