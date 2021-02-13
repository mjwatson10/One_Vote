import React, {useState, useEffect} from 'react';
import Navigation from '../../HeaderFooter/header.jsx';
import Footer from '../../HeaderFooter/footer.jsx';

import logo from '../../../logo.svg';
import '../../../App.css';


import * as ReactBootStrap from 'react-bootstrap';

function HomePage() {
  return (
    <div className="App">
      <Navigation />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>
              One_Vote
            </h1>
              <p>Creating Fair and Transparent Elections on the Blockchain</p>
          </header>
        <Footer />
    </div>
  );
}

export default HomePage;
