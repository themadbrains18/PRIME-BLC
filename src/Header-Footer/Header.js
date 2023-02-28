import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { privateheader, kycpage, assetsnav } from "../Constants/lang/lang";
import { logout, checkIsVerifidUser } from '../Actions/authAction';
import { getUserNotification, updateNotificationStatus } from '../Actions/chatAction';
import { LOGIN } from '../Constants/Index';
import Cookies from 'universal-cookie';
import Profiletoggel from './profiletoggel';
import Navtoggel from './navbarToggel';
import WalletToggel from './walletToggel';

const Header = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const assetsOverview = useSelector((state) => state.assetoverview);
    const users = useSelector((state) => state.users);
    const interval = useSelector((state) => state.intervals)
    const notifications = useSelector((state) => state.notifications);

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

    var config = {
        headers: {
            'Authorization': users.access_token
        }
    };

    useEffect(() => {
        checkUserAuthentication();
        getAllNotification();

    }, [])

    const getAllNotification = async () => {
        // setInterval(async() => {
        //     let data = await dispatch(getUserNotification());    
        // }, 5000);
        await dispatch(getUserNotification());
    }
    const checkUserAuthentication = async () => {

        let data = await dispatch(checkIsVerifidUser(config))
        if (data != undefined && data.status === 404) {
            // console.log('check user authentication')
            dispatch(logout());
            clearInterval(interval);
            navigate('/')
        }
        else {
            if(data!==undefined){
                dispatch({ type: LOGIN, payload: data })
            }
            
        }
    }

    const handleLogout = (e) => {
        e.preventDefault();
        clearInterval(interval);
        dispatch(logout());
        navigate('/')
    }

    const changeStatus = async (id, type, orderid) => {
        if (type === 'order') {
            let data = { "id": id };
            await dispatch(updateNotificationStatus(data));
            navigate('/vendor/p2p/order/' + orderid);
        }
    }

    let session = sessionStorage.getItem('token')

    // console.log(assetsOverview.overall, 'Assets Overview')

    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <div className="header" id="header">
                        <nav className="navbar navbar-expand-md  navbar-dark w-100 p-0 flex-nowrap">
                            <div className="left-header">
                                <div className="logo">
                                    <Link to="/" className="css-1xckmdk"><img className="logo" src={require('../assets/images/blcprime.png')} alt="" /> </Link>
                                </div>
                                <div className="links lg-size-header lg-nav-header" >
                                    <ul className="nav flex-nowrap">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"> {privateheader['0']['BuyCrypto']['btn1']['en']} <i className='fas fa-caret-down'></i>    </a>
                                            <div className="drop-box drop-box-2">
                                                <ol className="nav flex-column">
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to="/p2p/trade/home">
                                                            <div className="title">
                                                                <p>  One-Click Buy</p>
                                                                <h6> Buy crypto within seconds</h6>

                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to="/p2p/trade/p2p">
                                                            <div className="title">
                                                                <p> P2P Trading(0 Fees) </p>
                                                                <h6> 30+ Fiat Currencies and 300+ Payment Methods with Competitive Prices</h6>
                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to="/p2p/trade/deposit">
                                                            <div className="title">
                                                                <p> Crypto Deposit  </p>
                                                                <h6> Instant Crypto Deposits to Your Spot Account</h6>
                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </Link>
                                                    </li>
                                                </ol>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/">  {privateheader['0']['market']['en']} <i className='fas fa-caret-down'></i>      </Link>
                                            <div className="drop-box drop-box-2">
                                                <ol className="nav flex-column">
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to="/market">
                                                            <div className="title">
                                                                <p> Market Overview  </p>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="#">
                                                            <div className="title">
                                                                <p> Market Data  </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="#">
                                                            <div className="title">
                                                                <p> Launch </p>
                                                            </div>
                                                        </a>
                                                    </li>

                                                </ol>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"> {privateheader['0']['Trade']['Trade']['en']} <i className='fas fa-caret-down'></i>    </a>
                                            <div className="drop-box drop-box-2">
                                                <ol className="nav flex-column">
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/swap-currency">
                                                            <div className="title">
                                                                <p>  Trading Bot</p>
                                                                <h6> Smart Trades Made Easy</h6>

                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to="/vendor/p2p">
                                                            <div className="title">
                                                                <p> Launchpad </p>
                                                                <h6> Early Access To Tokens</h6>
                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to="/vendor/p2p">
                                                            <div className="title">
                                                                <p> ByVotes  </p>
                                                                <h6> Vote For Your Favourite Llistings</h6>
                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </Link>
                                                    </li>
                                                </ol>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"> {privateheader['0']['Derivatives']['Derivatives']['en']} <i className='fas fa-caret-down'></i>    </a>
                                            <div className="drop-box drop-box-2">
                                                <ol className="nav flex-column">
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/swap-currency">
                                                            <div className="title">
                                                                <p>  Derivatives Portal</p>
                                                                <h6>One-stop platform for all things Derivatives</h6>

                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to="/vendor/p2p">
                                                            <div className="title">
                                                                <p> Inverse Contracts </p>
                                                                <h6>Perpetual and Futures Contracts using the coin itself as collateral</h6>
                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to="/vendor/p2p">
                                                            <div className="title">
                                                                <p> More Than Derivatives  </p>
                                                                <h6>Upgrade your trading experience with optimized products and trading tools</h6>
                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </Link>
                                                    </li>
                                                </ol>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"> {privateheader['0']['Earn']['Earn']['en']} <i className='fas fa-caret-down'></i>    </a>
                                            <div className="drop-box drop-box-2">
                                                <ol className="nav flex-column">
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/swap-currency">
                                                            <div className="title">
                                                                <p>Overview</p>
                                                                <h6>Browse a variety of financial investment products</h6>

                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to="/vendor/p2p">
                                                            <div className="title">
                                                                <p>BLC Exchange Savings</p>
                                                                <h6>Get guaranteed yields and withdraw your deposited tokens anytime</h6>
                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to="/vendor/p2p">
                                                            <div className="title">
                                                                <p>Liquidity Mininghot</p>
                                                                <h6>Add liquidity and earn trading fees like professional market makers</h6>
                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to="/vendor/p2p">
                                                            <div className="title">
                                                                <p>Dual Asset</p>
                                                                <h6>Get high yield despite price volatility</h6>
                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to="/vendor/p2p">
                                                            <div className="title">
                                                                <p>Shark Fin</p>
                                                                <h6>A low-risk gateway to earning enhanced yields with capital protection</h6>
                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to="/vendor/p2p">
                                                            <div className="title">
                                                                <p>Launchpool</p>
                                                                <h6>Stake and harvest new tokens for free</h6>
                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </Link>
                                                    </li>
                                                </ol>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/kucoin-market">  {privateheader['0']['Orders']['Orders']['en']} <i className='fas fa-caret-down'></i>      </Link>
                                            <div className="drop-box drop-box-2">
                                                <ol className="nav flex-column">
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/swap-currency">
                                                            <div className="title">
                                                                <p> {privateheader['0']['Orders']['Spot']['en']} </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/swap-currency">
                                                            <div className="title">
                                                                <p> {privateheader['0']['Orders']['Margin']['en']} </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/swap-currency">
                                                            <div className="title">
                                                                <p> {privateheader['0']['Orders']['Futures']['en']} </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/swap-currency">
                                                            <div className="title">
                                                                <p> {privateheader['0']['Orders']['Earn']['en']} </p>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/swap-currency">
                                                            <div className="title">
                                                                <p> {privateheader['0']['Orders']['Buy']['en']} </p>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/swap-currency">
                                                            <div className="title">
                                                                <p> {privateheader['0']['Orders']['SpotTrade']['en']} </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/swap-currency">
                                                            <div className="title">
                                                                <p> {privateheader['0']['Orders']['MarginTrade']['en']} </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/swap-currency">
                                                            <div className="title">
                                                                <p> {privateheader['0']['Orders']['FuturesTrade']['en']} </p>
                                                            </div>
                                                        </a>
                                                    </li>


                                                </ol>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="right-header">
                                <ul className="nav system align-item-center justify-content-end">
                                    {session === null &&
                                        <>
                                            <li className="nav-item ">
                                                <a className="nav-link sec__button" onClick={() => navigate('/login')}>
                                                    Login
                                                </a>
                                            </li>
                                            <li className="nav-item ">
                                                <a className="nav-link sec__button" onClick={() => navigate('/sign-up')}>
                                                    SignUp
                                                </a>

                                            </li>
                                        </>
                                    }
                                    <li className="nav-item d-lg-hide">
                                        <a className="nav-link" href="#"> <span className="message">{notifications != undefined && notifications.length}</span> <i className='far fa-bell'></i>   </a>
                                    </li>
                                    {session !== null &&
                                        <li className="nav-item d-lg-hide">
                                            <a className="nav-link" href="#"> <i className='fas fa-wallet'></i>  </a>
                                            <div className="drop-box drop-wallet">
                                                <ol className="nav flex-column">
                                                    <li className="nav-item">
                                                        <a className="nav-link" onClick={() => navigate('/user/assets/' + assetsnav['0']['Assets']['url'])}>
                                                            <div className="details">
                                                                <p>   {privateheader['0']['Account']['Overview']['en']}</p>
                                                                <h6 className='assetsBalance'>
                                                                    <span>{(Object.keys(assetsOverview).length > 0 && assetsOverview.overall !== undefined) ? parseFloat(assetsOverview?.overall).toFixed(2) : '0.00'} </span>USD<br />
                                                                </h6>
                                                                <p>~0.0000 BTC</p>
                                                            </div>
                                                            {/* <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5> */}
                                                        </a>
                                                    </li>

                                                    <li className='nav-item'>
                                                        <div className="btn-area">
                                                            <a className="btn" onClick={() => navigate('/p2p/trade/' + assetsnav['0']['Deposit']['url'])}><svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className="lnJCz2BoZo9QM8T9S0BV"><path fillRule="evenodd" clipRule="evenodd" d="M2.5 9.333c.368 0 .666.299.666.667v2.667a.667.667 0 0 0 .667.666h9.333a.667.667 0 0 0 .667-.666V10a.667.667 0 0 1 1.333 0v2.667a2 2 0 0 1-2 2H3.833a2 2 0 0 1-2-2V10c0-.368.298-.667.667-.667Z" fill="#fff"></path><path fillRule="evenodd" clipRule="evenodd" d="M4.695 6.195c.26-.26.683-.26.943 0L8.5 9.057l2.862-2.862a.667.667 0 1 1 .943.943L8.97 10.471a.667.667 0 0 1-.942 0L4.695 7.138a.667.667 0 0 1 0-.943Z" fill="#F7A600"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.5 1.333c.368 0 .666.299.666.667v8a.667.667 0 1 1-1.333 0V2c0-.368.298-.667.667-.667Z" fill="#F7A600"></path></svg> {privateheader['0']['Account']['Deposit']['en']}  </a>
                                                            <a className="btn" onClick={() => navigate('/user/assets/' + assetsnav['0']['Withdraw']['url'])}><svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className="lnJCz2BoZo9QM8T9S0BV"><path fillRule="evenodd" clipRule="evenodd" d="M2.5 9.333c.368 0 .666.299.666.667v2.667a.667.667 0 0 0 .667.666h9.333a.667.667 0 0 0 .667-.666V10a.667.667 0 0 1 1.333 0v2.667a2 2 0 0 1-2 2H3.833a2 2 0 0 1-2-2V10c0-.368.298-.667.667-.667Z" fill="#fff"></path><path fillRule="evenodd" clipRule="evenodd" d="M4.695 5.805c.26.26.683.26.943 0L8.5 2.943l2.862 2.862a.667.667 0 1 0 .943-.943L8.97 1.529a.667.667 0 0 0-.942 0L4.695 4.862a.667.667 0 0 0 0 .943Z" fill="#F7A600"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.5 10.667A.667.667 0 0 0 9.166 10V2a.667.667 0 0 0-1.333 0v8c0 .368.298.667.667.667Z" fill="#F7A600"></path></svg> {privateheader['0']['Account']['Withdraw']['en']}   </a>
                                                        </div>
                                                    </li>
                                                    <li className='nav-item'>
                                                        <p className='data-delay'>*Data may be delayed.</p>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" onClick={() => navigate('/user/assets/' + assetsnav['0']['Main']['url'])}>
                                                            <p className="icon" >Ma</p>
                                                            <div className="title">
                                                                <p> {privateheader['0']['Account']['Main']['en']}
                                                                    {/* <span className='text-success'>{Object.keys(assetsOverview).length > 0 && (parseFloat(assetsOverview?.main)).toFixed(2)} USD</span> */}
                                                                </p>
                                                            </div>
                                                            {/* <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5> */}
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" onClick={() => navigate('/user/assets/' + assetsnav['0']['Trading']['url'])}>
                                                            <p className="icon" > tr</p>
                                                            <div className="title">
                                                                <p>  {privateheader['0']['Account']['Trading']['en']}
                                                                    {/* <span className='text-success'>{Object.keys(assetsOverview).length > 0 && (parseFloat(assetsOverview?.trade)).toFixed(2)} USD</span> */}
                                                                </p>
                                                            </div>
                                                            {/* <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5> */}
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" onClick={() => navigate('/user/assets/' + assetsnav['0']['Margin']['url'])}>
                                                            <p className="icon" > Mg</p>
                                                            <div className="title">
                                                                <p> {privateheader['0']['Account']['Margin']['en']}
                                                                    {/* <span className='text-success'>{Object.keys(assetsOverview).length > 0 && (parseFloat(assetsOverview?.funding)).toFixed(2)} USD</span>  */}
                                                                </p>
                                                            </div>
                                                            {/* <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5> */}
                                                        </a>
                                                    </li>

                                                </ol>
                                            </div>
                                        </li>
                                    }
                                    {session !== null &&
                                        <li className="nav-item md-size-hide align-self-center">
                                            <div className='circle_box'> <a className="nav-link circle"> <span> {name} </span></a></div>
                                            <div className="drop-box drop-circle pb-0" >
                                                <ol className="nav flex-column">
                                                    <li className="nav-item">
                                                        <a className="nav-link" style={{ cursor: 'default' }}>
                                                            <div className="details">
                                                                <h4>  <span className="badge">{users.username}</span>  </h4>
                                                                <p className="user-id">UID : {users.id} </p>
                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item divider">
                                                        <a className="nav-link" onClick={() => navigate('/vendor/profile/' + kycpage['0']['nav']['btn1']['url'])}>
                                                            <p> Account & Security </p>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/NoData">
                                                            <p>  {privateheader['0']['profile']['Trading']['en']}  </p>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>

                                                        </a>
                                                    </li>
                                                    {/* <li className="nav-item">
                                                        <a className="nav-link" onClick={() => navigate('/vendor/profile/' + kycpage['0']['nav']['btn2']['url'])}>
                                                            <p> {privateheader['0']['profile']['Security']['en']}   </p>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>

                                                        </a>
                                                    </li> */}
                                                    <li className="nav-item">
                                                        <a className="nav-link" onClick={() => navigate('/vendor/profile/' + kycpage['0']['nav']['btn3']['url'])}>
                                                            <p>  {privateheader['0']['profile']['KYC']['en']}  </p><span className='ml-4'> </span>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>

                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/NoData">
                                                            <p> {privateheader['0']['profile']['Referral']['en']}  </p>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>

                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/NoData">
                                                            <p>  {privateheader['0']['profile']['API']['en']}  </p>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>

                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/NoData">
                                                            <p> {privateheader['0']['profile']['SubAccount']['en']}  </p>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>

                                                        </a>
                                                    </li>
                                                </ol>
                                                <h6 className="text-center mt-3" style={{ cursor: 'pointer' }} onClick={(e) => handleLogout(e)}> {privateheader['0']['profile']['logout']['en']} </h6>
                                            </div>
                                        </li>
                                    }

                                    {/* align-self-centee */}
                                    {/* {session !== null &&
                                        <li className="nav-item dropdown md-size-show">
                                            <a className="nav-link circle" data-toggle="dropdown"  > <span></span></a>
                                            <div className="drop-box drop-circle dropdown-menu" style={{ opacity: '1', visibility: 'visible' }} id="dropdown_profile">
                                                <ol className="nav flex-column">
                                                    <li className="nav-item">
                                                        <Link className="nav-link" to='/vendor/profile'>
                                                            <div className="details">
                                                                <h4>  <span className="badge badge-warning">Unverified</span>  </h4>
                                                                <p className="user-id"> <i className='fas fa-copy'></i> </p>
                                                            </div>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item divider">
                                                        <a className="nav-link" to="/vendor/NoData">
                                                            <p> {privateheader['0']['profile']['Maker']['en']}:0.1%  </p>
                                                            <div className="title">
                                                                <p> {privateheader['0']['profile']['Taker']['en']}:0.1% </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/NoData">
                                                            <p>  {privateheader['0']['profile']['Trading']['en']}  </p>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>

                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/security">
                                                            <p> {privateheader['0']['profile']['Security']['en']}   </p>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>

                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/kyc">
                                                            <p>  {privateheader['0']['profile']['KYC']['en']}  </p><span className='ml-md-4'> </span>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>

                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/NoData">
                                                            <p> {privateheader['0']['profile']['Referral']['en']}  </p>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>

                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/NoData">
                                                            <p>  {privateheader['0']['profile']['API']['en']}  </p>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>

                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" to="/vendor/NoData">
                                                            <p> {privateheader['0']['profile']['SubAccount']['en']}  </p>
                                                            <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                                                        </a>
                                                    </li>
                                                </ol>
                                                <h6 className="text-center"> {privateheader['0']['profile']['logout']['en']} </h6>
                                            </div>
                                        </li>
                                    } */}

                                    <li className="nav-item ">
                                        <a className="nav-link sec__button">
                                            <i className='fas fa-globe'></i>
                                        </a>
                                        <div className='drop-box drop-wallet'>
                                            <ol className="nav flex-column">
                                                <li className="nav-item">
                                                    <button className="nav-link">English</button>
                                                </li>
                                                <li className="nav-item">
                                                    <button className="nav-link">Hindi</button>
                                                </li>
                                            </ol>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link download" href="#"> <i className='fas fa-download'></i></a>
                                        <div className="drop-download">
                                            <p>   Scan QR Code to<br /> Download App  </p>
                                            <div className="Qr-code">
                                                <img src={require('../assets/images/appDownload.png')} alt="error" />
                                            </div>
                                            <button type="button" className="btn btn-success">  View More <i className='fas fa-download'></i> </button>
                                        </div>
                                    </li>
                                </ul>
                                {session !== null &&
                                    <>
                                        <Profiletoggel />
                                        <WalletToggel />
                                    </>

                                }
                                <Navtoggel />

                            </div>
                            {/* <!-- Toggler/collapsibe Button --> */}
                            {/* <button className="navbar-toggler PVT_header" type="button" >
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </button> */}

                        </nav>
                    </div>
                </div>
            </div>

        </>
    )
};

export default Header;

