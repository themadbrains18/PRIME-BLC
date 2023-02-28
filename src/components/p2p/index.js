
import OneClickBuy from "./oneClickBuy/oneClickBuy"
import P2PTrading from "./P2PTrading/p2ptrading";
import Deposit from './CryptoDeposit/deposit';
import PaymentMethod from "./paymentMethod/paymentMethod";
import P2POrders from "./p2pOrder/order";
import P2PAds from "./p2pAds/p2pads";
import P2PNewAds from "./p2pAds/p2pnewads";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import identity from '../profile/images/identity.png'
import password from '../profile/images/password.png'
import email from '../profile/images/email.png'
import phone from '../profile/images/phone.png'


const P2PTrade = () => {

  let { otc } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const [open, setOpen] = useState(false);
  const auth = sessionStorage.getItem('token');
  const [showDrp, setshowDrp] = useState(0);
  const [totalBalance, setTotalBal] = useState();
  let assets = useSelector((state) => state.assets);
  const orders = useSelector((state) => state.orders);


  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });

  const checkUserSecurityVerification = async () => {
    let selectedToken = assets.filter((item) => {
      return item.token === 'USDT';
    })
    let totalBal = 0;
    selectedToken.map((item) => {
      totalBal = totalBal + item.balance;
    })
    setTotalBal(totalBal)
    // || totalBal < 50 || orders.data.length < 5
    if (users.kycStatus === true && users.email !== '' && users.number !== '' && users.secutiryFA === 'enable' && totalBal >= 50 && orders.data.length >= 5) {
      navigate('/p2p/trade/newads');
    }
    else {
      setOpen(true)
    }
  }
  const closeDropdown = (e, index) => {
    if (showDrp !== 0) {
      setshowDrp(0);
    }
  }
  return (
    <section className='one_click_by_sec_wrapper' onClick={closeDropdown}>
      <div className='tmb_content'>
        <div className='tmb_top_header p2p__trading__header'>
          <div className="onclick_header">
            <div className='tmb_container'>
              <ul className="react-tabs__tab-list" role="tablist">
                <li className={`${otc === 'home' ? 'react-tabs__tab react-tabs__tab--selected' : "react-tabs__tab"}`} onClick={() => { navigate('/p2p/trade/home') }} role="tab" id="tab:r0:0" aria-selected="false" aria-disabled="false" aria-controls="panel:r0:0" data-rttab="true">One-Click Buy</li>
                <li className={`${otc === 'p2p' ? 'react-tabs__tab react-tabs__tab--selected' : "react-tabs__tab"}`} onClick={() => { navigate('/p2p/trade/p2p') }} role="tab" id="tab:r0:1" aria-selected="false" aria-disabled="false" aria-controls="panel:r0:1" data-rttab="true">P2P</li>
                <li className={`${otc === 'deposit' ? 'react-tabs__tab react-tabs__tab--selected' : "react-tabs__tab"}`} onClick={() => { navigate('/p2p/trade/deposit') }} role="tab" id="tab:r0:2" aria-selected="true" aria-disabled="false" aria-controls="panel:r0:2" data-rttab="true" tabIndex="0"> Deposit</li>
              </ul>
              {auth !== null &&
                <ul className="react-tabs__tab-list" role="tablist">
                  <li className={`tmb--modifier-md ${otc === 'myads' || otc === 'newads' ? 'react-tabs__tab react-tabs__tab--selected' : "react-tabs__tab"}`} role="tab" id="tab:r0:0" aria-selected="false" aria-disabled="false" aria-controls="panel:r0:0" data-rttab="true">

                    <ul className="nav flex-nowrap ">
                      <li className="nav-item">
                        <a className={`tmb-menu ${otc === 'myads' || otc === 'newads' ? 'active' : 'inactive'}`} href="#"> Ads <i className='fas fa-caret-down'></i>    </a>
                        <div className="drop-box drop-box-2">
                          <ol className="nav flex-column">
                            <li className="nav-item">
                              <a className="nav-link" onClick={() => checkUserSecurityVerification()}>
                                <div className="title">
                                  <p>  New Ads</p>
                                </div>
                              </a>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" to="/p2p/trade/myads">
                                <div className="title">
                                  <p> My Ads </p>
                                </div>
                              </Link>
                            </li>
                          </ol>
                        </div>
                      </li>
                    </ul>

                  </li>
                  <li className={ `hide-on-desktop ${otc === 'order' ? 'react-tabs__tab react-tabs__tab--selected' : "react-tabs__tab"}`} onClick={() => checkUserSecurityVerification()} role="tab" id="tab:r0:1" aria-selected="false" aria-disabled="false" aria-controls="panel:r0:1" data-rttab="true">New Ads</li>
                  <li className={ `hide-on-desktop ${otc === 'payment' ? 'react-tabs__tab react-tabs__tab--selected' : "react-tabs__tab"}`} onClick={() => { navigate('/p2p/trade/myads') }} role="tab" id="tab:r0:2" aria-selected="true" aria-disabled="false" aria-controls="panel:r0:2" data-rttab="true" tabIndex="0"> My Ads</li>
                  <li className={`${otc === 'order' ? 'react-tabs__tab react-tabs__tab--selected' : "react-tabs__tab"}`} onClick={() => { navigate('/p2p/trade/order') }} role="tab" id="tab:r0:1" aria-selected="false" aria-disabled="false" aria-controls="panel:r0:1" data-rttab="true">Order</li>
                  <li className={`${otc === 'payment' ? 'react-tabs__tab react-tabs__tab--selected' : "react-tabs__tab"}`} onClick={() => { navigate('/p2p/trade/payment') }} role="tab" id="tab:r0:2" aria-selected="true" aria-disabled="false" aria-controls="panel:r0:2" data-rttab="true" tabIndex="0"> Payment</li>
                </ul>
              }
            </div>
          </div>


          {otc === 'home' &&
            <>
              <OneClickBuy />
            </>
          }
          {otc === 'p2p' &&
            <>
              <P2PTrading />
            </>
          }
          {otc === 'deposit' &&
            <>
              <Deposit />
            </>
          }
          {otc === 'order' &&
            <>
              <P2POrders />
            </>
          }
          {otc === 'payment' &&
            <>
              <PaymentMethod />
            </>
          }
          {otc === 'myads' &&
            <>
              <P2PAds />
            </>
          }
          {otc === 'newads' &&
            <>
              <P2PNewAds showDrp={showDrp} setshowDrp={setshowDrp} />
            </>
          }

          <Modal show={open} centered onHide={() => setOpen(false)}>
            <Modal.Header className="text-center" closeButton={true}>
              <p>
                You must meet the following requirements to post an ad.
              </p>
            </Modal.Header>
            <Modal.Body>
              <div className='p2p__Verification__model'>
                <div className="row">
                  <div className="col-md-12">
                    <div className="identity__info">
                      <div className="avatar"><img src={phone} alt="avatar set icon" /></div>
                      <div className="info">
                        <div className="title">Link your mobile number</div>
                        <div className="action">
                          {users.number === '' ? <button onClick={() => { setOpen(false), navigate('/vendor/profile/profile') }}>Check Now</button> : <span className="item-completed"><i className="fa fa-check-circle fiat-iconfont"></i> Added</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="identity__info">
                      <div className="avatar"><img src={email} alt="avatar set icon" /></div>
                      <div className="info">
                        <div className="title">Link your email address</div>
                        <div className="action">
                          {users.email === '' ? <button onClick={() => { setOpen(false), navigate('/vendor/profile/profile') }}>Check Now</button> : <span className="item-completed"><i className="fa fa-check-circle fiat-iconfont"></i> Added</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="identity__info">
                      <div className="avatar"><img src={identity} alt="avatar set icon" /></div>
                      <div className="info">
                        <div className="title">Identity Verification</div>
                        <div className="action">
                          {users.kycStatus === false ? <button onClick={() => { setOpen(false), navigate('/vendor/profile/kyc-verification') }}>Check Now</button> : <span className="item-completed"><i className="fa fa-check-circle fiat-iconfont"></i> Added</span>}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="identity__info">
                      <div className="avatar"><img src={password} alt="avatar set icon" /></div>
                      <div className="info">
                        <div className="title">Google 2FA Authnetication</div>
                        <div className="action">
                          {users.secutiryFA === 'disable' ? <button onClick={() => { setOpen(false), navigate('/vendor/profile/profile') }}>Check Now</button> : <span className="item-completed"><i className="fa fa-check-circle fiat-iconfont"></i> Added</span>}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="identity__info">
                      <div className="avatar"><img src={password} alt="avatar set icon" /></div>
                      <div className="info">
                        <div className="title">
                          <p>Position Value (Main Account)</p>
                          <p style={{ fontSize: '12px' }}>Wallet balance (Main Account) ≥50 USDT</p>
                        </div>
                        <div className="action">
                          {parseFloat(totalBalance) < 50 ? <button onClick={() => { setOpen(false), navigate('/user/assets/main-account') }}>Check Now</button> : <span className="item-completed"><i className="fa fa-check-circle fiat-iconfont"></i> Added</span>}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="identity__info">
                      <div className="avatar"><img src={password} alt="avatar set icon" /></div>
                      <div className="info">
                        <div className="title">
                          <p>No. of P2P Orders</p>
                          <p style={{ fontSize: '12px' }}>1. No. of Buy Orders Within 30 Day(s) ≥ 5({orders!==undefined && orders.data!==undefined && orders.data.length >= 5 ? '5' : orders!==undefined && orders.data!==undefined && orders.data.length}/5)</p>
                        </div>
                        <div className="action">
                          {orders !== undefined && orders.data !== undefined && orders.data.length < 5 ? <button onClick={() => { setOpen(false), navigate('/p2p/trade/p2p') }}>Check Now</button> : <span className="item-completed"><i className="fa fa-check-circle fiat-iconfont"></i> Added</span>}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

            </Modal.Body>
          </Modal>
        </div>
      </div >
    </section >
  )
}

export default P2PTrade;