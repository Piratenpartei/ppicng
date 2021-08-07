import { Button, Modal, NavDropdown, Nav } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { InfoCircle } from "react-bootstrap-icons"
import logos from "../logos/logos.json";
import DesignInterface from "./interfaces/DesignInterface";

interface LogoModalProps {
  logo: string
  onChange: (logo: string) => void,
  designs: Record<string, DesignInterface>;
}

interface EditorParams {
  design: string;
}

const LogoModal: React.FC<LogoModalProps> = ({logo, onChange, designs}) => {
  const [show, setShow] = useState(false);

  const logopath = require.context("../logos", true, /\.(jpg|png)$/);

  const { design } = useParams<EditorParams>();
  const logoActive = designs[design]?.logoActive || false

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    {logoActive && <>
    <div className="nav-item dropdown">
      <a href="#" onClick={handleShow} className="dropdown-toggle nav-link">
      Logo
      </a>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logo</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="cc-selector" onChange={(e) => {handleClose(); onChange((e.target as HTMLInputElement).value);}}>
    {Object.entries(logos).map(([name, logo0]) => {
                
        return(<>    <input checked={logo===name} type="radio" id={"logo-" + name} value={name} name="logo" />
        <label className="drinkcard-cc" htmlFor={"logo-" + name} style={{backgroundImage: "url("+logopath(logo0.default).default+")"}}></label></>)
    })}
    
    </div></Modal.Body>

      </Modal></>}
    </>
  );
};
export default LogoModal;
