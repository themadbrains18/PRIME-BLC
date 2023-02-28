import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { privateheader, assetsnav } from "../Constants/lang/lang";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

const Navtoggel = () => {
    const navigate = useNavigate();
    const [navExpanded, setNavExpanded] = useState(false);
    const [isdropdown, setIsdropDown] = useState(false);

    const [show, setShow] = useState(null);

    const activeDropdown = (event, index) => {
        event.preventDefault();
        // console.log(index)

        if (index === show) {
            setShow(0)
        } else {
            setShow(index)
        }
    }
    let session = sessionStorage.getItem('token')
    return (
        <Navbar bg="light" className="mb-3" expanded={navExpanded} >
            <Container fluid>
                {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} onClick={() => setNavExpanded(navExpanded ? false : "expanded")} >
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </Navbar.Toggle>
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand`}
                    aria-labelledby={`offcanvasNavbarLabel-expand`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton onClick={() => { setNavExpanded(false), setShow(0) }}>
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
                                            {session === null &&
                                                <li>
                                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                                        <Nav.Link style={{ color: '#fff' }}
                                                            className="logbtn"
                                                            onClick={(e) => {
                                                                navigate('/login'); setNavExpanded(false)
                                                            }

                                                            }
                                                        >
                                                            {privateheader['0']['profile']['login']['en']}
                                                        </Nav.Link>
                                                    </Nav>
                                                </li>
                                            }
                                            {session === null &&
                                                <li>
                                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                                        <Nav.Link style={{ color: '#fff' }}
                                                            className="btn"
                                                            onClick={(e) => {
                                                                navigate('/sign-up'); setNavExpanded(false)
                                                            }

                                                            }
                                                        >
                                                            {privateheader['0']['profile']['signup']['en']}
                                                        </Nav.Link>
                                                    </Nav>
                                                </li>
                                            }

                                            <li className="nav-item">
                                                <a className="nav-link" href="#" onClick={(e) => { activeDropdown(e, 1) }} aria-haspopup="false"> {privateheader['0']['BuyCrypto']['btn1']['en']} <i className='fas fa-caret-down'></i>    </a>
                                                {show === 1 &&
                                                    <div className="drop-box drop-box-2">
                                                        <ol className="nav flex-column">
                                                            <li className="nav-item">
                                                                <a className="nav-link" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 1), navigate('/p2p/trade/home') }}>
                                                                    <div className="title">
                                                                        <p>  One-Click Buy</p>
                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 1), navigate('/p2p/trade/p2p') }}>
                                                                    <div className="title" >
                                                                        <p> P2P Trading(0 Fees) </p>
                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 1), navigate('/p2p/trade/deposit') }}>
                                                                    <div className="title">
                                                                        <p> Crypto Deposit  </p>
                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </a>
                                                            </li>
                                                        </ol>
                                                    </div>
                                                }
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link" href="#" onClick={(e) => { activeDropdown(e, 2) }} aria-haspopup="false">  {privateheader['0']['market']['en']} <i className='fas fa-caret-down'></i>      </a>
                                                {show === 2 &&
                                                    <div className="drop-box drop-box-2">
                                                        <ol className="nav flex-column">
                                                            <li className="nav-item">
                                                                <a className="nav-link" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 2), navigate('/market') }}>
                                                                    <div className="title" >
                                                                        <p> Market Overview  </p>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 2), navigate('/vendor/swap-currency') }}>
                                                                    <div className="title">
                                                                        <p> Market Data  </p>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 2), navigate('/vendor/swap-currency') }}>
                                                                    <div className="title">
                                                                        <p> Launch </p>
                                                                    </div>
                                                                </a>
                                                            </li>

                                                        </ol>
                                                    </div>
                                                }
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#" onClick={(e) => { activeDropdown(e, 3) }} aria-haspopup="false"> {privateheader['0']['Trade']['Trade']['en']} <i className='fas fa-caret-down'></i>    </a>
                                                {show === 3 &&
                                                    <div className="drop-box drop-box-2">
                                                        <ol className="nav flex-column">
                                                            <li className="nav-item">
                                                                <a className="nav-link" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 3), navigate('/vendor/swap-currency') }}>
                                                                    <div className="title">
                                                                        <p>  Trading Bot</p>
                                                                        <h6> Smart Trades Made Easy</h6>

                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 3), navigate('/vendor/swap-currency') }}>
                                                                    <div className="title">
                                                                        <p> Launchpad </p>
                                                                        <h6> Early Access To Tokens</h6>
                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 3), navigate('/vendor/swap-currency') }}>
                                                                    <div className="title">
                                                                        <p> ByVotes  </p>
                                                                        <h6> Vote For Your Favourite Llistings</h6>
                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </a>
                                                            </li>
                                                        </ol>
                                                    </div>
                                                }
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#" onClick={(e) => { activeDropdown(e, 4) }} aria-haspopup="false"> {privateheader['0']['Derivatives']['Derivatives']['en']} <i className='fas fa-caret-down'></i>    </a>
                                                {show === 4 &&
                                                    <div className="drop-box drop-box-2">
                                                        <ol className="nav flex-column">
                                                            <li className="nav-item">
                                                                <a className="nav-link" to="/vendor/swap-currency">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 4) }}>
                                                                        <p>  Derivatives Portal</p>
                                                                        <h6>One-stop platform for all things Derivatives</h6>

                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link className="nav-link" to="/vendor/p2p">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 4) }}>
                                                                        <p> Inverse Contracts </p>
                                                                        <h6>Perpetual and Futures Contracts using the coin itself as collateral</h6>
                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link className="nav-link" to="/vendor/p2p">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 4) }}>
                                                                        <p> More Than Derivatives  </p>
                                                                        <h6>Upgrade your trading experience with optimized products and trading tools</h6>
                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </Link>
                                                            </li>
                                                        </ol>
                                                    </div>
                                                }
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#" onClick={(e) => { activeDropdown(e, 5) }} aria-haspopup="false"> {privateheader['0']['Earn']['Earn']['en']} <i className='fas fa-caret-down'></i>    </a>
                                                {show === 5 &&
                                                    <div className="drop-box drop-box-2">
                                                        <ol className="nav flex-column">
                                                            <li className="nav-item">
                                                                <a className="nav-link" to="/vendor/swap-currency">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 5) }}>
                                                                        <p>Overview</p>
                                                                        <h6>Browse a variety of financial investment products</h6>

                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link className="nav-link" to="/vendor/p2p">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 5) }}>
                                                                        <p>BLC Exchange Savings</p>
                                                                        <h6>Get guaranteed yields and withdraw your deposited tokens anytime</h6>
                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link className="nav-link" to="/vendor/p2p">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 5) }}>
                                                                        <p>Liquidity Mininghot</p>
                                                                        <h6>Add liquidity and earn trading fees like professional market makers</h6>
                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link className="nav-link" to="/vendor/p2p">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 5) }}>
                                                                        <p>Dual Asset</p>
                                                                        <h6>Get high yield despite price volatility</h6>
                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link className="nav-link" to="/vendor/p2p">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 5) }}>
                                                                        <p>Shark Fin</p>
                                                                        <h6>A low-risk gateway to earning enhanced yields with capital protection</h6>
                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link className="nav-link" to="/vendor/p2p">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 5) }}>
                                                                        <p>Launchpool</p>
                                                                        <h6>Stake and harvest new tokens for free</h6>
                                                                    </div>
                                                                    <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                                </Link>
                                                            </li>
                                                        </ol>
                                                    </div>
                                                }
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#" onClick={(e) => { activeDropdown(e, 6) }} aria-haspopup="false">  {privateheader['0']['Orders']['Orders']['en']} <i className='fas fa-caret-down'></i>      </a>
                                                {show === 6 &&
                                                    <div className="drop-box drop-box-2">
                                                        <ol className="nav flex-column">
                                                            <li className="nav-item">
                                                                <a className="nav-link" to="/vendor/swap-currency">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 6) }}>
                                                                        <p> {privateheader['0']['Orders']['Spot']['en']} </p>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" to="/vendor/swap-currency">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 6) }}>
                                                                        <p> {privateheader['0']['Orders']['Margin']['en']} </p>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" to="/vendor/swap-currency">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 6) }}>
                                                                        <p> {privateheader['0']['Orders']['Futures']['en']} </p>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" to="/vendor/swap-currency">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 6) }}>
                                                                        <p> {privateheader['0']['Orders']['Earn']['en']} </p>
                                                                    </div>
                                                                </a>
                                                            </li>

                                                            <li className="nav-item">
                                                                <a className="nav-link" to="/vendor/swap-currency">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 6) }}>
                                                                        <p> {privateheader['0']['Orders']['Buy']['en']} </p>
                                                                    </div>
                                                                </a>
                                                            </li>

                                                            <li className="nav-item">
                                                                <a className="nav-link" to="/vendor/swap-currency">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 6) }}>
                                                                        <p> {privateheader['0']['Orders']['SpotTrade']['en']} </p>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" to="/vendor/swap-currency">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 6) }}>
                                                                        <p> {privateheader['0']['Orders']['MarginTrade']['en']} </p>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" to="/vendor/swap-currency">
                                                                    <div className="title" onClick={(e) => { setNavExpanded(false), activeDropdown(e, 6) }}>
                                                                        <p> {privateheader['0']['Orders']['FuturesTrade']['en']} </p>
                                                                    </div>
                                                                </a>
                                                            </li>


                                                        </ol>
                                                    </div>
                                                }
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
    );
};

export default Navtoggel;
