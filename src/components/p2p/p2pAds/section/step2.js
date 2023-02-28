import { useState, useEffect } from 'react';
import '../step2.css';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'

const schema = yup
  .object()
  .shape({
    quantity: yup.number().positive().typeError("This Field is required").nullable(),
    min_limit: yup.number().positive().typeError("This Field is required").nullable(),
    max_limit: yup.number().positive().moreThan(yup.ref('min_limit')).typeError("This Field is required").nullable(),
    p_method: yup.array().required('Select at least one payment method ').min(1), //yup.array().required('This field is required'),
    time: yup.string().required('This field is required'),
  })
  .required();

const StepTwo = ({ totalAmount, currentStep, setCurrentStep, setForm2, form2, form1 }) => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [fill_quantity, setQuantity] = useState()
  const [fill_min_limit, setMinLimit] = useState()
  const [fill_max_limit, setMaxLimit] = useState()
  const [selectedPayMethod, setSelectedPaymethod] = useState([]);
  const [selectedTime, setSelectedTime] = useState("Select time slot");
  const [balMessage, setBalMessage] = useState(false);

  const [show, setShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastbg, setToastbg] = useState('');

  let userpmlist = useSelector((state) => state.userpmlist);
  let pmOption = userpmlist.result;
  const navigate = useNavigate();

  const { register, setValue, unregister, getValues, handleSubmit, formState: { errors }, } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmitform = async (data) => {
    let minpriceQuantity = data.min_limit / form1.price;
    if (data.quantity < minpriceQuantity) {
      setShow(true);
      setToastbg('warning');
      setToastMessage('The min. transaction limit per advertisement must be lower than or equal to the total transaction amount (Sum of Prices * Total Number).');
      return;
    }
    if (totalAmount > data.quantity) {
      let obj = {
        quantity: data.quantity,
        min_limit: data.min_limit,
        max_limit: data.max_limit,
        p_method: data.p_method,
        time: data.time
      }
      setCurrentStep(currentStep + 1)
      setForm2(obj);
      setBalMessage(false);
    }
    else {
      setBalMessage(true);
    }

  }

  useEffect(() => {
    if (form2.quantity !== undefined) {
      setValue('quantity', form2.quantity, { shouldValidate: true })
      setValue('min_limit', form2.min_limit, { shouldValidate: true })
      setValue('max_limit', form2.max_limit, { shouldValidate: true })
      setValue('p_method', form2.p_method, { shouldValidate: true })
      setValue('time', form2.time, { shouldValidate: true })
      setQuantity(form2.quantity)
      setMinLimit(form2.min_limit)
      setMaxLimit(form2.max_limit)
      setSelectedPaymethod(form2.p_method);
      setSelectedTime(form2.time);
    }
  }, [])

  const previousButton = () => {
    if (currentStep !== 1) {
      return (
        <button type="button" style={{ backgroundColor: '#f7a600', padding: '5px 18px', fontSize: '18px' }} onClick={() => {
          setCurrentStep(currentStep - 1)
        }} className=' submit__btn btn text-white float-left' name="submit"> Previous</button>
      );
    }
    return null;
  }

  const setSeletedPaymentMethod = (item) => {
    let obj = selectedPayMethod.filter(a => a.pm_name === item.pm_name);
    let array = selectedPayMethod;
    if (obj.length > 0) {
      let newArray = selectedPayMethod.filter(e => e.pm_name !== item.pm_name)
      array = newArray;
      setSelectedPaymethod(newArray);
    }
    else {
      array.push(item);
      setSelectedPaymethod(array);
    }
    setValue('p_method', array, { shouldValidate: true })
  }

  const setSelectTime = (data) => {
    setValue('time', data, { shouldValidate: true })
    setSelectedTime(data);
  }

  return (
    <>
      <ToastContainer position="top-center" className="p-3 toast__container">
        <Toast onClose={() => setShow(false)} bg={toastbg} delay={5000} autohide show={show} >
          <Toast.Body style={{ color: toastbg === 'warning' ? '#000' : '#fff' }}>{toastMessage} </Toast.Body>
        </Toast>
      </ToastContainer>
      <form onSubmit={handleSubmit(onSubmitform)}>
        <div className='step2__main_container'>

          <div className='total_amount__title'>
            <p>Total Amount</p>
          </div>
          <div className='total_amount_input'>
            <input type='number' className='form-control' name="quantity" value={fill_quantity} {...register('quantity')} onChange={(e) => {
              if (totalAmount > e.target.value) {
                setBalMessage(false);
              }
              else {
                setBalMessage(true);
              }
              setQuantity(e.target.value),
                setValue('quantity', e.target.value, { shouldValidate: true })
            }} />
            {errors.quantity?.message && <p className='pm_error'>{errors.quantity?.message}</p>}
            {balMessage === true && <p className='pm_error'>You have unsufficiant Balance</p>}
            <p> Available : {totalAmount} USDT</p>

          </div>
          <div className='order_limit__title'>
            <p>Order Limit</p>
          </div>
          <div className='order_limit'>
            <div className='order_limit_item'>
              <input type='number' className='form-control' min="100" name="min_limit" value={fill_min_limit} {...register('min_limit')} onChange={(e) => { setMinLimit(e.target.value), setValue('min_limit', e.target.value, { shouldValidate: true }) }} />
              {errors.min_limit?.message && <p className='pm_error'>{errors.min_limit?.message}</p>}
            </div>
            <p>~</p>
            <div className='order_limit_item'>
              <input type='number' className='form-control' min="750" name="max_limit" value={fill_max_limit} {...register('max_limit')} onChange={(e) => { setMaxLimit(e.target.value), setValue('max_limit', e.target.value, { shouldValidate: true }) }} />
              {errors.max_limit?.message && <p className='pm_error'>{errors.max_limit?.message}</p>}
            </div>

          </div>
          <div className='payment_method'>
            <div className='payment_method_title'>Payment Method</div>
            <div className='payment_method_title'>Select Upto 5 Method</div>
            <div className='payment_mehtod_add'>
              <button type="button" style={{ backgroundColor: '#f7a600', padding: '5px 18px', fontSize: '18px' }} className=' submit__btn btn text-white' name="submit" onClick={() => setOpen(true)}> + Add</button>
            </div>
            <div className='payment_method_title'>
              {selectedPayMethod.map((item, index) => {
                return <p key={index} className='pay_method'>{index + 1} {'. '} {item.pm_name}</p>
              })}
            </div>
            {errors.p_method?.message && <p className='errorMessage'>{errors.p_method?.message}</p>}
          </div>
          <div className='payment_time_limit'>
            <div className='payment_method_title'>Payment Time Limit</div>
            <div className='payment_time_dropdown'>
              <div className='deposit_dropdown_wrapper' onClick={() => { setActive(active === 2 ? 0 : 2) }}>

                <div className="deposit_button_text">
                  <span>{selectedTime}</span>
                </div>
                <div className="deposit_button_icon">
                  <img src={require('../../../p2p/CryptoDeposit/assets/images/menu-icon.png')} alt="error" />
                </div>
                {active === 2 &&
                  <div className="coin_list_dropdown">
                    <div className="coin_list_inner">
                      <div className="head_wrapper">

                      </div>
                      <ul className="content_wrapper">
                        <li className="list_content qwe" onClick={() => setSelectTime(15)}>
                          <div className="list_text">
                            <p className="list_item_dull">15 min</p>
                          </div>
                        </li>
                        <li className="list_content qwe" onClick={() => setSelectTime(20)}>
                          <div className="list_text">
                            <p className="list_item_dull">20 min</p>
                          </div>
                        </li>
                        <li className="list_content qwe" onClick={() => setSelectTime(30)}>
                          <div className="list_text">
                            <p className="list_item_dull">30 min</p>
                          </div>
                        </li>
                        <li className="list_content qwe" onClick={() => setSelectTime(45)}>
                          <div className="list_text">
                            <p className="list_item_dull">45 min</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                }
              </div>
            </div>
            {errors.time?.message && <p className='errorMessage'>{errors.time?.message}</p>}
          </div>
          <div className='ads__foter'>
            {previousButton()}
            <button type="submit" style={{ backgroundColor: '#f7a600', padding: '5px 18px', fontSize: '18px' }} className=' submit__btn btn text-white float-right' name="submit">Next</button>
          </div>

        </div>
      </form>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered show={open}
        className="ads-payment-tmb-setting"
        onHide={() => { setOpen(false) }}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title id="contained-modal-title-vcenter" style={{ fontSize: '14px' }}>
            Select Payment Method
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <div className='row deposit-modal'>
              <ul>
                {pmOption.map((item, index) => {

                  return <li key={index} className='qwe-list-item'>
                    <input style={{ display: "none" }} type="checkbox" checked={selectedPayMethod.findIndex(a => a.pm_name === item.pm_name) > -1 ? 'checked' : ''} className='qwe-checkbox' id={index} onChange={() => setSeletedPaymentMethod(item)} />
                    <label htmlFor={index} className='qwe-label'>
                      <div className='qwe-header'>
                        <span>{item.pm_name}</span>
                        <span>icon</span>
                      </div>
                      <div className='qwe-item'>
                        <span className='qwe-item-left'>Name</span>
                        <span className='qwe-item-right'>{item.pm_name === 'Paytm' ? item.pmObject.name : item.pm_name === 'Phonepe' ? item.pmObject.fullname : item.pm_name === 'Google Pay' ? item.pmObject.gmail : item.pmObject.fullname}</span>
                      </div>
                      <div className='qwe-item'>
                        <span className='qwe-item-left'>Upi ID</span>
                        <span className='qwe-item-right'>{item.pm_name === 'Paytm' ? item.pmObject.account : item.pm_name === 'Phonepe' ? item.pmObject.phonenumber : item.pm_name === 'Google Pay' ? item.pmObject.phonenumber : item.pmObject.upi}</span>
                      </div>
                    </label>
                  </li>
                })}


                <li className='qwe-list-item'>
                  <button type="button" style={{ backgroundColor: '#f7a600', padding: '5px 18px', fontSize: '18px' }} className=' submit__btn btn text-white float-right' name="submit" onClick={() => navigate('/p2p/trade/payment')}> Add New</button>
                </li>
              </ul>

            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default StepTwo;