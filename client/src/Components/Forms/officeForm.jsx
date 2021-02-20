import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import Proptypes from 'prop-types';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


function OfficeForm(props){
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

      return (
        <>
        <Modal show={props.showOfficeForm} onHide={props.handleCloseOfficeForm}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <Form>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridOfficeName">
                      <Form.Label>Office Name</Form.Label>
                      <Form.Control type="text" name="officeName" placeholder="Enter Office Name" ref={register} />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control type="number" name="zipCode" placeholder="Enter Zip Code" ref={register} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDOB">
                        <Form.Label>Minimum Age Required</Form.Label>
                        <Form.Control type="date" name="dob" placeholder="Date of Birth for Age Requirement" ref={register} />
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
          </Form>
        </Modal>

        <Card style={{ width: '18rem', margin: '15px'}}>
          <Card.Body>
            <Card.Title style={{ color: 'black'}}>Create Office</Card.Title>
            <Card.Text style={{ color: 'black'}}>
              This will allow you to create an Office for an Election.
            </Card.Text>
              <Button variant="primary" type="submit" onClick={props.handleShowOfficeForm}>
              Office Form
              </Button>
            </Card.Body>
          </Card>
        </>
      );
    }


export default OfficeForm;
