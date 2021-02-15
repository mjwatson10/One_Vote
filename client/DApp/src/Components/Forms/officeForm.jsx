import React, {useState, useEffect} from 'react';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


function OfficeForm(props){

      return (
        <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridOfficeName">
                <Form.Label>Office Name</Form.Label>
                <Form.Control placeholder="Enter Office Name" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDOB">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control type="date" name="dob" placeholder="Date of Birth for Age Requirement" />
              </Form.Group>
            </Form.Row>
          </Form>
      );
    }


export default OfficeForm;
