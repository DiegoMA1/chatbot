import React from "react";
import Home from "./Pages/Home";
import User from "./Pages/User";
import LandingPage from "./Pages/LandingPage";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Widget, addResponseMessage } from "react-chat-widget";
import 'react-chat-widget/lib/styles.css';
import axios from "axios";

const handleNewUserMessage = (message) => {
  axios.post('http://127.0.0.1:5002/getMessage', { message }).then((res) => {
    console.log(res.data.text)  
    addResponseMessage(res.data.text);

  });
}

export default function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/user">
          <User />
        </Route>
      </Switch>
      <Widget handleNewUserMessage= {handleNewUserMessage}
        title="My new awesome title"
        subtitle="And my cool subtitle"
      />
    </Router>
  );
}
