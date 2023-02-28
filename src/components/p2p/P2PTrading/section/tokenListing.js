import '../trading.css';
import '../placeorder.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-responsive-modal/styles.css';
import AllPaymentMethods from './all-payment-methods';
import CoinListDropdown from '../../oneClickBuy/sections/coin-list-dropdown';
import { useSearchParams } from 'react-router-dom';
import { getBuyListRequest } from '../../../../Actions/p2pAction';
import { getAllOrderList } from '../../../../Actions/orderAction';
import { createOrder } from '../../../../Actions/orderAction';
import OrderDetailComponent from '../../p2pOrder/order/orderComponent/orderDetailComponent';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import ReactPaginate from 'react-paginate';
import firstCoinList from '../../../../Core/firstCoinList.json'

import rupeeIcon from '../../../../assets/coinIcon/rupee.png'

const TokenListing = () => {
  let { orderid } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const dispatch = new useDispatch();
  const [disabled, setDisabled] = useState(false)
  const [selldisabled, setSellDisabled] = useState(true)
  const [open, setOpen] = useState(false);
  const [allTradingList, setAllTradingList] = useState([]);
  const [buyList, setBuyList] = useState([]);
  const [BuyData, setBuyData] = useState();
  const [firstCurrency, setfirstCurrency] = useState(0);
  const [secondCurrency, setsecondCurrency] = useState(0);
  const [cancelorderlist, setCancelOrderList] = useState([]);
  const [show, setShow] = useState(searchParams.get('type') !== null ? parseInt(searchParams.get('type')) : 0);
  const [active, setActive] = useState(0);
  const [amount, setAmount] = useState(searchParams.get('amount')!==null ?searchParams.get('amount') : 0 );
  const [coinName, setcoinName] = useState(searchParams.get('token') !== null ? searchParams.get('token') : 'USDT');
  const [coinImage, setcoinImage] = useState('');
  const [spendCoinName, setSpendCoinName] = useState(searchParams.get('fiat') !== null ? searchParams.get('fiat') : 'INR');
  const [spendCoinImage, setSpendCoinImage] = useState(rupeeIcon);
  const tokenList = useSelector((state) => state.deposittokens);;
  const [paymentMethod, setPaymentMethod] = useState(searchParams.get('paymentMethod') !==null ? searchParams.get('paymentMethod') : 'Select Pay Method' );
  const [sellPaymentMethod, setSellPaymentMethod] = useState('Select Payment Method');
  const [available_token_balance, setAvailableTokenBalance] = useState(0.00);
  const [color, setColor] = useState('')
  const [showCancleToast, setShowCancleToast] = useState(false);

  const itemPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(10);

  let userpmlist = useSelector((state) => state.userpmlist)
  userpmlist = Object.keys(userpmlist).length === 0 ? [] : userpmlist.result;

  const auth = sessionStorage.getItem('token');
  let assets = useSelector((state) => state.assets);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    getBuyList();
    getOrderList();
  }, [])

  const activeDropdown = (e, index) => {
    e.preventDefault();
    if (index === active) {
      setActive(0)
    } else {
      setActive(index)
    }
  }

  const closeDropdown = (e, index) => {
    if (active !== 0) {
      setActive(0);
    }
  }

  const selectCoin = async (data) => {
    setcoinName(data.coinName)
    setcoinImage(data.image)
    handleAllFilter(data.coinName, spendCoinName, show);
  }

  const selectSpendCoin = async (data) => {
    setSpendCoinName(data.coinName)
    setSpendCoinImage(data.image)
    handleAllFilter(coinName, data.coinName, show);
  }

  function setBg(show) {
    setShow(show);
    handleAllFilter(coinName, spendCoinName, show);
  }

  const selectPayment = async (data) => {
    setPaymentMethod(data)
  }

  const getBuyList = async () => {
    let data = await dispatch(getBuyListRequest());
    if (data.data.status === 200) {
      let list = data.data.data;

      // let newList = list.filter((item) => {
      //   return item.post.userid !== users.id
      // })

      let newList = list;

      setAllTradingList(newList);

      // ============================================== //
      // ====== Filter with type Buy/Sell===============//
      // ============================================== //
      let filterList = newList.filter((item) => {
        if (searchParams.get('type') !== null) {
          let type = parseInt(searchParams.get('type')) === 0 ? 'sell' : 'buy';
          return item.post.type.toLowerCase() === type;
        }
        else {
          return item.post.type.toLowerCase() === 'sell';
        }
      })

      // ==============================================//
      // ====== Filter with spend coin===============//
      // ==============================================//
      filterList = filterList.filter((item) => {
        if (searchParams.get('type') !== null) {
          let type = parseInt(searchParams.get('type')) === 0 ? 'sell' : 'buy';
          let coin = type === 'sell' ? coinName : spendCoinName

          return item.token === coin
        }
        else {
          return item.token === coinName
        }
      })

      // ==============================================//
      // ====== Filter with receive coin===============//
      // ==============================================//
      filterList = filterList.filter((item) => {
        if (searchParams.get('type') !== null) {
          let type = parseInt(searchParams.get('type')) === 0 ? 'sell' : 'buy';
          let coin = type === 'sell' ? spendCoinName : coinName
          return item.post.currency === coin

        }
        else {
          return item.post.currency === spendCoinName

        }
      })

      setBuyList(filterList);
      const endOffset = itemOffset + itemPerPage;
      setPageCount(Math.ceil(filterList.length / itemPerPage));
      setItemOffset(endOffset)

    }
  }

  function handlePageClick(event) {

    let filterList = allTradingList.filter((item) => {
      return item.token === coinName
    })

    filterList = filterList.filter((item) => {
      return item.post.currency === spendCoinName
    })

    filterList = filterList.filter((item) => {
      if (show === 0) {
        return item.post.type.toLowerCase() === "sell"
      }
      else {
        return item.post.type.toLowerCase() === "buy"
      }
    })

    const newOffset = (event.selected * itemPerPage) % filterList.length;
    const endOffset = itemPerPage + newOffset;
    setBuyList(filterList.slice(newOffset, endOffset));
  }

  const handleAllFilter = (coinName, spendCoinName, show) => {

    let filterList = allTradingList.filter((item) => {
      return item.token === coinName
    })

    filterList = filterList.filter((item) => {
      return item.post.currency === spendCoinName
    })

    filterList = filterList.filter((item) => {
      if (show === 0) {
        return item.post.type.toLowerCase() === "sell"
      }
      else {
        return item.post.type.toLowerCase() === "buy"
      }
    })

    setBuyList(filterList);
    const endOffset = 0 + itemPerPage;
    setPageCount(Math.ceil(filterList.length / itemPerPage));
    setItemOffset(endOffset)
  }

  // ======================================================================================//
  // =======Get order list of user to check how many order cancle in one day===============//
  // ======================================================================================//
  const getOrderList = async () => {
    let data = await dispatch(getAllOrderList());
    if (data.status === 200) {
      if (data.data.status !== 404) {
        let record = data.data.data;
        let date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        record = record.filter((item) => {
          let deadline = new Date(item.orderData.createdAt).toJSON().slice(0, 10).replace(/-/g, '/');
          if (item.orderData.isCanceled === true && date === deadline) {
            return item;
          }
        })
        setCancelOrderList(record)
      }
    }
  }

  const renderPaymentIcon = (item) => {
    return item.map((p, index) => {
      return <p key={index} className='pay_method'>{p.payment_method}</p>
    })
  }

  const onOpenModal = (item, e) => {
    setfirstCurrency(0)
    setsecondCurrency(0)
    setOpen(true);
    setBuyData(item);
  };

  // ================================================== //
  // ===========Send create order requet=============== //
  // ================================================== //
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    let validate = validateForm()
    if (validate) {
      if (cancelorderlist.length > 3) {
        setShowCancleToast(true)
        return;
      }
      setDisabled(true);
      let formData = {
        "postid": BuyData?.post._id,
        "sell_userid": BuyData?.post.type.toLowerCase() === 'sell' ? BuyData?.post.userid : users.id,
        "buy_userid": BuyData?.post.type.toLowerCase() === 'sell' ? users.id : BuyData?.post.userid,
        "spend_currency": BuyData?.post.type.toLowerCase() === 'sell' ? BuyData?.post.currency : BuyData?.token,
        "spend_amount": firstCurrency,
        "receive_amount": secondCurrency,
        "price": BuyData?.post.price + ' ' + BuyData?.post.currency + '/' + BuyData?.token,
        "token": BuyData?.token,
        "receive_currency": BuyData?.post.type.toLowerCase() === 'sell' ? BuyData?.token : BuyData?.post.currency,
        "type": BuyData?.post.type.toLowerCase() === 'sell' ? 'buy' : 'sell'
      }

      let data = await dispatch(createOrder(formData));

      if (data.status === 200) {
        setTimeout(() => {
          setDisabled(false);
          setOpen(false);
          navigate(data.data.data[0].orderData._id);
        }, 5000);
      }
    }
  }

  const validateForm = () => {
    if (show == 0) {
      if (parseInt(firstCurrency) < BuyData?.post.min_limit) {
        return false;
      }
      if (parseInt(firstCurrency) > BuyData?.post.max_limit) {
        return false;
      }
    }
    else {
      if (parseInt(firstCurrency) === 0) {
        return false;
      }
      if (parseInt(firstCurrency) > BuyData?.post.quantity) {
        return false;
      }
    }
    return true;
  }

  const firstCalcu = (val) => {
    var data = val / BuyData.post.price;
    if (show == 0) {
      setfirstCurrency(val);
      setsecondCurrency(data)
    }
    else {
      setfirstCurrency(data);
      setsecondCurrency(val)
    }

  }

  const secCalcu = (val) => {
    var data = val * BuyData.post.price;
    if (show == 0) {
      setfirstCurrency(data);
      setsecondCurrency(val)
    }
    else {
      let filterAssets = assets.filter((item) => {
        return item.token === BuyData.token
      })
      if (filterAssets.length > 0) {
        setAvailableTokenBalance(filterAssets[0].balance);
        if (filterAssets[0].balance > 0) {
          setSellDisabled(false);
          setColor('black')
        }
        else {
          setColor('red')
          setSellDisabled(true);
        }
      }
      else {
        setColor('red')
        setSellDisabled(true);
      }

      setfirstCurrency(val);
      setsecondCurrency(data)
    }
  }

  return (
    <section className='token_list_wrapper' onClick={closeDropdown}>
      <ToastContainer position="top-center" className="p-3 toast__container">
        <Toast onClose={() => setShowCancleToast(false)} bg='warning' delay={6000} autohide show={showCancleToast} >
          <Toast.Body>Sorry, you have reached the 3 cancellation limit. You're not available to trade on the platform in the next 12 hours.</Toast.Body>
        </Toast>
      </ToastContainer>
      {orderid === undefined ?
        <div className="tmb__token_container">
          <div className='sec_inner'>
            <div className='list_head'>
              <div className='buy_sell_cta_wrapper'>

                <div className="react-tabs" data-rttabs="true">
                  <ul className={'react-tabs__tab-list' + (show === 0 ? ' buy-coin' : ' sell-coin')} role="tablist">
                    <li className={`react-tabs__tab ${show === 0 ? 'react-tabs__tab--selected' : ''}`} role="tab" id="tab:r0:0" aria-selected="true" aria-disabled="false" aria-controls="panel:r0:0" tabIndex="0" data-rttab="true" onClick={(e) => { setBg(0) }}>Buy</li>
                    <li className={`react-tabs__tab ${show === 1 ? 'react-tabs__tab--selected' : ''}`} role="tab" id="tab:r0:1" aria-selected="false" aria-disabled="false" aria-controls="panel:r0:1" data-rttab="true" onClick={(e) => { setBg(1) }}>Sell</li>
                  </ul>
                </div>
              </div>
              <div className='coin_list_wrapper'>
                <button className='coin_cta' onClick={(e) => { activeDropdown(e, 1) }}>
                  <span className='cta_img_wrapper'>
                    {coinImage ? <img src={coinImage} alt="error" /> :

                      <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_103_2)">
                          <path d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z" fill="#10D173" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M13.5035 5.83398V7.52607H10.9256V8.63232C13.0131 8.72732 14.5827 9.13565 14.5827 9.62565C14.5827 10.1152 13.0131 10.5236 10.9256 10.6186V14.1673H9.08935V10.6194C6.9931 10.5257 5.41602 10.1165 5.41602 9.62565C5.41602 9.1344 6.99393 8.72523 9.08935 8.6319V7.52565H6.51143V5.83398H13.5031H13.5035ZM10.9256 10.1948C12.5731 10.1198 13.7931 9.84857 13.7931 9.52565C13.7931 9.20273 12.5731 8.93148 10.9239 8.85648V9.87898C10.3121 9.91099 9.69909 9.91126 9.08727 9.87982V8.85357C7.43185 8.92857 6.20393 9.1994 6.20393 9.52398C6.20393 9.84857 7.43185 10.1202 9.08727 10.1948L9.19643 10.199H9.1981C9.30768 10.2032 9.41893 10.2069 9.53143 10.2094H9.54227L9.63727 10.2111H9.66518L9.74477 10.2123H10.2548L10.3356 10.2111H10.3648L10.4664 10.209H10.4714C10.5473 10.2073 10.6227 10.2052 10.6964 10.2027H10.7077L10.8077 10.199H10.8193L10.9256 10.1948V10.1948Z" fill="white" />
                        </g>
                        <defs>
                          <clipPath id="clip0_103_2">
                            <rect width={20} height={20} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>}
                  </span>
                  <span className='span_wrapper'>
                    <span>{coinName}</span>
                    <img src={require('../assets/images/menu-icon.png')} alt="error" />
                  </span>
                </button>
                {active == 1 && <CoinListDropdown tokenList={tokenList} selectCoin={selectCoin} />}
              </div>
              <div className='amount_wrapper' >
                <div className='input_wrapper'>
                  <input type="text" className='amount_input' placeholder='Enter Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <button className='coin_cta' onClick={(e) => { activeDropdown(e, 2) }}>
                  <span className='cta_img_wrapper'>
                    {spendCoinImage ? <img src={spendCoinName === 'INR' ? rupeeIcon : spendCoinImage} alt="error" /> :
                      <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_103_2)">
                          <path d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z" fill="#10D173" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M13.5035 5.83398V7.52607H10.9256V8.63232C13.0131 8.72732 14.5827 9.13565 14.5827 9.62565C14.5827 10.1152 13.0131 10.5236 10.9256 10.6186V14.1673H9.08935V10.6194C6.9931 10.5257 5.41602 10.1165 5.41602 9.62565C5.41602 9.1344 6.99393 8.72523 9.08935 8.6319V7.52565H6.51143V5.83398H13.5031H13.5035ZM10.9256 10.1948C12.5731 10.1198 13.7931 9.84857 13.7931 9.52565C13.7931 9.20273 12.5731 8.93148 10.9239 8.85648V9.87898C10.3121 9.91099 9.69909 9.91126 9.08727 9.87982V8.85357C7.43185 8.92857 6.20393 9.1994 6.20393 9.52398C6.20393 9.84857 7.43185 10.1202 9.08727 10.1948L9.19643 10.199H9.1981C9.30768 10.2032 9.41893 10.2069 9.53143 10.2094H9.54227L9.63727 10.2111H9.66518L9.74477 10.2123H10.2548L10.3356 10.2111H10.3648L10.4664 10.209H10.4714C10.5473 10.2073 10.6227 10.2052 10.6964 10.2027H10.7077L10.8077 10.199H10.8193L10.9256 10.1948V10.1948Z" fill="white" />
                        </g>
                        <defs>
                          <clipPath id="clip0_103_2">
                            <rect width={20} height={20} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>}
                  </span>
                  <span className='span_wrapper'>
                    <span>{spendCoinName}</span>
                    <img src={require('../assets/images/menu-icon.png')} alt="error" />
                  </span>
                </button>
                {active == 2 && <CoinListDropdown tokenList={firstCoinList} selectCoin={selectSpendCoin} />}
              </div>
              <div className='all_payment_methods'>
                <button className='coin_cta' onClick={(e) => { activeDropdown(e, 4) }}>
                  <span className='span_wrapper'>
                    <span>{paymentMethod}</span>
                    <img src={require('../assets/images/menu-icon.png')} alt="error" />
                  </span>
                </button>
                {active == 4 && <AllPaymentMethods selectPayment={selectPayment} />}
              </div>
              <div className='refresh_wrapper'>
                <button className='refresh_cta'><i className='fa fa-refresh'></i>Refresh</button>
              </div>
            </div>
          </div>
          <div className="advertisr_list">
            <table>
              <thead>
                <tr>
                  <th><p className='tabele_heading'>Advertiser</p></th>
                  <th><p className='tabele_heading'>Price</p></th>
                  <th><p className='tabele_heading'>Available&nbsp;&nbsp;<span className="delimiter">|</span>&nbsp;&nbsp;Limits</p></th>
                  <th><p className='tabele_heading'>Payment Method</p></th>
                  <th><p className='tabele_heading'>Action&nbsp;<span className="fiat-tag theme-red">0 Fees</span></p></th>
                </tr>
              </thead>
              <tbody>
                {buyList.length > 0 && buyList.map((item, index) => {
                  let minpriceQuantity = item.post.min_limit / item.post.price;
                  if (item.post.quantity > minpriceQuantity) {
                    return <tr key={index}>
                      <td>
                        <div className='advertiser_detail_wrapper'>
                          <div className='advertiser_img'>
                            <p className='advertiser_mail'>{(item.user.username).substring(0, 2)}</p>
                          </div>
                          <div className='advertiser_detail'>
                            <p className='advertiser_name'>{(item.user.email)}</p>
                            <p className='advertiser_orders'>2,092 | 97 </p>
                            <p className='advertiser_status'>Online</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className='price_amount'>{item.post.price}<span className='amount_currency'>{item.post.currency}</span></p>
                      </td>
                      <td>
                        <div className='available_limit'>
                          <div className='available_limit_text'>
                            <p className='available'>Available</p>
                            <p className='limit'>Limits</p>
                          </div>
                          <div className='available_limit_value'>
                            <p className='available'>{item.post.quantity} {item.token}</p>
                            <p className='limit'>{item.post.min_limit} ~ {item.post.max_limit} {item.post.currency}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='payment_method_wrapper'>
                          {renderPaymentIcon(item.pmethod)}
                        </div>
                      </td>
                      <td>
                        <div className='table_buy_cta_wrapper'>
                          <button className={show === 0 ? ' table_buy_cta' : ' table_cell_cta'} onClick={(e) => { auth === null ? navigate('/login') : onOpenModal(item, e) }}>{show === 0 ? ' Buy' : ' Sell'} {item.token}</button>
                        </div>
                      </td>
                    </tr>
                  }

                })}

              </tbody>
            </table>
          </div>
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

          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered show={open}
            onHide={() => onCloseModal()}
          >
            {/* <Modal.Header closeButton={true}>

          </Modal.Header> */}
            <Modal.Body className='order__modal-body'>

              <div className='container buycontainer'>
                <div className='row '>
                  <div className='col-md-12'>
                    <div className='d-flex'>
                      {BuyData !== undefined &&
                        <>
                          <div className='box'>
                            {/* NEW design of popup */}
                            <div className='place__order__model'>
                              <div className='place__order__seller__container'>
                                <div className='seller__info'>
                                  <div className='seller__avatar'>
                                    <p>{BuyData.user.username !== undefined && (BuyData?.user.username).substring(0, 2)}</p>
                                  </div>
                                  <div className='seller__detail'>
                                    <div className='seller__name'>{BuyData.user.username !== undefined && (BuyData?.user.username)}</div>
                                    <div className='seller__order_detail'>
                                      100 order | 54%
                                    </div>
                                    <div className='online__status'>Online</div>
                                  </div>

                                </div>
                                <div className='info_tag'>
                                  <span className="fiat-iconfont fiat-icon--success"><svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg> Email</span>
                                  <span className="fiat-iconfont fiat-icon--success"><svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg> SMS</span>
                                  <span className="fiat-iconfont fiat-icon--success"><svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg> Identity Verification</span>
                                </div>
                                <div className="advertiser-remark">{BuyData.post.remarks !== '' ? (BuyData.post.remarks) : `please pay the exact amount
                                  call at ${BuyData.user.number} if the order request is not fulfilled after 15 minutes`}
                                </div>
                                <div className="advertiser-crypto-info">
                                  <div className="crypto-info-item">
                                    <span>Price</span>
                                    <span className="crypto-info-item-value emphasis">{BuyData.post !== undefined && BuyData?.post.price} {BuyData.post !== undefined && BuyData?.post.currency}</span>
                                  </div>
                                  <div className="crypto-info-item">
                                    <span>Available</span>
                                    <span className="crypto-info-item-value">{BuyData.post !== undefined && BuyData?.post.quantity.toFixed(7)}&nbsp;{BuyData.token !== undefined && BuyData?.token}</span>
                                  </div>
                                  <div className="crypto-info-item">
                                    <span>Limits</span>
                                    <span className="crypto-info-item-value">{BuyData.post !== undefined && BuyData?.post.min_limit}&nbsp;~&nbsp;{BuyData.post !== undefined && BuyData?.post.max_limit}&nbsp;{BuyData?.post.currency}</span>
                                  </div>
                                </div>
                              </div>
                              <div className='place__order__bid__form'>
                                {show === 0 ?
                                  // Buy Coin form
                                  <form onSubmit={handleSubmitForm}>
                                    <div className="by-space by-space--vertical amount-input-wrapper" style={{ gap: '8px' }}>
                                      <div className="by-space-item" >
                                        <div className="amount-input-label">I will pay</div>
                                      </div>
                                      <div className="by-space-item">
                                        <div className="by-input">
                                          <div className="by-input__container">
                                            <span className="gc-04 by-input__left-icon">
                                              <span className="fiat-otc__currency-wrapper order-create-modal__coin-image" style={{ backgroundColor: 'rgb(132, 189, 123)' }}>
                                                <img className="fiat-otc__currency-symbol" src="/bycsi-root/common-static/fiat-static/icons/currency/INR.svg" alt="" />
                                              </span>
                                            </span>
                                            <span className="by-input__wrapper flex">
                                              <input className="by-input__inner" type="number" onChange={(e) => firstCalcu(e.target.value)} value={firstCurrency} min={BuyData?.post.min_limit} max={BuyData?.post.max_limit} placeholder={'min ' + BuyData?.post.min_limit} id="minlimit" required />
                                            </span>
                                            <span className="by-input__right-icon">
                                              <span>{spendCoinName}
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="order-create-modal__transfer-icon">
                                      <div className="order-create-modal__line"></div>
                                      <span className="icon fiat-iconfont fiat-icon--doubledown">
                                      </span>
                                    </div>
                                    <div className="by-space by-space--vertical amount-input-wrapper" style={{ gap: '8px' }}>
                                      <div className="by-space-item" >
                                        <div className="amount-input-label">I will receive</div>
                                      </div>
                                      <div className="by-space-item">
                                        <div className="by-input">
                                          <div className="by-input__container">
                                            <span className="gc-04 by-input__left-icon">
                                              <span className="fiat-otc__currency-wrapper order-create-modal__coin-image" style={{ backgroundColor: 'rgb(132, 189, 123)' }}>
                                                <img className="fiat-otc__currency-symbol" src="/bycsi-root/common-static/fiat-static/icons/currency/INR.svg" alt="" />
                                              </span>
                                            </span>
                                            <span className="by-input__wrapper flex">
                                              <input className="by-input__inner" type="number" onChange={(e) => secCalcu(e.target.value)} value={secondCurrency} max={BuyData?.post.quantity} id="maxlimit" />
                                            </span>
                                            <span className="by-input__right-icon">
                                              <span>{coinName}
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="order-create-modal__button-wrapper">
                                      <button className="by-button by-button--contained by-button--disabled by-button--brand acttive" type="submit" disabled={disabled}>
                                        <i style={{ display: disabled === true ? 'block' : 'none' }} className="fa fa-spinner fa-spin"></i><span className="by-button__content" style={{ display: disabled === true ? 'none' : 'block' }}>Buy</span>
                                      </button>
                                      <button className="by-button by-button--outlined by-button--primary" type="button" onClick={onCloseModal}>
                                        <span className="by-button__content">Cancel</span>
                                      </button>
                                    </div>
                                  </form>
                                  :
                                  // Sell Coin form
                                  <form onSubmit={handleSubmitForm}>
                                    <div className="by-space by-space--vertical amount-input-wrapper" style={{ gap: '8px' }}>
                                      <div className="by-space-item" >
                                        <div className="amount-input-label">I will sell</div>
                                      </div>
                                      <div className="by-space-item">
                                        <div className="by-input">
                                          <div className="by-input__container">
                                            <span className="gc-04 by-input__left-icon">
                                              <span className="fiat-otc__currency-wrapper order-create-modal__coin-image" style={{ backgroundColor: 'rgb(132, 189, 123)' }}>
                                                <img className="fiat-otc__currency-symbol" src="/bycsi-root/common-static/fiat-static/icons/currency/INR.svg" alt="" />
                                              </span>
                                            </span>
                                            <span className="by-input__wrapper flex">
                                              <input className="by-input__inner" type="number" onChange={(e) => secCalcu(e.target.value)} value={firstCurrency} max={BuyData?.post.quantity} placeholder="0.00" id="minSelllimit" required />
                                            </span>
                                            <span className="by-input__right-icon">
                                              <span>{coinName}
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="order-create-modal__transfer-icon">
                                      <div className="order-create-modal__line">
                                        <div style={{ fontSize: '12px', textAlign: 'right', color: color }}>
                                          <p style={{ marginBottom: '0px' }}>Available Balance : {available_token_balance}</p>
                                        </div>
                                      </div>
                                      <span className="icon fiat-iconfont fiat-icon--doubledown">
                                      </span>

                                    </div>
                                    <div className="by-space by-space--vertical amount-input-wrapper" style={{ gap: '8px' }}>
                                      <div className="by-space-item" >
                                        <div className="amount-input-label">I will receive</div>
                                      </div>
                                      <div className="by-space-item">
                                        <div className="by-input">
                                          <div className="by-input__container">
                                            <span className="gc-04 by-input__left-icon">
                                              <span className="fiat-otc__currency-wrapper order-create-modal__coin-image" style={{ backgroundColor: 'rgb(132, 189, 123)' }}>
                                                <img className="fiat-otc__currency-symbol" src="/bycsi-root/common-static/fiat-static/icons/currency/INR.svg" alt="" />
                                              </span>
                                            </span>
                                            <span className="by-input__wrapper flex">
                                              <input className="by-input__inner" type="number" onChange={(e) => firstCalcu(e.target.value)} min={BuyData?.post.min_limit} max={BuyData?.post.max_limit} value={secondCurrency} id="maxSelllimit" />
                                            </span>
                                            <span className="by-input__right-icon">
                                              <span>{spendCoinName}
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="order-create-modal__transfer-icon">
                                      <div className="order-create-modal__line"></div>
                                    </div>
                                    <div className='by-space by-space--vertical amount-input-wrapper' style={{ gap: '8px' }}>
                                      <div className='all_payment_methods'>
                                        <button className='coin_cta' onClick={(e) => { activeDropdown(e, 5) }}>
                                          <span className='span_wrapper'>
                                            <span>{sellPaymentMethod}</span>
                                            <img src={require('../assets/images/menu-icon.png')} alt="error" />
                                          </span>
                                        </button>
                                        {active == 5 &&
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
                                                {userpmlist.map((item, index) => {
                                                  return <li key={"payment" + index} className="list_content" onClick={() => setSellPaymentMethod(item.pm_name)}>
                                                    <div className="list_text">
                                                      <p className="list_item_dull">{item.pm_name} {item.pm_name === 'Paytm' ? item.pmObject.account : item.pm_name === 'Phonepe' ? item.pmObject.phonenumber : item.pm_name === 'Google Pay' ? item.pmObject.phonenumber : item.pmObject.upi}</p>
                                                    </div>

                                                  </li>
                                                })}
                                              </ul>
                                            </div>

                                          </div>
                                        }
                                      </div>
                                    </div>
                                    <div className="order-create-modal__button-wrapper">
                                      <button className="by-button by-button--contained by-button--disabled by-button--brand acttive" type="submit" style={{ cursor: available_token_balance > 0 ? 'pointer' : 'no-drop', pointerEvents: available_token_balance > 0 ? 'default' : 'def' }} disabled={selldisabled}>
                                        <i style={{ display: selldisabled === true && available_token_balance > 0 ? 'block' : 'none' }} className="fa fa-spinner fa-spin"></i><span className="by-button__content">Sell</span>
                                      </button>
                                      <button className="by-button by-button--outlined by-button--primary" type="button" onClick={onCloseModal}>
                                        <span className="by-button__content">Cancel</span>
                                      </button>
                                    </div>
                                  </form>
                                }

                                <div className="order-create-modal__bottom-tip">Please complete the payment within 15 minute(s). The coins you've bought will be credited to your Funding Account.</div>
                              </div>
                            </div>
                          </div>
                        </>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        :
        <div className='p2p__orderdetail'>
          <div className="tmb__token_container" style={{ background: '#fff', borderRadius: '8px' }}>
            <OrderDetailComponent />
          </div>

        </div>
      }
    </section>
  )
}

export default TokenListing;