import React , {Fragment}from "react";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { ImStatsDots } from 'react-icons/im';
import {BsPersonSquare} from 'react-icons/bs';

class Home extends React.Component{

    render(){
        return (
            <Fragment>
            <br></br>
            <Container>
            <Row>
                <Col>
                <Card style={{ width: '20rem', heigth: '20rem' }}>
                <Card.Header as="h5" align="center">Statistics</Card.Header>
                <Card.Body>
                    <Card.Title><h3 align="center"><ImStatsDots size={64} /></h3></Card.Title>
                    <Card.Text>
                        Here you can check out all the statistics of your profile.
                    </Card.Text>
                    <Button block size="lg" variant="secondary">Statistics</Button>
                </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card style={{ width: '20rem', heigth: '20rem' }}>
                <Card.Header as="h5" align="center">Popular Images</Card.Header>
                <Card.Body>
                    <Card.Title><h3 align="center"><BsPersonSquare size={64} /></h3></Card.Title>
                    <Card.Text>
                        Check which of your publications are the most popular and the metrics of each one
                    </Card.Text>
                    <Button block size="lg" variant="secondary">Popular Images</Button>
                </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card style={{ width: '20rem', heigth: '20rem' }}>
                <Card.Header as="h5" align="center">Promote Publications</Card.Header>
                <Card.Body>
                    <Card.Title><h3 align="center"><ImStatsDots size={64} /></h3></Card.Title>
                    <Card.Text>
                        Here you can promote your publications.
                    </Card.Text>
                    <Button block size="lg" variant="secondary">Statistics</Button>
                </Card.Body>
                </Card>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col>
                <Card style={{ width: '20rem', heigth: '20rem' }}>
                <Card.Header as="h5" align="center">Insta Stories</Card.Header>
                <Card.Body>
                    <Card.Title><h3 align="center"><ImStatsDots size={64} /></h3></Card.Title>
                    <Card.Text>
                        Here you can check out all the statistics of your profile.
                    </Card.Text>
                    <Button block size="lg" variant="secondary">Statistics</Button>
                </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card style={{ width: '20rem', heigth: '20rem' }}>
                <Card.Header as="h5" align="center">Statistics</Card.Header>
                <Card.Body>
                    <Card.Title><h3 align="center"><ImStatsDots size={64} /></h3></Card.Title>
                    <Card.Text>
                        Here you can check out all the statistics of your profile.
                    </Card.Text>
                    <Button block size="lg" variant="secondary">Statistics</Button>
                </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card style={{ width: '20rem', heigth: '20rem' }}>
                <Card.Header as="h5" align="center">Statistics</Card.Header>
                <Card.Body>
                    <Card.Title><h3 align="center"><ImStatsDots size={64} /></h3></Card.Title>
                    <Card.Text>
                        Here you can check out all the statistics of your profile.
                    </Card.Text>
                    <Button block size="lg" variant="secondary">Statistics</Button>
                </Card.Body>
                </Card>
                </Col>
            </Row>
            </Container>
            </Fragment>
        );
    }
}

export default Home;