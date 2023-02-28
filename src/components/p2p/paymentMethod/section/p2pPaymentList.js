import { useState } from "react";
import AddPAymentSetting from "./addPaymentSetting";
const P2PPaymentList = () => {

  const [open, setOpen] = useState(false);

  const hidePopup=()=>{
    setOpen(false)
  }
  const obj={};
  return (
    <div className="p2p__paymentListing__overview">
      <div className="p2p__profile__main">
        <div className="p2p__profile__info">
          <div className="p2p__profile__name">
            <div className="name">Payment Method</div>
            <div className="user__verification__horizontal">
              <span>For security purposes, please use your registered account for the transaction. Up to three registered accounts will be shown to the counterparty.</span>
            </div>
          </div>
        </div>
        <div className="profile__notification">
          <button type="button"><span className="by-button__content" onClick={()=>setOpen(true)}>+ Add New</span></button>
        </div>
      </div>
      <div className="fiat-divider fiat-divider--horizontal"></div>
      <div className="p2p-profile__wrapper p_40">
        <AddPAymentSetting open={open} hidePopup={hidePopup} value={obj} loadField={obj} pmId={''} pmName={''}/>
      </div>
    </div>
  )
}

export default P2PPaymentList;