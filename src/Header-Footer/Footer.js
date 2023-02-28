import footerlogo from '../assets/banner/footer-logo.svg';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

import facebook from '../assets/mediaIcon/facebook.svg';
import twitter from '../assets/mediaIcon/twitter.svg';
import youtube from '../assets/mediaIcon/youtube.svg';
import telegram from '../assets/mediaIcon/telegram.svg';
import instagram from '../assets/mediaIcon/instagram.svg';
import linkedin from '../assets/mediaIcon/linkedin.svg';
import tiktok from '../assets/mediaIcon/tiktok.svg';

const Footer = () => {

  return (
    <>
      <footer className="sec__footer sec__footer-large">
        <div className="container">
          <div className="footer-large">
            <div className="footer-left">
              <div className="footer-left-item">
                <div className="footer-left-item__logo">
                  <div>
                    {/* <img src={footerlogo} alt="logo" /> */}
                  </div>
                </div>
                <div className="footer-left-item__social">
                  <div className="footer-left-item__social__item">
                    <Link to="#" rel="nofollow noopener noreferrer" >
                      <div>
                        <img src={facebook} alt="" />
                      </div>
                    </Link> 
                  </div>
                  <div className="footer-left-item__social__item">
                    <Link to="#" rel="nofollow noopener noreferrer" >
                      <div>
                        <img src={twitter} alt="" />
                      </div>
                    </Link> 
                  </div>
                  <div className="footer-left-item__social__item">
                    <Link to="#" rel="nofollow noopener noreferrer" >
                      <div>
                        <img src={instagram} alt="" />
                      </div>
                    </Link> 
                  </div>
                  <div className="footer-left-item__social__item">
                    <Link to="#" rel="nofollow noopener noreferrer" >
                      <div>
                        <img src={youtube} alt="" />
                      </div>
                    </Link> 
                  </div>
                  <div className="footer-left-item__social__item">
                    <Link to="#" rel="nofollow noopener noreferrer" >
                      <div>
                        <img src={linkedin} alt="" />
                      </div>
                    </Link> 
                  </div>
                  <div className="footer-left-item__social__item">
                    <Link to="#" rel="nofollow noopener noreferrer" >
                      <div>
                        <img src={telegram} alt="" />
                      </div>
                    </Link> 
                  </div>
                  <div className="footer-left-item__social__item">
                    <Link to="#" rel="nofollow noopener noreferrer" >
                      <div>
                        <img src={tiktok} alt="" />
                      </div>
                    </Link> 
                  </div>
                  
                </div>
              </div>
            </div>

            <div className="footer-right">
              <div className="footer-about footer-right-item">
                <p className="title">About</p>
                <div className="link-container">
                  <Link to="/about-us" rel="nofollow noopener"  className="footer-right-item__link">About BLC Exchange</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">BLC Exchange Communities</Link> 
                  <Link to="/blog" rel="nofollow noopener"  className="footer-right-item__link">Blog</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Announcements</Link> 
                  <Link to="/risk-disclouser" rel="nofollow noopener"  className="footer-right-item__link">Risk Disclosure</Link> 
                  <Link to="/carrers" rel="nofollow noopener"  className="footer-right-item__link">Careers</Link> 
                </div>
              </div>
              <div className="footer-service footer-right-item">
                <p className="title">Service</p>
                <div className="link-container">
                  <Link to="/p2p/trade/home" rel="nofollow noopener"  className="footer-right-item__link">One-Click Buy</Link> 
                  <Link to="/p2p/trade/p2p" rel="nofollow noopener"  className="footer-right-item__link">P2P Trading (0 Fees)</Link> 
                  {/* <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">VIP Program</Link>  */}
                  <Link to="/service/institutional" rel="nofollow noopener"  className="footer-right-item__link">Institutional Services</Link> 
                  <Link to="/service/announcement" rel="nofollow noopener"  className="footer-right-item__link">Listing Application</Link> 
                  <Link to="/service/taxapi" rel="nofollow noopener"  className="footer-right-item__link">Tax API</Link> 
                </div>
              </div>
              <div className="footer-support footer-right-item">
                <p className="title">Support</p>
                <div className="link-container">
                  <Link to="/feedback" rel="nofollow noopener"  className="footer-right-item__link">User Feedback</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Help Center</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Submit a Request</Link> 
                  <Link to="/learn" rel="nofollow noopener"  className="footer-right-item__link">BLC Exchange Learn</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Trading Fee</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">API</Link> 
                  <Link to="/authenticity" rel="nofollow noopener"  className="footer-right-item__link">Authenticity Check</Link> 
                  <Link to="/p2p-faq" rel="nofollow noopener"  className="footer-right-item__link">P2P FAQ</Link> 
                </div>
              </div>
              <div className="footer-product footer-right-item">
                <p className="title">Product</p>
                <div className="link-container">
                  <Link to="/trading-chart/BNB" rel="nofollow noopener"  className="footer-right-item__link">Trade</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Derivatives</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Earn</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Launchpad</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">NFT</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Charity</Link> 
                </div>
              </div>
            </div>
            <div className="footer-right-dropdown">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>About</Accordion.Header>
                  <Accordion.Body>
                    <div className="link-container">
                      <Link to="/about-us" rel="nofollow noopener"  className="footer-right-item__link">About BLC Exchange</Link> 
                      <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">BLC Exchange Communities</Link> 
                      <Link to="/blog" rel="nofollow noopener"  className="footer-right-item__link">Blog</Link> 
                      <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Announcements</Link> 
                      <Link to="/risk-disclouser" rel="nofollow noopener"  className="footer-right-item__link">Risk Disclosure</Link> 
                      <Link to="/carrers" rel="nofollow noopener"  className="footer-right-item__link">Careers</Link> 
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Service</Accordion.Header>
                  <Accordion.Body>
                  <div className="link-container">
                  <Link to="/p2p/oneclickbuy" rel="nofollow noopener"  className="footer-right-item__link">One-Click Buy</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">P2P Trading (0 Fees)</Link> 
                  {/* <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">VIP Program</Link>  */}
                  <Link to="/service/institutional" rel="nofollow noopener"  className="footer-right-item__link">Institutional Services</Link> 
                  <Link to="/service/announcement" rel="nofollow noopener"  className="footer-right-item__link">Listing Application</Link> 
                  <Link to="/service/taxapi" rel="nofollow noopener"  className="footer-right-item__link">Tax API</Link> 
                </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Support</Accordion.Header>
                  <Accordion.Body>
                  <div className="link-container">
                  <Link to="/feedback" rel="nofollow noopener"  className="footer-right-item__link">User Feedback</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Help Center</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Submit a Request</Link> 
                  <Link to="/learn" rel="nofollow noopener"  className="footer-right-item__link">BLC Exchange Learn</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Trading Fee</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">API</Link> 
                  <Link to="/authenticity" rel="nofollow noopener"  className="footer-right-item__link">Authenticity Check</Link> 
                  <Link to="/p2p-faq" rel="nofollow noopener"  className="footer-right-item__link">P2P FAQ</Link> 
                </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Product</Accordion.Header>
                  <Accordion.Body>
                  <div className="link-container">
                  <Link to="/trading-chart/BNB" rel="nofollow noopener"  className="footer-right-item__link">Trade</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Derivatives</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Earn</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Launchpad</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">NFT</Link> 
                  <Link to="#" rel="nofollow noopener"  className="footer-right-item__link">Charity</Link> 
                </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div> 
      </footer>
      <div className='copy_write_sec'>
          <div className="tmb_container">
            <div className='copy_write_content'>
              <p className='copywrite_text'>© 2018-2023 blcexchange.net All rights reserved.</p>
              <ul className='anchor_wrapper'>
                <li>
                  <Link to="/terms-conditions">Terms of Service</Link> 
                </li>
                <li className='spacer_wrapper'>
                  <div className='spacer'></div>
                </li>
                <li>
                  <Link to="/privacy-ploicy">Privacy Terms</Link> 
                </li>
              </ul>
            </div>
          </div>
        </div>
    </>
  )
}

export default Footer;