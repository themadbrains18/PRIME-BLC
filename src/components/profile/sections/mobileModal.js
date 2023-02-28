import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, updateProfileRequest } from '../../../Actions/authAction';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { sta_Toaster } from '../../../Core/toaster';
import countryList from '../../../Constants/countryCodeList.json';
import '../account.css';
import phone from '../images/phone.png'
import Setup2FAModal from './setup2FAModal';
import WithdrawWarningModal from './withdrawWarningModal';
import GoogleAuthentication from '../../popup/googleAuthentication';


const MobileModal = () => {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false)
    const [showed, setShowed] = useState(false)
    const [display, setDisplay] = useState(false)
    const [checkAuth, setCheckAuth] = useState(false)
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [code, setCode] = useState(91);
    const [openCountry, setOpenCountry] = useState(false)
    const [country, setCountry] = useState(countryList);
    const [iso, setIso] = useState('IN');
    const [isloading, setIsloading] = useState(false);
    const [timeLeft, setTimer] = useState('');
    const Ref = useRef()
    const [formData, setFormData] = useState();

    const formSchema = Yup.object().shape({
        number: Yup.string()
            .required('Mobile Number is mendatory'),
        otp: Yup.string()
            .required('OTP is mendatory')
    })


    let {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(formSchema) });


    const onClickSendOtp = async (e) => {
        setDisabled(true)
        setIsloading(true);
        e.preventDefault();

        let formData = { "email": users.email, "requestType": 'email' }

        let data = await dispatch(sendOtp(formData));
        if (data.status === 200) {
            setIsloading(false);
            sta_Toaster(data.message, 'success');
            let deadline = new Date();
            deadline.setMinutes(deadline.getMinutes() + 2);
            const timer = setInterval(() => {
                calculateTimeLeft(deadline);
            }, 1000);
            Ref.current = timer;
        }
        else {
            setIsloading(false);
            sta_Toaster('Otp is not sent on your email', 'error');
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
            sta_Toaster('Otp is expired!.', 'warning');
            setDisabled(false)
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
        setDisabled(false)
        if (users.number !== '') {
            setFormData(data);
            setShowed(false);
            setCheckAuth(true);
        }
        else {
            data.dial_code = code;
            data.userid = users.id
            data.email = users.email
            data.requestType = 'mobile'
            let result = await dispatch(updateProfileRequest(data));
            if (result.status === 200) {
                setTimeout(() => {
                    sta_Toaster(result.message, 'success');
                    setTimer(' ');
                    if (Ref.current) clearInterval(Ref.current);
                    setShowed(false)
                    reset();
                }, 3000);
            }
            else {
                sta_Toaster(result.message, 'error');
            }
        }

    }

    const verified2FA = async () => {
        formData.dial_code = code;
        formData.userid = users.id
        formData.email = users.email
        formData.requestType = 'mobile'
        let result = await dispatch(updateProfileRequest(formData));
        if (result.status === 200) {
            setTimeout(() => {
                sta_Toaster(result.message, 'success');
                setTimer(' ');
                setShowed(false)
                reset();
                setFormData({})
                setCheckAuth(false);
                if (Ref.current) clearInterval(Ref.current);

            }, 1000);
        }
        else {
            sta_Toaster(result.message, 'error');
            setFormData({})
            setCheckAuth(false);
            setShowed(false)
        }
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

    return (
        <div>
            <div className='row'>
                <div className='col-md-12'>
                    <div className="account-item-container">
                        <div className="bylist-item" >
                            <div className="accountInfo-auth-container">
                                <div className="accountInfo-auth-container-column">
                                    <img src={phone} alt="avatar set icon" />SMS Authentication</div>
                                <div className="accountInfo-auth-container-content">
                                    <div>
                                        <span role="img" aria-label="exclamation-circle" className="anticon anticon-exclamation-circle" style={{ color: users.number !== '' ? 'rgb(32, 178, 108)' : 'rgb(173, 177, 184)', fontSize: '12px' }}>
                                            {users.number !== '' ? <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg> :

                                                <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                                                </svg>
                                            }
                                        </span>
                                        <span className={users.number !== '' ? 'set-text' : "not-set-text"}>{users.number !== '' ? users.number : 'Not Yet Configured'}</span>
                                    </div>
                                    <div className="accountInfo-auth-container-content-last">
                                        <span className="not-set-text text-special-color">For change of security settings

                                        </span>
                                    </div>
                                </div>
                                <div className="accountInfo-auth-container-operation" >
                                    <button type="button" className={`ant-btn ant-btn-primary ant-btn-background-ghost bybit-ghost ${users.number === '' ? 'active' : 'inactive'}`} onClick={() => { users.number === '' ? setShowed(true) : users.secutiryFA === 'disable' ? setDisplay(true) : setOpen(true) }}><span>{users.number !== '' ? 'Change' : 'Settings'}</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {users.number !== '' &&
                <WithdrawWarningModal open={open} setOpen={setOpen} setShowed={setShowed} message="mobile number" isloading={isloading} />
            }

            {/*  Modal for if 2fa is not enable while update email */}
            <Setup2FAModal setDisplay={setDisplay} display={display} />

            {users.email !== "" &&
                <Modal show={showed} centered onHide={() => {
                    setShowed(false)
                    setDisabled(false)
                    if (Ref.current) {
                        clearInterval(Ref.current)
                    }
                    setTimer(' ')
                    reset()
                }}>
                    <Modal.Header className="text-center" closeButton={true} style={{ padding: '32px 32px 17px' }}>
                        <h4>Set your Mobile Number</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="amount" style={{ fontSize: '14px' }}> Mobile Number</label>
                                <div className="input__dropdown__wrapper">


                                    <div className="input__dropdown login__number__input">
                                        <div className="dropdown">
                                            <button type="button" className="dropdown__btn" onClick={() => { setOpenCountry(openCountry === true ? false : true) }}> <span className="code">+{code}</span>
                                                <svg className="down_svg__icon" width="15" height="24"
                                                    viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor">
                                                    <path
                                                        d="M201.344 406.656L466.752 672a64 64 0 0090.496 0l265.408-265.344a32 32 0 00-45.312-45.312L512 626.752 246.656 361.344a32 32 0 10-45.312 45.312z">
                                                    </path>
                                                </svg>
                                            </button>
                                            <div className="number__dropdown" style={{ display: openCountry === true ? 'block' : 'none' }} onClick={() => { setOpenCountry(openCountry === true ? false : true) }}>
                                                <div className="search__input" onClick={e => e.stopPropagation()}>
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
                                                                <img src={require(`../../../assets/flag/svg/${item.iso.toLowerCase()}.svg`)}></img>
                                                                <p className="countery__code">{item.country}</p>
                                                            </div>
                                                            <div className="number">+{item.code}</div>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <input type='number' className='form-control' placeholder='Enter Mobile Number' name='number' {...register('number')} />
                                    </div>

                                </div>
                                <div className="text-danger" style={{ fontSize: '12px' }}>{errors.number?.message}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount" style={{ fontSize: '12px' }} >A Verification will be send to  {users.email} </label>
                                <div className='verify-code-btn'>
                                    <input type='number' className='form-control verify-input' placeholder='Please enter the Email Verfication Code' name="code"{...register('otp')} />
                                    <button className='verify-btn' disabled={disabled} onClick={(e) => onClickSendOtp(e)}>Send Verification Code</button>
                                </div>
                                <div className="text-danger" style={{ fontSize: '12px' }}>{errors.otp?.message}</div>
                                <span style={{ display: timeLeft !== '' ? 'block' : 'none' }}>{timeLeft}</span>


                            </div>
                            <div className="form-group_btn text-center">
                                <button type="submit" className=' submit__btn_mob btn text-white' name="submit"><i style={{ display: isloading === true ? 'block' : 'none' }} className="fa fa-spinner fa-spin"></i>Submit</button>
                            </div>
                        </form>
                    </Modal.Body>

                </Modal>
            }

            {users.email === '' &&
                <Modal show={showed} centered onHide={() => setShowed(false)}>
                    <Modal.Header className="text-center" closeButton={true} style={{ padding: '32px 32px 17px' }}>
                        <h4>Add Email</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ fontSize: '14px', paddingBottom: '10px' }}>
                            You are required to setup Email.
                        </div>
                        <div className="auth-container-column">
                            <div style={{ margin: '0 16px 0 4px', fontSize: '14px' }}>
                                Email Authentication
                            </div>
                            <div style={{ color: '#f7a600', fontSize: '14px' }}>
                                Not Enabled Yet
                            </div>
                        </div>
                        <div className="accountInfo-auth-container-operation" onClick={() => { setShowed(false) }}>
                            <button type="submit" className=' submit__btn_mob btn text-white' name="submit">Set Up</button>
                        </div>
                    </Modal.Body>
                </Modal>
            }

            {checkAuth === true &&
                <GoogleAuthentication checkAuth={checkAuth} userAuth={users} verified2FA={verified2FA} />
            }

        </div>
    )
}

export default MobileModal;