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


function Elections(props){
  return (
    <div className="App">
      <Navigation />
          <header className="App-header">
            <h1>
              Elections Info and Voting
            </h1>
              <p>Creating Fair and Transparent Elections on the Blockchain</p>
          </header>
        <Footer />
    </div>
  );
}


export default Elections;
