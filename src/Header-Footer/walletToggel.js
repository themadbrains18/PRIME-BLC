import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { privateheader, assetsnav } from "../Constants/lang/lang";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

const WalletToggel = () => {
  const navigate = useNavigate();
  const [navExpanded, setNavExpanded] = useState(false);

  const assetsOverview = useSelector((state) => state.assetoverview);

  let session = sessionStorage.getItem('token')

  return (
    <Navbar bg="light" className="mb-3" expanded={navExpanded} >
      <Container fluid>
        {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} onClick={() => setNavExpanded(navExpanded ? false : "expanded")} >
          <i className="fa fa-wallet" aria-hidden="true"></i>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand`}
          aria-labelledby={`offcanvasNavbarLabel-expand`}
          placement="end"
        >
          <Offcanvas.Header closeButton onClick={() => { setNavExpanded(false) }}>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
            </Offcanvas.Title>
            {/* <i className="fa fa-bars" aria-hidden="true"></i> */}
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="header offcanvas-responsive-header" id="header">
              <nav className="navbar navbar-expand-md  navbar-dark w-100 p-0 flex-nowrap">
                <div className="left-header">
                  <div className="links lg-size-header lg-nav-header" >
                    <ul className="nav flex-nowrap ">
                      <li className="nav-item">
                        <a className="nav-link wallet-assets-toggel" onClick={() => navigate('/user/assets/' + assetsnav['0']['Assets']['url'])}>
                          <div className="details" onClick={() => { setNavExpanded(false) }}>
                            <p>   {privateheader['0']['Account']['Overview']['en']}</p>
                            <h6>
                              <span>{Object.keys(assetsOverview).length > 0 && (parseFloat(assetsOverview?.overall)).toFixed(2)} </span>USD<br />
                            </h6>
                          </div>
                          <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link wallet-assets-toggel" onClick={() => navigate('/user/assets/' + assetsnav['0']['Main']['url'])}>
                          <div className="details" onClick={() => { setNavExpanded(false) }}>
                            <p>   {privateheader['0']['Account']['Main']['en']}</p>
                            <h6>
                              <span>{Object.keys(assetsOverview).length > 0 && (parseFloat(assetsOverview?.main)).toFixed(2)} </span>USD<br />
                            </h6>
                          </div>
                          <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                        </a>
                        {/* <a className="nav-link wallet-assets-toggel" onClick={() => navigate('/vendor/dashboard/' + assetsnav['0']['Main']['url'])}>
                          <p className="icon" >Ma</p>
                          <div className="title">
                            <p> {privateheader['0']['Account']['Main']['en']}  <span className='text-success'>{Object.keys(assetsOverview).length > 0 && (parseFloat(assetsOverview?.main)).toFixed(2)} USD</span></p>
                          </div>
                          <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                        </a> */}
                      </li>
                      <li className="nav-item">
                        <a className="nav-link wallet-assets-toggel" onClick={() => navigate('/user/assets/' + assetsnav['0']['Trading']['url'])}>
                          <div className="details" onClick={() => { setNavExpanded(false) }}>
                            <p>   {privateheader['0']['Account']['Trading']['en']}</p>
                            <h6>
                              <span>{Object.keys(assetsOverview).length > 0 && (parseFloat(assetsOverview?.trade)).toFixed(2)} </span>USD<br />
                            </h6>
                          </div>
                          <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                        </a>
                        {/* <a className="nav-link wallet-assets-toggel" onClick={() => navigate('/vendor/dashboard/' + assetsnav['0']['Trading']['url'])}>
                          <p className="icon" > tr</p>
                          <div className="title">
                            <p>  {privateheader['0']['Account']['Trading']['en']}  <span className='text-success'>{Object.keys(assetsOverview).length > 0 && (parseFloat(assetsOverview?.trade)).toFixed(2)} USD</span></p>
                          </div>
                          <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                        </a> */}
                      </li>
                      <li className="nav-item">
                        <a className="nav-link wallet-assets-toggel" onClick={() => navigate('/user/assets/' + assetsnav['0']['Margin']['url'])} >
                          <div className="details" onClick={() => { setNavExpanded(false) }}>
                            <p>   {privateheader['0']['Account']['Margin']['en']}</p>
                            <h6>
                              <span>{Object.keys(assetsOverview).length > 0 && (parseFloat(assetsOverview?.funding)).toFixed(2)} </span>USD<br />
                            </h6>
                          </div>
                          <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                        </a>
                        {/* <a className="nav-link wallet-assets-toggel" onClick={() => navigate('/vendor/dashboard/' + assetsnav['0']['Margin']['url'])}>
                          <p className="icon" > Mg</p>
                          <div className="title">
                            <p> {privateheader['0']['Account']['Margin']['en']} <span className='text-success'>{Object.keys(assetsOverview).length > 0 && (parseFloat(assetsOverview?.funding)).toFixed(2)} USD</span> </p>
                          </div>
                          <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                        </a> */}
                      </li>
                      <li className="nav-link">
                        <div className="btn-area" onClick={()=>{setNavExpanded(false)}}>
                          <a className="btn" onClick={() => navigate('/p2p/trade/deposit') }> {privateheader['0']['Account']['Deposit']['en']}  <i className='fab fa-cc-mastercard'></i> </a>
                          <a className="btn" onClick={() => navigate('/user/assets/withdraw')}>{privateheader['0']['Account']['Withdraw']['en']} <i className='fas fa-coins'></i> </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default WalletToggel;