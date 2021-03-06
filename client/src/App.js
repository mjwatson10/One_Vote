import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from './Components/Pages/HomePage/homePage.jsx';
import Creation from './Components/Pages/Creation/creation.jsx';
import Elections from './Components/Pages/Elections/elections.jsx';
import Results from './Components/Pages/Results/results.jsx';
import getWeb3 from './Components/Web3/getWeb3';
// import Web3Context from "./Components/Web3/web3context.jsx";
import OneVote from "./artifacts/OneVote.json";

import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function App(props) {
  const [ values, setValues ] = useState({
                                          fullName: "",
                                          dob: "",
                                          stateId: 0,
                                          zipCode: 0
                                        });


const handleInputChange = (e) => {
  //test
  setValues({
            ...values,
            [e.target.name]: e.target.value.trim()
          });
}

const dateNeeded = (date) => {
  let ageInMilliseconds = Date.parse(date) / 1000;

  return ageInMilliseconds;
}


const handleSubmit = async(e) => {
    e.preventDefault();

  const birthDate = dateNeeded(values.dob);

  handleCloseCitizenForm(values.fullName, birthDate, values.stateId, values.zipCode);
  console.log(values.fullName, values.dob, values.stateId, values.zipCode);
}

const handleCloseCitizenForm = async(name, dob, zipCode, stateId) => {
  await contract.methods.createCitizen(name, dob, zipCode, stateId).send({from: user});
  await contract.event.CitizenAdded().on('data', function(event){
    console.log("Citizen Added: ", event.returnValues);
  });
}

//test end



  const [voteValue, setVoteValue] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const init = async() => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        const user = accounts[0];

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = OneVote.networks[networkId];
        const contract = new web3.eth.Contract(
          OneVote.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        // console.log("web3: ", web3);
        // console.log("Methods: ", contract.methods);
        // console.log("User: ", user);
        setWeb3(web3);
        setAccounts(accounts);
        setContract(contract);
        setUser(user);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    init();

    const load = async() => {
      try {
      // Stores a given value, 5 by default.
      await contract.methods.set(5).send({ from: accounts[0] });

      // Get the value from the contract to prove it worked.
      const response = await contract.methods.get().call();

      // Update state with the result.
      setVoteValue(response);

} catch(error){
    if(typeof web3 !== 'undefined'
        && typeof accounts !== 'undefined'
        && typeof contract !== 'undefined') {
          load();
        }
      }
    }
  }, [web3, accounts, contract]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact strict path="/" component={HomePage} />
          <Route exact strict path="/Home" component={HomePage} />
          <Route exact strict path="/Creation" render={(routeProps) =>
              <Creation
                accounts={accounts}
                contract={contract}
                user={user}
                {...routeProps}
              />
            }
          />
          <Route exact strict path="/Elections" render={(routeProps) =>
              <Elections
                accounts={accounts}
                contract={contract}
                user={user}
                {...routeProps}
              />
            }
          />
          <Route exact strict path="/Results" component={Results} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
