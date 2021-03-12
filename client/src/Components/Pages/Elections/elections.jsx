import React, {useState, useEffect} from 'react';
import Proptypes from 'prop-types';

import Navigation from '../../HeaderFooter/header.jsx';
import Footer from '../../HeaderFooter/footer.jsx';
import YourLocalElections from './yourLocalElections.jsx';
import App from '../../../App.js';

import axios from 'axios';
import styled from 'styled-components';

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import Web3 from 'web3';


function Elections(props){
  //used to determine what elections the user can vote in
  const [ values, setValues ] = useState({
    zipCode: 0
  });

  const timeInMilliseconds = () => {
      const date = new Date();
      const millisec = date.getTime();

    return millisec;
  }

  const handleInputChange = (e) => {
    setValues({
                ...values,
                [e.target.name]: e.target.value.trim()
              });
  }

  //used to display elections that are in the zip code that was entered as zipCode state data
  const [ showCurrentElections, setShowCurrentElections ] = useState(true);

  const handleShowCurrentElections = (event) => {
    event.preventDefault();
    // setShowCurrentElections(oldValue => !oldValue);
    // setValues(oldValue => 0);
    setShowCurrentElections(oldValue => !oldValue);
    console.log("Show: ", showCurrentElections);
  }

  const handleClearCurrentElections = () => {
    setShowCurrentElections(oldValue => !oldValue);
    setValues(oldValue => 0);
    console.log("Show: ", showCurrentElections);
  }

  //contract calls
  const electionsInZip = async(zipCode) => {
    const allIds = await props.contract.methods.getAllElectionsInZip(zipCode).call({from: props.user});
    console.log("Elections in Zip: ", allIds);
    return allIds;
  }

  const electionData = async(electionId) => {
    const data = await props.contract.methods.getElection(electionId).call({from: props.user});
    console.log("Election Data: ", data);
    return data;
  }

  const candidatesData = async(candidateId) => {
    const candidate = await props.contract.methods.getCandidate(candidateId).call({from: props.user});

    return candidate;
  }

  const voteFor = async(voteForCandidateId, electionId) => {
    const myCitizenId = await props.contract.methods.getCitizenId(props.user).call({from:props.user});
    await props.contract.methods.vote(myCitizenId, voteForCandidateId, electionId).send({from: props.user});
    await props.contract.events.VoteCast().on('data', (event) => {
      console.log("Vote Cast: ", event.returnValues);
    });
  }


  return (
    <div className="App">
      <Navigation />
          <header className="App-header">
            <h1>
              Elections Info and Voting
            </h1>

              <p>Creating Fair and Transparent Elections on the Blockchain</p>

              <YourLocalElections
                showCurrentElections={showCurrentElections}
                setShowCurrentElections={setShowCurrentElections}
                handleShowCurrentElections={handleShowCurrentElections}
                handleClearCurrentElections={handleClearCurrentElections}
                electionsInZip={electionsInZip}
                handleInputChange={handleInputChange}
                values={values}
                electionData={electionData}
                candidatesData={candidatesData}
                voteFor={voteFor}
                timeInMilliseconds={timeInMilliseconds}
               />

          </header>

        <Footer />
    </div>
  );
}


export default Elections;
