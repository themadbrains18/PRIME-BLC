import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmailRegister from "./emailRegister";
import MobileRegister from "./mobileRegister";
import RegisterSidePanel from "../../Core/registerSidePanel";

const SignUpFormSection = (props) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('mobile');
  const [locationIP, setLocation] = useState({});

  const { username } = useParams();


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

  const getData = async () => {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()

    setLocation({ip : data.ip, region : data.region, org : data.org, city: data.city})
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    var query = window.location.search.substring(1);
    // console.log(query.split('=')[0]);
    if (query.split('=')[0] === 'email') {
      setCurrentTab('email')
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return (() => {
      window.removeEventListener('resize', setDimension);
    })

  }, [screenSize])
  return (
    <div className="sec__form">

      <div className="form" >
        <div className="signup_heading">
          <h2 className="form__heading">Create Account</h2>
        </div>
        <div className="link_heading">
          Already have an account <span onClick={(e) => navigate('/login')}>  <a>Log in</a></span>
        </div>
        <div className="form__tabs__wrapper">
          <div className="form__tabs__btn">
            <button className={currentTab === 'mobile' ? 'active form__tab__btn line' : 'form__tab__btn line'} onClick={(e) => { e.preventDefault(); setCurrentTab('mobile') }}>Phone </button>
            <button className={currentTab === 'email' ? 'active form__tab__btn Email' : 'form__tab__btn Email'} onClick={(e) => { e.preventDefault(); setCurrentTab('email') }}>Email</button>
          </div>
          <div className={currentTab === 'mobile' ? 'active form__tabs' : 'form__tabs'}>
            <MobileRegister locationIP={locationIP}/>
          </div>
          <div className={currentTab === 'email' ? 'active form__tabs' : 'form__tabs'}>
            <EmailRegister locationIP={locationIP}/>
          </div>
        </div>
        <div className="submit__btn__wrapper sign__up__btn">
          <button className="receive__sms not__recive forget__password" href="reset-password.html">Cannot receive SMS?</button>
        </div>
      </div>

      {screenSize.dynamicWidth > 575 && props.showRightPanel === true &&
        <RegisterSidePanel />
      }

    </div>
  )
}

export default SignUpFormSection;