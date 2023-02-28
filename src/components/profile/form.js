import React, { useState, useRef, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { draftRequest } from '../../Actions/p2pAction';

const schema = yup
  .object()
  .shape({
    file: yup.mixed().required('File is required'),
    profile: yup.mixed().required('File is required'),
  })
  .required();

function FormExample(props) {

  const inputRef = useRef < HTMLInputElement | null > (null);
  const backRef = new useRef();
  const dispatch = new useDispatch();
  const kyc = useSelector((state) => state.kycs);
  const [imagesrc, setImageSource] = useState('');
  const [picproof, setPicProof] = useState('');
  const [isLoading, setIsLoaading] = useState(false);
  const [isLoading2, setIsLoaading2] = useState(false);
  const { register, setValue, getValues, handleSubmit, formState: { errors }, } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleUploadClick = () => {
    // 👇 We redirect the click event onto the hidden input element
    let uploadfile = document.querySelector('#frontfile');
    uploadfile.click();
  };

  const handleFileChange = function (e) {
    if (!e.target.files) {
      return;
    }
    var file = e.target.files[0];

    // var reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = function (e) {
    //   setImageSource(reader.result);
    //   setIsLoaading(false);
    // }.bind(this);

    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }

    getBase64(file).then(
      data => {
        if (data !== undefined)
          setImageSource(data);
          setIsLoaading(false);
          setValue('file', data, { shouldValidate: true });
      }
    );
  }

  const picFileUpload = () => {
    let uploadfile = document.querySelector('#photofile');
    uploadfile.click();
  }

  const handleBackFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    
    var file = e.target.files[0];
    // var reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = function (e) {
    //   setPicProof(reader.result);
    //   setIsLoaading2(false);
    // }.bind(this);

    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
    getBase64(file).then(
      data => {
        if (data !== undefined)
          setPicProof(data);
          setIsLoaading2(false);
          setValue('profile', data, { shouldValidate: true });
      }
    );
  }

  const submitForm = (data) => {
    props.onChangeTab(2, data);
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className='row'>
        <div className="col-md-6">
          <div className='row'>
            <div className='col-md-12'>
              <label htmlFor="proof"> Front Of Id </label>
              <div id="proof" className='prrof' onClick={handleUploadClick}>

                {imagesrc !== '' && <img src={imagesrc} style={{ width: '150px' }} />}

                <div style={{ display: isLoading == true ? 'block' : 'none' }} className="overlay"></div>
                <div style={{ display: isLoading == true ? 'block' : 'none' }} className="loading_wrapper">
                  <div className="loading"></div>
                </div>
                <input type="file" name="file" onChange={(e) => { handleFileChange(e), setIsLoaading(true)}} id='frontfile' style={{ display: 'none' }} />
                {imagesrc === '' &&
                  <>
                    <i className="fa fa-camera" aria-hidden="true" style={{ zIndex: '9' }}></i>
                    <div style={{ zIndex: '9' }}>Upload File</div>
                  </>
                }

              </div>
              {errors.file?.message && <p className='errorMessage'>{errors.file?.message}</p>}
            </div>
          </div>
          <div className='row'>
            <div className='col-12 mb-3'>
              <span style={{ color: 'rgba(0, 20, 42, 0.6)', fontSize: '12px' }}>
                Ensure that the photo and name on your ID (passport, driver's license, or ID card) are clearly visible. Only .jpg/.jpeg/.png images are supported.
              </span>
            </div>
          </div>

        </div>
        <div className="col-md-6">
          <div className='row'>
            <div className='col-md-12'>
              <label htmlFor="proofself"> Picture With Id </label><br />
              <div id="proofself" className='prrof' onClick={picFileUpload}>
                <div style={{ display: isLoading2 == true ? 'block' : 'none' }} className="overlay"></div>
                <div style={{ display: isLoading2 == true ? 'block' : 'none' }} className="loading_wrapper">
                  <div className="loading"></div>
                </div>
                {/* {kyc?.media !== undefined && kyc?.media.length>0 && picproof ==='' &&
                    <img style={{ width: '150px' }} src={'http://localhost:5000/document/'+kyc?.media[1].file } />
                } */}
                {picproof !== '' && <img src={picproof} style={{ width: '150px' }} />}
                <input type="file" name='profile' ref={backRef} onChange={(e) => { handleBackFileChange(e),  setIsLoaading2(true) }} id='photofile' accept="" style={{ display: 'none' }} />
                {picproof === '' &&
                  <>
                    <i className="fa fa-camera" aria-hidden="true" style={{ zIndex: '9' }}></i>
                    <div style={{ zIndex: '9' }}>Upload File</div>
                  </>

                }
              </div>
              {errors.profile?.message && <p className='errorMessage'>{errors.profile?.message}</p>}
            </div>
          </div>
          <div className='row'>
            <div className='col-12 mb-3'>
              <span style={{ color: 'rgba(0, 20, 42, 0.6)', fontSize: '12px' }}>
                Upload a picture of you holding the front side of your ID.
              </span>
            </div>
          </div>

        </div>
        <div className='row mb-3' style={{ justifyContent: 'center' }}>
          <div className='col-md-4 generalBtn' style={{ textAlign: 'center' }}>
            <button className="kycSubmit-btn" onClick={() => props.onChangePreviousTab(0)}> Back </button>
          </div>
          <div className='col-md-4' style={{ textAlign: 'center' }}>
            <button className="kycSubmit-btn" type='submit'> Submit </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormExample;