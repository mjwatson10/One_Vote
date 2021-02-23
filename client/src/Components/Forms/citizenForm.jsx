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
  const { register, handleSubmit, watch, errors } = useForm();
  const { fullName, setFullName } = useState("");


  const onSubmit = (data) => {
    // setFullName(oldValue => )
    console.log(data);
  }

      return (
        <>
        <Modal show={props.showCitizenForm} onHide={props.handleCloseCitizenForm}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          <Modal.Body>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" value={fullName} name="fullName" placeholder="Enter Full Name" ref={register} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDOB">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" name="dob" placeholder="Date of Birth" ref={register} required />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group as={Col} controlId="formGridStateId">
                      <Form.Label>State ID</Form.Label>
                      <Form.Control type="number" name="stateId" placeholder="Generate State ID" ref={register} required />
                    </Form.Group>

                  <Button variant="primary" type="submit" id="generatorBTN">
                  Generate State ID
                  </Button>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridZipCode">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control type="number" name="zipCode" placeholder="Enter Zip Code" ref={register} required />
                    </Form.Group>
                  </Form.Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={props.handleCloseCitizenForm}>
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
