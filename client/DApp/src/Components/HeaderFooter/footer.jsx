import React from 'react';

import * as ReactBootStrap from 'react-bootstrap';


function Footer(props){
  return(
    <>
        <footer>
          <ReactBootStrap.Card>
            <ReactBootStrap.Card.Header>Featured</ReactBootStrap.Card.Header>
            <ReactBootStrap.Card.Body>
              <ReactBootStrap.Card.Title>Special title treatment</ReactBootStrap.Card.Title>
              <ReactBootStrap.Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </ReactBootStrap.Card.Text>
              <ReactBootStrap.Button variant="primary">Go somewhere</ReactBootStrap.Button>
            </ReactBootStrap.Card.Body>
          </ReactBootStrap.Card>
        </footer>
    </>
  );
}


export default Footer;
