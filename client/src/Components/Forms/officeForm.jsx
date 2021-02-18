import React, {useState, useEffect} from 'react';
import Proptypes from 'prop-types';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


function OfficeForm(props){

      return (
        <>
        <Modal show={props.showOfficeForm} onHide={props.handleCloseOfficeForm}
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
                        <Form.Label>Minimum Age Required</Form.Label>
                        <Form.Control type="date" name="dob" placeholder="Date of Birth for Age Requirement" />
                    </Form.Group>
                  </Form.Row>
              </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={props.handleCloseOfficeForm}>
            Submit
            </Button>

            <Button variant="secondary" onClick={props.handleCloseOfficeForm}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Button variant="primary" type="submit" onClick={props.handleShowOfficeForm}>
        Office Form
        </Button>
        </>
      );
    }


export default OfficeForm;
