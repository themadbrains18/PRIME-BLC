import React, { useState } from "react";
import Info from "../components/footer/blog/info";
import Articles from "../components/footer/blog/articles";
import Insights from "../components/footer/blog/insights";
import Product from '../components/footer/blog/product';
import Editorials from "../components/footer/blog/editorials";
import Backstage from "../components/footer/blog/backstage";

const SignUp = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    return (
        <>
            <div className="parent-form-div">
                <section className="info-sec">
                    { /* sec content */}
                    <div className="sec__content">
                        <Info/>
                    </div>
                    <div >
                        <Articles/>
                    </div>
                    <div >
                        <Insights/>
                    </div>
                    <div>
                        <Product/>
                    </div>
                    <div>
                        <Backstage/>
                    </div>
                    <div>
                        <Editorials/>
                    </div>
                </section>
            </div>


        </>
    )
}
export default SignUp;