import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import { setTradingPassword } from '../../../Actions/authAction';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { sta_Toaster } from '../../../Core/toaster';
import '../account.css';
import password from '../images/password.png'

const PasswordModal = () => {
    const [disabled, setDisabled] = useState(false);
    const [open, setOpen] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch()
    const formSchema = Yup.object().shape({
        // oldpassword: Yup.string()
        //     .required('Old Password is mendatory')
        //     .min(6, 'Password must be at 6 char long'),
        password: Yup.string()
            .required('New Password is mendatory')
            .min(6, 'Password must be at 6 char long'),
        confirm: Yup.string()
            .required('Confirm Password is mendatory')
            .oneOf([Yup.ref('password')], 'New Trading Password does not match'),
    })


    let {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ resolver: yupResolver(formSchema) });

    const onSubmit = async (data) => {

        setDisabled(true);
        if (users.tradePassword !== '' || users.tradePassword !== undefined) {
            data.oldpassword = oldPassword;
        }
        let result = await dispatch(setTradingPassword(data));
        if (result.status === 200) {
            setOpen(false)
            setDisabled(false);
            reset()
            sta_Toaster(" Trading Password Updated Successfully", 'success');
        }
        else {
            setDisabled(false);
            sta_Toaster("Trading Password Not Updated Successfully", 'error');
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
                                    <img src={password} alt="avatar set icon" />Trading Password</div>
                                <div className="accountInfo-auth-container-content">
                                    <div>
                                        <span role="img" aria-label="exclamation-circle" className="anticon anticon-exclamation-circle" style={{ color: users.tradePassword !== "" ? 'rgb(32, 178, 108)' : 'rgb(173, 177, 184)', fontSize: '12px' }}>
                                            {users.tradePassword !== "" ? <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg> :

                                                <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                                                </svg>
                                            }
                                        </span>
                                        <span className={users.tradePassword !== "" ? "set-text" : "not-set-text"}> {users.tradePassword !== "" ? 'Successfully Configured' : 'Not Yet Configured'}</span>
                                    </div>
                                </div>
                                <div className="accountInfo-auth-container-operation">
                                    <button type="button" className={`ant-btn ant-btn-primary ant-btn-background-ghost bybit-ghost ${users.tradePassword === "" ? 'active' : 'inactive'}`} onClick={() => { setOpen(true) }}><span>{users.tradePassword !== "" ? 'Change' : 'Setting'}</span></button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={open} centered onHide={() => setOpen(false)}>
                <Modal.Header className="text-center" closeButton={true} style={{ padding: '32px 32px 17px' }}>
                    <h4>Change Trading Password</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12">
                            <div className="securitywarning">
                                <p>
                                    <span>1. To protect the security of your account, after modifying the trading password, you will be prohibited from withdrawing on both BLC Exchange and BLC Exchange Futures for 24hrs.
                                        <br />
                                        2. Please keep your trading password safe and do not disclose it to others.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {users.tradePassword !== "" &&
                            <div className="form-group">
                                <label htmlFor="amount" style={{ fontSize: '14px' }} >Old Trading Password</label>
                                <input type='number' className='form-control' placeholder='Old Password' name="oldpassword" onChange={(e) => { setOldPassword(e.target.value) }} />
                                <div className="text-danger" style={{ fontSize: '12px' }}>{errors.oldpassword?.message}</div>
                            </div>
                        }
                        <div className="form-group">
                            <label htmlFor="amount" style={{ fontSize: '14px' }} >New Trading Password</label>
                            <input type='number' className='form-control' placeholder='New Password' name="password"  {...register('password')} />
                            <div className="text-danger" style={{ fontSize: '12px' }}>{errors.password?.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount" style={{ fontSize: '14px' }}>Confirm New Trading Password</label>
                            <input type='number' className='form-control' placeholder='Confirm Password' name="confirm" {...register('confirm')} />
                            <div className="text-danger" style={{ fontSize: '12px' }}>{errors.confirm?.message}</div>
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" style={{ backgroundColor: '#f7a600', padding: '8px 18px', fontSize: '18px', color: '#000' }} className=' submit__btn btn text-white' name="submit">Submit</button>
                        </div>
                    </form>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default PasswordModal;