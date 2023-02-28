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
import '../account.css';
import email from '../images/email.png'
import Setup2FAModal from './setup2FAModal';
import WithdrawWarningModal from './withdrawWarningModal';
import GoogleAuthentication from '../../popup/googleAuthentication';

const EmailModal = () => {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false)
    const [showed, setShowed] = useState(false)
    const [display, setDisplay] = useState(false)
    const users = useSelector((state) => state.users);
    const [isloading, setIsloading] = useState(false);
    const [timeLeft, setTimer] = useState(' ');
    const dispatch = useDispatch()
    const Ref = useRef()
    const [formData, setFormData] = useState();
    const [checkAuth, setCheckAuth] = useState(false)

    const formProfieSchema = Yup.object().shape({
        email: Yup.string().email()
            .required('New Email is mendatory'),
        otp: Yup.string()
            .required('OTP is mendatory')
    })

    let {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ resolver: yupResolver(formProfieSchema) });


    const onClickSendOtp = async (e) => {
        setIsloading(true);
        setDisabled(true)
        e.preventDefault();

        let formData = { "dial_code": users.dial_code, "number": users.number, "requestType": 'mobile' }

        let data = await dispatch(sendOtp(formData));
        if (data.status === 200) {
            setIsloading(false);
            sta_Toaster('Otp is sent on your Number', 'success');
            let deadline = new Date();
            deadline.setMinutes(deadline.getMinutes() + 2);
            const timer = setInterval(() => {
                calculateTimeLeft(deadline);
            }, 1000);
            Ref.current = timer;
        }
        else {
            setIsloading(false);
            sta_Toaster('Otp is not sent ', 'error');
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
        if (users.email !== '') {
            setFormData(data);
            setShowed(false);
            setCheckAuth(true);
        }
        else {
            data.userid = users.id
            data.number = users.number
            data.requestType = 'email'
            let result = await dispatch(updateProfileRequest(data));

            if (result.status === 200) {
                setTimeout(() => {
                    sta_Toaster(result.message, 'success');
                    setTimer(' ');
                    setDisabled(false)
                    if (Ref.current) clearInterval(Ref.current);
                    setShowed(false)
                    reset();
                    setFormData({})
                    setDisabled(false)
                    setCheckAuth(false);
                }, 1000);
            }
            else {
                sta_Toaster(result.message, 'error');
            }
        }

    }

    const verified2FA = async () => {
        formData.userid = users.id
        formData.number = users.number
        formData.requestType = 'email'
        let result = await dispatch(updateProfileRequest(formData));

        if (result.status === 200) {
            setCheckAuth(false)
            setTimeout(() => {
                sta_Toaster(result.message, 'success');
                setTimer(' ');
                if (Ref.current) clearInterval(Ref.current);
                setShowed(false)
                reset();
            }, 1000);
        }
        else {
            sta_Toaster(result.message, 'error');
        }
    }


    return (
        <div>
            <div className='row'>
                <div className='col-md-12'>
                    <div className="account-item-container">
                        <div className="bylist-item" >
                            <div className="accountInfo-auth-container">
                                <div className="accountInfo-auth-container-column">
                                    <img src={email} alt="avatar set icon" />Email Authentication</div>
                                <div className="accountInfo-auth-container-content">
                                    <div>
                                        <span role="img" aria-label="exclamation-circle" className="anticon anticon-exclamation-circle" style={{ color: users.email !== '' ? 'rgb(32, 178, 108)' : 'rgb(173, 177, 184)', fontSize: '12px' }}>
                                            {users.email !== '' ? <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg> :

                                                <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                                                </svg>
                                            }
                                        </span>
                                        <span className={users.email !== '' ? 'set-text' : "not-set-text"}>{users.email !== '' ? users.email : 'Not Yet Configured'}</span>
                                    </div>
                                    <div className="accountInfo-auth-container-content-last">
                                        <span className="not-set-text text-special-color">For change of security settings

                                        </span>
                                    </div>
                                </div>
                                <div className="accountInfo-auth-container-operation" >
                                    <button type="button" className={`ant-btn ant-btn-primary ant-btn-background-ghost bybit-ghost ${users.email === '' ? 'active' : 'inactive'}`} onClick={() => { users.email === '' ? setShowed(true) : users.secutiryFA === 'disable' ? setDisplay(true) : setOpen(true) }}><span>{users.email !== '' ? 'Change' : 'Settings'}</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Withdrawal will be restricted for 24 hours after changing your mobile number  */}

            {users.email !== '' &&
                <WithdrawWarningModal open={open} setOpen={setOpen} setShowed={setShowed} message="email" isloading={isloading} />
            }


            {/*  Modal for if 2fa is not enable while update mobike number */}
            <Setup2FAModal setDisplay={setDisplay} display={display} />

            {/* Modal for update mobile number */}

            {users.number !== '' &&
                <Modal show={showed} centered onHide={() => {
                    setShowed(false)
                    setDisabled(false)
                    if (Ref.current) { clearInterval(Ref.current) }
                    setTimer(' ')
                    reset()
                }}>
                    <Modal.Header className="text-center" closeButton={true} style={{ padding: '32px 32px 17px' }}>
                        <h4>Add Email</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="amount" style={{ fontSize: '14px' }}> Email</label>
                                <div className="input__dropdown__wrapper">
                                    <input type='text' className='form-control' placeholder='Add Email' name='email' {...register('email')} />
                                </div>
                                <div className="text-danger" style={{ fontSize: '12px' }}>{errors.email?.message}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount" style={{ fontSize: '12px' }} >A Verification will be send to {users.number} </label>
                                <div className='verify-code-btn'>
                                    <input type='number' className='form-control verify-input' placeholder='Please enter the SMS Verfication Code' name="otp" {...register('otp')} />
                                    <button className='verify-btn' disabled={disabled} onClick={(e) => onClickSendOtp(e)}>Send Verification Code</button>
                                </div>
                                <div className="text-danger" style={{ fontSize: '12px' }}>{errors.otp?.message}</div>
                                {/* {console.log("=====timer", timeLeft)} */}
                                <span style={{ display: timeLeft !== ' ' ? 'block' : 'none' }}>{timeLeft}</span>
                            </div>
                            <div className="form-group_btn text-center">
                                <button type="submit" className=' submit__btn_mob btn text-white' name="submit"><i style={{ display: isloading === true ? 'block' : 'none' }} className="fa fa-spinner fa-spin"></i>Submit</button>
                            </div>
                        </form>
                    </Modal.Body>

                </Modal>
            }

            {users.number === '' &&
                <Modal show={showed} centered onHide={() => setShowed(false)}>
                    <Modal.Header className="text-center" closeButton={true} style={{ padding: '32px 32px 17px' }}>
                        <h4>Add Email</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ fontSize: '14px', paddingBottom: '10px' }}>
                            You are required to setup number.
                        </div>
                        <div className="auth-container-column">
                            <div style={{ margin: '0 16px 0 4px', fontSize: '14px' }}>
                                SMS Authentication
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

export default EmailModal;