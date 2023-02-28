import "../trading.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPmList } from "../../../../Actions/paymentmethodsAction";

const AllPaymentMethods = (props) => {
  const dispatch = useDispatch()
  const pmlist = useSelector((state) => state.pmlist);

  useEffect(() => {
    dispatch(getPmList())
  }, [])

  let paymentMethods = pmlist.result;
  const selectedPaymentReturn = (item) => {
    props.selectPayment(item)
  }
  return (
    <div className="coin_list_dropdown">
      <div className="coin_list_inner">
        <div className="head_wrapper">
          <div className="list_head">
            <input
              type="search"
              className="search_feild"
              onClick={(e) => e.stopPropagation()}
            />
            <i className="fa fa-search"></i>
          </div>
        </div>
        <ul className="content_wrapper">
          {paymentMethods !== undefined && paymentMethods.map((item, index) => {
            return <li key={"payment" + index} className="list_content" onClick={() => { selectedPaymentReturn(item.payment_method) }}>
              <div className="list_text">
                <p className="list_item_dull">{item.payment_method}</p>
              </div>

            </li>
          })}
        </ul>
      </div>

    </div>
  );
};

export default AllPaymentMethods;
