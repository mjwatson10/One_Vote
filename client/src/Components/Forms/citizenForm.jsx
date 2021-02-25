import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import Proptypes from 'prop-types';

import axios from 'axios';
import styled from 'styled-components';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Web3 from 'web3';


function CitizenForm(props){
  const [ values, setValues ] = useState({
    fullName: "",
    dob: "",
    stateId: 0,
    zipCode: 0
  });


const handleInputChange = (e) => {
  setValues({
            ...values,
            [e.target.name]: e.target.value.trim()
          });
}


const handleSubmit = async(e) => {
    e.preventDefault();
    const birthDate = props.dateNeeded(values.dob);

    props.handleCloseCitizenForm(values.fullName, birthDate, values.stateId, values.zipCode);
}

      return (
        <>
        <Modal show={props.showCitizenForm} onHide={props.handleCloseCitizenForm}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Form>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridFirstName">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control type="text" onChange={handleInputChange} name="fullName" placeholder="Enter Full Name" required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridDOB">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control type="date" name="dob" onChange={handleInputChange} placeholder="Date of Birth" required />
                        </Form.Group>
                      </Form.Row>

                      <Form.Group as={Col} controlId="formGridStateId">
                          <Form.Label>State ID</Form.Label>
                          <Form.Control type="number" name="stateId" onChange={handleInputChange} placeholder="Generate State ID" required />
                        </Form.Group>

                      <Button variant="primary" type="submit" id="generatorBTN">
                      Generate State ID
                      </Button>

                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridZipCode">
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control type="number" name="zipCode" onChange={handleInputChange} placeholder="Enter Zip Code" required />
                        </Form.Group>
                      </Form.Row>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
                </Button>

                <Button variant="secondary" onClick={props.handleCloseCitizenForm}>
                  Close
                </Button>
              </Modal.Footer>
            </Form>
        </Modal>

        <Card style={{ width: '18rem', margin: '15px'}}>
          <Card.Body>
            <Card.Title style={{ color: 'black'}}>Create Citizen</Card.Title>
            <Card.Text style={{ color: 'black'}}>
              This will allow you to create a Citizen who can vote in an Election.
            </Card.Text>
              <Button variant="primary" type="submit" onClick={props.handleShowCitizenForm}>
              Citizen Form
              </Button>
            </Card.Body>
          </Card>
        </>
      );
    }


export default CitizenForm;
