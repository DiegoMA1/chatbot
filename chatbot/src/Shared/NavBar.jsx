import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Widget, addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

class NavBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      search: "¿Que buscamos?",
    };
  }
  searchItem = (params) => {
    console.log(params.target.value);
    this.setState({
      search: params.target.value,
    })
  };

    render(){
        return(
          
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">React App</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/Landing">Landing</Nav.Link>
              <Nav.Link href="/home">{this.state.search}</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" onChange={this.searchItem} placeholder="Search" className="mr-sm-2" />
              <Button className="other-btn" variant="outline-primary">Search</Button>
            </Form>
          </Navbar>
        );
    }
}
export default NavBar;