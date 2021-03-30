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


function ZipCodeResults(props){

  const buttonText = props.showCurrentElections ?
      <Button variant="primary" type="submit" onClick={props.handleShowCurrentResults}>Submit</Button>
      :<Button variant="primary" type="submit" onClick={props.handleClearCurrentResults}>Reset Zip Code</Button> ;

  return (
    <>
      <Form>
        <Form.Group controlId="formBasicZipCode">
          <Form.Label>Enter Your Zip Code</Form.Label>
          <Form.Control type="number" name="zipCode" placeholder="Zip Code" onChange={props.handleInputChange} />
        </Form.Group>

        {buttonText}
      </Form>


    </>
  )
}

export default ZipCodeResults;
