import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { InfoCircle } from "react-bootstrap-icons";
import DOMPurify from 'dompurify'

interface InfoModalProps {
  disableMatomo: boolean;
  setDisableMatomo: (x: boolean) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({disableMatomo, setDisableMatomo}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button title="Info" variant="light" onClick={handleShow} className="ml-1">
        <InfoCircle />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ppic:ng</Modal.Title>
        </Modal.Header>
        <Modal.Body><p><div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(process.env.REACT_APP_INFO || "") }} /></p>
        { process.env.REACT_APP_MATOMO_ENABLE == "true" && <h5>Datenschutz</h5> }
        { process.env.REACT_APP_MATOMO_ENABLE == "true" &&
        <p>Zu Analysezwecken werden die Anzahl der Downloads pro Design gespeichert und auf ein Statistikserver hochgeladen. Hierzu wird die Software <em>Matomo</em> verwendet.
          Hierzu wird bei jedem Klick auf die Download-Schaltfläche eine Anfrage an <em>{process.env.REACT_APP_MATOMO_URL}</em> durchgeführt. Dabei wird das aktuell aktive Design mitgeschickt. Die IP-Adresse wird auf dem Server anonymisiert, indem nur die ersten zwei Bytes gespeichert werden. Es werden keinerlei Inhalte der erstellten Grafik gespeichert.
        </p>}
        {!disableMatomo && process.env.REACT_APP_MATOMO_ENABLE == "true" &&
        <p>Die Datenübertragung kannst du auch <a href="#" onClick={() => {localStorage.setItem("disable-matomo", "true"); setDisableMatomo(true)}}>deaktivieren.</a></p>
        }
        { disableMatomo && process.env.REACT_APP_MATOMO_ENABLE == "true" &&
        <p>Die Datenübertragung ist aktuell deaktiviert. Du kannst sie wieder <a href="#" onClick={() => {localStorage.setItem("disable-matomo", "false"); setDisableMatomo(false)}}>aktivieren.</a></p>
        }
        <p><a href="https://github.com/stoppegp/ppicng"><strong>ppic</strong>:ng by @stoppegp</a></p>
        </Modal.Body>
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
