import { React, useEffect, useState } from 'react';
import QRCode from "qrcode";
import { useDispatch, useSelector } from "react-redux";
import { verify2faRequest } from '../../Actions/authAction';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import Cookies from 'universal-cookie';
import { USER_SECRET } from '../../Constants/Index';

const Authentication = ({ userAuth, verified2FA }) => {

    const cookies = new Cookies();
    const [image, setImage] = useState('');
    const [inputValue, setInputValue] = useState('')
    const [toastMessage, setToastMessage] = useState('')
    const [toastbg, setToastbg] = useState('');
    const [show, setShow] = useState(false);

    let secret = userAuth.secret;

    const dispatch = useDispatch();

    const copyCode = () => {
        let copy_2fa_code = document.querySelector(".copy_2fa_code");
        let copiedText = document.querySelector(".copied_text");

        navigator.clipboard.writeText(copy_2fa_code.value);
        copiedText.classList.add("show");
        setTimeout(() => {
            copiedText.classList.remove("show");
        }, 2000);
    }
    const closePopup = () => {
        let popupShow = document.querySelector(".two_faq_auth.show");
        if (popupShow) {
            popupShow.classList.remove("show");
        }
    }
    useEffect(() => {
        let popup = document.querySelector(".two_faq_auth");
        popup.classList.add("show");
        QRCode.toDataURL(secret.otpauth_url, (err, image_data) => {
            setImage(image_data);
        });

    }, []);


    const verifyCode = async () => {
        const token = inputValue;
        console.log("isVerified -->", token, secret);
        let data = await dispatch(verify2faRequest({ secret, token }));
        if (data.status === 200 && data.message === true) {
            setShow(true);
            setToastbg('success');
            setToastMessage('2FA verified successfully');
            dispatch({ type: USER_SECRET, payload: 'enable' })
            verified2FA()
        }
        else {
            setShow(true);
            setToastbg('danger');
            setToastMessage('Google 2FA code not matched');
        }
    };

    return (
        <>
            <section className='two_faq_auth'>
                <ToastContainer position="top-center" className="p-3 toast__container">
                    <Toast onClose={() => setShow(false)} bg={toastbg} delay={3000} autohide show={show} >
                        <Toast.Body style={{ color: toastbg === 'warning' ? '#000' : '#fff' }}>{toastMessage} </Toast.Body>
                    </Toast>
                </ToastContainer>
                <>
                    <div className='two_faq_auth_inner'>
                        <h2 className='popup_heading'>Set up Google Two-Factor Authentication</h2>
                    </div>
                    <div className='two_faq_points'>
                        <div className='two_faq_point_number'>
                            <span>2</span>
                        </div>
                        <div className='two_faq_point_content'>
                            <h5 className='two_faq_point_heading'>Add key phrase into Google Authenticator and remember the key phrase. </h5>
                            <p className='two_faq_point_info'>Google Authenticator can be Downloaded from the app store and play store.Seacrh "Google Authenticator" and proceed to download.</p>
                        </div>
                    </div>
                    <div className='two_faq_points'>
                        <div className='two_faq_point_number'>
                            <span>1</span>
                        </div>
                        <div className='two_faq_point_content'>
                            <h5 className='two_faq_point_heading'>Download Google Authenticator  <span>Android / iOS</span></h5>
                            <p className='two_faq_point_info'>Open Google Authenticator ,scan the QR code below or manually enter th key phrase to activate the verification token.
                                <span>Key phrase is used to recover Google Authenticator in the event of a loss or chanage of device  -  please make sure to keep the key phrase safe before setting up Google Authenticator* </span>
                            </p>
                        </div>
                    </div>
                    <div className='qr_code'>
                        {/* <img src={appDownload} alt="error" /> */}
                        <img src={`${image}`} />
                    </div>
                    <div className='copy_code' onClick={copyCode}>
                        <input type="text" readOnly value={secret.base32} className='copy_2fa_code' />
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_113_2)">
                                <path d="M22.7143 5.14286C23.0714 5.14286 23.375 5.26786 23.625 5.51786C23.875 5.76786 24 6.07143 24 6.42857V22.7143C24 23.0714 23.875 23.375 23.625 23.625C23.375 23.875 23.0714 24 22.7143 24H9.85714C9.5 24 9.19643 23.875 8.94643 23.625C8.69643 23.375 8.57143 23.0714 8.57143 22.7143V18.8571H1.28571C0.928571 18.8571 0.625 18.7321 0.375 18.4821C0.125 18.2321 0 17.9286 0 17.5714V8.57143C0 8.21429 0.0892857 7.82143 0.267857 7.39286C0.446429 6.96429 0.660714 6.625 0.910714 6.375L6.375 0.910714C6.625 0.660714 6.96429 0.446429 7.39286 0.267857C7.82143 0.0892857 8.21429 0 8.57143 0H14.1429C14.5 0 14.8036 0.125 15.0536 0.375C15.3036 0.625 15.4286 0.928571 15.4286 1.28571V5.67857C16.0357 5.32143 16.6071 5.14286 17.1429 5.14286H22.7143ZM15.4286 7.99554L11.4241 12H15.4286V7.99554ZM6.85714 2.85268L2.85268 6.85714H6.85714V2.85268ZM9.48214 11.5179L13.7143 7.28571V1.71429H8.57143V7.28571C8.57143 7.64286 8.44643 7.94643 8.19643 8.19643C7.94643 8.44643 7.64286 8.57143 7.28571 8.57143H1.71429V17.1429H8.57143V13.7143C8.57143 13.3571 8.66071 12.9643 8.83929 12.5357C9.01786 12.1071 9.23214 11.7679 9.48214 11.5179ZM22.2857 22.2857V6.85714H17.1429V12.4286C17.1429 12.7857 17.0179 13.0893 16.7679 13.3393C16.5179 13.5893 16.2143 13.7143 15.8571 13.7143H10.2857V22.2857H22.2857Z" fill="#EB9F12" />
                            </g>
                            <defs>
                                <clipPath id="clip0_113_2">
                                    <rect width={24} height={24} fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </>

                <div className='google_2fac_code'>
                    <form>
                        <div className='code_input_wrapper'>
                            <label>
                                <svg width={22} height={23} viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.6015 9.00444C21.5599 8.77382 21.4385 8.56516 21.2587 8.41487C21.0789 8.26459 20.852 8.18223 20.6177 8.18217H11.1992C11.0679 8.18214 10.9379 8.20798 10.8165 8.25822C10.6952 8.30847 10.5849 8.38212 10.4921 8.47499C10.3992 8.56786 10.3255 8.67811 10.2753 8.79945C10.225 8.92079 10.1992 9.05084 10.1992 9.18217V13.0503C10.1992 13.1817 10.225 13.3117 10.2753 13.4331C10.3255 13.5544 10.3992 13.6647 10.4921 13.7575C10.5849 13.8504 10.6952 13.924 10.8165 13.9743C10.9379 14.0245 11.0679 14.0504 11.1992 14.0503H15.1616C14.8793 14.5269 14.4923 14.933 14.0298 15.2378C13.1847 15.7737 12.1996 16.0469 11.1992 16.023C10.1617 16.0111 9.15432 15.6726 8.32022 15.0554C7.48613 14.4382 6.86776 13.5739 6.553 12.5852L6.55271 12.5835C6.20244 11.5569 6.20244 10.4431 6.55271 9.41653L6.55295 9.41488C6.86793 8.42639 7.48639 7.56228 8.32047 6.94532C9.15455 6.32836 10.1618 5.98992 11.1992 5.97807C11.7757 5.96484 12.349 6.06561 12.8864 6.27459C13.4237 6.48357 13.9145 6.79665 14.3305 7.19584C14.5195 7.3764 14.7716 7.47586 15.0329 7.47294C15.2943 7.47002 15.5441 7.36496 15.729 7.18022L18.5971 4.31205C18.6922 4.21716 18.7671 4.10408 18.8174 3.97957C18.8678 3.85507 18.8925 3.7217 18.8901 3.58742C18.8877 3.45315 18.8583 3.32073 18.8036 3.19808C18.7489 3.07543 18.6701 2.96507 18.5718 2.87358C16.5759 1.00229 13.935 -0.0268562 11.1992 0.000532989C9.15917 -0.00550292 7.158 0.558545 5.42137 1.62907C3.68474 2.6996 2.28174 4.23402 1.37058 6.05931L1.36911 6.06108C0.596637 7.59284 0.195857 9.28502 0.19924 11.0005C0.201673 12.7154 0.602158 14.4062 1.36916 15.94L1.37063 15.9418C2.28179 17.767 3.68478 19.3015 5.4214 20.372C7.15802 21.4425 9.15918 22.0066 11.1992 22.0005C13.8846 22.0685 16.4943 21.1072 18.4939 19.3135L18.4954 19.3122C19.5793 18.2695 20.4333 17.0115 21.0023 15.6193C21.5712 14.2272 21.8427 12.7314 21.7993 11.2281C21.7998 10.4825 21.7336 9.73828 21.6015 9.00444ZM11.1992 2.00053C13.0703 1.98232 14.8972 2.56908 16.4077 3.67338L14.9541 5.12653C13.8518 4.36359 12.5397 3.96224 11.1992 3.97807C9.97546 3.98437 8.77547 4.31666 7.72277 4.94076C6.67007 5.56485 5.8027 6.4582 5.20993 7.52885L4.14072 6.70011L3.55572 6.24644C4.36049 4.94429 5.48571 3.87024 6.82388 3.12689C8.16205 2.38355 9.66847 1.99575 11.1992 2.00053ZM2.67868 13.9039C2.03936 12.0211 2.03936 9.97997 2.67868 8.09721L4.46091 9.47905C4.23304 10.4803 4.23304 11.5199 4.46091 12.5211L2.67868 13.9039ZM11.1992 20.0005C9.66845 20.0053 8.16201 19.6175 6.82382 18.8741C5.48564 18.1307 4.36041 17.0566 3.55564 15.7544L3.93405 15.4609L5.20993 14.4712C5.80244 15.5422 6.66973 16.4358 7.72246 17.0601C8.7752 17.6844 9.97533 18.0168 11.1992 18.023C12.3449 18.0365 13.4775 17.7792 14.505 17.2722L16.1966 18.5855C14.7088 19.5441 12.9688 20.0368 11.1992 20.0005ZM17.7251 17.2398L17.5421 17.0978L16.1648 16.0285C16.887 15.2483 17.3724 14.2787 17.5644 13.233C17.5913 13.0887 17.586 12.9402 17.549 12.7981C17.512 12.656 17.4441 12.5238 17.3502 12.4109C17.2564 12.298 17.1388 12.2072 17.0058 12.1449C16.8729 12.0826 16.7279 12.0503 16.581 12.0504H12.1992V10.1822H19.7481C19.7823 10.5279 19.7993 10.8775 19.7993 11.2281C19.8578 13.4169 19.1209 15.5527 17.7251 17.2398Z" fill="#EB9F12" />
                                </svg>
                                <span>Google 2Fa Code</span>
                            </label>
                            <input type="text" placeholder='Please enter the Google Authentication code..' className='google_code_input' onChange={(e) => setInputValue(e.target.value)} />
                        </div>
                        <button type="button" className='code_submit_cta' onClick={verifyCode}>Confirm</button>
                    </form>
                </div>
                <div className='popup_close' onClick={closePopup}>
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.7118 8.41288C15.6188 8.31915 15.5082 8.24476 15.3864 8.19399C15.2645 8.14322 15.1338 8.11708 15.0018 8.11708C14.8698 8.11708 14.7391 8.14322 14.6172 8.19399C14.4954 8.24476 14.3848 8.31915 14.2918 8.41288L12.0018 10.7129L9.71179 8.41288C9.52348 8.22458 9.26809 8.11879 9.00179 8.11879C8.73549 8.11879 8.48009 8.22458 8.29179 8.41288C8.10348 8.60119 7.9977 8.85658 7.9977 9.12288C7.9977 9.38918 8.10348 9.64458 8.29179 9.83288L10.5918 12.1229L8.29179 14.4129C8.19806 14.5058 8.12367 14.6164 8.0729 14.7383C8.02213 14.8602 7.99599 14.9909 7.99599 15.1229C7.99599 15.2549 8.02213 15.3856 8.0729 15.5075C8.12367 15.6293 8.19806 15.7399 8.29179 15.8329C8.38475 15.9266 8.49535 16.001 8.61721 16.0518C8.73907 16.1025 8.86978 16.1287 9.00179 16.1287C9.1338 16.1287 9.26451 16.1025 9.38636 16.0518C9.50822 16.001 9.61883 15.9266 9.71179 15.8329L12.0018 13.5329L14.2918 15.8329C14.3848 15.9266 14.4954 16.001 14.6172 16.0518C14.7391 16.1025 14.8698 16.1287 15.0018 16.1287C15.1338 16.1287 15.2645 16.1025 15.3864 16.0518C15.5082 16.001 15.6188 15.9266 15.7118 15.8329C15.8055 15.7399 15.8799 15.6293 15.9307 15.5075C15.9814 15.3856 16.0076 15.2549 16.0076 15.1229C16.0076 14.9909 15.9814 14.8602 15.9307 14.7383C15.8799 14.6164 15.8055 14.5058 15.7118 14.4129L13.4118 12.1229L15.7118 9.83288C15.8055 9.73992 15.8799 9.62932 15.9307 9.50746C15.9814 9.3856 16.0076 9.25489 16.0076 9.12288C16.0076 8.99087 15.9814 8.86016 15.9307 8.73831C15.8799 8.61645 15.8055 8.50584 15.7118 8.41288ZM19.0718 5.05288C18.1493 4.09778 17.0459 3.33596 15.8258 2.81187C14.6058 2.28778 13.2936 2.01192 11.9658 2.00038C10.638 1.98884 9.32121 2.24186 8.09225 2.74467C6.86328 3.24747 5.74677 3.99001 4.80784 4.92893C3.86891 5.86786 3.12638 6.98438 2.62357 8.21334C2.12076 9.44231 1.86775 10.7591 1.87928 12.0869C1.89082 13.4147 2.16668 14.7269 2.69077 15.9469C3.21486 17.167 3.97669 18.2704 4.93179 19.1929C5.85426 20.148 6.9577 20.9098 8.17774 21.4339C9.39778 21.958 10.71 22.2338 12.0378 22.2454C13.3656 22.2569 14.6824 22.0039 15.9113 21.5011C17.1403 20.9983 18.2568 20.2558 19.1957 19.3168C20.1347 18.3779 20.8772 17.2614 21.38 16.0324C21.8828 14.8035 22.1358 13.4867 22.1243 12.1589C22.1128 10.8311 21.8369 9.51888 21.3128 8.29884C20.7887 7.0788 20.0269 5.97535 19.0718 5.05288ZM17.6618 17.7829C16.3538 19.0923 14.6323 19.9077 12.7906 20.0902C10.9488 20.2727 9.10079 19.8109 7.56131 18.7837C6.02183 17.7564 4.88615 16.2271 4.34776 14.4564C3.80938 12.6856 3.90159 10.783 4.6087 9.07267C5.31581 7.36231 6.59406 5.95003 8.22568 5.07644C9.8573 4.20286 11.7413 3.92201 13.5568 4.28176C15.3723 4.6415 17.0068 5.61957 18.182 7.04934C19.3572 8.47911 20.0003 10.2721 20.0018 12.1229C20.0054 13.1742 19.8004 14.2157 19.3987 15.1873C18.9971 16.1588 18.4067 17.041 17.6618 17.7829Z" fill="#EB9F12" />
                    </svg>
                </div>
            </section>
            <p className='copied_text'>Copied!</p>
        </>
    )
}

export default Authentication