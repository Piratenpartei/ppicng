import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import DesignInterface from "./interfaces/DesignInterface";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

interface DesignNavProps {
  designs: Record<string, DesignInterface>;
}
interface DesignNavParams {
  design: string;
}

const DesignNav: React.FC<DesignNavProps> = ({ designs }) => {
  const { design } = useParams<DesignNavParams>();
  return (
    <Navbar.Collapse>
      <Nav>
        <NavDropdown id="designnav" title={designs[design].title}>
          {Object.entries(designs).map(([name, design]) => {
            return (
              <NavDropdown.Item as={NavLink} to={"/" + name}>
                {design.title}
              </NavDropdown.Item>
            );
          })}
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  );
};
export default DesignNav;
