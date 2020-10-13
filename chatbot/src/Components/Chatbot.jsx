import React from "react";
import {Widget, renderCustomComponent, addResponseMessage} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
//import { Carousel } from 'react-responsive-carousel';

class HtmlComponent extends React.Component {
  render() {
    return <div>{ReactHtmlParser(this.props.text)}</div>;
  }
}

/* class DemoCarousel extends React.Component{
      render(){
        return (
          <div>{ReactHtmlParser(
            <Carousel>
            {this.props.urls.forEach(url => (                  
              <div>
                <img src={url} alt="im" />
                  <p className="legend">Legend 1</p>
              </div>
            ))}
          </Carousel>
          )}</div>
        );
      }
} */

class Chatbot extends React.Component {

  componentDidMount() {
    this.onInit();
  }

  onInit = () => {
    let message = "";
    axios.post("http://127.0.0.1:5002/getMessage", { message }).then((res) => {
      addResponseMessage(res.data.text);
    });
  };

  handleNewUserMessage = (message) => {
    axios.post("http://127.0.0.1:5002/getMessage", { message }).then((res) => {
      console.log(res.data);
      /* if(res.data.intent === "Mas_Populares") {
        const images = JSON.parse(res.data.text);
        console.log(images);

        let urls = [];

        // Obteniendo todas las claves del JSON
        for (var image in images){
          if (images.hasOwnProperty(image)) {
            urls.push(images[image]);
          }
        }

        console.log(urls);
        // addResponseMessage(urls);

        renderCustomComponent(DemoCarousel, {urls: urls})
        // <Carousel>
        //   {urls.forEach(url => (                  
        //     <div>
        //       <img src={url} alt="im" />
        //         <p className="legend">Legend 1</p>
        //     </div>
        //   ))}
        // </Carousel>
      }
      else{ */
        renderCustomComponent(HtmlComponent, { text: res.data.text });
        // return res.data;
     // }
      
    });
  };

  render() {
    return (
      <Widget
        handleNewUserMessage={this.handleNewUserMessage}
        title="Gaby"
        subtitle="Al servicio de la comunidad"
      />
    );
  }
}

export default Chatbot;
