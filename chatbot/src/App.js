import React from "react";
import Home from "./Pages/Home";
import User from "./Pages/User";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chatbot from "./Components/Chatbot";
import "react-chat-widget/lib/styles.css";
import PrivateRoute from "./Components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/user" component={User} />
      </Switch>
      <Chatbot />
    </Router>
  );
}