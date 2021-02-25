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
  const handleCloseCitizenForm = async(name, dob, zipCode, stateId) => {
    setShowCitizenForm(oldValue => !oldValue);
    await props.contract.methods.createCitizen(name, dob, zipCode, stateId).send({from: props.user});
    await props.contract.event.CitizenAdded().on('data', function(event){
      console.log("Citizen Added: ", event.returnValues);
    });
    console.log("Methods: ", props.contract);
    console.log("Accounts: ", props.accounts);
}
  const handleShowCitizenForm = () => {
    setShowCitizenForm(oldValue => !oldValue);
  }

  //offices
  const [showOfficeForm, setShowOfficeForm] = useState(false);
  const handleCloseOfficeForm = () => {
    setShowOfficeForm(oldValue => !oldValue);
  }
  const handleShowOfficeForm = () => {
    setShowOfficeForm(oldValue => !oldValue);
  }

  //elections
  const [showElectionForm, setShowElectionForm] = useState(false);
  const handleCloseElectionForm = () => {
    setShowElectionForm(oldValue => !oldValue);
  }
  const handleShowElectionForm = () => {
    setShowElectionForm(oldValue => !oldValue);
  }

  //candidates
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const handleCloseCandidateForm = () => {
    setShowCandidateForm(oldValue => !oldValue);
  }
  const handleShowCandidateForm = () => {
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
          />
          <OfficeForm
            showOfficeForm={showOfficeForm}
            handleShowOfficeForm={handleShowOfficeForm}
            handleCloseOfficeForm={handleCloseOfficeForm}
            dateNeeded={dateNeeded}
          />
        </Row>
        <Row>
          <ElectionForm
            showElectionForm={showElectionForm}
            handleShowElectionForm={handleShowElectionForm}
            handleCloseElectionForm={handleCloseElectionForm}
            dateNeeded={dateNeeded}
          />
          <CandidateForm
            showCandidateForm={showCandidateForm}
            handleShowCandidateForm={handleShowCandidateForm}
            handleCloseCandidateForm={handleCloseCandidateForm}
            dateNeeded={dateNeeded}
          />
        </Row>

      </header>

      <Footer />
    </div>
  );
}


export default Creation;
