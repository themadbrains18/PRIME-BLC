import { useState, useRef, useEffect } from "react";
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
import countryList from '../../Constants/countryCodeList.json'

const MobileForgetPassword = () => {

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

  const [country, setCountry] = useState(countryList);

  const [open, setOpen] = useState(false)
  const [code, setCode] = useState(91);
  const [iso, setIso] = useState('IN');
  const [pwdTextType, setPwdTextType] = useState('password')

  const formSchema = Yup.object().shape({
    number: Yup.string()
      .required('Number is required'),
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

    if (watch('number') === '') {
      setShow(true);
      setToastbg('warning');
      setToastMessage('Number field is required');
      return;
    }
    setDisabled(true);
    setIsloading(true);
    let formData = { "dial_code": code, "number": watch('number'), "requestType": "mobile", "resetPassword": true }
    let data = await dispatch(sendOtp(formData));
    if (data.status === 200) {
      setIsloading(false);
      // cookies.set('otp', data.otp, { path: '/', expires: new Date(moment().add(120, 's').format()) });
      // cookies.set('phone', watch('number'), { path: '/' });
      setShow(true);
      setToastbg('success');
      setToastMessage('Otp sent');
      let deadline = new Date();
      deadline.setMinutes(deadline.getMinutes() + 2);
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
    // if (data.code === cookies.get('otp') && data.number === cookies.get('phone')) {
      setBtnDisable(true);
      let formData = { "dial_code": code, "number": data.number, "password": data.password, "requestType": 'mobile' , "otp" : data.code, "time": new Date() }
      let result = await dispatch(resetPassword(formData));
      if (result.status === 200) {
        setShow(true);
        setBtnDisable(false);
        setToastbg('success');
        setToastMessage("Password Updated Successfully");
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

  const filterCountry = (e) => {
    // console.log(e.target.value)
    let filterItem = countryList.filter((item) => {
      if (item.country.toLowerCase().includes(e.target.value.toLowerCase()) === true) {
        return item
      }
    });
    setCountry(filterItem)
  }

  useEffect(() => {

    window.addEventListener('click', function (e) {
      var content_area = document.getElementsByClassName("dropdown");
      if (e.target.parentNode.classList[0] !== "modal-open") {
        if (e.target.parentNode.parentNode.classList[0] === "dropdown" || e.target.parentNode.parentNode.parentNode.classList[0] === "dropdown" || e.target.parentNode.parentNode.parentNode.parentNode.classList[0] === "dropdown" || e.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList[0] === "dropdown") {

        }
        else {
          setOpen(false);
        }
      }
      else {
        setOpen(false);
      }

    });

  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tab__content">
        <ToastContainer position="top-center" className="p-3 toast__container">
          <Toast onClose={() => setShow(false)} bg={toastbg} delay={3000} autohide show={show} >
            <Toast.Body style={{ color: toastbg === 'warning' ? '#000' : '#fff' }} >{toastMessage} </Toast.Body>
          </Toast>
        </ToastContainer>
        <div className="form__control">
          <label htmlFor="phone login__number">Phone</label>
          <div className="input__dropdown__wrapper">
            <div className="input__dropdown login__number__input">
              <div className="dropdown">
                <button type="button" className="dropdown__btn" onClick={() => { setOpen(open === true ? false : true) }}> <span className="code">+{code}</span>
                  <svg className="down_svg__icon" width="24" height="24"
                    viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor">
                    <path
                      d="M201.344 406.656L466.752 672a64 64 0 0090.496 0l265.408-265.344a32 32 0 00-45.312-45.312L512 626.752 246.656 361.344a32 32 0 10-45.312 45.312z">
                    </path>
                  </svg>
                </button>
                <div className="number__dropdown" style={{ display: open === true ? 'block' : 'none' }}>
                  <div className="search__input">
                    <label htmlFor="search">
                      <svg className="search_svg__icon" viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="currentColor">
                        <defs>
                          <style></style>
                        </defs>
                        <path
                          d="M719.104 688.896l134.23 134.272a21.333 21.333 0 01-30.166 30.165L688.896 719.104l30.208-30.208zm-249.77-518.23a298.667 298.667 0 110 597.334 298.667 298.667 0 010-597.333zm0 42.667a256 256 0 100 512 256 256 0 000-512z">
                        </path>
                      </svg>
                    </label>
                    <input type="text" id="search" className="search__input" onChange={(e) => { filterCountry(e) }} />
                  </div>
                  <div className="select__countery">
                    {country.map((item) => {
                      return <div className={`${iso === item.iso ? 'selected' : ''} countery`} onClick={() => { setOpen(false), setCode(item.code), setIso(item.iso) }}>
                        <div className="flag">
                          <img src={require(`../../assets/flag/svg/${item.iso.toLowerCase()}.svg`)}></img>
                          <p className="countery__code">{item.country}</p>
                        </div>
                        <div className="number">+{item.code}</div>
                      </div>
                    })}
                  </div>
                </div>
              </div>
              <input type="number" id="phone" placeholder="phone" name="number" {...register('number')} />
            </div>
            <button className="send__code" disabled={disabled} onClick={(e) => onClickSendOtp(e)}><i style={{ display: isloading === true ? 'block' : 'none' }} className="fa fa-spinner fa-spin"></i> <span style={{ display: isloading === true ? 'none' : 'block' }}>Send Code</span></button>
          </div>
          <div className="text-danger">{errors.number?.message}</div>
        </div>
        <div className="form__control">
          <label htmlFor="verification">Phone verification code</label>
          <input type="text" id="verification" name="code" {...register('code')} />
          <div className="text-danger">{errors.code?.message}</div>
        </div>
        <div className="form__control">
          <label htmlFor="mobilePassword">New Pasword</label>
          <input type={pwdTextType} id="mobilePassword" name="password" {...register('password')} />
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

export default MobileForgetPassword;