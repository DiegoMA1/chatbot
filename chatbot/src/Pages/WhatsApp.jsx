import React from "react";
import image from '../Images/whatsappTwilio.png';
import SideBar from '../Components/SideBar'
import { Container, Row, Col } from 'react-bootstrap';

class WhatsApp extends React.Component{
    render(){
        return (
                <Row className="ml-3 mr-3">
                    <SideBar/>
                    <Col md={10} lg={10} style={{marginTop: 32}}>
                        <h1 align="center">WhatsApp</h1>
                        <h3 align="center">Escanea el siguiente código QR para contactarnos por WhatsApp</h3>
                        <center>
                            <img src={image} alt="whatsApp"/>
                        </center>
                    </Col>
                </Row>
        );
    }
}

export default WhatsApp;