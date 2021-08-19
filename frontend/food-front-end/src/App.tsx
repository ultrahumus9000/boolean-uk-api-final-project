import React from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Posts from "./pages/posts";
import Profile from "./pages/profile";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
          {/* {loggedIn ? <Redirect to="/posts" /> : <Signup />} */}
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/posts" exact>
          <Posts />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
