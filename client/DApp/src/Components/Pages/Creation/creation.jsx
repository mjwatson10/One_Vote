import React, {useState, useEffect} from 'react';
import Navigation from '../../HeaderFooter/header.jsx';
import Footer from '../../HeaderFooter/footer.jsx';
import CitizenForm from '../../Forms/citizenForm.jsx';
import OfficeForm from '../../Forms/officeForm.jsx';
import ElectionForm from '../../Forms/electionForm.jsx';
import CandidateForm from '../../Forms/candidateForm.jsx';

import axios from 'axios';
import styled from 'styled-components';

import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


const options = [
  {label: 'Citizen', value: 'citizen'},
  {label: 'Office', value: 'office'},
  {label: 'Election', value: 'election'},
  {label: 'Candidate', value: 'candidate'}
]

const Section = styled.section`
    width: 250px;
    max-width: 600px;
    color: black;
    text-align: left;
  `;


const onChangeInput = (value) => {
  console.log(value);

  if (value === options[0]) {
    return <CitizenForm />
  } else if (value === options[1]) {
    return <OfficeForm />
  } else if (value === options[2]) {
    return <ElectionForm />
  } else if (value === options[3]) {
    return <CandidateForm />
  } else {
    alert("Please select a form");
  }
}


function Creation(props, {style}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return(
    <div className="App">
      <Navigation />
      <header className="App-header">
        <h1>Creation</h1>
        <Form.Group>
          <Section>
            <Select options={options} onChange={onChangeInput} />
          </Section>
          <br />
        </Form.Group>

        <button id="creationSubmit" onClick={handleShow}>Submit</button>


        <Modal show={show} onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          /*<CitizenForm />*/

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleClose}>
            Submit
            </Button>

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </header>

      <Footer />
    </div>
  );
}


export default Creation;
