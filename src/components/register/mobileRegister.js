import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Cookies from 'universal-cookie';
import Toast from 'react-bootstrap/Toast';
import Dropdown from 'react-bootstrap/Dropdown';
import ToastContainer from 'react-bootstrap/ToastContainer'
import { sendOtp, sendRegisterRequest } from "../../Actions/authAction";
import moment from 'moment';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import countryList from '../../Constants/countryCodeList.json'

const MobileRegister = ({locationIP}) => {
  let location = useLocation();
  const Ref = useRef(null);
  const navigate = useNavigate();
  const dispatch = new useDispatch();
  const cookies = new Cookies();
  const [disabled, setDisabled] = useState(false)
  const [isloading, setIsloading] = useState(false);
  const [isloading2, setIsloading2] = useState(false);
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

  var query = window.location.search.substring(1);

  const formSchema = Yup.object().shape({
    number: Yup.string()
      .required('This field is required'),
    code: Yup.string()
      .required('code is mendatory'),
    password: Yup.string()
      .required('password is mendatory'),
    terms: Yup.string()
      .required('Please Select Terms and condition'),
  })

  let {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });


  const onClickSendSmsOtp = async (e) => {
    e.preventDefault();
    if (watch('number') === '') {
      setShow(true);
      setToastbg('warning');
      setToastMessage('Number field is required');
      return;
    }
    setDisabled(true);
    setIsloading(true);
    let formData = { "dial_code": code, "number": watch('number'), "requestType": "mobile" }
    let data = await dispatch(sendOtp(formData));
    if (data.status === 200) {
      setIsloading(false);
      // cookies.set('smsotp', data.otp, { path: '/', expires: new Date(moment().add(60, 's').format()) });
      // cookies.set('email', '', { path: '/' });
      // cookies.set('phone', watch('number'), { path: '/' });
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
    else {
      setDisabled(false);
      setIsloading(false);
      setShow(true);
      setToastbg('warning');
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
    //if (data.code === cookies.get('smsotp') && data.number === cookies.get('phone')) {
      // console.log(new Date(),' date tiem current');
    let formData = { "number": data.number, "password": data.password, dial_code: code, "requestType": "mobile", "otp": data.code, "time": new Date(),location : JSON.stringify(locationIP)}
    let result = await dispatch(sendRegisterRequest(formData));
    if (result.status === 200) {
      setIsloading2(false)
      setBtnDisable(false);
      setDisabled(false);
      navigate('/login');
    }
    else {
      setShow(true);
      setToastbg('danger');
      setToastMessage(result.message);
      setIsloading2(false)
      setBtnDisable(false);
      setDisabled(false);

    }
    // }
    // else {
    //   setShow(true);
    //   setToastbg('danger');
    //   setToastMessage('Otp not matched!.');
    //   return;
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
        if ((e.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList != undefined) && (e.target.parentNode.parentNode.classList[0] === "dropdown" || e.target.parentNode.parentNode.parentNode.classList[0] === "dropdown" || e.target.parentNode.parentNode.parentNode.parentNode.classList[0] === "dropdown" || e.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList[0] === "dropdown")) {

        }
        else {
          setOpen(false);
        }
      }
      else {
        setOpen(false);
      }
    });

  }, []);

  // console.log(watch('number'))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tab__content">
        <ToastContainer position="top-center" className="p-3 toast__container">
          <Toast onClose={() => setShow(false)} bg={toastbg} delay={3000} autohide show={show} >
            <Toast.Body style={{ color: toastbg === 'warning' ? '#000' : '#fff' }}>{toastMessage} </Toast.Body>
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
                      return <div key={item.iso} className={`${iso === item.iso ? 'selected' : ''} countery`} onClick={() => { setOpen(false), setCode(item.code), setIso(item.iso) }}>
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
              <input type="number" id="phone" placeholder="Number" name="number" value={query !== undefined && query.split('=')[0] === 'phone' && watch('number') === undefined ? query.split('=')[1] : watch('number')} {...register('number')} />
            </div>
            <button type="submit" disabled={disabled} className="send__code" onClick={(e) => onClickSendSmsOtp(e)}><i style={{ display: isloading === true ? 'block' : 'none' }} className="fa fa-spinner fa-spin"></i> <span style={{ display: isloading === true ? 'none' : 'block' }}>Send Code</span></button>
          </div>
          <div className="text-danger">{errors.number?.message}</div>
        </div>
        <div className="form__control">
          <label htmlFor="verification">Phone verification code</label>
          <div className="verficationConatiner">
            <input type="number" id="verification" name="code" {...register('code')} />
            <span style={{ display: timeLeft !== '' ? 'block' : 'none' }}>{timeLeft}</span>
          </div>
          <div className="text-danger">{errors.code?.message}</div>
        </div>
        <div className="form__control">
          <label htmlFor="verificationa">Login Password</label>
          <input className="password__input" type={pwdTextType} id="verificationa" {...register('password')}
            name="password" />
          <div className="show__password">
            <span>
              {location.pathname.includes('/trading-chart/') === true ?
                <img src="../assets/svg/form-eyes-icon.svg" alt="" onClick={() => { setPwdTextType(pwdTextType === 'password' ? 'text' : 'password') }} /> :
                <img src="assets/svg/form-eyes-icon.svg" alt="" onClick={() => { setPwdTextType(pwdTextType === 'password' ? 'text' : 'password') }} />
              }

            </span>
          </div>
          <div className="text-danger">{errors.password?.message}</div>
        </div>
        <div className="form__control">
          <div className="optional__input">
            <label htmlFor="verificationdsfs">Referral Code (Optional)</label>
            <span><svg className="down_svg__icon" width="24" height="24"
              viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor">
              <path fill="rgba(0, 0, 0, 0.54)"
                d="M201.344 406.656L466.752 672a64 64 0 0090.496 0l265.408-265.344a32 32 0 00-45.312-45.312L512 626.752 246.656 361.344a32 32 0 10-45.312 45.312z">
              </path>
            </svg></span>
          </div>
          <input type="password" id="verificationdsfs" name="verification" required="" />
        </div>
        <div className="terms__condition">
          <input type="checkbox" id="check1" name="terms" value="something" {...register('terms')} />
          <span>
            I have read and agree to the
            <a href="/">Terms of Use</a>
          </span>
        </div>
        <span className="tick__terms">
          Please tick the box to confirm that you consent to the terms of use.
        </span>
        <div className="text-danger">{errors.terms?.message}</div>
        <div className="form__control">
          <div className="submit__btn__wrapper sign__up__btn">
            <button type="submit" disabled={btnDisable} className="submit__btn"><i style={{ display: isloading2 === true ? 'block' : 'none' }} className="fa fa-spinner fa-spin"></i><span style={{ display: isloading2 === true ? 'none' : 'block' }}>Create Account</span></button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default MobileRegister;