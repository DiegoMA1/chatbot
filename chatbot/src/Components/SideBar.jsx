import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Col, Row } from 'react-bootstrap';
import {useAuth0} from '@auth0/auth0-react'

import facebook from '../Images/facebook.png'
import whatsapp from '../Images/whatsapp.png'
import instagram from '../Images/instagram.png'
import twitter from '../Images/twitter.png'


export default function SideBar(props){
    const { user } = useAuth0();

    return (
        <>
        <Col md={2} lg={2} style={{height: '100%',position: 'fixed', paddingTop: 24}}>
            <ListGroup variant="flush" style={{height: '100%'}}>
                <ListGroup.Item>
                    <Row className="justify-content-around">
                        <Col md={4} className="p-0 pl-3">
                            <img src={user.picture} style={{borderRadius: 100, height: 42}} alt={user.name}/>
                        </Col>
                        <Col md={4} style={{fontSize: 14, fontWeight: 'bold'}} className="p-0 text-muted">
                            {user.given_name} <br/>
                            {user.email}
                        </Col>
                        <Col></Col>
                    </Row>
                </ListGroup.Item>
                    <ListGroup.Item action href="/whatsapp"><img style={{height: 26, borderRadius: 100, marginRight:8}} src={whatsapp}/>
                        <Link to="/whatsapp" style={{textDecoration: 'none', fontSize: 14}} className="text-muted">
                            WhatsApp
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item action href="/instagram"><img style={{height: 26, marginRight:8}} src={instagram}/>
                        <Link to="/instagram" style={{textDecoration: 'none', fontSize: 14}} className="text-muted">
                            Instagram
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item action href="/facebook"><img style={{height: 24, marginRight:8}} src={facebook}/>
                        <Link to="/facebook" style={{textDecoration: 'none', fontSize: 14}} className="text-muted">
                            Facebook
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item action href="/twitter"><img style={{height: 26, paddingBottom: 5, marginRight:8}} src={twitter}/>
                        <Link to="/twitter" style={{textDecoration: 'none', fontSize: 14}} className="text-muted">
                            Twitter
                        </Link>
                    </ListGroup.Item>
            </ListGroup>
        </Col>
        <hr/>
        </>
    )
}