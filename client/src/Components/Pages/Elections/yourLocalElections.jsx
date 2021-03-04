import React, {useState, useEffect} from 'react';
import Proptypes from 'prop-types';

import Navigation from '../../HeaderFooter/header.jsx';
import Footer from '../../HeaderFooter/footer.jsx';
import App from '../../../App.js';

import axios from 'axios';
import styled from 'styled-components';

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';


  const CardSection = styled.section`
      width: 600px;
      max-width: 600px;
      color: black;
      text-align: center;
      padding: 40px;
    `;

  const BtnSection = styled.section`
    display: flex;
    flex:1;
    flex-direction:row;
    padding:0px 40px 0px 80px;
    justify-content: space-between;
    `;


function YourLocalElections(props){
  //used to determine what elections the user can vote in
  const [ values, setValues ] = useState({
    zipCode: 0
  });

  const handleInputChange = (e) => {
    setValues({
                ...values,
                [e.target.name]: e.target.value.trim()
              });
  }

  const buttonText = props.showCurrentElections ? 'Reset Zip Code' : 'Submit';
  let content = null;

  const handleShowLocalElections = async(event) => {
    event.preventDefault();
    if (props.showCurrentElections) {
      try {
        const electionIds = await props.electionsInZip(values.zipCode)
        if(electionIds.length > 0 ){
          props.handleShowCurrentElections(event);
          content =  <CardSection>
                    <Card show={props.showCurrentElections} onHide={props.handleShowCurrentElections}>
                      <Card.Header>Featured</Card.Header>
                      <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                          With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                        <BtnSection>
                          <Button variant="primary">Go somewhere</Button>
                          <Button variant="primary">Go somewhere</Button>
                        </BtnSection>
                      </Card.Body>
                    </Card>
                  </CardSection>
                }
              } catch (e) {
                props.handleShowCurrentElections(event);
                  <CardSection>
                    <Card>
                      <Card.Header>There is no Elections in this Zip Code</Card.Header>
                    </Card>
                  </CardSection>
                  console.log("Error: ", e);
        }
      }
    }

  return (
    <>
      <Form>
        <Form.Group controlId="formBasicZipCode">
          <Form.Label>Enter Your Zip Code</Form.Label>
          <Form.Control type="number" name="zip" placeholder="Zip Code" onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleShowLocalElections}>
          {buttonText}
        </Button>
      </Form>

      {content}
    </>
  )
}

export default YourLocalElections;
