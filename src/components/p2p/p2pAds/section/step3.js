import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sta_Toaster } from '../../../../Core/toaster';
import { p2pPostRequest } from '../../../../Actions/p2pAction';
import { useDispatch, useSelector } from "react-redux";
import { assetsRequest } from '../../../../Actions/assetsAction';
import country from '../../../../Constants/countryCodeList.json'
import GoogleAuthentication from '../../../popup/googleAuthentication';

const StepThree = ({ currentStep, setCurrentStep, form1, form2, trnsferId }) => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [open2FA, setOpen2FA] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [auto_reply, setAutoReply] = useState('');
  const [selectedRegion, setSelectedRegion] = useState("Select time slot");
  const dispatch = new useDispatch();
  const navigate = useNavigate();
  let users = useSelector((state) => state.users)

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

  const verified2FA = async () => {
    let obj = {
      token: trnsferId,
      currency: form1.currency,
      price: form1.price,
      quantity: form2.quantity,
      min_limit: form2.min_limit,
      max_limit: parseInt(form2.max_limit),
      p_method: JSON.stringify(form2.p_method),
      type: 'SELL',
      payment_time: form2.time,
      remarks: remarks,
      auto_reply: auto_reply,
      region: selectedRegion
    }
    let response = await dispatch(p2pPostRequest(obj));
    if (response.status === 200) {
      setOpen2FA(false);
      await dispatch(assetsRequest());
      setOpen(false);
      sta_Toaster('Post create successfully!.', 'success')
      navigate('/p2p/trade/p2p');
    }
  }

  return (<>
    <ToastContainer />
    <form>
      <div className='step3__main_container'>
        <div className="remarks">
          <div className="remarks_title">
            Remarks (Optional)
          </div>
          <div className="remarks_input">
            <textarea type='textarea' rows={5} className='form-control' placeholder='Please do not use any crypto related words, such as USDT, BTC' name="remarks" onChange={(e) => { setRemarks(e.target.value) }} />
          </div>
        </div>
        <div className="remarks">
          <div className="remarks_title">
            Auto Reply (Optional)
          </div>
          <div className="remarks_input">
            <textarea type='textarea' rows={5} className='form-control' placeholder='Auto reply message will be sent to counterparty once order created' name="auto_reply" onChange={(e) => { setAutoReply(e.target.value) }} />
          </div>
        </div>
        <div className="remarks">
          <div className="remarks_title">
            Select region(s) availability
          </div>
          <div className="remarks_input">
            <div className='deposit_dropdown_wrapper' onClick={() => { setActive(active === 2 ? 0 : 2) }}>

              <div className="deposit_button_text">
                <span>{selectedRegion}</span>
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
                      {country.map((item) => {
                        return <li className="list_content qwe ads_select__countery" onClick={() => setSelectedRegion(item.country)}>
                          <div className="list_text ads_countery">
                            <div className="flag">
                              <img src={require(`../../../../assets/flag/svg/${item.iso.toLowerCase()}.svg`)}></img>
                              <p className="countery__code">{item.country}</p>
                            </div>
                          </div>
                        </li>
                      })}
                    </ul>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className='ads__foter'>
          {previousButton()}
          <button type='button' onClick={() => setOpen(true)} style={{ backgroundColor: '#f7a600', padding: '5px 18px', fontSize: '18px' }} className=' submit__btn btn text-white float-right' name="submit">Submit</button>
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
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm To Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
          <div className='row deposit-modal'>
            <ul className='post_confirm_list'>
              <li className='post_confirm_list_item'>
                <p className='sell_post'>After publishing the SELL Post, the trading assets will be frozen.</p>
              </li>
              <li className='post_confirm_list_item'>
                <div className='post_confirm_list_title'>Type</div>
                <div className='post_confirm_list_content conten_modifier' >SELL</div>
              </li>
              <li className='post_confirm_list_item'>
                <div className='post_confirm_list_title'>Asset</div>
                <div className='post_confirm_list_content'>{form1.token}</div>
              </li>
              <li className='post_confirm_list_item'>
                <div className='post_confirm_list_title'>Currency</div>
                <div className='post_confirm_list_content'>{form1.currency}</div>
              </li>
              <li className='post_confirm_list_item'>
                <div className='post_confirm_list_title'>Price Type</div>
                <div className='post_confirm_list_content'>Fixed</div>
              </li>
              <li className='post_confirm_list_item'>
                <div className='post_confirm_list_title'>Fixed</div>
                <div className='post_confirm_list_content'>{form1.price}</div>
              </li>
              <li className='post_confirm_list_item'>
                <div className='post_confirm_list_title'>Order Limit</div>
                <div className='post_confirm_list_content'>{form2.min_limit}~{form2.max_limit}</div>
              </li>
              <li className='post_confirm_list_item'>
                <div className='post_confirm_list_title'>Total Trading Amount</div>
                <div className='post_confirm_list_content'>{form2.quantity}</div>
              </li>

              <li className='post_confirm_list_item'>
                <div className='post_confirm_list_title'>Reserved Fee</div>
                <div className='post_confirm_list_content'>0.00 {form1.token}</div>
              </li>
              <li className='post_confirm_list_item'>
                <div className='tmb_spacer'></div>
              </li>

              <li className='post_confirm_list_item'>
                <div className='post_confirm_list_title'>Payment Method</div>
                <div className='post_confirm_list_content'>
                  {form2.p_method.map((item, index) => {
                    return <p key={index} className='pay_method'>{index + 1} {'. '} {item.pm_name}</p>
                  })}
                </div>
              </li>
              <li className='post_confirm_list_item'>
                <div className='post_confirm_list_title'>Payment Time Limit</div>
                <div className='post_confirm_list_content'>{form2.time}</div>
              </li>
              <li className='post_confirm_list_item'>
                <div className='post_confirm_list_title'>Available Region</div>
                <div className='post_confirm_list_content'>India</div>
              </li>
              <li className='post_confirm_list_item_button'>
                <div className='post_confirm_list_title'><button type="button" style={{ backgroundColor: '#d7d2c8' }} className=' submit__btn btn text-white' name="submit" onClick={() => setOpen(false)}> Cancel</button></div>
                <div className='post_confirm_list_content'><button type="button" style={{ backgroundColor: '#f7a600' }} className=' submit__btn btn text-white' name="submit" onClick={() => { setOpen(false),setOpen2FA(true) }}> Confirm to Post</button></div>
              </li>
            </ul>

          </div>
        </div>
      </Modal.Body>
    </Modal>
    {open2FA === true &&
      <GoogleAuthentication checkAuth={open2FA} userAuth={users} verified2FA={verified2FA} />
    }
  </>
  )
}

export default StepThree;