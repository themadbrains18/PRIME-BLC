import P2PProfile from "./section/p2pProfile";
import P2PPaymentList from "./section/p2pPaymentList";
import './payment.css';
const PaymentMethod = () => {
  return (<>
    <div className="payment__method__main">
      <div className="p2p__profile_tmb__container">
        <P2PProfile />
        <P2PPaymentList />
      </div>
    </div>
  </>)
}

export default PaymentMethod;