import React, {useState, useEffect} from 'react';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


function ElectionForm(props){

      return (
        <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridOfficeId">
                <Form.Label>Office ID</Form.Label>
                <Form.Control placeholder="Enter Office ID" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridStartDate">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control type="date" name="start" placeholder="Start Date of Election" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEndDate">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control type="date" name="end" placeholder="End Date of Election" />
              </Form.Group>
            </Form.Row>
          </Form>
      );
    }


export default ElectionForm;
