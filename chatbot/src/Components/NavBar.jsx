import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {useAuth0} from '@auth0/auth0-react'

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return ""
    }

    if (isAuthenticated) {
        console.log(user);
    }

    return (
        isAuthenticated ? (
            <div>
                <img src={user.picture} alt={user.name}></img>
                <h2>{user.name}</h2>
                <p>{user.email}</p>

                <LogoutButton/>
            </div>
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
                <Navbar.Brand href="/">Gaby</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/user">Mis cuentas</Nav.Link>
                <Nav.Link href="/user">Tiempo real</Nav.Link>
                <Nav.Link href="/whatsApp">WhatsApp</Nav.Link>
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

export default NavBar;
