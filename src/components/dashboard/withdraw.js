import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'universal-cookie';
import { sendOtp } from "../../Actions/authAction";
import { PROJECT_NAME } from "../../Constants/Index";
import { getTknBalance } from "../../Actions/withdrawAction"
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from "react-toastify";
import { sta_Toaster } from "../../Core/toaster"
import '../../Style/withdraw.css'
import { withdrawNewRequest, getSpecificTokenWithdraw } from "../../Actions/withdrawAction";
import CoinListDropdown from '../p2p/oneClickBuy/sections/coin-list-dropdown';
import NetworkListDropDown from "../p2p/oneClickBuy/sections/network-list-dropdown";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";

import menuicon from '../../components/user-assest/images/menu.svg'


const WithDraw = ({ showSideBar }) => {

  const navigate = useNavigate();
  const formSchema = Yup.object().shape({
    networkList: Yup.array()
      .required('Coin field is required'),
    network: Yup.string()
      .required('Network field is required'),

    amount: Yup.number().positive().typeError("This Field is required").nullable(),

    walletAddress: Yup.string()
      .required('Wallet address is mendatory'),
    otp: Yup.string()
      .required('Otp is mendatory')
  })

  let {
    register,
    handleSubmit, setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const cookies = new Cookies();
  const dispatch = new useDispatch();
  const users = useSelector((state) => state.users);
  let tokenList = useSelector((state) => state.deposittokens);
  const withdraws = useSelector((state) => state.withdraws)
  let assets = useSelector((state) => state.assets);
  let withdrawlist = useSelector((state) => state.withdrawlist);



  // ====================================== //
  // 
  // ====================================== //

  let availableAssets = assets.map((Av => Av.token))

  availableAssets = [...new Set(availableAssets)]

  tokenList = tokenList.filter((avt) => {
    return availableAssets.includes(avt.coinName) ? avt : ''
  });

  // selectCoin

  //==================================//
  // popup controls
  //==================================//

  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [coinName, setcoinName] = useState('Select Coin');
  const [coinImage, setcoinImage] = useState('');

  //==================================//
  // form field
  //==================================//

  const [networkList, setnetworkList] = useState([]);
  const [networkName, setNetworkcoinName] = useState('Select Network');
  const [active, setActive] = useState(0)
  const [walletAddress, setWalletAddress] = useState('')
  const [userOtp, setUserOtp] = useState('')
  const [minimum, setMinimum] = useState('')

  const [selectedIndex, setSelectedIndex] = useState(0)

  const activeDropdown = (e, index) => {
    e.preventDefault();
    if (index === active) {
      setActive(0)
    } else {
      setActive(index)
    }

  }
  const closeDropdown = () => {
    if (active !== false) {
      setActive(false);
    }
  }

  const selectCoin = async (data, index) => {
    setSelectedIndex(index)
    setcoinName(data?.coinName)
    setcoinImage(data?.image)
    setnetworkList(data?.network);
    setMinimum(data?.minimum_withdraw)
    setValue('networkList', data?.network, { shouldValidate: true })
    dispatch(getTknBalance(data?.coinName, users?.id))
    dispatch(getSpecificTokenWithdraw(data?.coinName))
  }

  useEffect(() => {
    const auth = sessionStorage.getItem('token');
    if(auth === null){
      navigate('/login')
    }
    if (tokenList.length > 0) {
      dispatch(getSpecificTokenWithdraw(tokenList[0]?.coinName))
      selectCoin(tokenList[0])
      setValue('networkList', tokenList[0]?.network, { shouldValidate: true });
    }

  }, [assets])



  // console.log(selectCoin(tokenList[0]))

  const selectNetwork = async (item) => {
    setNetworkcoinName(item.Network);
    setValue('network', item?.Network, { shouldValidate: true });
  }

  //=====================================================//
  // Otp controls
  //=====================================================//

  const withdrawOtp = async (e) => {
    e.preventDefault();

    let type = cookies.get('reqtype');
    let email = cookies.get('email');
    let phone = cookies.get('phone');
    let formData = { "email": users.username, "requestType": "email" }
    if (type === 'mobile') {
      formData = {"dial_code": 91, "number": users.username, "requestType": "mobile" }
    }

    let data = await dispatch(sendOtp(formData));
    if (data.status === 200) {
      sta_Toaster(data.message, 'success')
    }
  }

  //=================================================//
  // withdraw form controller
  //=================================================//
  const withDrawControl = async (data) => {

    if (data.amount < minimum) {
      sta_Toaster(`Withdraw minimum ${minimum}`, 'error')
      return;
    }
    
    //*****************************//
    // form valiation
    //*****************************//
    let formData = {
      coinName:coinName,
      networkList: data.networkList,
      networkName: data.network,
      tokekAmount: data.amount,
      walletAddress: data.walletAddress,
      otp : data.otp,
      time : new Date(),
      userName: users.username
    }

    const res = await dispatch(withdrawNewRequest(formData))
    if (res.status === 200) {
      localStorage.removeItem('otp')
      sta_Toaster(res.data.message, 'success')

    } else {
      sta_Toaster(res.response.data.message, 'error')
    }
  }

  return (
    <div className='container overview__container' onClick={closeDropdown}>
      <div className='responsive_toggle'>
        <div className="side-panel__menubtn">
          <img className="side-panel__icon side-panel__menu-icon right_to_left_icon" src={menuicon} alt="" onClick={showSideBar} />
          <span className="side-panel__other-link-order"></span>
        </div>
      </div>
      <ToastContainer />
      <div className='row'>
        <div className='col-lg-7'>
          <div className='row'>
            <div className='col-md-12 mt-5'>
              <h1>Withdraw</h1> <h3 style={{ color: '#d8ad5e' }}><span className="avalible_limit">Available Amount:</span>
                {withdraws.data != undefined && withdraws?.data ?
                  withdraws.data.balance[0]?.totalBalance ? withdraws.data.balance[0]?.totalBalance : '0.00'
                  : '0.00'}
              </h3>
            </div>
          </div>
          <div className='mt-5 margin_zero_add '>
            <div className='new_depost'>
              <form onSubmit={handleSubmit(withDrawControl)}>
                <div className="withdraw_coin_title">Coin</div>
                <div className="coin-wrapp">
                  <div className='withdraw_dropdown_wrapper' onClick={(e) => { activeDropdown(e, 1) }}>
                    <div className="withdraw_button_img">
                      {/* <svg width={24} height={24} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width={48} height={48} rx={24} fill="#FFA800" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M31.8982 21.2741C31.6465 23.0118 30.7388 24.0631 29.1749 24.428C30.2008 24.9586 30.8976 25.6402 31.2653 26.4729C31.633 27.3056 31.5961 28.3546 31.1546 29.6201C30.9257 30.2657 30.6302 30.8108 30.2681 31.2553C29.906 31.6998 29.5029 32.0402 29.0588 32.2765C28.6146 32.5128 28.0952 32.6736 27.5005 32.759C26.9058 32.8443 26.2998 32.8651 25.6827 32.8212C25.0655 32.7774 24.3702 32.6797 23.5967 32.5279L22.7152 36.0928L20.5623 35.5604L21.43 32.0515C20.6844 31.8671 20.1171 31.7218 19.7279 31.6157L18.8568 35.1386L16.7039 34.6063L17.5854 31.0414C17.4177 30.9999 17.1666 30.9354 16.8322 30.8477C16.4979 30.7601 16.2422 30.6944 16.0651 30.6506L13.2691 29.9592L14.3351 27.5081L15.8869 27.8918C16.3529 28.007 16.6819 27.8362 16.874 27.3793L18.2638 21.7594L18.4874 21.8148C18.4338 21.7916 18.3604 21.7685 18.2672 21.7455L19.2594 17.7333C19.295 17.0695 18.9586 16.6501 18.2503 16.4749L16.6985 16.0912L17.2655 13.7985L20.2257 14.5454C20.8222 14.6929 21.2754 14.8 21.5852 14.8668L22.4564 11.3438L24.6093 11.8762L23.7554 15.3292C24.5243 15.4996 25.0951 15.6309 25.4679 15.7231L26.3149 12.298L28.4677 12.8304L27.5966 16.3533C28.3167 16.6006 28.9432 16.8668 29.476 17.1518C30.0087 17.4369 30.4835 17.7768 30.9001 18.1716C31.3167 18.5664 31.6113 19.0249 31.7838 19.5472C31.9563 20.0695 31.9944 20.6451 31.8982 21.2741ZM27.0085 28.1498C27.0914 27.8143 27.0953 27.4988 27.02 27.2032C26.9447 26.9077 26.8253 26.6507 26.6618 26.4323C26.4982 26.2138 26.2654 26.0054 25.9634 25.8071C25.6613 25.6088 25.3774 25.4471 25.1117 25.322C24.8459 25.197 24.5114 25.0698 24.1083 24.9404C23.7051 24.811 23.387 24.7175 23.154 24.6599C22.921 24.6023 22.6193 24.5326 22.2489 24.4509C21.8784 24.3692 21.6559 24.3191 21.5814 24.3007L20.4129 29.0259C20.4874 29.0443 20.6593 29.0893 20.9284 29.1608C21.1975 29.2323 21.4206 29.2899 21.5977 29.3337C21.7748 29.3775 22.0235 29.4316 22.3438 29.4959C22.6642 29.5603 22.9414 29.6091 23.1755 29.6423C23.4096 29.6754 23.685 29.7015 24.0017 29.7205C24.3184 29.7395 24.5932 29.7382 24.826 29.7166C25.0588 29.6951 25.3043 29.652 25.5626 29.5873C25.8209 29.5226 26.0396 29.4283 26.2185 29.3044C26.3975 29.1806 26.5578 29.0224 26.6993 28.8299C26.8409 28.6375 26.9439 28.4108 27.0085 28.1498ZM27.6889 20.3889C27.7467 20.6554 27.7375 20.9424 27.6615 21.25C27.5969 21.5109 27.4962 21.7382 27.3593 21.9318C27.2224 22.1254 27.0523 22.2737 26.8488 22.3767C26.6453 22.4797 26.4418 22.5629 26.2382 22.6262C26.0346 22.6896 25.7873 22.72 25.4962 22.7172C25.2051 22.7145 24.9525 22.7064 24.7382 22.6929C24.524 22.6795 24.2613 22.6418 23.9503 22.5797C23.6393 22.5176 23.404 22.4693 23.2444 22.4348C23.0848 22.4003 22.8681 22.3467 22.5943 22.274C22.3206 22.2014 22.1604 22.1593 22.1138 22.1478L23.1751 17.856C23.2403 17.8721 23.425 17.9153 23.729 17.9855C24.0331 18.0558 24.2859 18.1134 24.4874 18.1583C24.6889 18.2031 24.9563 18.2816 25.2896 18.3937C25.6228 18.5058 25.9002 18.6139 26.1217 18.7182C26.3431 18.8224 26.5804 18.9626 26.8335 19.139C27.0866 19.3153 27.278 19.5011 27.4078 19.6963C27.5375 19.8916 27.6312 20.1225 27.6889 20.3889Z" fill="white" />
                      </svg> */}
                      <img src={coinImage} alt="" width='24' />
                    </div>
                    <div className="withdraw_button_text">
                      <span>{coinName}</span>
                    </div>
                    <div className="withdraw_button_icon">
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </div>
                  {active === 1 && <CoinListDropdown tokenList={tokenList} selectCoin={selectCoin} />
                  }
                </div>
                <div className="text-danger">{errors.networkList?.message}</div>

                <div className='select-field mt-3 network-wrapp'>
                  <span>Network</span>
                  <div className='withdraw_dropdown_wrapper' onClick={(e) => { activeDropdown(e, 2) }}>
                    <div className="withdraw_button_img">
                      <svg width={24} height={24} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width={48} height={48} rx={24} fill="#FFA800" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M31.8982 21.2741C31.6465 23.0118 30.7388 24.0631 29.1749 24.428C30.2008 24.9586 30.8976 25.6402 31.2653 26.4729C31.633 27.3056 31.5961 28.3546 31.1546 29.6201C30.9257 30.2657 30.6302 30.8108 30.2681 31.2553C29.906 31.6998 29.5029 32.0402 29.0588 32.2765C28.6146 32.5128 28.0952 32.6736 27.5005 32.759C26.9058 32.8443 26.2998 32.8651 25.6827 32.8212C25.0655 32.7774 24.3702 32.6797 23.5967 32.5279L22.7152 36.0928L20.5623 35.5604L21.43 32.0515C20.6844 31.8671 20.1171 31.7218 19.7279 31.6157L18.8568 35.1386L16.7039 34.6063L17.5854 31.0414C17.4177 30.9999 17.1666 30.9354 16.8322 30.8477C16.4979 30.7601 16.2422 30.6944 16.0651 30.6506L13.2691 29.9592L14.3351 27.5081L15.8869 27.8918C16.3529 28.007 16.6819 27.8362 16.874 27.3793L18.2638 21.7594L18.4874 21.8148C18.4338 21.7916 18.3604 21.7685 18.2672 21.7455L19.2594 17.7333C19.295 17.0695 18.9586 16.6501 18.2503 16.4749L16.6985 16.0912L17.2655 13.7985L20.2257 14.5454C20.8222 14.6929 21.2754 14.8 21.5852 14.8668L22.4564 11.3438L24.6093 11.8762L23.7554 15.3292C24.5243 15.4996 25.0951 15.6309 25.4679 15.7231L26.3149 12.298L28.4677 12.8304L27.5966 16.3533C28.3167 16.6006 28.9432 16.8668 29.476 17.1518C30.0087 17.4369 30.4835 17.7768 30.9001 18.1716C31.3167 18.5664 31.6113 19.0249 31.7838 19.5472C31.9563 20.0695 31.9944 20.6451 31.8982 21.2741ZM27.0085 28.1498C27.0914 27.8143 27.0953 27.4988 27.02 27.2032C26.9447 26.9077 26.8253 26.6507 26.6618 26.4323C26.4982 26.2138 26.2654 26.0054 25.9634 25.8071C25.6613 25.6088 25.3774 25.4471 25.1117 25.322C24.8459 25.197 24.5114 25.0698 24.1083 24.9404C23.7051 24.811 23.387 24.7175 23.154 24.6599C22.921 24.6023 22.6193 24.5326 22.2489 24.4509C21.8784 24.3692 21.6559 24.3191 21.5814 24.3007L20.4129 29.0259C20.4874 29.0443 20.6593 29.0893 20.9284 29.1608C21.1975 29.2323 21.4206 29.2899 21.5977 29.3337C21.7748 29.3775 22.0235 29.4316 22.3438 29.4959C22.6642 29.5603 22.9414 29.6091 23.1755 29.6423C23.4096 29.6754 23.685 29.7015 24.0017 29.7205C24.3184 29.7395 24.5932 29.7382 24.826 29.7166C25.0588 29.6951 25.3043 29.652 25.5626 29.5873C25.8209 29.5226 26.0396 29.4283 26.2185 29.3044C26.3975 29.1806 26.5578 29.0224 26.6993 28.8299C26.8409 28.6375 26.9439 28.4108 27.0085 28.1498ZM27.6889 20.3889C27.7467 20.6554 27.7375 20.9424 27.6615 21.25C27.5969 21.5109 27.4962 21.7382 27.3593 21.9318C27.2224 22.1254 27.0523 22.2737 26.8488 22.3767C26.6453 22.4797 26.4418 22.5629 26.2382 22.6262C26.0346 22.6896 25.7873 22.72 25.4962 22.7172C25.2051 22.7145 24.9525 22.7064 24.7382 22.6929C24.524 22.6795 24.2613 22.6418 23.9503 22.5797C23.6393 22.5176 23.404 22.4693 23.2444 22.4348C23.0848 22.4003 22.8681 22.3467 22.5943 22.274C22.3206 22.2014 22.1604 22.1593 22.1138 22.1478L23.1751 17.856C23.2403 17.8721 23.425 17.9153 23.729 17.9855C24.0331 18.0558 24.2859 18.1134 24.4874 18.1583C24.6889 18.2031 24.9563 18.2816 25.2896 18.3937C25.6228 18.5058 25.9002 18.6139 26.1217 18.7182C26.3431 18.8224 26.5804 18.9626 26.8335 19.139C27.0866 19.3153 27.278 19.5011 27.4078 19.6963C27.5375 19.8916 27.6312 20.1225 27.6889 20.3889Z" fill="white" />
                      </svg>
                    </div>
                    <div className="withdraw_button_text">
                      <span>{networkName}</span>
                    </div>
                    <div className="withdraw_button_icon">
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </div>
                  {active === 2 && <NetworkListDropDown networkList={networkList} selectNetwork={selectNetwork} />
                  }
                </div>
                <div className="text-danger">{errors.network?.message}</div>

                <div className='form-group withdrawal-input mt-4'>
                  <div className='row m-0 align-items-center'>
                    {/* <div className='col-md-3 sm_p0'>
                      <p className='m-0'>Enter Your Amount</p>
                    </div> */}
                    <div className='col-md-9 pr-0 pl-0'>
                      <p> {withdraws.data != undefined && withdraws.data.balance[0]?.totalBalance ? withdraws.data.balance[0]?.totalBalance : '0.00'}</p>
                      <input type='number' {...register('amount')} step="any" min="0" max={withdraws.data != undefined && withdraws.data.balance[0]?.totalBalance} name="amount" className='form-control' placeholder='Enter Your Amount' />
                      <div className="text-danger">{errors.amount?.message}</div>
                    </div>
                  </div>

                </div>
                <div className='form-group withdrawal-input mt-4'>
                  <div className='row m-0 align-items-center'>
                    {/* <div className='col-md-3 sm_p0'>
                      <p className='m-0'>Enter Your Wallet Address</p>
                    </div> */}
                    <div className='col-md-9 pr-0  pl-0'>
                      <input type='text' className='form-control' name="walletAddress" {...register('walletAddress')} placeholder='Enter Your Wallet Address' />
                      <div className="text-danger">{errors.walletAddress?.message}</div>
                    </div>
                  </div>

                </div>
                <div className='form-group withdrawal-input mt-4'>
                  <div className='row m-0 align-items-center'>
                    {/* <div className='col-md-3 sm_p0'>
                      <p className='m-0'>Enter Your OTP</p>
                    </div> */}
                    <div className='col-md-9 pr-0  pl-0  align-items-center justify-content-between'>
                      <div className="d-flex">
                        <input type='text' name="otp" {...register('otp')} className='form-control' placeholder='Enter Your OTP' />


                        <a onClick={(e) => withdrawOtp(e)} className='btn text-nowrap otp-btn ml-3'> Get Otp</a>
                      </div>
                      <div className="text-danger">{errors.otp?.message}</div>
                    </div>

                  </div>
                </div>
                <div className="form-group withdrawal-input mt-4">
                  <div className="row">
                    <div className="col-md-9" style={{ textAlign: 'center' }}>
                      <button className='btn submit-button' type='submit'> Submit </button>
                    </div>
                  </div>
                </div>

              </form>




              <div className=" row  m-0 " >
                <div className="col-12 mt-5 tmb-s-modifier">
                  <div className=" card bg-transparent border-0 padding_zero_add">

                    <div className="col-12 tip">
                      <div className='row' style={{ padding: '20px 10px' }}>
                        <div className='col-md-6'>
                          <p className='m-0 fs-6 font-weight-bold'>Available Balance: </p>
                          <p>0.00 USDT</p>
                        </div>
                        <div className='col-md-6'>
                          <p className='m-0 fs-6 font-weight-bold'>Minimum Withdrawal: </p>
                          <p>1.00 USDT</p>
                        </div>
                        <div className='col-md-6 mt-2'>
                          <p className='m-0 fs-6 font-weight-bold'>Fees: </p>
                          <p>0.10-35.00 USDT</p>
                        </div>
                        <div className='col-md-6 mt-2'>
                          <p className='m-0 fs-6 font-weight-bold'>Remaining daily withdrawal amount:</p>
                          <p>1 BTC</p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
        <div className='col-lg-5'>
          <div className='row'>
            {/* <div className='col-md-12 mt-5'>
              <Link to={'/vendor/withdrawAssets'} className='withdraw-btn'>Withdraw Fiat <span><i className="fas fa-arrow-right"></i></span></Link>
            </div> */}
            <div className='depost-faq mt-5'>
              <h2>FAQ</h2>
              <div className='faq-con'>
                <ul>
                  <li className='d-flex'><i className="fas fa-arrow-right"></i><p className='ml-2'> How do I withdraw crypto from my {PROJECT_NAME} account?</p></li>
                  <li className='d-flex'><i className="fas fa-arrow-right"></i><p className='ml-2'>What should I do if I didn't receive my withdrawal or if I made a withdrawal to an incorrect address? </p></li>
                  <li className='d-flex'><i className="fas fa-arrow-right"></i><p className='ml-2'>Is there a limit on 24h withdrawal?</p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <WithdrawTable data={withdrawlist} /> */}

    </div>
  )
}

export default WithDraw;