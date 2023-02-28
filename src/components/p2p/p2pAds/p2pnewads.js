import React, { useRef, useEffect } from "react";
import { useDispatch} from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSavedPm } from "../../../Actions/paymentmethodsAction";

import CreatePost from "./p2pnewpost";

const P2PNewAds = ({ showDrp, setshowDrp }) => {

  const coinRef = new useRef();
  const currencyRef = new useRef();
  const typeRef = new useRef();
  const paymentRef = new useRef();
  const dispatch = new useDispatch();

  useEffect(() => {
    getuserPaymentList();
    function handleClick(e) {
      if (coinRef.current !== null && currencyRef.curent !== null) {
        if ((!coinRef.current.contains(e.target.parentNode.parentNode.parentNode) === true && !coinRef.current.contains(e.target.parentNode) === true) && (!typeRef.current.contains(e.target.parentNode.parentNode.parentNode) === true && !typeRef.current.contains(e.target.parentNode) === true) && (!currencyRef.current.contains(e.target.parentNode.parentNode.parentNode) === true && !currencyRef.current.contains(e.target.parentNode) === true)) {
          setActive(0)
        }
      }
      if (paymentRef.current !== null) {
        if ((!paymentRef.current.contains(e.target.parentNode.parentNode.parentNode) === true && !paymentRef.current.contains(e.target.parentNode) === true)) {
          setPayddActive(0)
        }
      }
    }

  }, []);

  const getuserPaymentList = async () => {
    let data = await dispatch(getSavedPm());
  }

  return (
    <>
      <ToastContainer />

      <div className='p2p__myads__main'>
        <div className='p2p__ads__tmb_container'>
          <div className="p2p__order__overview">
            <div className='p2pcreate'>
              <CreatePost showDrp={showDrp} setshowDrp={setshowDrp} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default P2PNewAds;