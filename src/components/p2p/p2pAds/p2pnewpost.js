import './stepprogress.css';

import StepOne from './section/step1';
import StepTwo from './section/step2';
import StepThree from './section/step3';
import { useState } from 'react';

const CreatePost = ({ showDrp, setshowDrp }) => {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [form1, setForm1] = useState({});
  const [form2, setForm2] = useState({});
  const [totalAmount, setTotalAmount] = useState(0.00);
  const [trnsferId, settrnsferId] = useState('');

  return (
    <>
      <div className='progressStep'>
        <div className='RSPBprogressBarTitle'>
          <div className="RSPBstep step1">
            <div className="accomplished">Set Type & Price</div>
          </div>
          <div className="RSPBstep step2"><div className="accomplished">Set Total Amount & Payment Method</div></div>
          <div className="RSPBstep step3"><div className="accomplished">Set Remarks & Automatic Response</div></div>
        </div>
        <div className='RSPBprogressBar'>
          <div className="RSPBstep step1">
            <div className="indexedStep accomplished">1</div>
          </div>
          <div className="RSPBstep step2"><div className={`indexedStep ${currentStep > 1 ? 'accomplished' : ''}`}>2</div></div>
          <div className="RSPBstep step3"><div className={`indexedStep ${currentStep === 3 ? 'accomplished' : ''}`}>3</div></div>
          <div className="RSPBprogression" style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}></div>
        </div>
      </div>

      {currentStep === 1 &&
        <StepOne showDrp={showDrp} setshowDrp={setshowDrp} setTotalAmount={setTotalAmount} currentStep={currentStep} setCurrentStep={setCurrentStep} setForm1={setForm1} form1={form1} settrnsferId={settrnsferId} />
      }

      {currentStep === 2 &&
        <StepTwo totalAmount={totalAmount} currentStep={currentStep} setCurrentStep={setCurrentStep} setForm2={setForm2} form2={form2} form1={form1} />
      }

      {currentStep === 3 &&
        <StepThree open={open} setOpen={setOpen} currentStep={currentStep} setCurrentStep={setCurrentStep} form1={form1} form2={form2} trnsferId={trnsferId} />
      }

    </>
  )

}

export default CreatePost;