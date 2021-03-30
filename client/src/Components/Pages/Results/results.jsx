import React, {useState, useEffect} from 'react';
import Proptypes from 'prop-types';

import Navigation from '../../HeaderFooter/header.jsx';
import Footer from '../../HeaderFooter/footer.jsx';
import App from '../../../App.js';
import ZipCodeResults from './zipCodeResults.jsx';

import axios from 'axios';
import styled from 'styled-components';

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';


function Results(props){
  const [ values, setValues ] = useState({
    zipCode: 0
  });

  const [ showCurrentResults, setShowCurrentResults ] = useState(true);

  const handleShowCurrentResults = (event) => {
    event.preventDefault();
    setShowCurrentResults(oldValue => !oldValue);
    console.log("Show: ", showCurrentResults);
  }

  const handleClearCurrentResults = () => {
    setShowCurrentResults(oldValue => !oldValue);
    setValues(oldValue => 0);
    console.log("Show: ", showCurrentResults);
  }

  const handleInputChange = (e) => {
    setValues({
                ...values,
                [e.target.name]: e.target.value.trim()
              });
  }


  return (
    <div className="App">
      <Navigation />
          <header className="App-header">
            <h1>
              Elections Results
            </h1>
              <p>Creating Fair and Transparent Elections on the Blockchain</p>

            <ZipCodeResults
              handleShowCurrentResults={handleShowCurrentResults}
              handleClearCurrentResults={handleClearCurrentResults}
              handleInputChange={handleInputChange}
              showCurrentResults={showCurrentResults}
              setShowCurrentResults={setShowCurrentResults}
              values={values}
            />

          </header>
        <Footer />
    </div>
  );
}


export default Results;
