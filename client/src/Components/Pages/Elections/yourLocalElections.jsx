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

import Web3 from 'web3';


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

  const [ electionIds, setElectionIds ] = useState([]);

  // let content = [];
  //determines and display the amount of elections and election data for a citizen to vote
  const electionCards = async(show, zipCode) => {
    const cards = []

    if (show == false) {
        //contract call from function on election.jsx to get all electionIds
        const allIds = await props.electionsInZip(zipCode);

      if(allIds.length > 0){
        for (var i = 0; i < allIds; i++) {
          cards.push(
                        <CardSection key={i}>
                          <Card>
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
                    );
                  }
                } else {
                  cards.push(
                          <CardSection key={props.values.zipCode}>
                            <Card>
                              <Card.Header>Featured</Card.Header>
                              <Card.Body>
                                <Card.Title>No elections in zip code</Card.Title>
                                <Card.Text>
                                  Please check zip code to make sure it is correct.
                                </Card.Text>
                                <BtnSection>
                                  <Button variant="primary">Go somewhere</Button>
                                  <Button variant="primary">Go somewhere</Button>
                                </BtnSection>
                              </Card.Body>
                            </Card>
                          </CardSection>
                      );
                  }
              }
              setElectionIds(cards);
            }


  const handleElectionCards = async(event) => {
    event.preventDefault();
    props.handleShowCurrentElections(event);

    await props.electionsInZip(91423);
    await electionCards(props.showCurrentElections, props.values.zipCode);
  }

  const buttonText = props.showCurrentElections ?
      <Button variant="primary" type="submit" onClick={props.handleClearCurrentElections}>Reset Zip Code</Button>
      : <Button variant="primary" type="submit" onClick={handleElectionCards}>Submit</Button>;


  return (
    <>
      <Form>
        <Form.Group controlId="formBasicZipCode">
          <Form.Label>Enter Your Zip Code</Form.Label>
          <Form.Control type="number" name="zipCode" placeholder="Zip Code" onChange={props.handleInputChange} />
        </Form.Group>

        {buttonText}
      </Form>

      {electionIds}
    </>
  )
}

export default YourLocalElections;
