import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'universal-cookie';
import MobileLogin from "./mobileLogin";
import EmailLogin from "./emailLogin";
// -- api call to login form
import { loginRequest } from "../../Actions/authAction";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import ScanQr from "../../Core/scanQr";
import Authentication from "../popup/authentication";
import GoogleAuthentication from "../popup/googleAuthentication";
import { LOGIN } from "../../Constants/Index";

const FormSection = (props) => {

  const location = useLocation();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [currentTab, setCurrentTab] = useState('mobile');
  const [twoFASecurity, setTwoFASecurity] = useState('disable');
  const [userAuth, setUserAuth] = useState();
  const [resetDisable, setResetDisable] = useState(false);
  const [toastMessage, setToastMessage] = useState('')
  const [toastbg, setToastbg] = useState('');
  const [show, setShow] = useState(false);
  let secret = useSelector((state) => state.secret)
  const dispatch = useDispatch()
  const [checkAuth, setCheckAuth] = useState(false)

  const [locationIP, setLocation] = useState({});

  const getData = async () => {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()

    setLocation({ip : data.ip, region : data.region, org : data.org, city: data.city})
  }

  useEffect(() => {
    getData()
  }, [])

  const onFormSubmit = async (form) => {
    let data = {
      username: form.username,
      password: form.password,
      dial_code: form.dial_code,
      requestType: currentTab,
      location : locationIP
    }
    let result = await dispatch(loginRequest(data))
    cookies.set('reqtype', currentTab, { path: '/' });
    const current = new Date();
    const nextHours = new Date();
    nextHours.setHours(current.getHours() + 24);
    if (result.status === 200 && result != undefined) {
      if (result.secutiryFA === 'enable') {
        setUserAuth(result);
        setTwoFASecurity(result.secutiryFA);
        setCheckAuth(true)
      }
      else {
        if (location.pathname.includes('/trading-chart/') == false) {
          navigate('/user/assets/overview');
        }
      }
    }
    else {
      setShow(true);
      setToastbg('danger');
      setToastMessage(result.message);
      setResetDisable(false);
    }
  }

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return (() => {
      window.removeEventListener('resize', setDimension);
    })

  }, [screenSize])

  const verified2FA = () => {
    dispatch({ type: LOGIN, payload: userAuth })
    navigate('/user/assets/overview');
    setCheckAuth(false);
  }

  return (
    <div className="sec__form" >
      <div className="form">
        <div className="signup_heading">
          <h2 className="form__heading">Welcome to BLC Exchange</h2>
        </div>
        <div className="link_heading">
          New To BLC Exchange? <span onClick={(e) => navigate('/sign-up')}>  <a>Sign up</a></span>
        </div>

        <div className="form__tabs__wrapper">
          <div className="form__tabs__btn">
            <button className={currentTab === 'mobile' ? 'active form__tab__btn line' : 'form__tab__btn line'} onClick={(e) => { e.preventDefault(), setCurrentTab('mobile') }}>Mobile </button>
            <button className={currentTab === 'email' ? 'active form__tab__btn Email' : 'form__tab__btn Email'} onClick={(e) => { e.preventDefault(), setCurrentTab('email') }}>Email</button>
            {/* <button className={currentTab === 'qr' ? 'active form__tab__btn qr__code' : 'form__tab__btn qr__code'} onClick={(e) => { e.preventDefault(), setCurrentTab('qr') }}>with QR Code</button> */}
          </div>
          <ToastContainer position="top-center" className="p-3 toast__container">
            <Toast onClose={() => setShow(false)} bg={toastbg} delay={3000} autohide show={show} >
              <Toast.Body style={{ color: toastbg === 'warning' ? '#000' : '#fff' }}>{toastMessage} </Toast.Body>
            </Toast>
          </ToastContainer>
          <div className={currentTab === 'mobile' ? 'active form__tabs' : 'form__tabs'}>
            <MobileLogin onFormSubmit={onFormSubmit} resetDisable={resetDisable} />
          </div>
          <div className={currentTab === 'email' ? 'active form__tabs' : 'form__tabs'}>
            <EmailLogin onFormSubmit={onFormSubmit} resetDisable={resetDisable} />
          </div>
        </div>

        <div className="submit__btn__wrapper">
          <Link to="/reset-password" className="not__recive forget__password">Forgot Password?</Link>
        </div>
      </div>
      {screenSize.dynamicWidth > 575 && props.showRightPanel === true &&
        <ScanQr />
      }
      {twoFASecurity === 'enable' && secret === '' &&
        <Authentication userAuth={userAuth} verified2FA={verified2FA} /> 
      }

      {twoFASecurity === 'enable' && secret === 'enable' &&
        <GoogleAuthentication checkAuth={checkAuth} userAuth={userAuth} verified2FA={verified2FA}/>
      }

    </div>
  )
}

export default FormSection;