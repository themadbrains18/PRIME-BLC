import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetail } from "../../../../../Actions/orderAction";
import BuyerComponent from "./buyerComponent";
import SellerComponent from "./sellerComponent";
import { BUYORDER } from "../../../../../Constants/Index";

const OrderDetailComponent = () => {
  let { orderid } = useParams();
  const dispatch = new useDispatch();
  const users = useSelector((state) => state.users);
  const [order, setOrder] = useState();
  const [orderDetail, setorderDetail] = useState();

  useEffect(() => {
    getOrderDetailById();
    
  }, []);

  const getOrderDetailById = async () => {
    let data = await dispatch(getOrderDetail(orderid));
    if (data.status === 200) {
      setorderDetail(data.data.data);
      setOrder(data.data.data[0]);
      await dispatch({ type: BUYORDER, payload: data })
    }
  }

  return (
    <>
      {orderDetail !== undefined && orderDetail.length > 0 &&
        <>
          {order?.orderData.buy_userid === users.id ? <BuyerComponent /> : <SellerComponent />}
        </>
      }

    </>
  )
}

export default OrderDetailComponent;