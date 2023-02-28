import React from "react";
import CarrersPage from "../components/footer/carrers/carrersPage";


const Carrers = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    return (
        <>
            <div className="parent-form-div">
               
                  
                        <CarrersPage/>
                  
                
            </div>


        </>
    )
}
export default Carrers;