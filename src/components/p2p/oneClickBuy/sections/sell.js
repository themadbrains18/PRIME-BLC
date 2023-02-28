import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import CoinListDropdown from './coin-list-dropdown';
import ReceiveCoinListDropDown from './receive-coin-list-dropdown';
import AllPaymentMethods from '../../P2PTrading/section/all-payment-methods';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { getTokenPrice } from '../../../../Core/common';
import firstCoinList from '../../../../Core/firstCoinList.json'
import rupeeIcon from '../../../../assets/coinIcon/rupee.png'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'

const Sell = ({ active, setActive,show }) => {

  const [coinName, setcoinName] = useState('USDT');
  const [recieveCoinName, setRecieveCoinName] = useState('INR');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [coinImage, setcoinImage] = useState('');
  const [recieveCoinImage, setRecieveCoinImage] = useState(rupeeIcon);
  const tokenList = useSelector((state) => state.deposittokens);
  const [convertPrice, setConvertPrice] = useState(0)
  const [receivedAmount, setReceivedAmount] = useState(0.0)
  const [available_token_balance, setAvailableTokenBalance] = useState(0.00);
  let assets = useSelector((state) => state.assets);
  let users= useSelector((state)=>state.users);
  const auth = sessionStorage.getItem('token');
  // console.log(auth,'=========auth')
  const navigate = useNavigate();

  const [showtoast, setShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastbg, setToastbg] = useState('');

  useEffect(() => {
    getInitTokenPrice();
  }, []);

  const getInitTokenPrice = async () => {
    if (tokenList.length > 0) {
      let amount = await getTokenPrice(coinName ,recieveCoinName)
      // console.log(amount)
      setConvertPrice(amount)
      let filterAssets = assets.filter((item)=>{
        return item.token === coinName
      })
      if (filterAssets.length > 0) {
        
        if(filterAssets[0].balance > 0 ){
          setAvailableTokenBalance(filterAssets[0].balance);
        }
      }
    }
  }

  const formSchema = Yup.object().shape({
    spend: Yup.string()
      .required('This field is required'),
    receive: Yup.string()
      .required('code is mendatory')
  })

  let {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const selectCoin = async (data) => {
    setcoinName(data.coinName)
    setcoinImage(data.image)
    let amount = await getTokenPrice(data.coinName, recieveCoinName )
    // console.log(amount)
    setConvertPrice(amount)
  }
  const selectReceiveCoin = async (data) => {
    setRecieveCoinName(data.coinName)
    setRecieveCoinImage(data.image)
    let amount = await getTokenPrice(coinName, data.coinName)
    // console.log(amount)
    setConvertPrice(amount)
  }
  const selectPayment = async (data) => {
    setPaymentMethod(data)
  }

  const calculateReceiveamount = (e) => {
    // console.log('================')
    let amount = (convertPrice) * e.target.value
    setValue('spend', e.target.value, { shouldValidate: true })
    // console.log(amount, '=========receive amount')
    setReceivedAmount(amount)
    let filterAssets = assets.filter((item)=>{
      return item.token === coinName
    })
    if (filterAssets.length > 0) {
      
      if(filterAssets[0].balance > 0 ){
        setAvailableTokenBalance(filterAssets[0].balance);
      }
      else{
      }
    }
  }

  const activeDropdown = (e, index) => {
    e.preventDefault();
    if (index === active) {
      setActive(0)
    } else {
      setActive(index)
    }
  }

  const submitData = (data) => {
    try {
      if (users.kycStatus === false || users.email === '' || users.number === '' || users.secutiryFA === 'disable' ) {
        setShow(true);
        setToastbg('warning');
        setToastMessage('Your security level very low please set up all authentication in account and security. This will auto redirect to profile page.');
        setTimeout(() => {
          navigate('/vendor/profile/profile')
        }, 3000);
        return;
      }
      navigate({
        pathname: '/p2p/trade/newads'
      });
    }
    catch (err) {
      console.log("===hello", err)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <ToastContainer position="top-center" className="p-3 toast__container">
        <Toast onClose={() => setShow(false)} bg={toastbg} delay={300000} autohide show={showtoast} >
          <Toast.Body style={{ color: toastbg === 'warning' ? '#000' : '#fff' }}>{toastMessage} </Toast.Body>
        </Toast>
      </ToastContainer>
      <div className='spend_wrapper'>
        <div className='input_wrapper'>
          <label className='input_label'>Spend</label>
          <input className='spend_input' type="text" value={getValues('spend')} name='spend' defaultValue="0"  onChange={(e) => { calculateReceiveamount(e) }}></input>
        </div>
        <div className='dropdown_wrapper' onClick={(e) => { activeDropdown(e, 3) }}>
          <div className="button_img">
            {coinImage === '' ?
              <svg width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width={48} height={48} rx={24} fill="#10D173" />
              <path fillRule="evenodd" clipRule="evenodd" d="M32.4094 14V18.0612H26.2231V20.7164C31.2325 20.9436 35 21.9244 35 23.0996C35 24.2746 31.2325 25.2552 26.2231 25.4827V34H21.8155V25.4847C16.7867 25.2605 13 24.2783 13 23.0996C13 21.9211 16.7867 20.9387 21.8155 20.7146V18.0613H15.6292V14H32.4094ZM26.2231 24.4656C30.1774 24.2851 33.1054 23.6349 33.1054 22.8597C33.1054 22.0846 30.177 21.4341 26.2193 21.254V23.708C25.5179 23.7453 24.7693 23.7651 23.9961 23.7651C23.2351 23.7651 22.5013 23.7456 21.8115 23.71V21.2467C17.8381 21.4264 14.8906 22.077 14.8906 22.856C14.8906 23.6349 17.8376 24.2873 21.8115 24.4651L22.0733 24.4763H22.0768C22.3397 24.4864 22.6065 24.4947 22.8775 24.5007H22.9026L23.1312 24.5054H23.1977L23.3891 24.508H24.6135L24.8069 24.5054H24.8761L25.1212 24.5004H25.1325C25.3152 24.4963 25.4955 24.4911 25.6738 24.4851H25.6997L25.9393 24.4763H25.9676L26.2231 24.4656Z" fill="white" />
            </svg> : <img src={coinImage} alt="" />}
          </div>
          <div className="button_text">
            <span>{coinName}</span>
          </div>
          <div className="button_icon">
            <img src={require('../assets/menu-icon.png')} alt="error" />
          </div>
        </div>
        {active == 3 && <CoinListDropdown tokenList={tokenList} selectCoin={selectCoin} />}
      </div>
      <p className='validation_msg'>{errors.spend?.message ? errors.spend?.message : ''}</p>
      {available_token_balance < getValues('spend') ? <p className='validation_msg'>Unsufficient Balance</p> :''}
      <p className='validation_msg'>Available Balance :  {available_token_balance}</p>

      <div className='spend_wrapper'>
        <div className='input_wrapper'>
          <label className='input_label'>Receive ≈</label>
          <input className='spend_input' type="text" defaultValue="0"  value={receivedAmount} name='receive' {...register('receive')}></input>
        </div>
        <div className='dropdown_wrapper' onClick={(e) => { activeDropdown(e, 4) }}>
          <div className="button_img">
            {recieveCoinImage ? <img src={recieveCoinName ==='INR'?rupeeIcon: recieveCoinImage} alt="" /> : <svg width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width={48} height={48} rx={24} fill="#10D173" />
              <path fillRule="evenodd" clipRule="evenodd" d="M32.4094 14V18.0612H26.2231V20.7164C31.2325 20.9436 35 21.9244 35 23.0996C35 24.2746 31.2325 25.2552 26.2231 25.4827V34H21.8155V25.4847C16.7867 25.2605 13 24.2783 13 23.0996C13 21.9211 16.7867 20.9387 21.8155 20.7146V18.0613H15.6292V14H32.4094ZM26.2231 24.4656C30.1774 24.2851 33.1054 23.6349 33.1054 22.8597C33.1054 22.0846 30.177 21.4341 26.2193 21.254V23.708C25.5179 23.7453 24.7693 23.7651 23.9961 23.7651C23.2351 23.7651 22.5013 23.7456 21.8115 23.71V21.2467C17.8381 21.4264 14.8906 22.077 14.8906 22.856C14.8906 23.6349 17.8376 24.2873 21.8115 24.4651L22.0733 24.4763H22.0768C22.3397 24.4864 22.6065 24.4947 22.8775 24.5007H22.9026L23.1312 24.5054H23.1977L23.3891 24.508H24.6135L24.8069 24.5054H24.8761L25.1212 24.5004H25.1325C25.3152 24.4963 25.4955 24.4911 25.6738 24.4851H25.6997L25.9393 24.4763H25.9676L26.2231 24.4656Z" fill="white" />
            </svg>}
          </div>
          <div className="button_text">
            <span>{recieveCoinName}</span>
          </div>
          <div className="button_icon">
            <img src={require('../assets/menu-icon.png')} alt="error" />
          </div>
        </div>
        {active == 4 && <ReceiveCoinListDropDown tokenList={firstCoinList} selectCoin={selectReceiveCoin} />}
      </div>
      <p className='validation_msg recive'>1 {coinName} ≈ {convertPrice} {recieveCoinName}</p>

      <div className='payment_method_wrapper'>
        <p className='payment_method_heading'>
          Payment Methods
        </p>
        <div className='payment_inner' onClick={(e) => { activeDropdown(e, 6) }}>
          <div className='payment_img'>
            <svg width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width={48} height={48} rx={24} fill="#FFA800" />
              <path fillRule="evenodd" clipRule="evenodd" d="M31.8982 21.2741C31.6465 23.0118 30.7388 24.0631 29.1749 24.428C30.2008 24.9586 30.8976 25.6402 31.2653 26.4729C31.633 27.3056 31.5961 28.3546 31.1546 29.6201C30.9257 30.2657 30.6302 30.8108 30.2681 31.2553C29.906 31.6998 29.5029 32.0402 29.0588 32.2765C28.6146 32.5128 28.0952 32.6736 27.5005 32.759C26.9058 32.8443 26.2998 32.8651 25.6827 32.8212C25.0655 32.7774 24.3702 32.6797 23.5967 32.5279L22.7152 36.0928L20.5623 35.5604L21.43 32.0515C20.6844 31.8671 20.1171 31.7218 19.7279 31.6157L18.8568 35.1386L16.7039 34.6063L17.5854 31.0414C17.4177 30.9999 17.1666 30.9354 16.8322 30.8477C16.4979 30.7601 16.2422 30.6944 16.0651 30.6506L13.2691 29.9592L14.3351 27.5081L15.8869 27.8918C16.3529 28.007 16.6819 27.8362 16.874 27.3793L18.2638 21.7594L18.4874 21.8148C18.4338 21.7916 18.3604 21.7685 18.2672 21.7455L19.2594 17.7333C19.295 17.0695 18.9586 16.6501 18.2503 16.4749L16.6985 16.0912L17.2655 13.7985L20.2257 14.5454C20.8222 14.6929 21.2754 14.8 21.5852 14.8668L22.4564 11.3438L24.6093 11.8762L23.7554 15.3292C24.5243 15.4996 25.0951 15.6309 25.4679 15.7231L26.3149 12.298L28.4677 12.8304L27.5966 16.3533C28.3167 16.6006 28.9432 16.8668 29.476 17.1518C30.0087 17.4369 30.4835 17.7768 30.9001 18.1716C31.3167 18.5664 31.6113 19.0249 31.7838 19.5472C31.9563 20.0695 31.9944 20.6451 31.8982 21.2741ZM27.0085 28.1498C27.0914 27.8143 27.0953 27.4988 27.02 27.2032C26.9447 26.9077 26.8253 26.6507 26.6618 26.4323C26.4982 26.2138 26.2654 26.0054 25.9634 25.8071C25.6613 25.6088 25.3774 25.4471 25.1117 25.322C24.8459 25.197 24.5114 25.0698 24.1083 24.9404C23.7051 24.811 23.387 24.7175 23.154 24.6599C22.921 24.6023 22.6193 24.5326 22.2489 24.4509C21.8784 24.3692 21.6559 24.3191 21.5814 24.3007L20.4129 29.0259C20.4874 29.0443 20.6593 29.0893 20.9284 29.1608C21.1975 29.2323 21.4206 29.2899 21.5977 29.3337C21.7748 29.3775 22.0235 29.4316 22.3438 29.4959C22.6642 29.5603 22.9414 29.6091 23.1755 29.6423C23.4096 29.6754 23.685 29.7015 24.0017 29.7205C24.3184 29.7395 24.5932 29.7382 24.826 29.7166C25.0588 29.6951 25.3043 29.652 25.5626 29.5873C25.8209 29.5226 26.0396 29.4283 26.2185 29.3044C26.3975 29.1806 26.5578 29.0224 26.6993 28.8299C26.8409 28.6375 26.9439 28.4108 27.0085 28.1498ZM27.6889 20.3889C27.7467 20.6554 27.7375 20.9424 27.6615 21.25C27.5969 21.5109 27.4962 21.7382 27.3593 21.9318C27.2224 22.1254 27.0523 22.2737 26.8488 22.3767C26.6453 22.4797 26.4418 22.5629 26.2382 22.6262C26.0346 22.6896 25.7873 22.72 25.4962 22.7172C25.2051 22.7145 24.9525 22.7064 24.7382 22.6929C24.524 22.6795 24.2613 22.6418 23.9503 22.5797C23.6393 22.5176 23.404 22.4693 23.2444 22.4348C23.0848 22.4003 22.8681 22.3467 22.5943 22.274C22.3206 22.2014 22.1604 22.1593 22.1138 22.1478L23.1751 17.856C23.2403 17.8721 23.425 17.9153 23.729 17.9855C24.0331 18.0558 24.2859 18.1134 24.4874 18.1583C24.6889 18.2031 24.9563 18.2816 25.2896 18.3937C25.6228 18.5058 25.9002 18.6139 26.1217 18.7182C26.3431 18.8224 26.5804 18.9626 26.8335 19.139C27.0866 19.3153 27.278 19.5011 27.4078 19.6963C27.5375 19.8916 27.6312 20.1225 27.6889 20.3889Z" fill="white" />
            </svg>
          </div>
          <div className='payment_text'>
            <div className='payment_text_inner'>
              <p className='balance'>{paymentMethod}</p>
              <p className='value'>$0</p>
            </div>
            <div className='icon_wrapper'>
              <img src={require('../assets/menu-icon.png')} alt="error" />
            </div>
          </div>
        </div>
        {active == 6 && <AllPaymentMethods selectPayment={selectPayment} />}
      </div>
      <p className='ars_balance'>Top up your ARS balance via <a href='#'> Fiat Deposit</a></p>
      <div className='cta_wrapper'>
        {auth === null ? <button type='button' className='submit_cta' onClick={()=>{navigate('/login')}}>Login</button> : 
          <button type='submit' className='submit_cta' disabled={available_token_balance < getValues('spend') ?'disabled':''} style={{cursor : available_token_balance < getValues('spend') ? 'no-drop' : 'pointer', opacity : available_token_balance < getValues('spend') ? 0.5 : 1}}>Sell {coinName}</button>
        }
        
      </div>
    </form>
  )
}

export default Sell;