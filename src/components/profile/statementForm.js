import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { kycRequest } from '../../Actions/p2pAction';
import { sta_Toaster } from '../../Core/toaster';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup
  .object()
  .shape({
    sourcefund: yup.string().required('This field is required'),
    statement: yup.mixed().required('File is required'),
  })
  .required();

function StateForm(props) {

  const [isLoading, setIsLoaading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);

  const dispatch = new useDispatch();
  const [pdfFile, setPdfFile] = useState('');

  const { register, setValue, handleSubmit, formState: { errors }, } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const statementUpload = () => {
    let uploadfile = document.querySelector('#statement');
    uploadfile.click();
  }

  const handleChangeFile = (e) => {
    if (!e.target.files) {
      return;
    }
    let fileType = e.target.files[0].name.split('.')
    if (fileType[fileType.length - 1] === "pdf") {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function (e) {
        setPdfFile(reader.result);
        setIsLoaading(false);
      }.bind(this);
     setIsDisabled(false)
    }
    else {
      setIsDisabled(true)
      sta_Toaster('Please Upload pdf file Only', 'error');
      // console.log("Please upload pdf file")
    }

  }
  const submitForm = async (data) => {
    try {
      setFormSubmitLoading(true);
      let formData = props.formData;
      formData['sourcefund'] = data.sourcefund
      // formData.files.push(data.statement);
      let reqData = new FormData();
      reqData.append('name', formData.name);
      reqData.append('email', formData.email);
      reqData.append('phone', formData.phone);
      reqData.append('country', formData.country);
      reqData.append('telegram', formData.telegram);
      reqData.append('otcfund', formData.otcfund);
      reqData.append('doctype', formData.doctype);
      reqData.append('docnumber', formData.docnumber);
      reqData.append('isDraft', true);
      reqData.append('idfront', formData.idfront);
      reqData.append('idback', formData.idback);
      // console.log(formData.files);
      // (formData.files).map((item) => {
      //   console.log(item);
      //   reqData.append('files', data.statement)
      // });
      reqData.append('files', data.statement)
      reqData.append('sourcefund', formData.sourcefund);
      let response = await dispatch(kycRequest(reqData));
      if (response.status === 200) {
        setFormSubmitLoading(false);
        // props.onFinalFormSubmit(response);
      }
    } catch (error) {
      setFormSubmitLoading(false);

    }

  }

  return (
    <>
      <ToastContainer position="top-right" />
      <form onSubmit={handleSubmit(submitForm)} encType=''>
        <div className='row'>
          <div className='col-12'>
            <div className='row'>
              <div className="col-12">
                <label for="source">Proof of Source of Funds </label><br />
                <input type="text" id="source" name='sourcefund' {...register('sourcefund')} className='form-control kyc-inputType' placeholder="Please Enter Your ID Number" />
                {errors.sourcefund?.message && <p className='errorMessage'>{errors.sourcefund?.message}</p>}
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <label for="proof"> Cash Flow Statement </label>
                <div id="proof" className='prrof' onClick={statementUpload}>
                  <div style={{ display: isLoading == true ? 'block' : 'none' }} className="overlay"></div>
                  <div style={{ display: isLoading == true ? 'block' : 'none' }} className="loading_wrapper">
                    <div className="loading"></div>
                  </div>
                  {pdfFile !== '' && <iframe src={pdfFile} />}
                  <input type="file" id='statement' name='statement' onChange={(e) => { handleChangeFile(e), setValue('statement', e.target.files[0], { shouldValidate: true }), setIsLoaading(true) }} accept="" style={{ display: 'none' }} />
                  {pdfFile === '' &&
                    <>
                      <i className="fa fa-camera" aria-hidden="true" ></i>
                      <div>Upload File</div>
                    </>
                  }
                </div>
                {errors.statement?.message && <p className='errorMessage'>{errors.statement?.message}</p>}
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12' style={{ color: 'rgba(0, 20, 42, 0.6)', fontSize: '12px' }}>
                <span>Ensure that your bank statement includes the last 3 months of transactions and your name, card number, and statement details. Only PDF file are supported.</span>
              </div>
            </div>
            <div className='row' style={{ justifyContent: 'center', paddingTop: '10px' }}>
              <div className='col-md-4 generalBtn' style={{ textAlign: 'center' }}>
                <button className="kycSubmit-btn" onClick={() => props.onChangePreviousTab(1)}> Back </button>
              </div>
              <div className="col-md-4"  >
                <button disabled={isDisabled} type='submit' className="kycSubmit-btn"><i style={{ display: formSubmitLoading === true ? 'block' : 'none' }} className="fa fa-spinner fa-spin"></i> Submit </button>
              </div>

            </div>

          </div>
        </div>
      </form>

    </>

  );
}

export default StateForm;