import React from 'react'
import "./authenticity.css"
function Authenticity() {
    return (
        <>
            <section className='authenticity'>
                <div className="auth_banner">
                <div className="container">
                    <div className='auth_box d-flex flex-column justify-content-center'>
                        <h2 className='text-white  fs-1 text-center'>BLC Exchange Authenticity Check</h2>
                        <div className='fs-5
                         text-white text-center'>
                        <p>
                        BLC Exchange does not tolerate illegal practices of any nature.

                        </p>

                        <p>
                            Kindly check the authenticity of your BLC Exchange sources (e.g. telephone numbers, emails and URLs) in the search bar below.
                        </p>
                        </div>
                        

                    </div>
                   
                </div>
                </div>
                <div className="py-5">

                <div className="auth-register-ctn">
                            <input contenteditable="true" className="auth-register-ctn-input" placeholder="Please Enter the Full Details " />
                            <a className="blog-button auth-register-ctn-button" >Search</a>
                        </div>
                </div>
            </section>

        </>
    )
}

export default Authenticity
