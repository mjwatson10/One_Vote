import React, {useState, useEffect} from 'react';
import Proptypes from 'prop-types';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


function CandidateForm(props){

      return (
        <>
        <Modal show={props.showCandidateForm} onHide={props.handleCloseCandidateForm}
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
                      <Form.Label>Election ID</Form.Label>
                      <Form.Control placeholder="Enter Election ID" />
                    </Form.Group>
                  </Form.Row>
              </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={props.handleCloseCandidateForm}>
            Submit
            </Button>

            <Button variant="secondary" onClick={props.handleCloseCandidateForm}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Button variant="primary" type="submit" onClick={props.handleShowCandidateForm}>
        Candidate Form
        </Button>
        </>
      );
    }


export default CandidateForm;
