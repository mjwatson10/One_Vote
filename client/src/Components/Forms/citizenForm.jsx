import React, {useState, useEffect} from 'react';
import Proptypes from 'prop-types';


import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import Web3 from 'web3';


function CitizenForm(props){
      return (
        <>
        <Modal show={props.showCitizenForm} onHide={props.handleCloseCitizenForm}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <Form>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control placeholder="Enter First Name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control placeholder="Enter Last Name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDOB">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group as={Col} controlId="formGridStateId">
                      <Form.Label>State ID</Form.Label>
                      <Form.Control placeholder="Generate State ID" />
                    </Form.Group>

                  <Button variant="primary" type="submit" id="generatorBTN">
                  Generate State ID
                  </Button>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Form.Row>
              </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={props.handleCloseCitizenForm}>
            Submit
            </Button>

            <Button variant="secondary" onClick={props.handleCloseCitizenForm}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Button variant="primary" type="submit" onClick={props.handleShowCitizenForm}>
        Citizen Form
        </Button>
        </>
      );
    }


export default CitizenForm;
