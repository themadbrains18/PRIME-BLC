import { useState, useRef } from "react";
import { sendOtp, twoFA } from "../../../Actions/authAction";
import google from '../images/google.png'
import { useDispatch } from "react-redux";

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import Modal from 'react-bootstrap/Modal';
import { logout } from "../../../Actions/authAction";

const GoogleAuthModal = ({ users }) => {

  const Ref = useRef(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [disabled, setDisabled] = useState(false)
  const [timeLeft, setTimer] = useState('');
  const [show, setShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastbg, setToastbg] = useState('');
  const [isloading, setIsloading] = useState(false);

  const onClickChangeTwoFA = async (e) => {
    e.preventDefault();

    if (users.email !== '') {
      let formData = { "userid": users.id, "email": users.email, "requestType": 'email', "isEnable": users.secutiryFA === 'enable' ? false : true, "otp": otp, "time": new Date() };
      let data = await dispatch(twoFA(formData));
      if (data.status === 200) {
        setDisabled(false)
        setTimer('');
        if (Ref.current) clearInterval(Ref.current);
        setOpen(false);
        setOtp('');
        await(dispatch(logout()))
      }
    }
    else {
      let formData = { "userid": users.id, "number": users.number, "requestType": "number", "isEnable": users.secutiryFA === 'enable' ? false : true, "otp": otp, "time": new Date() };
      let data = await dispatch(twoFA(formData));
      if (data.status === 200) {
        setDisabled(false)
        setTimer('');
        if (Ref.current) clearInterval(Ref.current);
        setOpen(false);
        setOtp('')
        await(dispatch(logout()))
      }
    }
  }

  const sendVerificationCode = async () => {
    let formData;
    setDisabled(true)
    setIsloading(true);
    if (users.email === "") {
      formData = { "dial_code": users.dial_code, "number": users.number, "requestType": "mobile" }
    }
    else {
      formData = { "email": users.email, "requestType": "email" }
    }

    let data = await dispatch(sendOtp(formData));
    if (data.status === 200) {
      setIsloading(false);
      setShow(true);
      setToastbg('success');
      setToastMessage('Otp Sent!.');
      let deadline = new Date();
      deadline.setMinutes(deadline.getMinutes() + 1);
      const timer = setInterval(() => {
        calculateTimeLeft(deadline);
      }, 1000);
      Ref.current = timer;
    }
  }

  const calculateTimeLeft = (e) => {
    let { total, minutes, seconds }
      = getTimeRemaining(e);

    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) + ' : '
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
    else {
      if (Ref.current) clearInterval(Ref.current);
      setShow(true);
      setToastbg('danger');
      setToastMessage('Otp is expired!.');
      setDisabled(false)
      setTimer('');
      // setOpen(false);
      setOtp('')
    }
  }

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total, minutes, seconds
    };
  }

  return (
    <>
      <ToastContainer position="top-center" className="p-3 toast__container">
        <Toast onClose={() => setShow(false)} bg={toastbg} delay={3000} autohide show={show} >
          <Toast.Body style={{ color: toastbg === 'warning' ? '#000' : '#fff' }}>{toastMessage} </Toast.Body>
        </Toast>
      </ToastContainer>
      <div className='row'>
        <div className='col-md-12'>
          <div className="account-item-container">
            <div className="bylist-item" >
              <div className="accountInfo-auth-container">
                <div className="accountInfo-auth-container-column">
                  <img src={google} alt="avatar set icon" />Google Two Factor Authentication</div>
                <div className="accountInfo-auth-container-content">
                  <div>
                    <span role="img" aria-label="exclamation-circle" className="anticon anticon-exclamation-circle" style={{ color: users.secutiryFA !== 'disable' ? 'rgb(32, 178, 108)' : 'rgb(173, 177, 184)', fontSize: '12px' }}>
                      {users.secutiryFA !== 'disable' ? <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg> :

                        <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                        </svg>
                      }
                    </span>
                    <span className={users.secutiryFA === 'disable' ? "not-set-text" : "set-text"}>{users.secutiryFA === 'disable' ? 'Not Yet Configured' : 'Configured'}</span>
                  </div>
                  <div className="accountInfo-auth-container-content-last">
                    <span className="not-set-text text-special-color">For login, withdrawal, password reset, change of security settings, and API management verification

                    </span>
                  </div>
                </div>
                <div className="accountInfo-auth-container-operation">
                  <button type="button" className={`ant-btn ant-btn-primary ant-btn-background-ghost bybit-ghost ${users.secutiryFA === 'disable' ? 'active' : 'inactive'}`} onClick={(e) => setOpen(true)}><span>{users.secutiryFA === 'disable' ? 'Settings' : 'Change'} </span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={open} centered onHide={() => {
        setOpen(false)
        setDisabled(false)
        if (Ref.current) clearInterval(Ref.current)
        setTimer(' ')
      }}>
        <Modal.Header className="text-center" closeButton={true} style={{ padding: '32px 32px 17px' }}>
          <h4 style={{ fontSize: '14px' }}>Set Up Google Two-Factor Authentication</h4>
        </Modal.Header>
        <Modal.Body>
          <div className='release-congrates-body'>
            <div>
              <p style={{ fontSize: '12px' }}>A verification code will be sent to {users.email === '' ? users.dial_code + ' ' + users.number : users.email}</p>
            </div>
            <div>
              <div className="input-group">
                <input type="number" className="form-control" placeholder="SMS Verification code" onChange={(e) => { setOtp(e.target.value) }} />
                <div className="input-group-append">
                  <button disabled={disabled} onClick={sendVerificationCode} style={{ cursor: 'pointer', fontSize:'12px', padding:'0 10px', color:'#f7a600' }}>Send Code</button>
                </div>
              </div>
            </div>
            <div><span>{timeLeft}</span></div>
          </div>

          <div className='acknowledge-btn'>
            <button className={`paymentbtn ${otp === '' ? 'verificationBtn' : ''}`} onClick={(e) => onClickChangeTwoFA(e)}>Confirm</button>
            <button className='orderCanclebtn' onClick={() => {if (Ref.current) clearInterval(Ref.current),setTimer(' '),setOpen(false),setDisabled(false)}}>cancel</button>
          </div>
        </Modal.Body>
      </Modal>
    </>

  )
}

export default GoogleAuthModal;