import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {  useLocation } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup'
import { Captcha } from "../../Captcha/src/index";
import * as Yup from 'yup'
import Cookies from 'universal-cookie';

const EmailLogin = (props) => {
  const ref = useRef();
  const location = useLocation();
  const cookies = new Cookies();
  const [disabled, setDisabled] = useState(false)
  const [pwdTextType, setPwdTextType] = useState('password')
  const formSchema = Yup.object().shape({
    email: Yup.string().email()
      .required('This field is required'),
    password: Yup.string()
      .required('Password is mendatory'),
  })

  let {
    register,
    handleSubmit,
    formState: { errors }, getValues
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit=(data)=>{
    // ref.current?.verify();
    // setDisabled(true);
    // console.log(data);
    cookies.set('email', data.email, { path: '/' });
    props.onFormSubmit({'username' : data.email, 'password' : data.password});
  }

  const getCaptchaStatus =(data)=>{
    let form = getValues();
    cookies.set('email', form.email, { path: '/' });
    // console.log(data, 'after captcha verify');
    props.onFormSubmit({'username' : form.email, 'password' : form.password});
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tab__content">
        <div className="form__control">
          <label htmlFor="Email">Email/Sub-Account</label>
          <input type="email" id="email" {...register('email')}></input>
          <div className="text-danger">{errors.email?.message}</div>
        </div>
        <div className="form__control">
          <label htmlFor="verification">Login Password</label>
          <input className="password__input"  type={pwdTextType} id="verification"
            name="password" {...register('password')} />
          <div className="show__password">
            <span>
            {location.pathname.includes('/trading-chart/') === true ?
                <img src="../../assets/svg/form-eyes-icon.svg" alt="" onClick={() => { setPwdTextType(pwdTextType === 'password' ? 'text' : 'password') }} /> :
                <img src="./assets/svg/form-eyes-icon.svg" alt="" onClick={() => { setPwdTextType(pwdTextType === 'password' ? 'text' : 'password') }} />
              }
              
            </span>

          </div>
          <div className="text-danger">{errors.password?.message}</div>
        </div>
        {/* <Captcha
          onSuccess={(data) => {console.log(data); getCaptchaStatus(data);}}
          // path='https://picsum.photos/140/280'
          path='https://api.ejiexi.com/system/cgi'
          type='auto'
          ref={ref}
        >
          <button type="submit"
            className="submit__btn"
          >
            Submit
          </button>

        </Captcha> */}
        <div className="form__control">
          <button type="submit" disabled={props.resetDisable ===false?false: disabled} className="submit__btn">Login</button>
        </div>
      </div>
    </form>
  )
}

export default EmailLogin;