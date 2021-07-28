import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
const Modals = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.buttonTitle}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.Content}</Modal.Body>
        <Modal.Footer>
          {props.Close == null ? null : (
            <Button variant="secondary" onClick={handleClose}>
              {props.Close}
            </Button>
          )}
          {props.Summit == null ? null : (
            <Button variant="primary" onClick={props.clicked}>
              {props.Summit}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Modals;
