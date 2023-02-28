import React from "react";
import BannerImage from './images/feedbackbanner.png'
import './feedback.css'
const FeedbackForm = () => {

    return (
        <>
            <section className='feedback'>

                {/* <div className='banner-inner'> */}
                    <div className='feedback-image d-flex  flex-column'>
                        {/* <img src={BannerImage} alt='feedback'></img> */}
                        {/* <div className="header-title-box" > */}
                        <h1 className="header-title">We Value Your Feedback</h1>
                        <h2 className="header-sub-title" >Your Concerns, Our Priority.</h2>
                    </div>
                    {/* </div> */}
                    
                {/* </div> */}
                <div className="feedback-main">
                    <div className="intro" >
                        <em className="icon-light-outline"></em>
                        <span >Have an idea to bring BLC Exchange to the next level? We're always looking for ways to improve and your feedback is invaluable.
                            Tell us what you think, we can't wait to hear from you!</span>
                    </div>
                    <div className="feedback-box-wrap">
                        <div className="feedback-box" >
                            <div className="recommend-score" >
                                <div className="recommend-score-title" >
                                    How likely are you to recommend BLC Exchange to your friends or colleagues?
                                    <span style={{ color: 'red' }}>  *</span>
                                </div>
                                <div className="score-wrap" >
                                    <div className="score-inner"  >
                                        <div className="recommend-score-likely"  >0 - Not likely at all</div>
                                        <div className="score-box"  ><div className="score ">
                                            0
                                        </div><div className="score"  >
                                                1
                                            </div><div className="score"  >
                                                2
                                            </div><div className="score "  >
                                                3
                                            </div><div className="score "  >
                                                4
                                            </div><div className="score "  >
                                                5
                                            </div><div className="score "  >
                                                6
                                            </div><div className="score "  >
                                                7
                                            </div><div className="score "  >
                                                8
                                            </div><div className="score "  >
                                                9
                                            </div><div className="score "  >
                                                10
                                            </div></div> 
                                            <div className="recommend-score-likely text-right" >
                                            10 - Extremely likely
                                        </div>
                                        <div className="recommend-score-likely-text" >
                                            <span>Not likely at all</span>
                                            <span >Neutral</span>
                                            <span >Extremely likely</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="recommend-share"><div className="recommend-score-title" >
                                Please share the reason for your rating. Tell us what you love about BLC Exchange or what we can be better at.
                                <span style={{
                                    color: 'red'
                                }}>  *</span></div>
                                <div className="input-wrap">
                                    <textarea placeholder="Leave your comments here." ></textarea>
                                    <div className="word-count" >
                                        0 / 500
                                    </div>
                                </div>
                            </div>
                            <div className="recommend-upload" >
                                <div className="upload-box">
                                    <div className="upload-btn-wrap" >
                                        <div className="upload-btn" >
                                            <div className="input-file" >
                                                <input type="file" accept=".png, .jpg, .jpeg" style={{ display: 'none' }} /></div>
                                            <em className="icon-upload-outline" ></em>
                                            Upload
                                        </div>
                                        {/* <div ><div> */}
                                            <span className="upload-tips" >Upload any attachments you have (Optional). Supported formats: jpg, jpeg, png. Max file size: 5MB</span>
                                         
                                        {/* </div>
                                        </div> */}
                                    </div>

                                </div>

                            </div>
                            <div className="submit-btn" ><button className="submit">Submit</button></div>
                            
                        </div>
                    </div>
                </div>
                <div className="start-trading" >
                                <div className="start-trading-inner">
                                    <div className="content">
                                        Start Trading Now
                                    </div> <button className="start-btn">
                                        Trade Now
                                    </button>
                                </div>
                            </div>
            </section>


        </>
    );
};
export default FeedbackForm;
