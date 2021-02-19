import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import Proptypes from 'prop-types';


import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import Web3 from 'web3';


function CitizenForm(props){
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
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
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" name="firstName" placeholder="Enter First Name" ref={register} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" name="lastName" placeholder="Enter Last Name" ref={register} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDOB">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" name="dob" placeholder="Date of Birth" ref={register} />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group as={Col} controlId="formGridStateId">
                      <Form.Label>State ID</Form.Label>
                      <Form.Control type="number" name="stateId" placeholder="Generate State ID" ref={register} />
                    </Form.Group>

                  <Button variant="primary" type="submit" id="generatorBTN">
                  Generate State ID
                  </Button>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridZipCode">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control type="number" name="zipCode" placeholder="Enter Zip Code" ref={register}/>
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

        <Button variant="primary" type="submit" onClick={props.handleShowCitizenForm}>
        Citizen Form
        </Button>
        </>
      );
    }


export default CitizenForm;
