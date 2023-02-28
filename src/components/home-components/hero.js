import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  return (
    <section className="banner">
        <div className="Spotlight_spotlight spotligh_custom">
          <div className="Custom_customSpotlight" >
            <div className="Wrapper_wrapper Custom_content">
              <div className="Custom_sloganModule custom-spotlight-slogan">
                <p className="Custom_sloganTitle custom-spotlight-slogan-title">BLC Exchange</p>
                <p className="Custom_sloganDescription custom-spotlight-slogan-description">Ge4r Up for a Larger $1.2M Prize Pool!</p>
              </div>
              <div className="Custom_buttonModule custom-spotlight-button">
                <a className="LinkButton_spotlightLinkButton" onClick={()=>navigate('/sign-up')}>Join Now<span className="LinkButton_icon__Qz4cu"></span>
                </a>
              </div>
              <div className="Custom_registerDownloadGroup custom-spotlight-register-download">
                <div className="Custom_registerModule">
                  <div className="Register_spotlightRegister">
                    <div className="Register_left">
                      <input type="text" className="" placeholder="Email / Phone number"  onChange={(e)=>setUserName(e.target.value)}  />
                    </div>
                    <div className="Register_right" onClick={()=>{ navigate(`/sign-up?${userName.includes('@')?'email='+userName:'phone='+ userName}`)}}>Sign Up Now</div>
                  </div>
                </div>
                <div className="Custom_downloadModule">
                  {/* <div className="Download_downloadList">
                    <div className="Download_downloadItem" data-name="apple">
                      <a className="Download_button" title="apple" href=""></a>
                    </div>
                    <div className="Download_downloadItem" data-name="google">
                      <a className="Download_button" title="google" href=""></a>
                    </div>
                    
                  </div> */}
                </div>
              </div>
            </div>
            <div className="spotlight_img">
              <img src={require('../../assets/banner/image.png')} alt="error" />
            </div>
          </div>
        </div>
      </section>
  )
}

export default HeroSection;