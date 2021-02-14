import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from './Components/Pages/HomePage/homePage.jsx';
import Creation from './Components/Pages/Creation/creation.jsx';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import * as ReactBootStrap from 'react-bootstrap';

function App() {

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact strict path="/" component={HomePage} />
          <Route exact strict path="/Home" component={HomePage} />
          <Route exact strict path="/Creation" component={Creation} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
