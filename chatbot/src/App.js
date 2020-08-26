import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import LandingPage from './Pages/LandingPage';
import NavBar from './Shared/NavBar';
import {Widget, addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import SimpleForm from './Pages/SimpleForm';
const handleNewMessage = (newMessage) => {
    console.log(newMessage);
    // Now send the message throught the backend API
    addResponseMessage('Hola -> '+ newMessage);
};

export default function App() {
  let [showChat, setShowChat] = useState(false);

  const startChat = () => { setShowChat(true); }
  const hideChat = () => { setShowChat(false); }

  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/Landing">
          <LandingPage></LandingPage>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/user">
          <Home></Home>
        </Route>
      </Switch>
        <div className = "bot">
        <div style ={{display: showChat ? "" : "none"}}>
          <SimpleForm></SimpleForm>
        </div>      
        {/* <div> {showChat ? <SimpleForm></SimpleForm> : null} </div> */}
        <div>
          {!showChat 
            ? <button className="btn-bot" onClick={() => startChat()}>click to chat... </button> 
            : <button className="btn-bot" onClick={() => hideChat()}>click to hide... </button>}
        </div>
      </div>
    </Router>
    
  );
}