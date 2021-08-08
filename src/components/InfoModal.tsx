import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { InfoCircle } from "react-bootstrap-icons"

const InfoModal: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="light" onClick={handleShow} className="ml-1">
        <InfoCircle />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ppig:ng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Dieser Generator ist ein privates Angebot von <a href="https://twitter.com/stoppegp">@stoppegp</a> für Mitglieder und Sympathisanten der <a href="https://piratenpartei.de">Piratenpartei</a>. Die erstellten Bilder müssen im Einklang mit den <a href="https://wiki.piratenpartei.de/Parteiprogramm">Grundsätzen</a> der Piratenpartei sein.<br /><br />Die Verantwortung für die erstellten Bilder liegen ausschließlich beim Nutzer!<br /><br />Wünsche, Anregungen und Kritik gerne an <a href="mailto:piraten@stoppe-gp.de">piraten@stoppe-gp.de</a>.</Modal.Body>
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
