import React from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Posts from "./pages/posts";
import Profile from "./pages/profile";
import OtherUserPage from "./pages/OtherUserPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <Login />
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
        <Route path="/posts/:userId" exact>
          <OtherUserPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
