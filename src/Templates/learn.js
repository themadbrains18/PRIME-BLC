import React from "react";
import LearnExchange from "../components/footer/learn/learnExchange";

const Learn = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    return (
        <>
            <div className="parent-form-div">
                <LearnExchange />
            </div>
        </>
    )
}
export default Learn;