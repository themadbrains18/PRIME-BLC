import React from "react";
import { NavLink,Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { privateheader } from "../Constants/lang/lang";


const Header = () => {
    const users = useSelector((state) => state.users);

    return (
        <header className="header home__page__header">
            <NavLink className="header__logo" to="/">
                <img src={require("../assets/images/header-logo.svg")} alt="" />
            </NavLink>
            <ul className="nav__list">
                <li className="nav__item">
                    <NavLink to="/kucoin-market" className="header__dropdown__button">
                        Markets
                    </NavLink>
                </li>
                <li className="nav__item">
                    <button className="header__dropdown__button">
                        <span>
                            Trade
                        </span>
                        <svg className="down_svg__icon" width="10px" height="24px" viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                            <path
                                d="M201.344 406.656L466.752 672a64 64 0 0090.496 0l265.408-265.344a32 32 0 00-45.312-45.312L512 626.752 246.656 361.344a32 32 0 10-45.312 45.312z">
                            </path>
                        </svg>
                    </button>
                    <ul className="header__dropdown">
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <img src="assets/svg/header-dropdown-icon4.svg" alt="" />
                                <div className="detail">
                                    <h4>
                                        Fast Buy
                                    </h4>
                                    <span>
                                        Buy USDT with Visa/MC
                                    </span>
                                </div>

                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <img src="assets/svg/header-dropdown-icon5.svg" alt="" />
                                <div className="detail">
                                    <h4>
                                        Fast Buy
                                    </h4>
                                    <span>
                                        Buy USDT with Visa/MC
                                    </span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="nav__item">
                    <button className="header__dropdown__button">
                        <span>
                            Earn
                        </span>

                        <svg className="down_svg__icon" width="10px" height="24px" viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                            <path
                                d="M201.344 406.656L466.752 672a64 64 0 0090.496 0l265.408-265.344a32 32 0 00-45.312-45.312L512 626.752 246.656 361.344a32 32 0 10-45.312 45.312z">
                            </path>
                        </svg>
                    </button>
                    <ul className="header__dropdown">
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                        <span className="hot">HOT</span>
                                    </h4>

                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="nav__item">
                    <button className="header__dropdown__button">
                        <span>
                            More
                        </span>
                        <svg className="down_svg__icon" width="10px" height="24px" viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                            <path
                                d="M201.344 406.656L466.752 672a64 64 0 0090.496 0l265.408-265.344a32 32 0 00-45.312-45.312L512 626.752 246.656 361.344a32 32 0 10-45.312 45.312z">
                            </path>
                        </svg>
                    </button>
                    <ul className="header__dropdown">
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li className="nav__list">
                            <a className="nav__link" href="/">
                                <div className="detail">
                                    <h4>
                                        Crypto Lending
                                    </h4>
                                    <span>
                                        Invest to earn stable profits Your professional asset manager
                                    </span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul className="header__list">
                <li className="header__item">
                    <button className="languages ">
                        English/USD
                    </button>
                    <ul className="header__dropdown currency">
                        <li className="nav__list">
                            <ul className="language">
                                <li className="inner__language">
                                    Language
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                                <li>
                                    <a href="/">English</a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav__list">
                            <ul className="currency">
                                <li className="inner__Currency">
                                    Currency
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                                <li>
                                    <a href="/">USD</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="header__item">
                    <button className="app__download">
                        <svg width="12" height="12" viewBox="0 0 10 12" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            className="css-q6d4bv">
                            <title>形状结合</title>
                            <g id="Page-1" stroke="none" strokeWidth="2" fill="none" fillRule="evenodd">
                                <g id="indexplanB" transform="translate(-1054.000000, -34.000000)" fill="currentColor">
                                    <g id="编组" transform="translate(972.000000, 20.000000)">
                                        <path
                                            d="M92,25 L92,26 L82,26 L82,25 L92,25 Z M88,14 L88,20 L91.2426407,20 L87,24.2426407 L82.7573593,20 L86,19.999 L86,14 L88,14 Z"
                                            id="形状结合"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <span>
                            APP
                        </span>
                    </button>
                    <div className="header__dropdown">
                        <div className="qr__code app--qr">
                            <h4>
                                Scan to Download iOS&Android APP
                            </h4>
                            <img src="assets/img/app-qr.png" alt="" />
                            <div className="inner__link">
                                <a href="/">
                                    <span>
                                        View More
                                    </span>
                                    <img src="assets/svg/qr-download.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="nav-item d-lg-hide">
                                <a className="nav-link" href="#"> <i className='fas fa-wallet'></i>  </a>
                                <div className="drop-box drop-wallet">
                                    <ol className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                <div className="details">
                                                    <p>   {privateheader['0']['Account']['Overview']['en']}</p>
                                                    <h6>
                                                        <span>0.00 </span>USD<br />
                                                    </h6>
                                                </div>
                                                <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/vendor/mainAccount">
                                                <p className="icon" >Ma</p>
                                                <div className="title">
                                                    <p> {privateheader['0']['Account']['Main']['en']}  <span className='text-success'>0.00 USD</span></p>
                                                </div>
                                                <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/vendor/tradeAccount">
                                                <p className="icon" > tr</p>
                                                <div className="title">
                                                    <p>  {privateheader['0']['Account']['Trading']['en']}  <span className='text-success'>00.00 USD</span></p>
                                                </div>
                                                <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/vendor/marginAccount">
                                                <p className="icon" > Mg</p>
                                                <div className="title">
                                                    <p> {privateheader['0']['Account']['Margin']['en']} <span className='text-success'>0.00 USD</span> </p>
                                                </div>
                                                <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                            </Link>
                                        </li>
                                    </ol>
                                    <div className="btn-area">
                                        <Link className="btn" to="/vendor/swap-currency"> {privateheader['0']['Account']['Buy']['en']}  <i className='fab fa-cc-mastercard'></i> </Link>
                                        <Link className="btn" to="/vendor/depositassest">{privateheader['0']['Account']['Deposit']['en']} <i className='fas fa-coins'></i> </Link>
                                    </div>
                                </div>
                            </li>
                {users?.auth !== true &&
                    <li className="header__item">
                        <NavLink to="/login" className="login">
                            Login
                        </NavLink>
                    </li>
                }
                {users?.auth !== true &&
                    <li className="header__item">
                        <NavLink to="/sign-up" className="Sign__up">
                            Sign Up
                        </NavLink>
                    </li>
                }
            </ul>
        </header>
    );
}


export default Header;