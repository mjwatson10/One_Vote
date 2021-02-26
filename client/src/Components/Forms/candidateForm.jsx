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


function CandidateForm(props){
  const [ values, setValues ] = useState({
    citizenId: 0,
    stateId: 0,
    officeId: 0,
    electionId: 0
  });


  const handleInputChange = (e) => {
    setValues({
              ...values,
              [e.target.name]: e.target.value.trim()
            });
  }


  const handleSubmit = async(e) => {
      e.preventDefault();

      props.handleSubmitCandidateForm(values.citizenId, values.stateId, values.officeId, values.electionId);
  }

      return (
        <>
        <Modal show={props.showCandidateForm} onHide={props.handleCloseCandidateForm}
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
                    <Form.Group as={Col} controlId="formGridCitizenId">
                      <Form.Label>Citizen ID</Form.Label>
                      <Form.Control type="number" name="citizenId" placeholder="Enter Citizen ID" onChange={handleInputChange} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridStateId">
                      <Form.Label>State ID</Form.Label>
                      <Form.Control type="number" name="stateId" placeholder="Enter State ID" onChange={handleInputChange} required />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridOfficeId">
                      <Form.Label>Office ID</Form.Label>
                      <Form.Control type="number" name="officeId" placeholder="Enter Office ID" onChange={handleInputChange} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridElectionId">
                      <Form.Label>Election ID</Form.Label>
                      <Form.Control type="number" name="electionId" placeholder="Enter Election ID" onChange={handleInputChange} required />
                    </Form.Group>
                  </Form.Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
            </Button>

            <Button variant="secondary" onClick={props.handleCloseCandidateForm}>
              Close
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>


        <Card style={{ width: '18rem', margin: '15px'}}>
          <Card.Body>
            <Card.Title style={{ color: 'black'}}>Create Candidate</Card.Title>
            <Card.Text style={{ color: 'black'}}>
              This will allow you to create a Candidate to run for Office.
            </Card.Text>
              <Button variant="primary" type="submit" onClick={props.handleShowCandidateForm}>
              Candidate Form
              </Button>
            </Card.Body>
          </Card>
        </>
      );
    }


export default CandidateForm;
