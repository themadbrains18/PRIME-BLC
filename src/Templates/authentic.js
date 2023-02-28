import React from "react";
import Authenticity from "../components/footer/authenticity/authenticity";


const Authentic = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    return (
        <>
            <div className="parent-form-div">
               
                  
                        <Authenticity/>
                  
                
            </div>


        </>
    )
}
export default Authentic;