import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import Proptypes from 'prop-types';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


function CandidateForm(props){
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

      return (
        <>
        <Modal show={props.showCandidateForm} onHide={props.handleCloseCandidateForm}
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
                    <Form.Group as={Col} controlId="formGridCitizenId">
                      <Form.Label>Citizen ID</Form.Label>
                      <Form.Control type="number" name="CitizenId" placeholder="Enter Citizen ID" ref={register} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridStateId">
                      <Form.Label>State ID</Form.Label>
                      <Form.Control type="number" name="StateId" placeholder="Enter State ID" ref={register} />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridOfficeId">
                      <Form.Label>Office ID</Form.Label>
                      <Form.Control type="number" name="OfficeId" placeholder="Enter Office ID" ref={register} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridElectionId">
                      <Form.Label>Election ID</Form.Label>
                      <Form.Control type="number" name="ElectionId" placeholder="Enter Election ID" ref={register} />
                    </Form.Group>
                  </Form.Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={props.handleCloseCandidateForm}>
            Submit
            </Button>

            <Button variant="secondary" onClick={props.handleCloseCandidateForm}>
              Close
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>

        <Button variant="primary" type="submit" onClick={props.handleShowCandidateForm}>
        Candidate Form
        </Button>
        </>
      );
    }


export default CandidateForm;
