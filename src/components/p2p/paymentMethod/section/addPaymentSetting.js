import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'

import CreateForm from '../payment-form-fields/create-form';
import EditForm from "../payment-form-fields/edit-form";
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import { getPmList, saveUserPm, getSavedPm, enabledANDdisabled, deletePaymentMethod } from "../../../../Actions/paymentmethodsAction";
import { backend_image_url } from "../../../../Api";

const AddPAymentSetting = (props) => {

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [pwdError, setPwdError] = useState('');
  const [editpmID, setEditpmID] = useState('');
  const [qrCode, setQrCode] = useState([])
  const [attachment, setAttachment] = useState('')
  const pmlist = useSelector((state) => state.pmlist)
  let userpmlist = useSelector((state) => state.userpmlist)
  let users = useSelector((state) => state.users)

  userpmlist = Object.keys(userpmlist).length === 0 ? [] : userpmlist.result;
  const [listOpen, setListOpen] = useState(false)
  const [pmName, setPmName] = useState('')
  const [pmID, setPmid] = useState('')
  const [fieldLoader, setFieldLoader] = useState({})


  let {
    register, getValues, setValue,
    handleSubmit, unregister,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log("====data", data);
    setFormData(data);
    if (editpmID === "") {
      setShow(true);
    }
    else {
      setShowEdit(true)
    }

  }

  //****************************************** *//
  // important note (prev & current pm setected value. 
  // when user submit the eject extra field which have selected from prev section)
  //****************************************** *//
  const [prev, setPrev] = useState([])

  //****************************************** *//
  //
  //****************************************** *//
  const selectPayment = async (data, index) => {
    setListOpen(false)
    /** */
    setValue("pmid", paymentmethod[index]?._id)
    setValue("pm_name", paymentmethod[index]?.payment_method)
    /** */

    for (let fld in getValues()) {
      if (fld === 'pmid' || fld === 'pm_name') {
        continue;
      }
      unregister(fld)
    }

    setFieldLoader(paymentmethod[index])
    setPmName(paymentmethod[index]?.payment_method)
    setPmid(paymentmethod[index]?._id)

    prev.push(index)
    // selectCoin
  }

  useEffect(() => {
    dispatch(getPmList())
    dispatch(getSavedPm())
    document.body.removeEventListener('click', (e) => handleClick(e));
  }, [])

  const paymentmethod = pmlist?.result ? pmlist?.result : [];

  //=====================//
  // open payment method list
  //=====================//

  const openList = () => {
    // openList
    setListOpen(!listOpen)
    setFieldLoader({})
  }

  //=================================//
  // update payment status
  const changeStatus = (status, id) => {
    let formData = {
      status: status,
      id: id
    }
    dispatch(enabledANDdisabled(formData))
  }
  //=================================//


  const getDetails = (getDetails) => {
    var collect = ''
    for (let data in getDetails) {
      if (data === 'pmid' || data === 'pm_name' || data === 'password')
        continue
      collect += ' ' + getDetails[data]
    }
    return collect
  }

  //=================================== delete Payment method ==//

  const deletePM = (pmid) => {
    if (confirm("Are you sure you want to delete payment method") == true) {
      dispatch(deletePaymentMethod(pmid))
    }

  }

  const editPM = (pmid) => {
    setOpen(true)
    let data = userpmlist.filter((item) => {
      return item._id === pmid;
    })

    let method = paymentmethod.filter((item) => {
      return item._id === data[0].pmid
    })

    setValue("pmid", method[0]?._id)
    setValue("pm_name", method[0]?.payment_method)

    for (const field of method[0]?.fields) {
      setValue(field.name, data[0].pmObject[field.name]);
    }

    setEditpmID(pmid)
    setFieldLoader(method[0])
    setPmName(method[0]?.payment_method)
    setPmid(method[0]?._id)

  }

  const onFinalSubmit = async () => {
    let data = formData;
    let pwd = watch('otp');
    data.tradingPassword = pwd;
    data.editID = editpmID;

    // return;
    setTimeout(async () => {
      let file = qrCode;
      // console.log(file);
      if (file.length > 0) {
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onloadend = async function (e) {
          data.qr_code = reader.result
          let result = await dispatch(saveUserPm(data))
          if (result.status === 200) {
            // if(result.attachment !== undefined){
            //   setAttachment(result.attachment)
            // }
            for (let fld in getValues()) {
              unregister(fld)
            }
            setEditpmID('')
            setShowEdit(false)
            setOpen(false);
            setPmName('')
            setPmid('')
            setFieldLoader({})
            setQrCode([])
            props.hidePopup()
            setShow(false);

          }
          else {
            setShowToast(true)
            setPwdError(result.message);
          }
        };
      }
      else {
        // data.qr_code = attachment
        let result = await dispatch(saveUserPm(data))
        if (result.status === 200) {
          // if(result.attachment !== undefined){
          //   setAttachment(result.attachment)
          // }
          for (let fld in getValues()) {
            unregister(fld)
          }
          setEditpmID('')
          setShowEdit(false)
          setOpen(false);
          setPmName('')
          setPmid('')
          setFieldLoader({})
          props.hidePopup()
          setShow(false);
          setQrCode([])

        }
        else {
          setShowToast(true)
          setPwdError(result.message);
        }
      }

    }, 1000);
    console.log("====data", data)


  }

  return (
    <div id="USDT" className="tab-pane active">
      <div className="table-responsive justify-content-center align-items-center">
        {userpmlist.length > 0 && userpmlist.map((Datalist, index) => {
          // console.log(Datalist);
          return <Card key={index}>
            <Card.Header>
              <div className="payment__card__header">
                <div className="payment__card__header_title">{Datalist.pm_name}</div>
                <div className="payment__card__header_action">
                  <div className="payment__delete">
                    <button type="button"
                      className="btn btn-outline-success"
                      onClick={(e) => deletePM(Datalist._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                      </svg>
                    </button>
                  </div>
                  <div className="payment__edit">
                    <button type="button" className="btn btn-outline-success" onClick={(e) => editPM(Datalist._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                      </svg>
                    </button>
                  </div>
                  <div className="payment__status">
                    {(Datalist.status === true) ? <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="&nbsp;"
                      checked={Datalist.status}
                      onChange={(e) => changeStatus(false, Datalist._id)}
                    /> : <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="&nbsp;"
                      checked={Datalist.status}
                      onChange={(e) => changeStatus(true, Datalist._id)}
                    />}
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>

              <div className="account__overview">
                <div className="account__overview__holder">
                  <div className="">
                    Name
                  </div>
                  <div className="">
                    {Datalist.pm_name === 'Paytm' ? Datalist.pmObject.name : Datalist.pm_name === 'Phonepe' ? Datalist.pmObject.fullname : Datalist.pm_name === 'Google Pay' ? Datalist.pmObject.gmail : Datalist.pmObject.fullname}

                  </div>
                </div>
                <div className="account__overview__holder">
                  <div className="">
                    Account Number
                  </div>
                  <div className="">
                    {Datalist.pm_name === 'Paytm' ? Datalist.pmObject.account : Datalist.pm_name === 'Phonepe' ? Datalist.pmObject.phonenumber : Datalist.pm_name === 'Google Pay' ? Datalist.pmObject.phonenumber : Datalist.pmObject.upi}

                  </div>
                </div>

                {Datalist.pmObject.qr_code !== undefined && Datalist.pmObject.qr_code !== '' &&
                  <div className="account__overview__holder">
                    <div className="">
                      Qr-Code
                    </div>
                    <div className="">
                      <img id="qr_code" width={100} src={backend_image_url + Datalist.pmObject.qr_code} alt='qr-code'></img>
                    </div>
                  </div>
                }
              </div>
            </Card.Body>
          </Card>
        })}

        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered show={props.open}
          className="payment-tmb-setting"
          onHide={() => { props.hidePopup(), setListOpen(false), setFieldLoader({}), setPmName(''), setOpen(false) }}
        >
          {show === false ?
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                name="pmid"
                {...register("pmid", { required: false })}
                value={pmID}
                type="hidden"
              />

              <Modal.Header closeButton={true}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ fontSize: '14px' }}>
                  Payment Settings
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='container'>
                  <div className='row deposit-modal'>
                    <div className=''>
                      <h6>Payment Methods : </h6>
                      <div className="payment-method-wrapper-content mb-2">

                        <div className="input-group modal-input md-form form-sm form-1 pl-0 mb-0">
                          <div className="input-group-prepend">
                            <span className="input-group-text lighten-3 paymentName" id="basic-text1"><i className="fas fa-search "
                              aria-hidden="true"></i></span>
                          </div>
                          <input
                            className="form-control my-0 py-1 paymentName"
                            type="text" {...register("pm_name", { required: false })}
                            name="pm_name"
                            value={pmName}
                            placeholder="Search"
                            onClick={openList}
                            aria-label="Search" />
                        </div>
                        <div className={"deposit-coin-list " + (listOpen ? '' : 'd-none')}>
                          <ul className="coin-payment-list">
                            {paymentmethod.map((i, ii) => {
                              return (
                                <li key={"coin" + i._id} onClick={() => { selectPayment(i, ii) }}>
                                  <div className='img'></div><div className='text'>
                                    <p className='symbole'>{i.payment_method}</p>
                                  </div>
                                </li>
                              );
                            })}

                          </ul>
                        </div>
                      </div>
                      {(Object.keys(fieldLoader).length === 0) ? '' : <CreateForm field={fieldLoader} register={register} error={errors} setQrCode={setQrCode} qrCode={qrCode} />}

                      <div className="form-group">
                        <button type={pmName ? 'submit' : 'button'} className="btn btn-secondary btn-sm tmb-btn-sm">Complete</button>
                      </div>

                    </div>
                  </div>
                </div>

              </Modal.Body>
            </form> :
            <form onSubmit={handleSubmit(onFinalSubmit)}>
              <Modal.Header closeButton={true}>
                <Modal.Title id="contained-modal-title-vcenter">
                  <h4> Security Verification
                  </h4>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='container'>
                  <ToastContainer position="top-center" className="p-3 toast__container">
                    <Toast onClose={() => setShowToast(false)} bg='danger' delay={3000} autohide show={showToast} >
                      <Toast.Body>{pwdError}</Toast.Body>
                    </Toast>
                  </ToastContainer>
                  <div className="row justify-content-center mb-2">
                    <span>Trading Password</span>
                  </div>
                  <div className='row justify-content-center'>


                    <div className="input-group">
                      <input className="w-75 form-control" required placeholder="Please Enter Trading Password"
                        name="otp"
                        {...register("otp", { required: false })}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center mt-3 p-3">
                    <button type='submit' value='Next' className=' paymentbtn'>
                      <span>Verify</span>
                    </button>
                  </div>
                </div>
              </Modal.Body>

            </form>
          }
        </Modal>

        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered show={open}
          className="payment-tmb-setting"
          onHide={() => { setOpen(false), setPmName(''), setPmid(''), setFieldLoader({}), setEditpmID('') }}
        >
          {showEdit === false ?
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                name="pmid"
                {...register("pmid", { required: false })}
                value={pmID}
                type="hidden"
              />

              <Modal.Header closeButton={true}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ fontSize: '14px' }}>
                  Edit Payment Settings
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='container'>
                  <div className='row deposit-modal'>
                    <div className=''>
                      <h6>Payment Methods : </h6>
                      <div className="payment-method-wrapper-content mb-2">

                        <div className="input-group modal-input md-form form-sm form-1 pl-0 mb-0">
                          <div className="input-group-prepend">
                            <span className="input-group-text lighten-3 paymentName" id="basic-text1"><i className="fas fa-search "
                              aria-hidden="true"></i></span>
                          </div>
                          <input
                            className="form-control my-0 py-1 paymentName"
                            type="text" {...register("pm_name", { required: false })}
                            name="pm_name"
                            value={pmName}
                            placeholder="Search"
                            aria-label="Search" />
                        </div>

                        {/* <div className={"deposit-coin-list " + (listOpen ? '' : 'd-none')}>
                          <ul className="coin-payment-list">
                            {paymentmethod.map((i, ii) => {
                              return (
                                <li key={"coin" + i._id} onClick={() => { selectPayment(i, ii) }}>
                                  <div className='img'></div><div className='text'>
                                    <p className='symbole'>{i.payment_method}</p>
                                  </div>
                                </li>
                              );
                            })}

                          </ul>
                        </div> */}
                      </div>

                      {(Object.keys(fieldLoader).length === 0) ? '' : <EditForm field={fieldLoader} register={register} error={errors} setQrCode={setQrCode} qrCode={qrCode} />}

                      <div className="form-group">
                        <button type={pmName ? 'submit' : 'button'} className="btn btn-secondary btn-sm tmb-btn-sm">Complete</button>
                      </div>

                    </div>
                  </div>
                </div>

              </Modal.Body>
            </form> :
            <form onSubmit={handleSubmit(onFinalSubmit)}>
              <Modal.Header closeButton={true}>
                <Modal.Title id="contained-modal-title-vcenter">
                  <h4> Security Verification
                  </h4>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='container'>
                  <ToastContainer position="top-center" className="p-3 toast__container">
                    <Toast onClose={() => setShowToast(false)} bg='danger' delay={3000} autohide show={showToast} >
                      <Toast.Body>{pwdError}</Toast.Body>
                    </Toast>
                  </ToastContainer>
                  <div className="row justify-content-center mb-2">
                    <span>Trading Password</span>
                  </div>
                  <div className='row justify-content-center'>

                    <div className="input-group">
                      <input className="w-75 form-control" required placeholder="Please Enter Trading Password"
                        name="otp"
                        {...register("otp", { required: false })}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center mt-3 p-3">
                    <button type='submit' value='Next' className=' paymentbtn'>
                      <span>Verify</span>
                    </button>
                  </div>
                </div>
              </Modal.Body>

            </form>
          }
        </Modal>

      </div>
    </div>
  )
}

export default AddPAymentSetting;