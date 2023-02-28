import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormSection from "../components/login/formSection";

const Login = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });

  return (
    <>
      {/* <ToastContainer /> */}
      <div className="parent-form-div">
        <section className="reset__password__sec">
          {/* sec content */}
          <div className="sec__content">
            
            <FormSection showRightPanel={true}></FormSection>

          </div>
        </section>
      </div>

    </>
  )
}

export default Login;