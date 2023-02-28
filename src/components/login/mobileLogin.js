import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup'
import { Captcha } from "../../Captcha/src/index";
import * as Yup from 'yup'
import Cookies from 'universal-cookie';
import countryList from '../../Constants/countryCodeList.json'

const MobileLogin = (props) => {

  const ref = useRef();
  // const [run] = useCaptcha({
  //   path: 'https://api.ejiexi.com/system/cgi',
  // });
  // const click = (e) => {
  //   e.preventDefault();
  //   ref.current?.verify();
  // };
  const [disabled, setDisabled] = useState(false)
  const [country, setCountry] = useState(countryList);

  const [open, setOpen] = useState(false)
  const [code, setCode] = useState(91);
  const [iso, setIso] = useState('IN');
  const [pwdTextType, setPwdTextType] = useState('password')

  const location = useLocation();
  const cookies = new Cookies();

  const formSchema = Yup.object().shape({
    number: Yup.string()
      .required('This field is required'),
    password: Yup.string()
      .required('Password is mendatory'),
  })

  let {
    register,
    handleSubmit,
    formState: { errors }, getValues
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit = (data) => {
    // ref.current?.verify();
    // if(isCaptcha){
    setDisabled(true);
    cookies.set('phone', data.number, { path: '/' });
    props.onFormSubmit({ 'username': data.number, 'password': data.password, dial_code : code });
    // }
    // else{
    //   setCaptchaMessage('Please verify captcha before form submit');
    // }
  }

  const getCaptchaStatus = (data) => {
    let form = getValues();
    cookies.set('phone', form.number, { path: '/' });
    // console.log(data, 'after captcha verify');
    props.onFormSubmit({ 'username': form.number, 'password': form.password });
  }

  const filterCountry = (e) => {
    // console.log(e.target.value)
    let filterItem = countryList.filter((item) => {
      if (item.country.toLowerCase().includes(e.target.value.toLowerCase()) === true) {
        return item
      }
    });

    console.log(filterItem,'======filter Item');
    setCountry(filterItem)
  }

  useEffect(() => {

    window.addEventListener('click', function (e) {
      var content_area = document.getElementsByClassName("dropdown");
      if(e.target.parentNode.classList[0] !== "modal-open"){
        if ((e.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList != undefined) && (e.target.parentNode.parentNode.classList[0] === "dropdown" || e.target.parentNode.parentNode.parentNode.classList[0] === "dropdown" || e.target.parentNode.parentNode.parentNode.parentNode.classList[0] === "dropdown" || e.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList[0] === "dropdown")) {

        }
        else {
          setOpen(false);
        }
      }
      else{
        setOpen(false);
      }
      
    });

  },[]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tab__content">
        <div className="form__control">
          <label htmlFor="phone login__number">Phone Number</label>
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
              <input type="number" id="number" name="number" {...register('number')} />

            </div>

          </div>
          <div className="text-danger">{errors.number?.message}</div>
        </div>
        <div className="form__control">
          <label htmlFor="verification">Login Password</label>
          <input className="password__input" type={pwdTextType} id="verification" name="password" {...register('password')} />
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
          <button type="submit" className="submit__btn">Login</button>
        </div>
      </div>
    </form>
  )
}

export default MobileLogin;