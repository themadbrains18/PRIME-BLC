
import OrderListing from "./section/orderListing";
import './order.css';

const P2POrders = () => {
  return (
    <div className="payment__method__main">
      <div className="p2p__profile_tmb__container">
        <OrderListing />
      </div>
    </div>
  )
}

export default P2POrders;