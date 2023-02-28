import { useState } from "react";
import { useSelector } from "react-redux";
import { kycpage } from "../../Constants/lang/lang";

import img1 from '../../assets/images/withdraw.5cd4ed10.svg';
import img2 from '../../assets/images/contract.86b30107.svg';
import img3 from '../../assets/images/otc.f48afe62.svg';
import kycimage from '../../assets/images/kyc/image/download.svg';
import approvedKycimage from '../../assets/images/kycaproove.svg';
import KycForm from "./kycForm";

const Kyc = (props) => {

    const [isKycForm, setIsKycForm] = useState(false);
    const kyc = useSelector((state) => state.kycs);
    const user = useSelector((state) => state.users);

    const closeKycForm = () => {
        setIsKycForm(false);
    }

    return (
        <>
            {(kyc?.data !== undefined && kyc?.data.userid === undefined || kyc?.data.isDraft === false) ?
                <>
                    {isKycForm === false ?
                        <div className="verification">
                            <div className="container-xl">
                                <div className="ver-header">
                                    <h2 className="ver-title">  {kycpage['0']['h1']['en']}  <span>{user?.kycStatus === true ? 'Verified' : 'Unverified'} </span></h2>
                                    <p> <a className="link">   <i className='fas fa-university'></i>  Switch to Identity Verification </a>  </p>
                                </div>

                                <div className="ver-sub-header">
                                    <h5>  {kycpage['0']['h6']['en']} </h5>
                                    <div className="work">
                                        <p>   Deposit <i className='fas fa-check'></i></p>
                                        <p>   Exchange   <i className='fas fa-check'></i>  </p>
                                        <p>  Margin Trade <i className='fas fa-check'></i> </p>
                                    </div>
                                </div>

                                <p className="card-title" > {kycpage['0']['p1']['en']} </p>
                                <div className="row p-0 m-0">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="card border-0">
                                            <img src={img1} alt="icon image" />
                                            <div className="content">
                                                <p className="title" >{kycpage['0']['box1']['p1']['en']}</p>
                                                <h6 className="h6-1" >  {kycpage['0']['box1']['h1']['en']} </h6>
                                                <h6 className="h6-2" > ({kycpage['0']['box1']['h6']['en']})</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6">
                                        <div className="card border-0">
                                            <img src={img2} alt="icon image" />
                                            <div className="content">
                                                <p className="title" >{kycpage['0']['box2']['p1']['en']} </p>
                                                <h6 className="h6-1" >  {kycpage['0']['box2']['h1']['en']}</h6>
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-12">
                                        <div className="card border-0">
                                            <img src={img3} alt="icon image" />
                                            <div className="content">
                                                <p className="title" >{kycpage['0']['box3']['p1']['en']}</p>
                                                <h6 className="h6-1" >  {kycpage['0']['box3']['h1']['en']} </h6>
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-area">
                                    {/* {kyc?.data.userid === undefined &&  */}
                                    <a className="btn" onClick={() => setIsKycForm(true)}> {kycpage['0']['form']['en']} </a>
                                    {/* } */}
                                </div>
                            </div>
                        </div> : <KycForm closeKycForm={closeKycForm} />
                    }
                </> :
                <div className="verification-2">
                    <div className='container-xl submittedContainer'>
                        {kyc?.data.isVerified === false ?
                            <div className='submittedForm'>
                                <img src={kycimage} />
                                <h1 className='form_h1'>Submitted</h1>
                                <p className='form_p'>We have received your application. The review may take 2 working days. The result will be sent to your bound email.</p>
                            </div> :
                            <div className='submittedForm'>
                                <img src={approvedKycimage} />
                                <h1 className='form_h1'>Approved</h1>
                                <p className='form_p'>Your application has been approved.</p>
                            </div>
                        }

                    </div>
                </div>
            }



        </>

    )
}

export default Kyc;