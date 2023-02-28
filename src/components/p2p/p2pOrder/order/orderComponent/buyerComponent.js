import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sta_Toaster } from '../../../../../Core/toaster';
import { ToastContainer } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion';
import { updateOrderPayment, cancelOrderPayment } from '../../../../../Actions/orderAction';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import './buyerPay.css';
import ChatComponent from '../chatComponent/chatComponent';
import { UPDATEBUYORDER } from '../../../../../Constants/Index';
import { useNavigate } from "react-router-dom";
import release from '../assets/images/release.png';
import { backend_image_url,websocket_url } from '../../../../../Api';

const BuyerComponent = () => {
  const Ref = useRef(null);
  const navigate = useNavigate();
  const dispatch = new useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [candisabled, setCanDisabled] = useState(false)
  const [upiId, setupiId] = useState('');
  const [pymntName, setPymntName] = useState('');
  const [ordercancel, setOrderCancel] = useState(false);
  const [timeLeft, setTimer] = useState();
  const [isPaid, setIsPaid] = useState(false);
  const [isCoinReleased, setIsCoinReleased] = useState(false);
  let userpmlist = useSelector((state) => state.userpmlist)
  userpmlist = Object.keys(userpmlist).length === 0 ? [] : userpmlist.result;

  let users = useSelector((state) => state.users)
  let buyOrder = useSelector((state) => state.buyOrder)
  const [streams, setStreams] = useState(['@ticker', '@depth20', '@trade'])

  useEffect(() => {
    let deadline = new Date(buyOrder.orderData.createdAt);
    deadline.setMinutes(deadline.getMinutes() + 25);
    deadline.setSeconds(deadline.getSeconds() + 5);
    let currentTime = new Date();
    if (currentTime < deadline && buyOrder?.orderData.isReleased === false) {
      if (Ref.current) clearInterval(Ref.current);
      const timer = setInterval(() => {
        calculateTimeLeft(deadline);
      }, 1000);
      Ref.current = timer;
    }
    else if (currentTime > deadline && buyOrder?.orderData.isComplete === false && buyOrder?.orderData.isCanceled === false) {
      cancelOrder();
    }

    let connection = btoa(streams.join('/'));
    // connection = new WebSocket(`wss://blcexchange.net:5000/`);
    connection = new WebSocket(websocket_url);

    connection.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    connection.onmessage = evt => {

      let eventDataType = JSON.parse(evt.data).type;
      let eventData = JSON.parse(evt.data);

      if (eventDataType === 'order') {
        if (eventData.data._id === buyOrder?.orderData._id) {
          if (eventData.data.isReleased === true) {
            if (Ref.current) clearInterval(Ref.current);
            setIsCoinReleased(eventData.data.isReleased)
          }
          dispatch({ type: UPDATEBUYORDER, payload: eventData })
        }
      }

    };

    connection.onerror = evt => {
      console.error(evt);
    }

  }, []);

  const calculateTimeLeft = (e) => {
    let { total, minutes, seconds }
      = getTimeRemaining(e);

    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
    else {
      if (Ref.current) clearInterval(Ref.current);
      cancelOrder();
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

  const onCloseModal = () => setOpen(false);

  const sendPayment = async (e) => {

    e.preventDefault();
    if (upiId === '') {
      sta_Toaster(`Please select payment method`, 'error')
      return;
    }
    setDisabled(true)
    let formData = { orderid: buyOrder.orderData._id, p_method: upiId };

    let data = await dispatch(updateOrderPayment(formData));
    if (data.status === 200) {
      // const ws = new WebSocket(`wss://blcexchange.net:5000/`);
      const ws = new WebSocket(websocket_url);
      let orderData = {
        ws_type: 'order',
        order: data.data.data
      }
      ws.addEventListener('open', () => {
        ws.send(JSON.stringify(orderData));
      })
      setConfirmation(false)
      setTimeout(() => {
        setDisabled(false)
        setIsPaid(true);
      }, 3000);
    }

  }

  const cancelOrder = async () => {
    setCanDisabled(true);
    setOpen(false);
    let data = await dispatch(cancelOrderPayment({ postid: buyOrder.orderData.postid, orderid: buyOrder.orderData._id }))
    if (data.status === 200) {
      // const ws = new WebSocket(`wss://blcexchange.net:5000/`);
      const ws = new WebSocket(websocket_url);
      let orderData = {
        ws_type: 'order',
        order: data.data.data
      }
      ws.addEventListener('open', () => {
        ws.send(JSON.stringify(orderData));
      })

      sta_Toaster(`Your order is canceled`, 'success');
      setCanDisabled(false);
      setOrderCancel(true);
    }
    else {
      setCanDisabled(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className='row'>
        <div className=' col-lg-8 col-md-12'>
          <div className='order_detail_summery'>
            <div className='order_detail_summery_title'>
              <div>{buyOrder.orderData.type !== undefined && buyOrder?.orderData.sell_userid === users.id ? 'Sell' : "Buy"} {buyOrder?.orderData.type === 'buy' ? buyOrder?.orderData.receive_currency : buyOrder?.orderData.spend_currency}</div>
            </div>
            <div className='order_detail_summery_orderid'>#{buyOrder.orderData._id}</div>
          </div>
          <div className='order_payment_header'>
            {buyOrder !== undefined && (buyOrder?.orderData.inProcess === true) &&
              <div className='heder__content'>
                <div className='header-success-content' style={{padding:'10px'}}>

                  <div className='success-img'>
                    {/* <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIHRyYW5zZm9ybT0iIj48ZyBmaWxsPSIjZmFiMDA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNTYsMCkgcm90YXRlKDkwKSBzY2FsZSg4LjUzMzMzLDguNTMzMzMpIj48cGF0aCBkPSJNMTUsM2MtNi42MjcsMCAtMTIsNS4zNzMgLTEyLDEyYzAsNi42MjcgNS4zNzMsMTIgMTIsMTJjNi42MjcsMCAxMiwtNS4zNzMgMTIsLTEyYzAsLTYuNjI3IC01LjM3MywtMTIgLTEyLC0xMnpNMTYsMTZoLTguMDA1Yy0wLjU1LDAgLTAuOTk1LC0wLjQ0NSAtMC45OTUsLTAuOTk1di0wLjAxMWMwLC0wLjU0OSAwLjQ0NSwtMC45OTQgMC45OTUsLTAuOTk0aDYuMDA1di04LjAwNWMwLC0wLjU1IDAuNDQ1LC0wLjk5NSAwLjk5NSwtMC45OTVoMC4wMTFjMC41NDksMCAwLjk5NCwwLjQ0NSAwLjk5NCwwLjk5NXoiPjwvcGF0aD48L2c+PC9nPjwvZz4KPC9zdmc+" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      width="50" height="50"
                      viewBox="0,0,256,256"
                      style={{ fill: "#000000" }}>
                      <g fill="#f7a600" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: "normal" }}><g transform="translate(256,0) rotate(90) scale(8.53333,8.53333) skewX(0)"><path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM16,16h-8.005c-0.55,0 -0.995,-0.445 -0.995,-0.995v-0.011c0,-0.549 0.445,-0.994 0.995,-0.994h6.005v-8.005c0,-0.55 0.445,-0.995 0.995,-0.995h0.011c0.549,0 0.994,0.445 0.994,0.995z"></path></g></g>
                    </svg>
                  </div>
                  <div className='timer'>
                    <div className='timer__timeout'>
                      <p className='note'>Complete your payment within <span className='timer'>{timeLeft}</span></p>
                    </div>
                    <div className='timer__content'>
                      <p className='note'>Please complete your payment within {timeLeft}. Otherwise, the order will be automatically canceled.</p>
                    </div>
                    <button className='view-asset' onClick={() => { navigate('/user/assets/overview') }}>
                      View My Assets
                    </button>
                  </div>
                </div>
                <div className='order_process_step'>
                  <div className='summery__tiem'>
                    <div className='summary_info'>
                      <div className='summary_info_pay'>
                        <div className='summary_info_title'>
                          <div className='number'><img src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/FAB005/external-verified-check-circle-for-approved-valid-content-basic-regular-tal-revivo.png" /></div>
                          <div className='dash__line'></div>
                        </div>
                        <div className='summary_info_content'>
                          Complete Your Payment
                        </div>
                      </div>
                      <div className='summary_info_pay'>
                        <div className='summary_info_title'>
                          <div className='number'><img src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/FAB005/external-verified-check-circle-for-approved-valid-content-basic-regular-tal-revivo.png" /></div>
                          <div className='dash__line'></div>
                        </div>
                        <div className='summary_info_content'>
                          Coin Release in Progress
                        </div>
                      </div>
                      <div className='summary_info_pay'>
                        <div className='summary_info_title'>
                          <div className='number'><img src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/FAB005/external-verified-check-circle-for-approved-valid-content-basic-regular-tal-revivo.png" /></div>
                        </div>
                        <div className='summary_info_content'>
                          Transaction Completed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {buyOrder !== undefined && (buyOrder?.orderData.isComplete === true && buyOrder?.orderData.isReleased === false && buyOrder?.orderData.isCanceled === false) &&
              <div className='heder__content'>
                <div className='header-success-content' style={{padding:'10px'}}>

                  <div className='success-img'>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      width="50" height="50"
                      viewBox="0,0,256,256"
                      style={{ fill: "#000000" }}>
                      <g fill="#f7a600" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: "normal" }}><g transform="translate(256,0) rotate(90) scale(8.53333,8.53333) skewX(0)"><path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM16,16h-8.005c-0.55,0 -0.995,-0.445 -0.995,-0.995v-0.011c0,-0.549 0.445,-0.994 0.995,-0.994h6.005v-8.005c0,-0.55 0.445,-0.995 0.995,-0.995h0.011c0.549,0 0.994,0.445 0.994,0.995z"></path></g></g>
                    </svg>
                  </div>
                  <div className='timer'>
                    <div className='timer__timeout'>
                      <p className='note'>The coin will be released in {timeLeft}.</p>
                    </div>
                    <div className='timer__content'>
                      <p><p className='note'>The coin you have bought will be released within {timeLeft}.</p></p>
                    </div>
                    <button className='view-asset' onClick={() => { navigate('/user/assets/overview') }}>
                      View My Assets
                    </button>
                  </div>
                </div>
                <div className='order_process_step'>
                  <div className='summery__tiem'>
                    <div className='summary_info'>
                      <div className='summary_info_pay'>
                        <div className='summary_info_title'>
                          <div className='number'><img src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/FAB005/external-verified-check-circle-for-approved-valid-content-basic-regular-tal-revivo.png" /></div>
                          <div className='dash__line'></div>
                        </div>
                        <div className='summary_info_content'>
                          Complete Your Payment
                        </div>
                      </div>
                      <div className='summary_info_pay'>
                        <div className='summary_info_title'>
                          <div className='number'><img src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/FAB005/external-verified-check-circle-for-approved-valid-content-basic-regular-tal-revivo.png" /></div>
                          <div className='dash__line'></div>
                        </div>
                        <div className='summary_info_content'>
                          Coin Release in Progress
                        </div>
                      </div>
                      <div className='summary_info_pay'>
                        <div className='summary_info_title'>
                          <div className='number'><img src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/FAB005/external-verified-check-circle-for-approved-valid-content-basic-regular-tal-revivo.png" /></div>
                        </div>
                        <div className='summary_info_content'>
                          Transaction Completed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {buyOrder !== undefined && (buyOrder?.orderData.isReleased === true) &&
              <div className='heder__content'>
                <div className='header-success-content'>

                  <div className='success-img'>
                    <img src="https://img.icons8.com/fluency/48/null/ok.png" />
                  </div>
                  <div className='timer'>
                    <div className='timer__timeout'>
                      <p className='note'>Transaction Completed</p>
                    </div>
                    <div className='timer__content'>
                      <p className='note'>{buyOrder?.orderData.sell_userid === users.id ? 'Released' : 'Recieved'}  <span style={{ fontWeight: '700' }}>{buyOrder.orderData.quantity} {buyOrder.orderData.receive_currency}</span></p>
                    </div>
                    <button className='view-asset' onClick={() => { navigate('/user/assets/overview') }}>
                      View My Assets
                    </button>
                  </div>
                </div>
                <div className='order_process_step'>
                  <div className='summery__tiem'>
                    <div className='summary_info'>
                      <div className='summary_info_pay'>
                        <div className='summary_info_title'>
                          <div className='number'><img src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/FAB005/external-verified-check-circle-for-approved-valid-content-basic-regular-tal-revivo.png" /></div>
                          <div className='dash__line'></div>
                        </div>
                        <div className='summary_info_content'>
                          Complete Your Payment
                        </div>
                      </div>
                      <div className='summary_info_pay'>
                        <div className='summary_info_title'>
                          <div className='number'><img src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/FAB005/external-verified-check-circle-for-approved-valid-content-basic-regular-tal-revivo.png" /></div>
                          <div className='dash__line'></div>
                        </div>
                        <div className='summary_info_content'>
                          Coin Release in Progress
                        </div>
                      </div>
                      <div className='summary_info_pay'>
                        <div className='summary_info_title'>
                          <div className='number'><img src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/FAB005/external-verified-check-circle-for-approved-valid-content-basic-regular-tal-revivo.png" /></div>
                        </div>
                        <div className='summary_info_content'>
                          Transaction Completed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {buyOrder !== undefined && (buyOrder?.orderData.isCanceled === true) &&
              <div className='heder__content'>
                <div className='header-success-content' style={{ padding: '20px' }}>

                  <div className='success-img'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      width="50" height="40"
                      viewBox="0,0,256,256"
                      style={{ fill: "#000000" }}>
                      <g fill="#aaaaaa" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(5.12,5.12)"><path d="M25,2c-12.681,0 -23,10.319 -23,23c0,12.681 10.319,23 23,23c12.681,0 23,-10.319 23,-23c0,-12.681 -10.319,-23 -23,-23zM33.71,32.29c0.39,0.39 0.39,1.03 0,1.42c-0.2,0.19 -0.45,0.29 -0.71,0.29c-0.26,0 -0.51,-0.1 -0.71,-0.29l-7.29,-7.29l-7.29,7.29c-0.2,0.19 -0.45,0.29 -0.71,0.29c-0.26,0 -0.51,-0.1 -0.71,-0.29c-0.39,-0.39 -0.39,-1.03 0,-1.42l7.29,-7.29l-7.29,-7.29c-0.39,-0.39 -0.39,-1.03 0,-1.42c0.39,-0.39 1.03,-0.39 1.42,0l7.29,7.29l7.29,-7.29c0.39,-0.39 1.03,-0.39 1.42,0c0.39,0.39 0.39,1.03 0,1.42l-7.29,7.29z"></path></g></g>
                    </svg>
                  </div>
                  <div className='timer'>
                    <div className='timer__timeout'>
                      <p className='note'>Your order has been canceled.</p>
                    </div>
                    <div className='timer__content'>
                      <p className='note'>Your order has been canceled.</p>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          <div className='order_payment_body'>
            <div className='order-detail-decorator'>
              <div className='decorator_item'>
                <div className='decorator-dash-line one'></div>
              </div>
              <div className='decorator_item'>
                <div className='decorator-circle'></div>
              </div>
              <div className='decorator_item'>
                <div className='decorator-dash-line two'></div>
              </div>
              <div className='decorator_item'>
                <div className='decorator-circle'></div>
              </div>
            </div>
            <div className='order-summary'>
              <div className='summery__tiem'>
                <div className="summary_title">Order Info</div>
              </div>
              <div className='summery__tiem'>
                <div className='summary_info'>
                  <div className='summary_info_pay'>
                    <div className='summary_info_title'>
                      {buyOrder.orderData.type === 'buy' ? 'Pay' : 'Sell'}
                    </div>
                    <div className='summary_info_content_price'>
                      {buyOrder.orderData.order_amount} {buyOrder.orderData.spend_currency}
                    </div>
                  </div>
                  <div className='summary_info_pay'>
                    <div className='summary_info_title'>
                      Price
                    </div>
                    <div className='summary_info_content'>

                      {buyOrder !== undefined && buyOrder?.orderData.price}
                    </div>
                  </div>
                  <div className='summary_info_pay'>
                    <div className='summary_info_title'>
                      Receive
                    </div>
                    <div className='summary_info_content'>
                      {buyOrder.orderData.quantity} {buyOrder.orderData.receive_currency}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='order_payment'>
              <div className='payment__item'>
                <div className="orderPaymentTitle">Payment Method</div>
              </div>
              <div className='payment__item'>
                <div className='paymentMethodTips'>
                  <div className='paymentMethodTips_item'>
                    <div>1. The personal particulars on your payment account must match your verified identity information on BLC Exchange.</div>
                  </div>
                  <div className='paymentMethodTips_item'>
                    <div>2. Make sure not to remark sensitive words such as "BTC/USDT purchase" when transferring fiat, otherwise the transfer may fail.</div>
                  </div>
                </div>
              </div>
              <div className='payment__item'>

                {buyOrder !== undefined && buyOrder?.orderData.isCanceled === true &&
                  <div className='paymentMethodEmpty'>
                    <div className='paymentMethodEmpty_verticle'>
                      <div className='paymentMethodEmpty_verticle_item'>
                        <img className="index_paymentMethodImg__1tlNf" src="data:image/png;base64,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" alt=""></img>
                      </div>
                      <div className='paymentMethodEmpty_verticle_item'>
                        <div>Unable to retrieve the payment method! The order has already been canceled.</div>
                      </div>
                    </div>
                  </div>
                }
                <div className='order_paymentMethod'>
                  {(buyOrder?.orderData.isComplete === true || buyOrder?.orderData.isReleased === true || buyOrder?.orderData.isCanceled === true) &&
                    <Accordion>
                      {buyOrder !== undefined && buyOrder?.p_method.map((val, index) => {
                        
                        if (buyOrder?.orderData.p_method === val._id) {
                          return (
                            <Accordion.Item key={index} eventKey={index}>
                              <Accordion.Header><div >
                                <label htmlFor={val} className='ml-2 mb-0'>
                                  {val.pm_name}
                                </label>
                              </div></Accordion.Header>
                              <Accordion.Body>
                                <div className="account__overview">
                                  <div className="account__overview__holder">
                                    <div className="">
                                      Name
                                    </div>
                                    <div className="">
                                      {val.pm_name === 'Paytm' ? val.pmObject.name : val.pm_name === 'Phonepe' ? val.pmObject.fullname : val.pm_name === 'Google Pay' ? val.pmObject.gmail : val.pmObject.fullname}

                                    </div>
                                  </div>
                                  <div className="account__overview__holder">
                                    <div className="">
                                      Account Number
                                    </div>
                                    <div className="">
                                      {val.pm_name === 'Paytm' ? val.pmObject.account : val.pm_name === 'Phonepe' ? val.pmObject.phonenumber : val.pm_name === 'Google Pay' ? val.pmObject.phonenumber : val.pmObject.upi}
                                    </div>
                                  </div>
                                 
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          )
                        }

                      })}
                    </Accordion>
                  }

                  {(buyOrder?.orderData.inProcess === true) &&
                    <Accordion>
                      {buyOrder !== undefined && buyOrder?.p_method.map((val, index) => {
                        console.log(val.pmObject.qr_code)
                        return (
                          <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header><div >
                              <input type="radio" className='mt-2' id={val._id} name="fav_language" value={val._id} onChange={() => { setupiId(val._id), setPymntName(val.pm_name) }} />
                              <label htmlFor={val} className='ml-2 mb-0'>
                                {val.pm_name}
                              </label>
                            </div></Accordion.Header>
                            <Accordion.Body>
                              <div className="account__overview">
                                <div className="account__overview__holder">
                                  <div className="">
                                    Name
                                  </div>
                                  <div className="">
                                    {val.pm_name === 'Paytm' ? val.pmObject.name : val.pm_name === 'Phonepe' ? val.pmObject.fullname : val.pm_name === 'Google Pay' ? val.pmObject.gmail : val.pmObject.fullname}

                                  </div>
                                </div>
                                <div className="account__overview__holder">
                                  <div className="">
                                    Account Number
                                  </div>
                                  <div className="">
                                    {val.pm_name === 'Paytm' ? val.pmObject.account : val.pm_name === 'Phonepe' ? val.pmObject.phonenumber : val.pm_name === 'Google Pay' ? val.pmObject.phonenumber : val.pmObject.upi}
                                  </div>
                                </div>
                                {val.pmObject.qr_code !==undefined && val.pmObject.qr_code !== '' &&
                                  <div className="account__overview__holder">
                                    <div className="">
                                      Qr-Code
                                    </div>
                                    <div className="">
                                      <img width={100} src={backend_image_url+val.pmObject.qr_code} alt='qr-code'></img>
                                    </div>
                                  </div>
                                   }
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        )

                      })}
                    </Accordion>
                  }

                </div>
              </div>
            </div>

            <div className='methodmrgin'>
              {buyOrder !== undefined && buyOrder?.orderData.buy_userid === users.id &&
                <>
                  <div className='row'>
                    <div className='col-12'>
                      {buyOrder?.orderData.inProcess === true && isPaid === false &&
                        <button type='submit' onClick={() => setConfirmation(true)} value='Make Payment' className=' paymentbtn'>
                          <span >Complete Payment</span>
                        </button>
                      }
                      {buyOrder?.orderData.isReleased === false && buyOrder?.orderData.isCanceled === false &&
                        <a className='orderCanclebtn' onClick={() => setOpen(true)}>Cancel Order</a>
                      }

                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
        <div className=' col-lg-4 col-md-12'>
          {/* Chat Component start */}
          <ChatComponent order={buyOrder.orderData} />

        </div>
      </div>

      {/* cancel order modal */}
      <div className='row'>
        <Modal show={open} centered onHide={() => onCloseModal()}>
          <Modal.Header className="text-center" closeButton={true}>
            <div className="icon-box">

            </div>
            <h2>Are you sure?</h2>
          </Modal.Header>
          <Modal.Body>Do you really want to cancel this order?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setOpen(false) }}>No</Button>{' '}
            <Button variant="danger" onClick={(e) => cancelOrder(e)}>Yes</Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Payment confirm modal */}
      <div className='row'>
        <Modal show={confirmation} centered onHide={() => setConfirmation(false)}>
          <Modal.Header className="text-center px-4" closeButton={true}>
            <h5>Payment Details</h5>
          </Modal.Header>
          <Modal.Body>
            <div className='pymnt-details-body'>
              <div className='pymt-content'>
                <div className='pymnt-content-title'>

                  Pay
                </div>
                <div className='pymnt-content-desc'>
                  {buyOrder.orderData.order_amount} {buyOrder.orderData.spend_currency}
                </div>
              </div>
              <div className='pymt-content'>
                <div className='pymnt-content-title'>
                  Recieve
                </div>
                <div className='pymnt-content-desc'>
                  {buyOrder.orderData.quantity} {buyOrder.orderData.receive_currency}
                </div>
              </div>
              <div className='pymt-content'>
                <div className='pymnt-content-title'>
                  Payment Method
                </div>
                <div className='pymnt-content-desc'>
                  {pymntName}
                </div>
              </div>

            </div>
            <div className='acknowledge-content'>
              I understand that clicking on "Payment Completed" before a successful payment can cause my account to be restricted
            </div>

            <div className='acknowledge-btn'>
              <button className='paymentbtn' onClick={(e) => sendPayment(e)} >Acknowledge</button>
              <button className='orderCanclebtn' onClick={() => { setConfirmation(false) }}>Cancel</button>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      {/* order coin released congrates modal */}
      <div className='row'>
        <Modal show={isCoinReleased} centered onHide={() => setIsCoinReleased(false)}>
          <Modal.Body>
            <div className='release-congrates-body'>
              <div>
                <img src={release}></img>
              </div>
              <div>
                <h5>Congrats, you've bought {buyOrder?.orderData.quantity} USDT!</h5>
              </div>
              <div className='acknowledge-content'>
                You have successfully completed the order.
              </div>
            </div>
            <div className='acknowledge-btn'>
              <button className='paymentbtn' onClick={(e) => setIsCoinReleased(false)} >OK</button>
              <button className='orderCanclebtn' onClick={() => { navigate('/user/assets/overview') }}>View Assets</button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>

  )
}

export default BuyerComponent;