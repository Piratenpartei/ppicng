import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DesignInterface from "./interfaces/DesignInterface";
import LogoInterface from "./interfaces/LogoInterface";
import LogoGroupInterface from "./interfaces/LogoGroupInterface";
import React from "react";

interface LogoModalProps {
  logo?: { group: string; key: string; logo: LogoInterface };
  onChange: (groupname: string, logoname: string) => void;
  designs: Record<string, DesignInterface>;
  logos: { [x: string]: LogoGroupInterface };
}

interface EditorParams {
  design: string;
}

const LogoModal: React.FC<LogoModalProps> = ({
  logo,
  onChange,
  designs,
  logos,
}) => {
  const [show, setShow] = useState(false);

  const logopath = require.context("../logos", true, /\.(jpg|png)$/);

  const { design } = useParams<EditorParams>();
  const logoActive = designs[design]?.logoActive || false;

  let logos0: { [x: string]: LogoGroupInterface } = {};
  Object.entries(logos).forEach(([groupname, group]) => {
    if (
      !group.excludeFromDesigns ||
      !group.excludeFromDesigns.includes(design)
    ) {
      logos0[groupname] = group;
    }
  });

  useEffect(() => {
    if (!logo || !Object.keys(logos0).includes(logo.group) || !Object.keys(logos0[logo.group].logos).includes(logo.key)) {
      const firstGroup = Object.keys(logos0)[0];
      const firstLogo = Object.keys(logos0[firstGroup].logos)[0];
      onChange(firstGroup, firstLogo);
    }
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {logoActive && (
        <>
          <div className="nav-item dropdown">
            <a
              href="#"
              onClick={handleShow}
              className="dropdown-toggle nav-link"
            >
              Logo
            </a>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Logo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="imageselector">
                {Object.entries(logos0).map(([groupname, group]) => {
                  return (
                    <React.Fragment key={"nh6" + groupname}>
                      <h6 key={"logoh6" + groupname}>
                        {logos0[groupname].title}
                      </h6>
                      {Object.entries(group.logos).map(([logoname, logo0]) => {
                        return (
                          <span key={"logospan-" + groupname + logoname}>
                            <input
                              key={"logoinput-" + groupname + logoname}
                              checked={
                                logo && logo.group === groupname && logo.key == logoname
                              }
                              type="radio"
                              id={"logoinput-" + groupname + logoname}
                              value={[groupname, logoname]}
                              name="logo"
                              onChange={(e) => {
                                onChange(groupname, logoname);
                                handleClose();
                              }}
                            />
                            <label
                              key={"logolabel-" + groupname + logoname}
                              htmlFor={"logoinput-" + groupname + logoname}
                              style={{
                                backgroundImage:
                                  "url(" +
                                  logopath(logo0.default).default +
                                  ")",
                              }}
                            ></label>
                          </span>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};
export default LogoModal;
