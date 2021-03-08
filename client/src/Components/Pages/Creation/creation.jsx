import React, {useState, useEffect} from 'react';
import Proptypes from 'prop-types';

import Navigation from '../../HeaderFooter/header.jsx';
import Footer from '../../HeaderFooter/footer.jsx';
import CitizenForm from '../../Forms/citizenForm.jsx';
import OfficeForm from '../../Forms/officeForm.jsx';
import ElectionForm from '../../Forms/electionForm.jsx';
import CandidateForm from '../../Forms/candidateForm.jsx';
import App from '../../../App.js';

import axios from 'axios';
import styled from 'styled-components';

import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Web3 from 'web3';


const Section = styled.section`
    width: 250px;
    max-width: 600px;
    color: black;
    text-align: left;
  `;


function Creation(props) {
  //converts dates to readable numbers for solidity
  const dateNeeded = (date) => {
    let ageInMilliseconds = Date.parse(date) / 1000;

    return ageInMilliseconds;
  }

  //modal functions
  //citizens
  const [showCitizenForm, setShowCitizenForm] = useState(false);
    //handles contract call
  const handleSubmitCitizenForm = async(name, dob, zipCode, stateId) => {
    setShowCitizenForm(oldValue => !oldValue);
    await props.contract.methods.createCitizen(name, dob, zipCode, stateId).send({from: props.user});
    await props.contract.events.CitizenAdded().on('data', (event) => {
      console.log("Citizen Added: ", event.returnValues);
    });
}
  const handleShowCitizenForm = () => {
    setShowCitizenForm(oldValue => !oldValue);
    // console.log("events: ", props.contract.events);
  }
  const handleCloseCitizenForm = () => {
    setShowCitizenForm(oldValue => !oldValue);
  }


  //offices
  const [showOfficeForm, setShowOfficeForm] = useState(false);
    //handles contract call
  const handleSubmitOfficeForm = async(officeTitle, zipCode, requiredAge) => {
    setShowOfficeForm(oldValue => !oldValue);
    await props.contract.methods.createOffice(officeTitle, zipCode, requiredAge).send({from: props.user});
    await props.contract.events.OfficeAdded().on('data', (event) => {
      console.log("Office Added: ", event.returnValues);
    });
  }
  const handleShowOfficeForm = () => {
    setShowOfficeForm(oldValue => !oldValue);
  }
  const handleCloseOfficeForm = () => {
    setShowOfficeForm(oldValue => !oldValue);
  }


  //elections
  const [showElectionForm, setShowElectionForm] = useState(false);
    //handles contract call
  const handleSubmitElectionForm = async(officeId, start, end) => {
    setShowElectionForm(oldValue => !oldValue);
    await props.contract.methods.createAnElection(officeId, start, end).send({from: props.user});
    await props.contract.events.ElectionAdded().on('data', (event) => {
      console.log("Election Added: ", event.returnValues);
    });
  }
  const handleShowElectionForm = () => {
    setShowElectionForm(oldValue => !oldValue);
  }
  const handleCloseElectionForm = () => {
    setShowElectionForm(oldValue => !oldValue);
  }


  //candidates
  const [showCandidateForm, setShowCandidateForm] = useState(false);
    //handles contract call
  const handleSubmitCandidateForm = async(citizenId, stateId, officeId, electionId) => {
    setShowCandidateForm(oldValue => !oldValue);
    await props.contract.methods.createCandidate(citizenId, stateId, officeId, electionId).send({from: props.user});
    await props.contract.events.CandidateAdded().on('data', (event) => {
      console.log("Candidate Added: ", event.returnValues);
    });
  }
  const handleShowCandidateForm = () => {
    setShowCandidateForm(oldValue => !oldValue);
  }
  const handleCloseCandidateForm = () => {
    setShowCandidateForm(oldValue => !oldValue);
  }


  return(
    <div className="App">
      <Navigation />
      <header className="App-header">
        <h1>Creation</h1>

        <Row>
          <CitizenForm
            showCitizenForm={showCitizenForm}
            handleShowCitizenForm={handleShowCitizenForm}
            handleCloseCitizenForm={handleCloseCitizenForm}
            dateNeeded={dateNeeded}
            handleSubmitCitizenForm={handleSubmitCitizenForm}
          />
          <OfficeForm
            showOfficeForm={showOfficeForm}
            handleShowOfficeForm={handleShowOfficeForm}
            handleCloseOfficeForm={handleCloseOfficeForm}
            dateNeeded={dateNeeded}
            handleSubmitOfficeForm={handleSubmitOfficeForm}
          />
        </Row>
        <Row>
          <ElectionForm
            showElectionForm={showElectionForm}
            handleShowElectionForm={handleShowElectionForm}
            handleCloseElectionForm={handleCloseElectionForm}
            dateNeeded={dateNeeded}
            handleSubmitElectionForm={handleSubmitElectionForm}
          />
          <CandidateForm
            showCandidateForm={showCandidateForm}
            handleShowCandidateForm={handleShowCandidateForm}
            handleCloseCandidateForm={handleCloseCandidateForm}
            dateNeeded={dateNeeded}
            handleSubmitCandidateForm={handleSubmitCandidateForm}
          />
        </Row>

      </header>

      <Footer />
    </div>
  );
}


export default Creation;
