import React from 'react';

import * as ReactBootStrap from 'react-bootstrap';


function CitizenModal(props){

    function MyVerticallyCenteredModal(props) {
      return (
        <ReactBootStrap.Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ReactBootStrap.Modal.Header closeButton>
            <ReactBootStrap.Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </ReactBootStrap.Modal.Title>
          </ReactBootStrap.Modal.Header>
          <ReactBootStrap.Modal.Body>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </p>
          </ReactBootStrap.Modal.Body>
          <ReactBootStrap.Modal.Footer>
            <ReactBootStrap.Button onClick={props.onHide}>Close</ReactBootStrap.Button>
          </ReactBootStrap.Modal.Footer>
        </ReactBootStrap.Modal>
      );
    }

    function HandleCitizenModal() {
      const [modalShow, setModalShow] = React.useState(false);

      return (
        <>
          <ReactBootStrap.Button variant="primary" onClick={() => setModalShow(true)}>
            Launch vertically centered modal
          </ReactBootStrap.Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </>
      );
    }

}

export default CitizenModal;
