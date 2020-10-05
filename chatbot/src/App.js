import React from "react";
import Home from "./Pages/Home";
import User from "./Pages/User";
import LandingPage from "./Pages/LandingPage";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chatbot from "./Components/Chatbot";
import 'react-chat-widget/lib/styles.css';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/user">
          <User />
        </Route>
      </Switch>
      <Chatbot />

    </Router>
  );
}
