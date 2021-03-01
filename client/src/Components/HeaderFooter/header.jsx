import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';




function Navigation(props){
  return(
    <>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/Home">One Vote</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/Home">Home</Nav.Link>
            <Nav.Link href="/Creation">Creation</Nav.Link>
            <Nav.Link href="/Elections">Elections</Nav.Link>
            <Nav.Link href="/Results">Results</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>
    </>
  );
}


export default Navigation;
