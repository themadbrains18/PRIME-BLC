import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Cookies from 'universal-cookie';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import { sendOtp, resetPassword } from "../../Actions/authAction";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const EmailForgetPassword = () => {
  const Ref = useRef(null)
  const navigate = useNavigate();


  const dispatch = new useDispatch();
  const cookies = new Cookies();
  const [disabled, setDisabled] = useState(false)
  const [isloading, setIsloading] = useState(false);
  const [timeLeft, setTimer] = useState('');
  const [show, setShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastbg, setToastbg] = useState('');
  const [btnDisable, setBtnDisable] = useState(false);
  const [pwdTextType, setPwdTextType] = useState('password')

  const formSchema = Yup.object().shape({
    email: Yup.string().email()
      .required('Email is required'),
    code: Yup.string()
      .required('Code is mendatory'),
    password: Yup.string()
      .required('Password is mendatory'),
  })

  let {
    register,
    handleSubmit, watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onClickSendOtp = async (e) => {
    e.preventDefault();

    if (watch('email') === '') {
      setShow(true);
      setToastbg('warning');
      setToastMessage('Email field is required');
      return;
    }
    setDisabled(true);
    setIsloading(true);
    let formData = { "email": watch('email'), "requestType": "email", "resetPassword": true }
    let data = await dispatch(sendOtp(formData));
    if (data.status === 200) {
      setIsloading(false);
      // cookies.set('otp', data.otp, { path: '/', expires: new Date(moment().add(120, 's').format()) });
      // cookies.set('email', watch('email'), { path: '/' });
      setShow(true);
      setToastbg('success');
      setToastMessage('Otp is sent on your email');
      let deadline = new Date();
      deadline.setMinutes(deadline.getMinutes() + 2);
      const timer = setInterval(() => {
        calculateTimeLeft(deadline);
      }, 1000);
      Ref.current = timer;
    }
    else {
      setIsloading(false)
      setDisabled(false);
      setShow(true);
      setToastbg('danger');
      setToastMessage(data.message);
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
      setDisabled(false);
      setShow(true);
      setToastbg('danger');
      setToastMessage('Otp is expired!.');
      // cookies.set('otp', '', { path: '/' });
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

  const onSubmit = async (data) => {
    // console.log(data);
    // if (data.code === cookies.get('otp') && data.email === cookies.get('email')) {
      setBtnDisable(true);
      let formData = { "email": data.email, "password": data.password, "requestType": 'email' , "otp" : data.code, "time": new Date() }
      let result = await dispatch(resetPassword(formData));
      if (result.status === 200) {
        setShow(true);
        setBtnDisable(false);
        setToastbg('success');
        setToastMessage(result.message);
        navigate('/login');
      }
      else {
        setShow(true);
        setBtnDisable(false);
        setToastbg('danger');
        setToastMessage(result.message);
      }
    // }
    // else {
    //   setShow(true);
    //   setToastbg('danger');
    //   setToastMessage('OTP Not Matched');
    // }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tab__content">
        <ToastContainer position="top-center" className="p-3 toast__container">
          <Toast onClose={() => setShow(false)} bg={toastbg} delay={3000} autohide show={show} >
            <Toast.Body style={{ color: toastbg === 'warning' ? '#000' : '#fff' }} >{toastMessage} </Toast.Body>
          </Toast>
        </ToastContainer>
        <div className="form__control">
          <label htmlFor="Email">Email</label>
          <div className="email__verification">
          <input className="reset__input" type="email" id="email" placeholder="Email"
            name="email" {...register('email')} /><button type="submit" className="send__code" onClick={(e) => onClickSendOtp(e)}><i style={{ display: isloading === true ? 'block' : 'none' }} className="fa fa-spinner fa-spin"></i> <span style={{ display: isloading === true ? 'none' : 'block' }}>Send Code</span></button>
          <div className="text-danger">{errors.email?.message}</div>
          </div>
          
        </div>
        <div className="form__control">
          <label htmlFor="verification">Email verification code</label>
          <div className="email__verification">
            {/* <input type="number" id="verification" name="code" {...register('code')} /> */}
            <div className="verficationConatiner">
              <input type="text" id="verification" name="code" {...register('code')} />
              <span style={{ display: timeLeft !== '' ? 'block' : 'none' }}>{timeLeft}</span>
            </div>
          </div>
          <div className="text-danger">{errors.code?.message}</div>
        </div>
        <div className="form__control">
          <label htmlFor="emailPassword">New Pasword</label>
          <input type={pwdTextType} id="emailPassword" name="password" {...register('password')} />
          <div className="text-danger">{errors.password?.message}</div>
          <div className="show__password">
            <span>
              {location.pathname.includes('/trading-chart/') === true ?
                <img src="../../assets/svg/form-eyes-icon.svg" alt="" onClick={() => { setPwdTextType(pwdTextType === 'password' ? 'text' : 'password') }} /> :
                <img src="./assets/svg/form-eyes-icon.svg" alt="" onClick={() => { setPwdTextType(pwdTextType === 'password' ? 'text' : 'password') }}/>
              }


            </span>

          </div>
        </div>
        <div className="form__control">
          <div className="submit__btn__wrapper">
            <button disabled={btnDisable} type="submit" className="submit__btn">Submit</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default EmailForgetPassword;