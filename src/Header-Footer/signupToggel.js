import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import SignUpFormSection from "../components/register/formSection";

const RegisterToggel = () => {
  const navigate = useNavigate();
  const [navExpanded, setNavExpanded] = useState(false);
  
  return (
    <Navbar bg="light" className="mb-3" expanded={navExpanded} >
      <Container fluid>
        {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} onClick={() => setNavExpanded(navExpanded ? false : "expanded")} >Sign-Up</Navbar.Toggle>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand`}
          aria-labelledby={`offcanvasNavbarLabel-expand`}
          placement="end"
        >
          <Offcanvas.Header closeButton onClick={()=>setNavExpanded(false)}>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="reset__password__sec">
              <div className="sec__content">
              <SignUpFormSection showRightPanel={false}/>
              </div>
            </div>
            
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default RegisterToggel;
