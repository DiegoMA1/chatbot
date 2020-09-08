import React from "react";
import {Widget, renderCustomComponent} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";

class HtmlComponent extends React.Component {
  render() {
    return <div>{ReactHtmlParser(this.props.text)}</div>;
  }
}

class Chatbot extends React.Component {
  handleNewUserMessage = (message) => {
    axios.post("http://127.0.0.1:5002/getMessage", { message }).then((res) => {
      console.log(res.data.text);
      renderCustomComponent(HtmlComponent, { text: res.data.text });
      return res.data;
    });
  };

  render() {
    return (
      <Widget
        handleNewUserMessage={this.handleNewUserMessage}
        title="My new awesome title"
        subtitle="And my cool subtitle"
      />
    );
  }
}

export default Chatbot;
