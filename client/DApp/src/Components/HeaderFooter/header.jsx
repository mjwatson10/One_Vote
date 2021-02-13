import React from 'react';

import * as ReactBootStrap from 'react-bootstrap';


function Navigation(props){
  return(
    <>
        <ReactBootStrap.Navbar bg="primary" variant="dark">
          <ReactBootStrap.Navbar.Brand href="/Home">Navbar</ReactBootStrap.Navbar.Brand>
          <ReactBootStrap.Nav className="mr-auto">
            <ReactBootStrap.Nav.Link href="/Home">Home</ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link href="/Creation">Creation</ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link href="#pricing">Pricing</ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
          <ReactBootStrap.Form inline>
            <ReactBootStrap.FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <ReactBootStrap.Button variant="outline-light">Search</ReactBootStrap.Button>
          </ReactBootStrap.Form>
        </ReactBootStrap.Navbar>
    </>
  );
}


export default Navigation;
