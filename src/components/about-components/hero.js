import React from 'react'

const Hero = () => {
  return (
    <section className="about_hero">
        <div className="tmb-container">
            <div className="sec_text">
            <h3 className="sec_title">Next Level</h3>
            <h3 className="sec_main_heading"> Reliability,<br /> Products & <br /> Opportunities</h3>
            </div>
            <div className="sec_img">
                <img src={require('../../assets/images/about-us/about-hero-responsive.png')} />
            </div>
        </div>
    </section>
  )
}

export default Hero;