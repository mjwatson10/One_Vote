import React, {useState, useEffect} from 'react';
import Proptypes from 'prop-types';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


function OfficeForm(props){
  const [ values, setValues ] = useState({
    officeName: "",
    zipCode: 0,
    minimumBirthDate: ""
  });


  const handleInputChange = (e) => {
    setValues({
              ...values,
              [e.target.name]: e.target.value.trim()
            });
  }


  const handleSubmit = async(e) => {
      e.preventDefault();

      const minimum = props.dateNeeded(values.minimumBirthDate);

      props.handleSubmitOfficeForm(values.officeName, values.zipCode, minimum);
  }
      return (
        <>
        <Modal show={props.showOfficeForm} onHide={props.handleCloseOfficeForm}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Office Form</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <Form>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridOfficeName">
                      <Form.Label>Office Name</Form.Label>
                      <Form.Control type="text" name="officeName" placeholder="Enter Office Name" onChange={handleInputChange} required />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control type="number" name="zipCode" placeholder="Enter Zip Code" onChange={handleInputChange} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDOB">
                        <Form.Label>Minimum Age Required</Form.Label>
                        <Form.Control type="date" name="minimumBirthDate" placeholder="Date of Birth for Age Requirement" onChange={handleInputChange} required />
                    </Form.Group>
                  </Form.Row>
              </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
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
            <Card.Title style={{ color: 'black'}}><h3>Create Office</h3></Card.Title>
            <Card.Text style={{ color: 'black', fontSize: '20px' }}>
              <span>This will allow you to create an Office for an Election.</span>
            </Card.Text>
              <Button variant="primary" type="submit" onClick={props.handleShowOfficeForm} style={{ marginBottom: '-60px' }}>
              Office Form
              </Button>
            </Card.Body>
          </Card>
        </>
      );
    }


export default OfficeForm;
