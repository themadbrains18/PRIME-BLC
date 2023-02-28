import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpFormSection from "../components/register/formSection";

const SignUp = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    return (
        <>
            <div className="parent-form-div">
                <section className="reset__password__sec">
                    { /* sec content */}
                    <div className="sec__content">
                        <SignUpFormSection showRightPanel={true}/>
                    </div>
                </section>
            </div>


        </>
    )
}
export default SignUp;