import React, {useState, useEffect} from 'react';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


function CandidateModal(props){

      return (
            <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridCitizenId">
                    <Form.Label>Citizen ID</Form.Label>
                    <Form.Control placeholder="Enter Citizen ID" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridStateId">
                    <Form.Label>State ID</Form.Label>
                    <Form.Control placeholder="Enter State ID" />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridOfficeId">
                    <Form.Label>Office ID</Form.Label>
                    <Form.Control placeholder="Enter Office ID" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridElectionId">
                    <Form.Label>Elenection ID</Form.Label>
                    <Form.Control placeholder="Enter Elenection ID" />
                  </Form.Group>
              </Form>
      );
    }


export default CandidateModal;
