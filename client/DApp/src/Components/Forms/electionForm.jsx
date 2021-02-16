import React, {useState, useEffect} from 'react';
import Proptypes from 'prop-types';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


function ElectionForm(props){

      return (
        <>
        <Modal show={props.showElectionForm} onHide={props.handleCloseElectionForm}
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
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={props.handleCloseElectionForm}>
            Submit
            </Button>

            <Button variant="secondary" onClick={props.handleCloseElectionForm}>
              Close
            </Button>
          </Modal.Footer>
      </Modal>

      <Button variant="primary" type="submit" onClick={props.handleShowElectionForm}>
      Eelection Form
      </Button>
      </>
      );
    }


export default ElectionForm;
