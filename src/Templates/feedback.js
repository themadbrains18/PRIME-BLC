import React, { useState } from "react";
import FeedbackForm from "../components/footer/feedback/feedbackForm";


const Conditions = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    return (
        <>
            <div className="parent-form-div">
                <FeedbackForm />
            </div>


        </>
    )
}
export default Conditions;