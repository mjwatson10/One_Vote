import React, {useState, useEffect} from 'react';
import Navigation from '../../HeaderFooter/header.jsx';
import Footer from '../../HeaderFooter/footer.jsx';
import CitizenForm from '../../Forms/citizenForm.jsx';
import OfficeForm from '../../Forms/officeForm.jsx';
import ElectionForm from '../../Forms/electionForm.jsx';
import CandidateForm from '../../Forms/candidateForm.jsx';

import axios from 'axios';


import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

function Creation(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return(
    <div className="App">
      <Navigation />
      <header className="App-header">
        <h1>Creation</h1>
        <Form.Group>
          <select className="creationType">
            <option value="citizen">Citizen</option>
            <option value="office">Office</option>
            <option value="election">Election</option>
            <option value="candidate">Candidate</option>
          </select>
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

          <CitizenForm />

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
