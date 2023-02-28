import { React, useEffect, useState, useRef } from 'react';
import { orderReleasedCoin } from '../../Actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import './releasePopup.css';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import { sendOtp } from '../../Actions/authAction';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import { websocket_url } from './../../Api/index';

const CoinReleaseConfirmation = ({ order, setOpen }) => {

  const [open, setOpenOtp] = useState(false);
  const dispatch = new useDispatch();
  const Ref = useRef(null);
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimer] = useState('');
  const [show, setShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastbg, setToastbg] = useState('');
  let users = useSelector((state) => state.users)

  useEffect(() => {
    let popup = document.querySelector(".release_confirmation");
    popup.classList.add("show");
  }, []);

  const closePopup = () => {
    let popupShow = document.querySelector(".release_confirmation.show");
    if (popupShow) {
      popupShow.classList.remove("show");
    }
  }

  const releaseCoinConfirm = async () => {
    let formData = { orderid: order.orderData._id, "number": users.number, "otp": otp, "time": new Date() };
    let data = await dispatch(orderReleasedCoin(formData));
    if (data.data.status === 200) {
      // const ws = new WebSocket(`wss://blcexchange.net:5000/`);
      const ws = new WebSocket(websocket_url);
      let orderData = {
        ws_type: 'order',
        order: data.data.data
      }
      ws.addEventListener('open', () => {
        ws.send(JSON.stringify(orderData));
      })
      setOpenOtp(false);
      setOpen(false);
    }
    else {
      setOpenOtp(true);
      setShow(true);
      setToastbg('warning');
      setToastMessage(data.data.message);
    }
  }

  const sendVerificationCode = async () => {
    let formData = { "dial_code": users.dial_code, "number": users.number, "requestType": "mobile" }
    let data = await dispatch(sendOtp(formData));
    if (data.status === 200) {
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
      <section className='release_confirmation'>
        <div className='two_faq_auth_inner'>
          <h2 className='popup_heading'>Confirmation</h2>
        </div>
        <div className='two_faq_points'>
          <div className='release_warning_content'>
            <p className='two_faq_point_info'>Please note that BLC Exchange will NEVER ask you to release coin for any reason without the confirmation that you have received the FULL payment!</p>
          </div>
        </div>
        <div className='two_faq_points'>
          <div className='release__point_content'>
            <p className='two_faq_point_info'>you'll need to leave the BLC Exchange platform and login to your bank or receiving account to check the balance. You may proceed to release the coins if the full payment has been successfully received. Otherwise, please do not release the coins.
            </p>
          </div>
        </div>
        <div className='release_confirm_check'>
          <input type="checkbox" id="confirmcheck" />
          <label htmlFor="confirmcheck" className='qwe-label'>I confirm that I've received the full payment </label>
        </div>
        <div className='post_confirm_list_item_button'>
          <div className='post_confirm_list_title'><button type="button" style={{ backgroundColor: '#f7a600' }} className=' submit__btn btn text-white' name="submit" onClick={() => {
            let popupShow = document.querySelector(".release_confirmation.show");
            if (popupShow) {
              popupShow.classList.remove("show");
            }
            setOpenOtp(true)
          }}> Confirm </button></div>
          <div className='post_confirm_list_content'><button type="button" style={{ backgroundColor: '#d7d2c8' }} className=' submit__btn btn text-white' name="submit"> Cancel</button></div>
        </div>
        <div className='popup_close' onClick={closePopup}>
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.7118 8.41288C15.6188 8.31915 15.5082 8.24476 15.3864 8.19399C15.2645 8.14322 15.1338 8.11708 15.0018 8.11708C14.8698 8.11708 14.7391 8.14322 14.6172 8.19399C14.4954 8.24476 14.3848 8.31915 14.2918 8.41288L12.0018 10.7129L9.71179 8.41288C9.52348 8.22458 9.26809 8.11879 9.00179 8.11879C8.73549 8.11879 8.48009 8.22458 8.29179 8.41288C8.10348 8.60119 7.9977 8.85658 7.9977 9.12288C7.9977 9.38918 8.10348 9.64458 8.29179 9.83288L10.5918 12.1229L8.29179 14.4129C8.19806 14.5058 8.12367 14.6164 8.0729 14.7383C8.02213 14.8602 7.99599 14.9909 7.99599 15.1229C7.99599 15.2549 8.02213 15.3856 8.0729 15.5075C8.12367 15.6293 8.19806 15.7399 8.29179 15.8329C8.38475 15.9266 8.49535 16.001 8.61721 16.0518C8.73907 16.1025 8.86978 16.1287 9.00179 16.1287C9.1338 16.1287 9.26451 16.1025 9.38636 16.0518C9.50822 16.001 9.61883 15.9266 9.71179 15.8329L12.0018 13.5329L14.2918 15.8329C14.3848 15.9266 14.4954 16.001 14.6172 16.0518C14.7391 16.1025 14.8698 16.1287 15.0018 16.1287C15.1338 16.1287 15.2645 16.1025 15.3864 16.0518C15.5082 16.001 15.6188 15.9266 15.7118 15.8329C15.8055 15.7399 15.8799 15.6293 15.9307 15.5075C15.9814 15.3856 16.0076 15.2549 16.0076 15.1229C16.0076 14.9909 15.9814 14.8602 15.9307 14.7383C15.8799 14.6164 15.8055 14.5058 15.7118 14.4129L13.4118 12.1229L15.7118 9.83288C15.8055 9.73992 15.8799 9.62932 15.9307 9.50746C15.9814 9.3856 16.0076 9.25489 16.0076 9.12288C16.0076 8.99087 15.9814 8.86016 15.9307 8.73831C15.8799 8.61645 15.8055 8.50584 15.7118 8.41288ZM19.0718 5.05288C18.1493 4.09778 17.0459 3.33596 15.8258 2.81187C14.6058 2.28778 13.2936 2.01192 11.9658 2.00038C10.638 1.98884 9.32121 2.24186 8.09225 2.74467C6.86328 3.24747 5.74677 3.99001 4.80784 4.92893C3.86891 5.86786 3.12638 6.98438 2.62357 8.21334C2.12076 9.44231 1.86775 10.7591 1.87928 12.0869C1.89082 13.4147 2.16668 14.7269 2.69077 15.9469C3.21486 17.167 3.97669 18.2704 4.93179 19.1929C5.85426 20.148 6.9577 20.9098 8.17774 21.4339C9.39778 21.958 10.71 22.2338 12.0378 22.2454C13.3656 22.2569 14.6824 22.0039 15.9113 21.5011C17.1403 20.9983 18.2568 20.2558 19.1957 19.3168C20.1347 18.3779 20.8772 17.2614 21.38 16.0324C21.8828 14.8035 22.1358 13.4867 22.1243 12.1589C22.1128 10.8311 21.8369 9.51888 21.3128 8.29884C20.7887 7.0788 20.0269 5.97535 19.0718 5.05288ZM17.6618 17.7829C16.3538 19.0923 14.6323 19.9077 12.7906 20.0902C10.9488 20.2727 9.10079 19.8109 7.56131 18.7837C6.02183 17.7564 4.88615 16.2271 4.34776 14.4564C3.80938 12.6856 3.90159 10.783 4.6087 9.07267C5.31581 7.36231 6.59406 5.95003 8.22568 5.07644C9.8573 4.20286 11.7413 3.92201 13.5568 4.28176C15.3723 4.6415 17.0068 5.61957 18.182 7.04934C19.3572 8.47911 20.0003 10.2721 20.0018 12.1229C20.0054 13.1742 19.8004 14.2157 19.3987 15.1873C18.9971 16.1588 18.4067 17.041 17.6618 17.7829Z" fill="#EB9F12" />
          </svg>
        </div>
      </section>

      {/* order coin released congrates modal */}
      <div className='row'>
        <Modal show={open} centered onHide={() => setOpenOtp(false)}>
          <Modal.Header className="text-center px-4" closeButton={true}>
            <h5>Security Verification</h5>
          </Modal.Header>
          <Modal.Body>
            <div className='release-congrates-body'>
              <div>
                <p>A verification code will be sent to {users.number}</p>
              </div>
              <div>
                <div className="input-group">
                  <input type="number" className="form-control" placeholder="SMS Verification code" onChange={(e) => { setOtp(e.target.value) }} />
                  <div className="input-group-append">
                    <p onClick={sendVerificationCode} style={{ cursor: 'pointer' }}>Send Code</p>
                  </div>
                </div>
              </div>
              <div><span>{timeLeft}</span></div>
            </div>

            <div className='acknowledge-btn'>
              <button className={`paymentbtn ${ otp === '' ? 'verificationBtn' : ''}`} onClick={() => otp !== '' ? releaseCoinConfirm() : ''}>Confirm</button>
              <button className='orderCanclebtn' onClick={() => { setOpenOtp(false) }}>cancel</button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default CoinReleaseConfirmation