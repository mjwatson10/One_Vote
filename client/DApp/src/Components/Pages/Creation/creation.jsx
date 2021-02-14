import React, {useState, useEffect} from 'react';
import Navigation from '../../HeaderFooter/header.jsx';
import Footer from '../../HeaderFooter/footer.jsx';
import CitizenModal from '../../Modals/citizenModal.jsx';

import axios from 'axios';

import * as ReactBootStrap from 'react-bootstrap';

function Creation(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <div className="App">
      <Navigation />
      <header className="App-header">
        <h1>Creation</h1>
        <ReactBootStrap.Form.Group>
          <ReactBootStrap.Form.Control as="select">
            <option value="citizen">Citizen</option>
            <option value="office">Office</option>
            <option value="election">Election</option>
            <option value="candidate">Candidate</option>
          </ReactBootStrap.Form.Control>
          <br />
        </ReactBootStrap.Form.Group>

        <button id="creationSubmit" onClick={handleShow}>Submit</button>



      </header>
      <Footer />
    </div>
  );
}


export default Creation;
