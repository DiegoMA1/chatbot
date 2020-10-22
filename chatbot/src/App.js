import React from "react";
import Home from "./Pages/Home";
import User from "./Pages/User";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chatbot from "./Components/Chatbot";
import "react-chat-widget/lib/styles.css";
import WhatsApp from "./Pages/WhatsApp";
import FormPage from "./Pages/Login";
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
        <Route path="/whatsApp">
          <WhatsApp />
        </Route>
        <Route path="/login">
          <FormPage/>
        </Route>
      </Switch>
      <Chatbot />
    </Router>
  );
}
