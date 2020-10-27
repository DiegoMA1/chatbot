import React from "react";
import { Navbar, Nav, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {useAuth0} from '@auth0/auth0-react'
import {withRouter} from 'react-router-dom';


const Profile = () => {
    const { user, isAuthenticated, isLoading, logout } = useAuth0();

    if (isLoading) {
        return ""
    }

    if (isAuthenticated) {
        console.log(user);
    }

    return (
        isAuthenticated ? (
                <Dropdown style={{marginRight: 24, marginLeft: 24}}>
                    <Dropdown.Toggle variant="" id="dropdown-basic" style={{color: 'white'}}>
                        <img src={user.picture} style={{borderRadius: 100, height: 42, marginRight: 12}} alt={user.name}/>
                        {user.given_name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/">Preferencias</Dropdown.Item>
                        <Dropdown.Item onClick={ () => logout( { returnTo: window.location.origin})}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
        ) : (
            <LoginButton/>
        )
    );
};

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <Button onClick={ () => loginWithRedirect()}>Log In</Button>
};

const LogoutButton = () => {
    const { logout } = useAuth0();

    return <Button onClick={ () => logout( { returnTo: window.location.origin})}>Log Out</Button>
};

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search:"Que buscamos?",
        }
    }

    searchItem = (params) => {
        this.setState({
            search: params.target.value,
        });
    };

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand className="ml-5" href="/">Gaby</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link active={this.props.location.pathname == "/home"} href="/home">Home</Nav.Link>
                <Nav.Link active={this.props.location.pathname == "/user"} href="/user">Mis cuentas</Nav.Link>
                <Nav.Link href="/user">Tiempo real</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" onChange={this.searchItem} placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form>
                <Profile/>
            </Navbar>
        );
    }
}

export default withRouter(NavBar);
