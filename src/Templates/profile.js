import { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { kycpage } from "../Constants/lang/lang";
import Kyc from "../components/profile/kyc";
import { getKycRequest } from "../Actions/p2pAction";
import AccountSecurity from "../components/profile/accountSecurity";

const Profile = () => {
  window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  });
  let {name} =useParams();
  const navigate = useNavigate();
  if(name === undefined){
    name = 'profile';
  }
  const dispatch = new useDispatch();

  useEffect(() => {
    getUserKyc();
  }, []);

  const getUserKyc = async() => {
    await dispatch(getKycRequest());
  }

  return (
    <>
      <div className="header-2">
        <div className="container-s">
          <ul className="nav">
            <li className="nav-item">
              <a className={name === kycpage['0']['nav']['btn1']['url'] ? "nav-link active" : "nav-link"} onClick={() => navigate('/vendor/profile/'+kycpage['0']['nav']['btn1']['url'])}> {kycpage['0']['nav']['btn1']['en']}  </a>
            </li>

            <li className="nav-item">
              <a className={name === kycpage['0']['nav']['btn3']['url'] ? "nav-link active" : "nav-link"} onClick={() => navigate('/vendor/profile/'+kycpage['0']['nav']['btn3']['url'])}> {kycpage['0']['nav']['btn3']['en']}  </a>

            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"> {kycpage['0']['nav']['btn4']['en']}   </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"> {kycpage['0']['nav']['btn5']['en']}  </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">  {kycpage['0']['nav']['btn6']['en']}  </a>
            </li>
          </ul>
        </div>
      </div>
      {name === kycpage['0']['nav']['btn1']['url'] &&
        <AccountSecurity />
      }
      {name === kycpage['0']['nav']['btn3']['url'] &&
        <Kyc />
      }

    </>
  )

}

export default Profile;