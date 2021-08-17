import React, { useEffect } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Posts from "./pages/posts";
import useStore from "./store";

function App() {
  const fetchUsers = useStore((store) => store.fetchUsers);
  const fetchUserById = useStore((store) => store.fetchUserById);
  const createUser = useStore((store) => store.createUser);
  const updateUser = useStore((store) => store.updateUser);
  const deleteUser = useStore((store) => store.deleteUser);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUserById();
  }, []);

  useEffect(() => {
    createUser();
  }, []);

  useEffect(() => {
    updateUser();
  }, []);

  useEffect(() => {
    deleteUser();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/posts" exact>
          <Posts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
