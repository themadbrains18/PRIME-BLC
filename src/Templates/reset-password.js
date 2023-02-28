import React,{useState} from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailForgetPassword from "../components/forget/emailForgetPassword";
import MobileForgetPassword from "../components/forget/mobileForgetPassword";

const ResetPaswrd = () => {
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
    const navigate = useNavigate();
    const[currentTab, setCurrentTab] = useState('mobile');

    return (
        <>
        <ToastContainer />
            <section className="reset__password__sec">
                { /* sec content -*/}
                <div className="sec__content">
                    
                    <div className="sec__form">
                        <div className="upper__text">
                            <span onClick={(e) => navigate('/sign-up')}>Haven’t registered? <a>Sign up now</a></span>
                            { /* <div className="lang__dropdown">
                        <button></button>
                    </div> -*/}
                        </div>
                        <div className="form">
                            <h2 className="form__heading">Forgot Password?</h2>
                            <div className="form__tabs__wrapper">
                                <div className="form__tabs__btn">
                                    <button className={currentTab === 'mobile'? 'active form__tab__btn line':'form__tab__btn line'} onClick={(e)=>{e.preventDefault(), setCurrentTab('mobile')}}>Phone </button>
                                    <button className={currentTab === 'email'? 'active form__tab__btn Email':'form__tab__btn Email'} onClick={(e)=>{e.preventDefault(), setCurrentTab('email')}}>Email</button>
                                </div>
                                <div className={currentTab === 'mobile'? 'active form__tabs':'form__tabs'}>
                                    <MobileForgetPassword />
                                </div>
                                <div className={currentTab === 'email'? 'active form__tabs':'form__tabs'}>
                                    <EmailForgetPassword />
                                </div>
                            </div>
                            <div className="submit__btn__wrapper">
                                <a className="receive__sms not__recive forget__password" href="reset-password.html">Cannot receive SMS?</a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )

}

export default ResetPaswrd;