import React from 'react'

const FeatureSec = () => {
  return (
    <section className='feature_sec'>
        <div className="tmb_container">
            <div className="sec_content">
                <div className='card_wrapper'>
                    <div className='card'>
                        <div className='card_icon'>
                            <img src={require('../../assets/images/about-us/assets-icon.png')} />
                        </div>
                        <div className='card_text'>
                            <h3 className="card_title">  270 Assets</h3>
                            <p className='card_info'>Spot</p>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card_icon'>
                            <img src={require('../../assets/images/about-us/contracts.png')} />
                        </div>
                        <div className='card_text'>
                            <h3 className="card_title">  200 Contracts</h3>
                            <p className='card_info'>Perpetual & Quarterly Futures</p>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card_icon'>
                            <img src={require('../../assets/images/about-us/profile.png')} />
                        </div>
                        <div className='card_text'>
                            <h3 className="card_title">  10 Million</h3>
                            <p className='card_info'>Users Worldwide</p>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card_icon'>
                            <img src={require('../../assets/images/about-us/all-time.png')} />
                        </div>
                        <div className='card_text'>
                            <h3 className="card_title"> 24/7</h3>
                            <p className='card_info'>Customer Support</p>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card_icon'>
                            <img src={require('../../assets/images/about-us/global.png')} />
                        </div>
                        <div className='card_text'>
                            <h3 className="card_title"> 160</h3>
                            <p className='card_info'>Countries</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default FeatureSec;