import React, { useState } from "react";
import TermsCondition from "../components/footer/conditions/termsCondition";


const Conditions = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    return (
        <>
            <div className="parent-form-div">
               
                  
                        <TermsCondition/>
                  
                
            </div>


        </>
    )
}
export default Conditions;