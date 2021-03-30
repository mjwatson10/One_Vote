import React, {useState, useEffect} from 'react';
import Proptypes from 'prop-types';

import axios from 'axios';
import styled from 'styled-components';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


function ElectionForm(props){
  const [ values, setValues ] = useState({
    officeId: 0,
    start: "",
    end: ""
  });


  const handleInputChange = (e) => {
    setValues({
              ...values,
              [e.target.name]: e.target.value.trim()
            });
  }


  const handleSubmit = async(e) => {
      e.preventDefault();

      const startDate = props.dateNeeded(values.start);
      const endDate = props.dateNeeded(values.end);
      console.log("Date: ", values.start);

      props.handleSubmitElectionForm(values.officeId, startDate, endDate);
  }

      return (
        <>
        <Modal show={props.showElectionForm} onHide={props.handleCloseElectionForm}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Election Form</Modal.Title>
          </Modal.Header>

          <Modal.Body>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridOfficeId">
                      <Form.Label>Office ID</Form.Label>
                      <Form.Control type="number" name="officeId" placeholder="Enter Office ID" onChange={handleInputChange} required />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridStartDate">
                        <Form.Label>Start Date of Election</Form.Label>
                        <Form.Control type="date" name="start" placeholder="Start Date of Election" onChange={handleInputChange} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEndDate">
                        <Form.Label>End Date of Election</Form.Label>
                        <Form.Control type="date" name="end" placeholder="End Date of Election" onChange={handleInputChange} required />
                    </Form.Group>
                  </Form.Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
            </Button>

            <Button variant="secondary" onClick={props.handleCloseElectionForm}>
              Close
            </Button>
          </Modal.Footer>
          </Form>
      </Modal>


      <Card style={{ width: '18rem', margin: '15px'}}>
        <Card.Body>
          <Card.Title style={{ color: 'black'}}><h3>Create Election</h3></Card.Title>
          <Card.Text style={{ color: 'black', fontSize:'20px' }}>
            <span>This will allow you to create an Election to vote in.</span>
          </Card.Text>
            <Button variant="primary" type="submit" onClick={props.handleShowElectionForm} style={{ marginBottom: '-60px' }}>
            Eelection Form
            </Button>
          </Card.Body>
        </Card>
      </>
      );
    }


export default ElectionForm;
