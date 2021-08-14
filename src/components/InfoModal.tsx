import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { InfoCircle } from "react-bootstrap-icons";

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
          <Modal.Title>ppig:ng</Modal.Title>
        </Modal.Header>
        <Modal.Body><p>Dieser Generator ist ein privates Angebot von <a href="https://twitter.com/stoppegp">@stoppegp</a> für Mitglieder und Sympathisanten der <a href="https://piratenpartei.de">Piratenpartei</a>. Die erstellten Bilder müssen im Einklang mit den <a href="https://wiki.piratenpartei.de/Parteiprogramm">Grundsätzen</a> der Piratenpartei sein.<br /><br />Die Verantwortung für die erstellten Bilder liegen ausschließlich beim Nutzer!<br /><br />Wünsche, Anregungen und Kritik gerne an <a href="mailto:piraten@stoppe-gp.de">piraten@stoppe-gp.de</a>.<br /><br /><br /><a href="https://legacy.ppic.stoppe-gp.de">Zum alten Generator</a><br /><br /><a href="https://legacy.ppiceu.stoppe-gp.de">Zum alten EU-Generator</a>
        </p><h5>Datenschutz</h5><p>Zu Analysezwecken werden die Anzahl der Downloads pro Design gespeichert und auf ein Statistikserver hochgeladen. Hierzu wird die Software <em>Matomo</em> verwendet.
          Hierzu wird bei jedem Klick auf die Download-Schaltfläche eine Anfrage an <em>https://matomo.stoppe-gp.de</em> durchgeführt. Dabei wird das aktuell aktive Design mitgeschickt. Die IP-Adresse wird auf dem Server anonymisiert, indem nur die ersten zwei Bytes gespeichert werden. Es werden keinerlei Inhalte der erstellten Grafik gespeichert.
        </p>
        { !disableMatomo &&
        <p>Die Datenübertragung kannst du auch <a href="#" onClick={() => {localStorage.setItem("disable-matomo", "true"); setDisableMatomo(true)}}>deaktivieren.</a></p>
        }
        { disableMatomo &&
        <p>Die Datenübertragung ist aktuell deaktiviert. Du kannst sie wieder <a href="#" onClick={() => {localStorage.setItem("disable-matomo", "false"); setDisableMatomo(false)}}>aktivieren.</a></p>
        }
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
