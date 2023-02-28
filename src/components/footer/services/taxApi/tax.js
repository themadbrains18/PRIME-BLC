import HeroSection from "../../../home-components/hero";
import './tax.css';
import unlogin from '../assets/img/unlogin.svg'
import arrowDown from '../assets/img/arrowDown.svg'

const TaxAPI = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  const openDescription=(e)=>{
    if(e.target.classList.contains('index_item')){
      if(e.target.classList.contains('index_open')){
        e.target.classList.remove('index_open')
      }
      else{
        e.target.classList.add('index_open')
      }
      
    }
    else if(e.target.parentNode.classList.contains('index_item')){
      if(e.target.parentNode.classList.contains('index_open')){
        e.target.parentNode.classList.remove('index_open')
      }
      else{
        e.target.parentNode.classList.add('index_open')
      }
      
    }
    else if(e.target.parentNode.parentNode.classList.contains('index_item') ){
      if(e.target.parentNode.parentNode.classList.contains('index_open')){
        e.target.parentNode.parentNode.classList.remove('index_open')
      }
      else{
        e.target.parentNode.parentNode.classList.add('index_open')
      }
      
    }
  }

  return (<>
    <HeroSection />
    <div className="service-tax">
      <div className="container">
        <div className="tax-api">
          <div className="step">
            <div className="wrapper">
              <p className="title">How to Start Crypto Tax Compilation</p>
              <div className="step-containers">
                <div className="index_item">
                  <p className="index_item-title">1</p>
                  <p className="index_item-description">Set up your Google 2FA. Retrieve your transactions via API and enter a name for the API key</p>
                  <div className="index_line">
                    <i></i><span></span>
                  </div>
                </div>
                <div className="index_item">
                  <p className="index_item-title">2</p>
                  <p className="index_item-description">Select your preferred tax partners</p>
                  <div className="index_line">
                    <i></i><span></span>
                  </div>
                </div>
                <div className="index_item">
                  <p className="index_item-title">3</p>
                  <p className="index_item-description">Set up your ready-to-file tax report in a matter of minutes!</p>
                  <div className="index_line">
                    <i></i><span></span>
                  </div>
                </div>
              </div>
              <div className="index_button" data-spm-even="TaxLandingpageClick" data-spm-data="{&quot;is_VIP&quot;:false,&quot;button_name&quot;:&quot;Create Tax API&quot;,&quot;button_id&quot;:&quot;create_tax_api&quot;,&quot;taxpartner_name&quot;:&quot;na&quot;}" data-cy="create-tax-api-button">Create Tax API</div>
            </div>
          </div>
          <div className="tax-partners">
            <div className="wrapper">
              <p className="title">Our Tax Partners</p>
              <p className="description">Connect with any of our tax partners with your wallet, blockchain or service for portfolio tracking and calculating crypto taxes.</p>
              <div className="partners-containers unlogin">
                <div className="unlogin-pannel">
                  <img src={unlogin} alt="unlogin" />
                  <p><span className="index_login" data-spm-even="TaxLandingpageClick" data-spm-data="{&quot;is_VIP&quot;:false,&quot;button_name&quot;:&quot;Log in&quot;,&quot;button_id&quot;:&quot;log_in&quot;,&quot;taxpartner_name&quot;:&quot;na&quot;}" data-cy="login-button">Log in to view more!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="faq">
            <div className="wrapper">
              <p className="title">Frequently Asked Questions (FAQ)</p>
              <div className="faq-containers">
                <div className="index_item index_open" onClick={(e)=>openDescription(e)}>
                  <div className="item-title">
                    Do I have to pay taxes when I trade cryptocurrency?
                    <img src={arrowDown} alt="arrow"></img>
                  </div>
                  <p className="item-description">
                    It depends on your country's taxation requirements. For more information, please refer to your respective country 's 2022 tax guide and update on cryptocurrency.
                  </p>
                </div>
                <div className="index_item " onClick={(e)=>openDescription(e)}>
                  <div className="item-title">
                    Do I have to pay taxes when I trade cryptocurrency?
                    <img src={arrowDown} alt="arrow"></img>
                  </div>
                  <p className="item-description">
                    It depends on your country's taxation requirements. For more information, please refer to your respective country 's 2022 tax guide and update on cryptocurrency.
                  </p>
                </div>
                <div className="index_item" onClick={(e)=>openDescription(e)}>
                  <div className="item-title">
                    Do I have to pay taxes when I trade cryptocurrency?
                    <img src={arrowDown} alt="arrow"></img>
                  </div>
                  <p className="item-description">
                    It depends on your country's taxation requirements. For more information, please refer to your respective country 's 2022 tax guide and update on cryptocurrency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default TaxAPI;