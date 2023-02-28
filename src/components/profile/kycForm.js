import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { kycRequest } from '../../Actions/p2pAction';

import countryList from '../../assets/json/country.json';
import FormExample from './form';
import StateForm from './statementForm';
import kycimage from '../../assets/images/kyc/image/download.svg';
import approvedKycimage from '../../assets/images/kycaproove.svg';
import '../../Style/profile.css'
const documentType = [{ label: 'Passport', value: 'Passport' }, { label: 'Id Card', value: 'Id Card' }, { label: 'Driver License', value: 'Driver License' }]

const schema = yup
    .object()
    .shape({
        country: yup.string().required('This field is required'),
        name: yup.string().required('This field is required'),
        email: yup.string().email().required('This field is required'),
        phone: yup.number().positive().integer().required('This field is required'),
        telegram: yup.string().required('This field is required'),
        doctype: yup.string().required('This field is required'),
        docnumber: yup.string().required('This field is required'),
    })
    .required();

const KycForm = (props) => {

    const kyc = useSelector((state) => state.kycs);
    console.log("===kyc", kyc)
    const dispatch = new useDispatch();
    const [country, setCountry] = useState(countryList);
    const [tabShow, setTabShow] = useState(0);
    const [formData, setFormData] = useState({});
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDocType, setSelectedDocType] = useState('');
    const [listOpen, setListOpen] = useState(0)

    const { register, setValue, getValues, handleSubmit, formState: { errors }, } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const submitGeneralForm = (data) => {
        console.log("===========", data);
        setFormData(data);
        setTabShow(1);
    }
    // const openList = () => {
    //     // openList
    //     setListOpen(1)
    //     // setFieldLoader({})

    // }
    const onChangeTab = (value, data) => {
        setTabShow(value);
        // let files = [];
        // files.push(data.file)
        // files.push(data.profile)
        formData['idfront'] = data.file;
        formData['idback'] = data.profile;
    }

    const onChangePreviousTab = (value) => {
        setTabShow(value);
    }

    const saveAsDraft = async (e) => {
        e.preventDefault();
        let formData = getValues();
        let reqData = new FormData();
        reqData.append('name', formData.name);
        reqData.append('email', formData.email);
        reqData.append('phone', formData.phone);
        reqData.append('country', formData.country);
        reqData.append('telegram', formData.telegram);
        reqData.append('doctype', formData.doctype);
        reqData.append('docnumber', formData.docnumber);
        let data = await dispatch(kycRequest(formData));
        if (data.status === 200) {
            console.log(data);
        }
    }

    const filterCountry = (e) => {
        // console.log(e.target.value)
        let filterItem = countryList.filter((item) => {
          if (item.label.toLowerCase().includes(e.target.value.toLowerCase()) === true) {
            return item
          }
        });
        console.log(filterItem,'======filter Item')
        setCountry(filterItem)
      }

    return (
        <>
            {(kyc?.data !== undefined && kyc?.data.userid === undefined || kyc?.data.isDraft === false) ?
                <div className="verification-2" onClick={() => { listOpen !== 0 && setListOpen(0) }}>
                    <div className="container-xl">
                        <div className="links-name">
                            <p> KYC </p>
                            <p> <a href="#">/ Individual Verification </a> </p>
                        </div>
                        <div className='row kyctab'>
                            <div className='col-md-3 kyctabbottom active'><i className="fa fa-user"></i> General</div>
                            <div className={tabShow === 1 || tabShow === 2 ? 'col-md-3 kyctabbottom active' : 'col-md-3 kyctabbottom'}><i className="fa fa-image"></i> ID</div>
                            {/* <div className={tabShow === 2 ? 'col-md-3 kyctabbottom active' : 'col-md-3 kyctabbottom'}><i className="fa fa-book"></i> Assets</div> */}
                        </div>
                        <div className="form-box" onClick={() => { listOpen !== 0 && setListOpen(0) }}>
                            {/* General Information */}
                            {tabShow === 0 &&
                                <form onSubmit={handleSubmit(submitGeneralForm)}>
                                    <div className="row">
                                        <div className="col-12 ">
                                            <div className="form-group mb-0">
                                                <label htmlFor="sel1">Country/Region of Residence</label>
                                                <div className="" id='countryDrop'>
                                                    <div className="input-group modal-input md-form form-sm form-1 pl-0 mb-0">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text lighten-3 paymentName" id="basic-text1"><i className="fas fa-search "
                                                                aria-hidden="true"></i></span>
                                                        </div>
                                                        <input
                                                            className="form-control my-0 py-1 paymentName"
                                                            type="text" {...register("country", { required: false })}
                                                            name="country"
                                                            // value={selectedCountry}
                                                            placeholder="Search"
                                                            onClick={() => { setListOpen(1) }}
                                                            onChange={(e) => { filterCountry(e) }}
                                                            aria-label="Search" />
                                                    </div>
                                                    <div className={"deposit-coin-list " + (listOpen === 1 ? '' : 'd-none')}>
                                                        <ul className="country-list">
                                                            {console.log("====country", countryList)}
                                                            {country.map((e) => {
                                                                return (
                                                                    <li key={'country ' + e.label} onClick={() => { setSelectedCountry(e.label), setValue('country', e.label, { shouldValidate: true }), setListOpen(0) }}>
                                                                        <div className='text'>
                                                                            <p className='symbole'>{e.label}</p>
                                                                        </div>
                                                                    </li>
                                                                );
                                                            })}

                                                        </ul>
                                                    </div>
                                                    {errors.country?.message && <p className='errorMessage'>{errors.country?.message}</p>}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="fname"> Name </label>
                                            <input type="text" className="form-control kyc-inputType f-name" defaultValue={kyc?.data.name} name="name" {...register('name')} placeholder='Please Enter Your Name' />
                                            {errors.name?.message && <p className='errorMessage'>{errors.name?.message}</p>}
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="email"> Email </label>
                                            <input type="text" className="form-control kyc-inputType e-mail" defaultValue={kyc?.data.email} id="email" {...register('email')} name="email" placeholder='Please Enter Email Address' />
                                            {errors.email?.message && <p className='errorMessage'>{errors.email?.message}</p>}
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="mobile"> Phone </label><br />
                                            <input type="number" className="form-control kyc-inputType phone" defaultValue={kyc?.data.phone} id="mobile" {...register('phone')} name="phone" placeholder='Please Enter Mobile Number' />
                                            {errors.phone?.message && <p className='errorMessage'>{errors.phone?.message}</p>}
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="telegram"> Telegram </label><br />
                                            <input type="text" className="form-control kyc-inputType phone" defaultValue={kyc?.data.telegram} id="telegram" {...register('telegram')} name="telegram" placeholder='Please Enter Telegram ID' />
                                            {errors.telegram?.message && <p className='errorMessage'>{errors.telegram?.message}</p>}
                                        </div>

                                        <div className="col-12">
                                            <div className="form-group mb-0">
                                                <label htmlFor="id-sel">Document Type</label><br />
                                                <div className="">
                                                    <div className="" id='documentDrop'>
                                                        <div className="input-group modal-input md-form form-sm form-1 pl-0 mb-0">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text lighten-3 paymentName" id="basic-text1"><i className="fas fa-search "
                                                                    aria-hidden="true"></i></span>
                                                            </div>
                                                            <input
                                                                className="form-control my-0 py-1 paymentName"
                                                                type="text" {...register("doctype", { required: false })}
                                                                name="doctype"
                                                                value={selectedDocType}
                                                                placeholder="Search"
                                                                onClick={() => { setListOpen(2) }}
                                                                aria-label="Search"
                                                            />
                                                        </div>
                                                        <div className={"deposit-coin-list " + (listOpen === 2 ? '' : 'd-none')}>
                                                            <ul className="country-list">
                                                                {documentType.map((i) => {
                                                                    return (
                                                                        <li key={'docType ' + i.label} onClick={() => { setSelectedDocType(i.value), setValue('doctype', i.value, { shouldValidate: true }), setListOpen(0) }} >
                                                                            <div className='text'>
                                                                                <p className='symbole'>{i.value}</p>
                                                                            </div>
                                                                        </li>
                                                                    );
                                                                })}

                                                            </ul>

                                                        </div>
                                                        {errors.doctype?.message && <p className='errorMessage'>{errors.doctype?.message}</p>}
                                                        
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label htmlFor="id-number">ID Number </label><br />
                                            <input type="text" id="id-number" name='docnumber' defaultValue={kyc?.data.docnumber} {...register('docnumber')} className='form-control kyc-inputType' placeholder="Please Enter Your ID Number" />
                                            {errors.docnumber?.message && <p className='errorMessage'>{errors.docnumber?.message}</p>}
                                        </div>

                                        <div className='row mb-3' style={{ justifyContent: 'center' }}>
                                            <div className='col-md-4 generalBtn' style={{ textAlign: 'center' }}>
                                                <button className="kycSubmit-btn" onClick={(e) => saveAsDraft(e)}>Save As Draft</button>
                                                {/* <span style={{ cursor: 'pointer' }} >Back</span> */}
                                            </div>
                                            <div className='col-md-4' style={{ textAlign: 'center' }}>
                                                <button type='submit' className="kycSubmit-btn"> Next </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            }

                            {/* Proof ID add */}
                            {tabShow === 1 &&
                                <FormExample onChangeTab={onChangeTab} onChangePreviousTab={onChangePreviousTab} />
                            }
                            {/* Assets */}
                            {tabShow === 2 &&
                                <StateForm onChangePreviousTab={onChangePreviousTab} formData={formData} />

                            }
                        </div>
                    </div>
                </div> : 
                <div className="verification-2">
                    <div className='container-xl submittedContainer'>
                        {kyc?.data.isVerified === false ?
                            <div className='submittedForm'>
                                <img src={kycimage} />
                                <h1 className='form_h1'>Submitted</h1>
                                <p className='form_p'>We have received your application. The review may take 2 working days. The result will be sent to your bound email.</p>
                            </div> :
                            <div className='submittedForm'>
                                <img src={approvedKycimage} />
                                <h1 className='form_h1'>Approved</h1>
                                <p className='form_p'>Your application has been approved.</p>
                            </div>
                        }

                    </div>
                </div>
            }
        </>
    )

}

export default KycForm;