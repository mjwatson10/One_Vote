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
import InputGroup from 'react-bootstrap/InputGroup';

import Web3 from 'web3';


  const CardSection = styled.section`
      width: 600px;
      max-width: 600px;
      color: black;
      text-align: center;
      padding: 40px;
    `;

  const VoteSection = styled.section`
      width: 600px;
      max-width: 600px;
      color: black;
      text-align: justify;
      padding: 20px;
    `;

  const BtnSection = styled.section`
    display: flex;
    flex:1;
    flex-direction:row;
    justify-content: space-between;
    `;


function YourLocalElections(props){

  const [ electionIds, setElectionIds ] = useState([]);
  const [ candidateValues, setCandidateValues ] = useState({
    key: 0,
    candidateId: 0,
    electionId: 0
  });

//capitalizes names and office titles
  const capitalize = (string) => {
    const words = string.split(" ");
      for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      return words.join(" ");
    }



    // let content = [];
    //determines and display the amount of elections and election data for a citizen to vote
    const electionCards = async(show, zipCode) => {
      const cards = [];
      console.log("Zip: ", zipCode);
      if (show) {
          //contract call from function on election.jsx to get all electionIds
          const allIds = await props.electionsInZip(zipCode);

        if(allIds.length > 0){
          for (var i = 0; i < allIds.length; i++) {
            //get all data from a particular election, ie all candidates Id's in an election
            const data = await props.electionData(allIds[i]);

              //generates a button for all candidates in a particular election
              const button = await createCandidateBtn(data.candidateIds, allIds[i]);

            //needs to determine whether or not there are candidates running in a particular election
            if(data.candidateIds.length > 0){
              let start = new Date(parseInt((data.electionStart * 1000), 10)).toUTCString();
              let end = new Date(parseInt((data.electionEnd * 1000), 10)).toUTCString();
              start = start.split(' ').slice(0, 4).join(' ');
              end = end.split(' ').slice(0, 4).join(' ');
              console.log("Start: ", data.electionStart);
              console.log("End: ", data.electionEnd);

              cards.push(
                            <CardSection key={i}>
                              <Card>
                                <Card.Header>Election For:</Card.Header>
                                <Card.Body>
                                  <h1>{capitalize(data.officeTitle)}</h1>
                                  <Card.Title>
                                    Election will Start on:
                                    <br />
                                    {start}
                                    <br />
                                    <br />
                                    Election will End on:
                                    <br />
                                    {end}
                                    <br />
                                    <br />
                                    Election ID: {allIds[i]}
                                    <br />
                                    <br />
                                    Office ID: {data.officeId}
                                  </Card.Title>

                                    {button}

                                </Card.Body>
                              </Card>
                            </CardSection>
                        );
                        console.log("All Ids: ", allIds);
                        console.log("Ids Array Length: ", allIds.length);
                      } else {
                        let start = new Date(parseInt((data.electionStart * 1000), 10)).toUTCString();
                        let end = new Date(parseInt((data.electionEnd * 1000), 10)).toUTCString();
                        start = start.split(' ').slice(0, 4).join(' ');
                        end = end.split(' ').slice(0, 4).join(' ');
                        console.log("Start: ", data.electionStart);
                        console.log("End: ", data.electionEnd);

                        cards.push(
                                      <CardSection key={i}>
                                        <Card>
                                          <Card.Header>Election For:</Card.Header>
                                          <Card.Body>
                                            <h1>{capitalize(data.officeTitle)}</h1>
                                            <Card.Title>
                                              Election will Start on:
                                              <br />
                                              {start}
                                              <br />
                                              <br />
                                              Election will End on:
                                              <br />
                                              {end}
                                              <br />
                                              <br />
                                              Election ID: {allIds[i]}
                                              <br />
                                              <br />
                                              Office ID: {data.officeId}
                                            </Card.Title>
                                            <BtnSection>
                                              <h4>No Candidates</h4>
                                            </BtnSection>
                                          </Card.Body>
                                        </Card>
                                      </CardSection>
                                  );
                      }
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
                                </Card.Body>
                              </Card>
                            </CardSection>
                        );
                    }
                    setElectionIds(cards);
                    console.log("Election Cards: ", cards);
                }
              }

    //creates btn that allows users to vote in election
    const createCandidateBtn = async(candidatesArray, electionId) => {
      const btnArray = [];

        for (var i = 0; i < candidatesArray.length; i++) {
            const candidateId = candidatesArray[i]
            const data = await props.candidatesData(candidateId);
            // setCandidateValues({
            //   key: data.candidateIds[i],
            //   candidateId: data.candidateIds[i],
            //   electionId: electionId
            // });

            const handleVote = async() => {
              await props.voteFor(candidateId, electionId);
              console.log("You Voted!!!");
              console.log("CandidateId Voted For: ", candidateId);
              console.log("ElectionId Voted For: ", electionId);
              console.log("Data: ", data);
              // console.log("Candidate Id: ", candidateValues.candidateId);
              // console.log("Election Id: ", candidateValues.electionId);
            }

            btnArray.push(
                  <VoteSection key={i}>
                  <h4>{capitalize(data.name)}</h4>
                  <Button variant="primary" onClick={handleVote}>Vote</Button>
                  </VoteSection>
                  // <>
                  // <CardSection key={i}>
                  //     <InputGroup>
                  //       <InputGroup.Prepend>
                  //         <InputGroup.Checkbox id={data.name} value={candidatesArray[i]} />
                  //         <label htmlFor={data.name}>{data.name}</label>
                  //       </InputGroup.Prepend>
                  //     </InputGroup>
                  // </CardSection>
                  // <br />
                  // </>
              );
        }
      console.log("Candidate: ", btnArray);
      return btnArray;
    }

    // const handleVote = async(candidateId, electionId) => {
    //   // await props.voteFor();
    //   console.log("You Voted!!!");
    //   console.log("CandidateId Voted For: ", candidateId);
    //   console.log("ElectionId Voted For: ", electionId);
    //   // console.log("Candidate Id: ", candidateValues.candidateId);
    //   // console.log("Election Id: ", candidateValues.electionId);
    // }


    const handleElectionCards = async(event) => {
      event.preventDefault();
      props.handleShowCurrentElections(event);

      await electionCards(props.showCurrentElections, props.values.zipCode);
    }


  const buttonText = props.showCurrentElections ?
      <Button variant="primary" type="submit" onClick={handleElectionCards}>Submit</Button>
      :<Button variant="primary" type="submit" onClick={props.handleClearCurrentElections}>Reset Zip Code</Button> ;


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
