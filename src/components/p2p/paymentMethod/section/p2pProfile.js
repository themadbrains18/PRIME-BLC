import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrderList } from '../../../../Actions/orderAction';
import { useNavigate } from 'react-router-dom';

const P2PProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  let [orderDetail, setOrderDetail] = useState({
    orderCount: 0,
    orderComplete: 0,
    lastOrders: 0
  });


  const users = useSelector((state) => state.users);
  const orders = useSelector((state) => state.orders);

  useEffect(() => {

    getOrders();

  }, [])

  const getOrders = async () => {
    let data = await dispatch(getAllOrderList());

    if (data.status === 200) {
      let { data: { data: order } } = data;

      if(order === "unauthorized user"){
        navigate('/login');
        return;
      }
      /***  Total no of orders  */
      orderDetail.orderCount = order.filter((item) => {
        return item.orderData.buy_userid === users.id || item.orderData.sell_userid === users.id
      })

      /***  Total % of Completed orders  */
      orderDetail.orderComplete = order.filter((item) => {
        return item.orderData.isComplete === true
      })
      console.log("=======orderDetail.orderComplete",orderDetail.orderComplete);
      if(orderDetail.orderComplete.length > 0){

      orderDetail.orderComplete = ((orderDetail.orderComplete.length) / (orderDetail.orderCount.length)) * 100
      }  
       else{
        orderDetail.orderComplete =0;
       }   
      /*** Order within last 30 days */
      var today = new Date();
      var priorDate = new Date(new Date().setDate(today.getDate() - 30));
      orderDetail.lastOrders = order.filter((item) => {
        return new Date(item.orderData.createdAt) > priorDate;
      })
      setOrderDetail(prevalue => {
        return {
          ...prevalue,
          orderCount: [orderDetail.orderCount.length],
          orderComplete: parseInt(orderDetail.orderComplete),
          lastOrders: [orderDetail.lastOrders.length]
        }
      })
    }
  }


  return (<>
    <div className="p2p__profile__overview">

      <div className="p2p__profile__main">
        <div className="p2p__profile__info">
          <div className="p2p__profile__avatar">
            <img src="" alt=""></img>
          </div>
          <div className="p2p__profile__name">
            <div className="name">Surinder</div>
            <div className="user__verification__horizontal">
              <div>
                <span role="img" aria-label="exclamation-circle" className="anticon anticon-exclamation-circle" style={{ color: users.email !== '' ? 'rgb(32, 178, 108)' : 'rgb(173, 177, 184)', fontSize: '12px', paddingRight: '3px' }}>
                  {users.email !== '' ? <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg> :

                    <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                    </svg>
                  }
                </span>
                <span>Email</span>
              </div>

              <div>
                <span role="img" aria-label="exclamation-circle" className="anticon anticon-exclamation-circle" style={{ color: users.number !== '' ? 'rgb(32, 178, 108)' : 'rgb(173, 177, 184)', fontSize: '12px', paddingRight: '3px' }}>
                  {users.number !== '' ? <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg> :

                    <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                    </svg>
                  }
                </span>
                <span>SMS</span>
              </div>

              <div>
                <span role="img" aria-label="exclamation-circle" className="anticon anticon-exclamation-circle" style={{ color: users.kycStatus === true ? 'rgb(32, 178, 108)' : 'rgb(173, 177, 184)', fontSize: '12px', paddingRight: '3px' }}>
                  {users.kycStatus === true ? <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg> :

                    <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                    </svg>
                  }
                </span>
                <span>Identity Verification</span>
              </div>
              {/* <div>
                <span role="img" aria-label="exclamation-circle" className="anticon anticon-exclamation-circle" style={{ color: users.kycStatus === true ? 'rgb(32, 178, 108)' : 'rgb(173, 177, 184)', fontSize: '12px' }}>
                  {users.kycStatus === true ? <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg> :

                    <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                    </svg>
                  }
                </span>
                <span>Deposit</span>
              </div> */}


            </div>
          </div>
        </div>
        {/* <div className="profile__notification">
          <button type="button"><span className="by-button__content">Verified Advertisers</span></button>
          <button type="button"><span className="by-button__content">Manage Notification</span></button>
        </div> */}
      </div>
      <div className="fiat-divider fiat-divider--horizontal"></div>
      <div className="p2p-profile__wrapper p_40">
        <div className="p2p-profile__wrapper__flex">
          <div className="p2p-profile__wrapper_grid">
            <div className="p2p-profile__wrapper_grid--vertical" >
              <div className="by-space-item">
                <div>No. of Orders Within 30 Days</div>
              </div>
              <div className="by-space-item">
                <div className="otc-profile__ov-value">

                  <span className="otc-profile__ov-highlight">{orderDetail.lastOrders}</span>
                  <span>Orders</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p2p-profile__wrapper_grid">
            <div className="p2p-profile__wrapper_grid--vertical" >
              <div className="by-space-item">
                <div>Completion Rate Within 30 Days</div>
              </div>
              <div className="by-space-item">
                <div className="otc-profile__ov-value">
                  {console.log("========orderDetail.orderComplete", orderDetail.orderComplete)}
                  <span className="otc-profile__ov-highlight">{orderDetail.orderComplete}</span>
                  <span>%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p2p-profile__wrapper_grid">
            <div className="p2p-profile__wrapper_grid--vertical" >
              <div className="by-space-item">
                <div>Total No. of Orders</div>
              </div>
              <div className="by-space-item">
                <div className="otc-profile__ov-value">
                  <span className="otc-profile__ov-highlight">{orderDetail.orderCount}</span>
                  <span>Orders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default P2PProfile;