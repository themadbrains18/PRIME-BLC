import './account.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import avtar from './images/profileavtar.png'
import viplevel from './images/vip_level.png'
import profile from './images/profile.png'
import identity from './images/identity.png'
import 'bootstrap/dist/css/bootstrap.css';
import PasswordModal from './sections/passwordModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailModal from './sections/emailModal';
import MobileModal from './sections/mobileModal';
import GoogleAuthModal from './sections/googleAuthModal';

const AccountSecurity = () => {

  
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();

  return (
    <div className='account__security__info'>
      <ToastContainer />
      <div className="container">
        <div className='account__security__container'>
          <div className="row">
            <div className="col-md-12 account__title__container">
              <span className="account_security_title">Account Info</span>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div className='profile__container'>
                <div className='level-container'>
                  <div className='uid__security'>
                    <section>
                      <img className='avatar-img' src={avtar}></img>
                      <div>
                        <div className="nickName-edit">
                          <span className="nickname">{users.username}</span>
                          <span className="vip-level">
                            <img src={viplevel} alt="" />
                          </span>
                          <span className="edit-icon">
                            <span role="img" tabIndex="-1" className="anticon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M1.09594 2.26256C1.42413 1.93437 1.86925 1.75 2.33337 1.75H6.41671C6.73887 1.75 7.00004 2.01117 7.00004 2.33333C7.00004 2.6555 6.73887 2.91667 6.41671 2.91667H2.33337C2.17866 2.91667 2.03029 2.97812 1.9209 3.08752C1.8115 3.19692 1.75004 3.34529 1.75004 3.5V11.6667C1.75004 11.8214 1.8115 11.9697 1.9209 12.0791C2.03029 12.1885 2.17866 12.25 2.33337 12.25H10.5C10.6548 12.25 10.8031 12.1885 10.9125 12.0791C11.0219 11.9697 11.0834 11.8214 11.0834 11.6667V7.58333C11.0834 7.26117 11.3445 7 11.6667 7C11.9889 7 12.25 7.26117 12.25 7.58333V11.6667C12.25 12.1308 12.0657 12.5759 11.7375 12.9041C11.4093 13.2323 10.9642 13.4167 10.5 13.4167H2.33337C1.86925 13.4167 1.42413 13.2323 1.09594 12.9041C0.767748 12.5759 0.583374 12.1308 0.583374 11.6667V3.5C0.583374 3.03587 0.767748 2.59075 1.09594 2.26256Z" fill="#81858C"></path>
                              <path fillRule="evenodd" clipRule="evenodd" d="M11.6667 1.67924C11.4932 1.67924 11.3269 1.74815 11.2042 1.87082L5.77678 7.29824L5.46843 8.53163L6.70182 8.22328L12.1292 2.79586C12.2519 2.6732 12.3208 2.50682 12.3208 2.33334C12.3208 2.15986 12.2519 1.99349 12.1292 1.87082C12.0066 1.74815 11.8402 1.67924 11.6667 1.67924ZM10.3792 1.04586C10.7207 0.704404 11.1838 0.512573 11.6667 0.512573C12.1496 0.512573 12.6127 0.704404 12.9542 1.04586C13.2957 1.38733 13.4875 1.85044 13.4875 2.33334C13.4875 2.81624 13.2957 3.27936 12.9542 3.62082L7.41253 9.16249C7.33777 9.23725 7.2441 9.29029 7.14153 9.31593L4.8082 9.89926C4.60941 9.94896 4.39913 9.89071 4.25424 9.74582C4.10935 9.60093 4.05111 9.39065 4.1008 9.19187L4.68414 6.85853C4.70978 6.75596 4.76281 6.66229 4.83757 6.58753L10.3792 1.04586Z" fill="#81858C"></path>
                            </svg>
                            </span>
                          </span>
                        </div>
                        <div className="uid-copy">
                          <span className="uid">UID:</span>
                          <div className="ant-typography">{users.id}
                            <div role="button" tabIndex="0" className="ant-typography-copy" aria-label="Copy" style={{ border: '0px', background: 'transparent', padding: '0px', lineHeight: 'inherit', display: 'inline-block' }}>
                              <span role="img" className="anticon">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M10.5003 8.74999V2.91666C10.5003 2.45253 10.316 2.00741 9.98776 1.67922C9.65957 1.35103 9.21446 1.16666 8.75033 1.16666H2.91699C2.45286 1.16666 2.00774 1.35103 1.67956 1.67922C1.35137 2.00741 1.16699 2.45253 1.16699 2.91666V8.74999C1.16699 9.21412 1.35137 9.65924 1.67956 9.98743C2.00774 10.3156 2.45286 10.5 2.91699 10.5H8.75033C9.21446 10.5 9.65957 10.3156 9.98776 9.98743C10.316 9.65924 10.5003 9.21412 10.5003 8.74999ZM2.33366 8.74999V2.91666C2.33366 2.76195 2.39512 2.61357 2.50451 2.50418C2.61391 2.39478 2.76228 2.33332 2.91699 2.33332H8.75033C8.90504 2.33332 9.05341 2.39478 9.16281 2.50418C9.2722 2.61357 9.33366 2.76195 9.33366 2.91666V8.74999C9.33366 8.9047 9.2722 9.05307 9.16281 9.16247C9.05341 9.27187 8.90504 9.33332 8.75033 9.33332H2.91699C2.76228 9.33332 2.61391 9.27187 2.50451 9.16247C2.39512 9.05307 2.33366 8.9047 2.33366 8.74999ZM12.2503 3.49999C12.0956 3.49999 11.9472 3.56145 11.8378 3.67084C11.7285 3.78024 11.667 3.92861 11.667 4.08332V9.91666C11.667 10.3808 11.4826 10.8259 11.1544 11.1541C10.8262 11.4823 10.3811 11.6667 9.91699 11.6667H4.08366C3.92895 11.6667 3.78058 11.7281 3.67118 11.8375C3.56178 11.9469 3.50033 12.0953 3.50033 12.25C3.50033 12.4047 3.56178 12.5531 3.67118 12.6625C3.78058 12.7719 3.92895 12.8333 4.08366 12.8333H9.91699C10.6905 12.8333 11.4324 12.526 11.9794 11.9791C12.5264 11.4321 12.8337 10.6902 12.8337 9.91666V4.08332C12.8337 3.92861 12.7722 3.78024 12.6628 3.67084C12.5534 3.56145 12.405 3.49999 12.2503 3.49999Z" fill="#81858C">
                                  </path>
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <div className='security-level-show level-middle'>
                      <span className='security-level-text'>Security Level:</span>
                      <span className="security-level low-text">  Medium</span>
                      <span className="security-level-box"></span>
                      <span className="security-level-box"></span>
                      <span className="security-level-box"></span>
                    </div>
                  </div>
                </div>
                <div className='last-login-record'>
                  <span className='last-login-time'>
                    Last login time
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div className="account-item-container">
                <div className="bylist-item" >
                  <div className="accountInfo-auth-container">
                    <div className="accountInfo-auth-container-column">
                      <img src={profile} alt="avatar set icon" />Profile Picture</div>
                    <div className="accountInfo-auth-container-content">
                      <div>
                        <span role="img" aria-label="exclamation-circle" className="anticon anticon-exclamation-circle" style={{ color: 'rgb(173, 177, 184)', fontSize: '12px' }}>
                          <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                          </svg>
                        </span>
                        <span className="not-set-text">Not Setup</span>
                      </div>
                      <div className="accountInfo-auth-container-content-last">
                        <span className="not-set-text text-special-color">Please upload a profile picture, or you can buy one on
                          <span>
                            <a href="" style={{ color: 'rgb(247, 166, 0)' }}>&nbsp;BLC Exchange NFT Marketplace.&nbsp;</a>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="accountInfo-auth-container-operation">
                      <button type="button" className={`ant-btn ant-btn-primary ant-btn-background-ghost bybit-ghost ${users.secutiryFA === 'disable' ? 'active' : 'active'}`}><span>Settings</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EmailModal />
          <MobileModal />

          <div className='row'>
            <div className='col-md-12'>
              <div className="account-item-container">
                <div className="bylist-item" >
                  <div className="accountInfo-auth-container">
                    <div className="accountInfo-auth-container-column">
                      <img src={identity} alt="avatar set icon" />Identity Verification</div>
                    <div className="accountInfo-auth-container-content">
                      <div>
                        <span role="img" aria-label="exclamation-circle" className="anticon anticon-exclamation-circle" style={{ color: users.kycStatus === true ? 'rgb(32, 178, 108)' : 'rgb(173, 177, 184)', fontSize: '12px' }}>
                          {users.kycStatus === true ? <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg> :

                            <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                            </svg>
                          }
                        </span>
                        <span className={users.kycStatus === true ? 'set-text' : "not-set-text"} > {users.kycStatus === true ? 'Verified' : 'Unverified'} </span>
                      </div>
                      <div className="accountInfo-auth-container-content-last">
                        <span className="not-set-text text-special-color">Complete verification to increase daily withdrawal limit

                        </span>
                      </div>
                    </div>
                    <div className="accountInfo-auth-container-operation">
                      <button type="button" className={`ant-btn ant-btn-primary ant-btn-background-ghost bybit-ghost ${users.kycStatus === false ? 'active' : 'inactive'}`} onClick={() => navigate('/vendor/profile/kyc-verification')}><span>Verify Now</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PasswordModal />
          <GoogleAuthModal users={users} />
          
        </div>

      </div>
    </div>

  )
}

export default AccountSecurity;