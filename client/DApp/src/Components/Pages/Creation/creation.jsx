import React, {useState, useEffect} from 'react';
import Navigation from '../../HeaderFooter/header.jsx';
import Footer from '../../HeaderFooter/footer.jsx';
import CitizenModal from '../../Modals/citizenModal.jsx';

import axios from 'axios';

import { Nav, Modal, Button } from 'react-bootstrap';

function Creation(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <div className="App">
      <Navigation />
      <header className="App-header">
        <h1>Creation</h1>
          <form>
            <label for="creation">Choose What Option To Create: </label>
            <select name="creation" id="create">
              <option value="citizen">Citizen</option>
              <option value="office">Office</option>
              <option value="election">Election</option>
              <option value="candidate">Candidate</option>
            </select>
          </form>
          <button id="creationSubmit" onClick={handleShow}>Submit</button>

          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Centered Modal</h4>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>

      </header>
      <Footer />
    </div>
  );
}


export default Creation;
