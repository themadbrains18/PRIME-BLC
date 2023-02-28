import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllOrderList } from '../../../../Actions/orderAction';
import OrderDetailComponent from '../order/orderComponent/orderDetailComponent'
import { useParams, useNavigate } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import ReactPaginate from 'react-paginate';
import { websocket_url } from './../../../../Api/index';

LoadingOverlay.propTypes = undefined

const OrderListing = () => {
  let { orderid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const itemPerPage = 10;
  const [isActive, setIsActive] = useState(true)
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(10);
  const [coin, setCoin] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [orderlist, setOrderList] = useState([]);
  const [active, setActive] = useState(0);
  const orders = useSelector((state) => state.orders);
  const users = useSelector((state) => state.users);
  const tokenList = useSelector((state) => state.deposittokens);
  const [streams, setStreams] = useState(['@ticker', '@depth20', '@trade'])
  const [notification, setNotification] = useState({})


  useEffect(() => {
    getOrderList();
    let connection = btoa(streams.join('/'));
    // connection = new WebSocket(`wss://blcexchange.net:5000/`);
    connection = new WebSocket(websocket_url);

    connection.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    connection.onmessage = evt => {

      let eventDataType = JSON.parse(evt.data).type;
      let eventData = JSON.parse(evt.data);

      if(eventDataType === 'chat'){
        console.log(eventData,'============event Data========')
        setNotification(eventData)
      }

    };

    connection.onerror = evt => {
      console.error(evt);
    }
  }, []);

  const getOrderList = async () => {
    let data = await dispatch(getAllOrderList());
    if (data.status === 200) {
      let record = data.data.data;
      const endOffset = itemOffset + itemPerPage;
      setPageCount(Math.ceil(record.length / itemPerPage));
      setItemOffset(endOffset)
      setOrderList(record.slice(itemOffset, endOffset));
      setIsActive(false)
    }
  }

  function handlePageClick(event) {
    let orderData = orders.data;
    if (status !== '') {
      orderData = orders.data.filter((item) => {
        if (item.orderData[status] === true) {
          return item;
        }
      })
    }
    if (coin !== '') {
      orderData = orderData.filter((item) => {
        if (item.orderData.spend_currency === coin) {
          return item;
        }
      })
    }
    if (type !== '') {
      orderData = orderData.filter((item) => {
        if (type === 'buy') {
          return item.orderData.buy_userid == users.id;
        }
        else{
          return item.orderData.sell_userid == users.id;
        }
      })
    }
    const newOffset = (event.selected * itemPerPage) % orderData.length;
    const endOffset = itemPerPage + newOffset;
    setOrderList(orderData.slice(newOffset, endOffset));
  }

  function handleSelectOption(coin,type,status) {
    let orderData = orders.data;
    if (status !== '') {
      orderData = orders.data.filter((item) => {
        if (item.orderData[status] === true) {
          return item;
        }
      })
    }
    if (coin !== '') {
      orderData = orderData.filter((item) => {
        if (item.orderData.receive_currency === coin) {
          return item;
        }
      })
    }
    if (type !== '') {
      orderData = orderData.filter((item) => {
        if (type === 'buy') {
          return item.orderData.buy_userid == users.id;
        }
        else{
          return item.orderData.sell_userid == users.id;
        }
      })
    }
    const newOffset = (0 * itemPerPage) % orderData.length;
    const endOffset = itemPerPage + newOffset;
    setPageCount(Math.ceil(orderData.length / itemPerPage));
    setOrderList(orderData.slice(newOffset, endOffset));
  }

  const activeDropdown = (e, index) => {
    e.preventDefault();
    if (index === active) {
      setActive(0)
    } else {
      setActive(index)
    }
  }

  const filterWithStatus = async(status) => {
    setStatus(status)
    await handleSelectOption(coin,type,status);
    setActive(0);
  }

  const filterWithCoin = async(coin) => {
    setCoin(coin)
    await handleSelectOption(coin,type,status);
    setActive(0);
  }

  const filterWithOrderType = async(type) => {
    setType(type)
    await handleSelectOption(coin,type,status);
    setActive(0);
  }

  return (
    <div className="p2p__orderListing__overview">
      {orderid === undefined &&
        <div className='sec_inner'>
          <div className='list_head'>
            <div className='all_payment_methods'>
              <button className='coin_cta' onClick={(e) => { activeDropdown(e, 2) }}>
                <span className='span_wrapper'>
                  <span>{coin === '' ? 'All' : coin}</span>
                  <img src={require('../../P2PTrading/assets/images/menu-icon.png')} alt="error" />
                </span>
              </button>
              {active == 2 &&
                <div className="coin_list_dropdown">
                  <div className="coin_list_inner">

                    <ul className="content_wrapper">
                      <li className="list_content" onClick={() => { filterWithCoin('') }}>
                        <div className="list_img">
                          <img src="" width='40' />
                        </div>
                        <div className="list_text">
                          <p className="list_item_name">All</p>
                        </div>
                      </li>
                      {tokenList !== undefined && tokenList.map((item, index) => {
                        return <li key={"coin" + index} className="list_content qwe" onClick={() => { filterWithCoin(item.coinName) }}>
                          <div className="list_img">
                            <img src={item.image} width='40' />
                          </div>
                          <div className="list_text">
                            <p className="list_item_dull">{item.coinName}</p>
                          </div>
                        </li>
                      })}
                    </ul>
                  </div>
                </div>
              }
            </div>
            <div className='all_payment_methods'>
              <button className='coin_cta' onClick={(e) => { activeDropdown(e, 3) }}>
                <span className='span_wrapper'>
                  <span>{type === '' ? 'Buy/Sell' : type === 'buy' ? 'Buy' : 'Sell'}</span>
                  <img src={require('../../P2PTrading/assets/images/menu-icon.png')} alt="error" />
                </span>
              </button>
              {active == 3 &&
                <div className="coin_list_dropdown">
                  <div className="coin_list_inner">
                    <ul className="content_wrapper">
                      <li className="list_content" onClick={() => filterWithOrderType('')}>
                        <div className="list_text">
                          <p className="list_item_name">Buy/Sell</p>
                        </div>
                      </li>
                      <li className="list_content" onClick={() => filterWithOrderType('buy')}>
                        <div className="list_text">
                          <p className="list_item_name">Buy</p>
                        </div>
                      </li>
                      <li className="list_content" onClick={() => filterWithOrderType('sell')}>
                        <div className="list_text">
                          <p className="list_item_name">Sell</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              }

            </div>
            <div className='all_payment_methods'>
              <button className='coin_cta' onClick={(e) => { activeDropdown(e, 4) }}>
                <span className='span_wrapper'>
                  <span>{status === '' ? 'All' : status === 'inProcess' ? 'In Progress' : status === 'isComplete' ? 'Completed' : 'Canceled'}</span>
                  <img src={require('../../P2PTrading/assets/images/menu-icon.png')} alt="error" />
                </span>
              </button>
              {active == 4 &&
                <div className="coin_list_dropdown">
                  <div className="coin_list_inner">
                    <ul className="content_wrapper">
                      <li className="list_content" onClick={() => filterWithStatus('')}>
                        <div className="list_text">
                          <p className="list_item_name">All</p>
                        </div>
                      </li>
                      <li className="list_content" onClick={() => filterWithStatus('inProcess')}>
                        <div className="list_text">
                          <p className="list_item_name">In Progress</p>
                        </div>
                      </li>
                      <li className="list_content" onClick={() => filterWithStatus('isComplete')}>
                        <div className="list_text">
                          <p className="list_item_name">Completed</p>
                        </div>
                      </li>
                      <li className="list_content" onClick={() => filterWithStatus('isCanceled')}>
                        <div className="list_text">
                          <p className="list_item_name">Canceled</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      }

      <LoadingOverlay
        active={isActive}
        spinner
        text='Loading...'
      >
        {orderid === undefined ?
          <div className="p2p__orderListing__main">
            <Table hover responsive >
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Type</th>
                  <th>Spend</th>
                  <th>Price</th>
                  <th> Receive</th>
                  <th>Status</th>
                  <th> Time</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                
                {orderlist.length > 0 && orderlist !== undefined && orderlist.map((item) => {
                  return <tr key={item.orderData._id} className='orderlist' onClick={(e) => { setNotification({}), navigate(item.orderData._id) }}>
                    <td> {item.orderData._id}  </td>
                    <td> {item.orderData.sell_userid == users.id ? 'Sell' : 'Buy'}  </td>
                    <td> {item.orderData.order_amount} {item.orderData.spend_currency} </td>
                    <td> {item.orderData.price} </td>
                    <td> {item.orderData.quantity} {item.orderData.receive_currency}	</td>
                    <td> {item.orderData.isCanceled === true ? 'Canceled' : item.orderData.isComplete === true ? 'Completed'  : 'In-Progress'}  </td>
                    <td> {moment(item?.orderData.createdAt).format('DD-MM-YYYY hh:mm:ss')} </td>
                    <td style={{position:'relative'}}>{notification.data!== undefined && notification.data.orderid !== undefined && notification.data.orderid === item.orderData._id && <span className="message">1</span>} <img className='chatimg' src="https://img.icons8.com/ios/20/null/sms.png"/> </td>
                  </tr>
                })}
              </tbody>
            </Table>
            <div className='table_pagination'>
              <ReactPaginate
                nextLabel=" > "
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel=" < "
                pageClassName="table_pagination"
                previousClassName="table_pagination"
                nextClassName="table_pagination"
                breakLabel="..."
                breakClassName="table_pagination"
                activeClassName="active-item"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>

          :
          <div className='p2p__orderdetail'>
            <OrderDetailComponent />
          </div>

        }
      </LoadingOverlay>

    </div>
  )
}

export default OrderListing;
