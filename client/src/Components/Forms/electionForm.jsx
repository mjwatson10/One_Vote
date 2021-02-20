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


function ElectionForm(props){
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

      return (
        <>
        <Modal show={props.showElectionForm} onHide={props.handleCloseElectionForm}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          <Modal.Body>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridOfficeId">
                      <Form.Label>Office ID</Form.Label>
                      <Form.Control type="number" name="OfficeId" placeholder="Enter Office ID" ref={register} />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridStartDate">
                        <Form.Label>Start Date of Election</Form.Label>
                        <Form.Control type="date" name="start" placeholder="Start Date of Election" ref={register} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEndDate">
                        <Form.Label>End Date of Election</Form.Label>
                        <Form.Control type="date" name="end" placeholder="End Date of Election" ref={register} />
                    </Form.Group>
                  </Form.Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={props.handleCloseElectionForm}>
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
          <Card.Title style={{ color: 'black'}}>Create Election</Card.Title>
          <Card.Text style={{ color: 'black'}}>
            This will allow you to create an Election to vote in.
          </Card.Text>
            <Button variant="primary" type="submit" onClick={props.handleShowElectionForm}>
            Eelection Form
            </Button>
          </Card.Body>
        </Card>
      </>
      );
    }


export default ElectionForm;
