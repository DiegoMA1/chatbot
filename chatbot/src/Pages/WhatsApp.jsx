import React from "react";
import image from '../Images/whatsappTwilio.png';

class WhatsApp extends React.Component{
    render(){
        return (
            <div>
                <br></br>
                <h1 align="center">WhatsApp</h1>
                <h3 align="center">Escanea el siguiente código QR para contactarnos por WhatsApp</h3>
                <center>
                    <img src={image} alt="whatsApp"/>
                </center>
            </div>
        );
    }
}

export default WhatsApp;