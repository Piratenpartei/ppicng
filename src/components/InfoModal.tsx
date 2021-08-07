import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { InfoCircle } from "react-bootstrap-icons"

const InfoModal: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        <InfoCircle />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ppig:ng</Modal.Title>
        </Modal.Header>
        <Modal.Body>[todo]</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Schließen
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default InfoModal;
