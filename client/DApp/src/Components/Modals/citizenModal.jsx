import React, {useState, useEffect} from 'react';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


function CitizenModal(props){

      return (
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
                      <Form.Label>Select Date</Form.Label>
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
      );
    }


export default CitizenModal;
