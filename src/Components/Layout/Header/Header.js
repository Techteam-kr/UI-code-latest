import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./Header.scss";
const Header = () => {
  const [activeLink, setActiveLink] = useState();
  return (
    <div className="navigation">
      <Nav
        activeKey={activeLink}
        onSelect={(selectedKey) => setActiveLink((selectedKey) => selectedKey)}
      >
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="dashboard">
            <Link to={`/${activeLink}`}>Dashboard</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Reports</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            User Enrollment
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};
export default Header;
