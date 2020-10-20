import React from "react";
import Home from "./Pages/Home";
import User from "./Pages/User";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chatbot from "./Components/Chatbot";
import "react-chat-widget/lib/styles.css";
import PrivateRoute from "./Components/PrivateRoute";
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
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/user" component={User} /> 
        {/* <PrivateRoute exact path="/user" component={User} /> */}
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