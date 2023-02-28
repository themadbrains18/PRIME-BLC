import React from 'react'

const FoundersStory = () => {
  return (
    <section className='founders_sec'>
        <div className='tmb_container'>
            <div className='sec_content'>
                <div className='sec_content_inner'>
                    <div className='sec_text'>
                        <h3 className='sec_main_heading'>Our <span>Founder's</span> Story</h3>
                        <img className='founder_img' src={require('../../assets/images/about-us/founder-img-res.png')} alt='error' />
                        <p className='sec_info'>With a wealth of experience as a forex broker, Ben Zhou became intrigued with tokenomics and the world of crypto in 2016. Seeing that it was brimming with potential yet full of gaps, he followed his passion, combining DeFi with TradFi to build a next-level exchange.<br />Get up close and personal with Ben on Twitter and our monthly AMA sessions!</p>
                        <div className='founders_cta_wrapper'>
                            <a href="#" className='suite_cta'><span>Find Out More</span><img src={require('../../assets/images/about-us/right-icon.png')} alt="error" /></a>
                        </div>
                    </div>
                    <div className='sec_img'>
                        <img src={require('../../assets/images/about-us/founder.png')} alt='error' />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default FoundersStory;