import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoginToggel from '../../../Header-Footer/loginToggel';
import RegisterToggel from '../../../Header-Footer/signupToggel';
import { getTokenCurrentMarketPrice } from '../../../Core/common';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'

const MarketSell = (props) => {

  const { id } = useParams();
  const users = useSelector((state) => state.users);
  let assets = useSelector((state) => state.assets);
  const [sellMarketPrice, setSellMarketPrice] = useState(0.00)
  const [sellAmount, setSellAmount] = useState(0.00)
  const [sellUsdtPrice, setSellUsdtPrice] = useState(0)
  const [tokenAvailableBalance, setTokenAvailableBalance] = useState(0)
  const [message, setmessage] = useState('');
  const [toastbg, setToastbg] = useState('');
  const [show, setShow] = useState(false);

  const getCoinUsdtPrice = async (e) => {
    assets.filter((item) => {
      if (item.token === id && item.walletType === 'main_wallet') {
        setTokenAvailableBalance(item.balance)
      }
    })
    let price = await getTokenCurrentMarketPrice(id);
    setSellMarketPrice(price);
    setSellUsdtPrice(price * e.target.value);

  }

  const createOrder = (e) => {

    e.preventDefault();

    if(sellAmount<=0){
      setShow(true);
      setToastbg('danger');
      setmessage('you have unsufficient amount')
      return;
    }
    if (tokenAvailableBalance > sellAmount) {
      let data = {
        ws_type: 'buysell',
        userid: users.id,
        token: id,
        user_address: '',
        market_type: 'market',
        order_type: 'sell',
        limit_usdt: sellMarketPrice, // limit price
        volume_usdt: sellUsdtPrice, // get usdt amount
        amount_token: sellAmount    // sell token value
      }
      setSellAmount(0)
      setTokenAvailableBalance(0)
      setSellUsdtPrice(0)
      props.createOrders(data);
    }

    else {
      setShow(true);
      setToastbg('warning');
      setmessage(`you have unsufficient ${id} amount`)
    }

  }

  return (
    <div className="price__input">
      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setShow(false)} bg={toastbg} delay={3000} autohide show={show} >
          <Toast.Body style={{ color: toastbg === 'warning' ? '#000' : '#fff' }}>{message} </Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="price__box">
        <input type="number" readOnly placeholder="Best Market Price" />
      </div>
      <div className="price__box">
        <input type="number" placeholder="Amount" value={sellAmount} onChange={(e) => { setSellAmount(e.target.value), getCoinUsdtPrice(e) }} />
        <span>{id}</span>
        <div className="increase__decrease__value">
          <button>+</button>
          <button>-</button>
        </div>
      </div>
      <div className="percentage">
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
      <div className="availabe">
        <div className="inner__item">
          <span>
            Available：
          </span>
          <span>
            {tokenAvailableBalance} {id}
            <span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M7.88744 0.799805L7.12818 1.4506L8.71329 3.2998C8.9913 3.62413 8.76085 4.1252 8.33367 4.1252H0.507812V5.1252H11.5949L7.88744 0.799805ZM11.5079 8.625V7.625H0.300781L4.15433 11.4786L4.86144 10.7714L3.56849 9.47856C3.2535 9.16358 3.47658 8.625 3.92204 8.625H11.5079Z"
                  fill="#2DBD96" />
              </svg>
            </span>
          </span>
        </div>
        <div className="inner__item">
          <span>
            Volume:
          </span>
          <span>
            {sellUsdtPrice} USDT
          </span>
        </div>
      </div>
      {users !== null && users.auth === true ?
        <button className={`Login__Sing__in__btn ${users.auth === true ? 'sell' : ''}`} onClick={(e) => createOrder(e)}>
          <p className={`login ${users.auth === true ? 'user' : ''}`}>Sell {id}</p></button> : <>
          <div className='button-align'>
            <LoginToggel />
            <span>
              Or
            </span>
            <RegisterToggel />
          </div>
        </>
      }
    </div>
  )
}

export default MarketSell;