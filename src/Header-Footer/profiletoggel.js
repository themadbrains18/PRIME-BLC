import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { kycpage,privateheader } from "../Constants/lang/lang";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { logout } from '../Actions/authAction';

const Profiletoggel = () => {
  const dispatch = new useDispatch();
  const cookies = new Cookies();
  const [navExpanded, setNavExpanded] = useState(false);
  const navigate = useNavigate()
  let type = cookies.get('reqtype');
  let name = '';
  if (type === 'mobile') {
    if (cookies !== undefined) {
      let phone = cookies.get('phone');
      name = phone.substring(0, 2);
    }

  }
  else {
    if (cookies !== undefined && type === 'email') {
      let email = cookies.get('email');
      name = email.substring(0, 2);
    }

  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <Navbar bg="light" className="mb-3" expanded={navExpanded} >
      <Container fluid>
        {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}
        <Navbar.Toggle className='nav-circle' aria-controls={`offcanvasNavbar-profile-expand`} onClick={() => setNavExpanded(navExpanded ? false : "expanded")}>
          <i className="fa fa-user"></i>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-profile-expand`}
          aria-labelledby={`offcanvasNavbar-profile-expand`}
          placement="end"
        >
          <Offcanvas.Header closeButton onClick={()=>setNavExpanded(false)}>
            <Offcanvas.Title id={`offcanvasNavbar-profile-expand`}>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link style={{color : '#fff'}} onClick={() => { navigate('/vendor/profile/' + kycpage['0']['nav']['btn1']['url']); setNavExpanded(false) }}>{kycpage['0']['nav']['btn1']['en']}</Nav.Link>
              <Nav.Link style={{color : '#fff'}} onClick={() => { navigate('/vendor/profile/' + kycpage['0']['nav']['btn2']['url']); setNavExpanded(false) }}>{kycpage['0']['nav']['btn2']['en']}</Nav.Link>
              <Nav.Link style={{color : '#fff'}} onClick={() => { navigate('/vendor/profile/' + kycpage['0']['nav']['btn3']['url']); setNavExpanded(false) }}>{kycpage['0']['nav']['btn3']['en']}</Nav.Link>
            </Nav>
              <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link style={{color : '#fff'}}
                className="btn"
                onClick={(e) => {
                  handleLogout(e); setNavExpanded(false)
                }

                }
              >
                {privateheader['0']['profile']['logout']['en']}
              </Nav.Link>
            </Nav>
            

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default Profiletoggel