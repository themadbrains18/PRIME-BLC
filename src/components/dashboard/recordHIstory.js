import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from 'react-loading-overlay'
import moment from "moment";
import FilterMethods from './filterMethods'
import menuicon from '../user-assest/images/menu.svg';
import { getDepositHistory } from '../../Actions/depositAction';
import { getUserWithdrawHistory } from '../../Actions/withdrawAction';
import { getUserTransferHistory } from '../../Actions/transferAction';
import { getAllOrderList } from '../../Actions/orderAction';
import '../../Style/history.css'
import ReactPaginate from 'react-paginate';

LoadingOverlay.propTypes = undefined

export default function RecordHIstory({ showSideBar }) {

  const dispatch = new useDispatch();
  const [active, setActive] = useState(0)
  const [show, setShow] = useState(0)
  const users = useSelector((state) => state.users);
  const depositHistory = useSelector((state) => state.deposittrxs);
  const priceObj = useSelector((state) => state.assetoverview.convertPrice)
  const tokenList = useSelector((state) => state.deposittokens);
  const [allPost, setAllPost] = useState([]);
  const [buyList, setBuyList] = useState(depositHistory);
  const itemPerPage = 10;
  let [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(10);
  const [isActive, setIsActive] = useState(false)
  const [coin, setCoin] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    getDepositTransActionHistory()
  }, [])

  const getDepositTransActionHistory = async () => {
    let formData = { "userId": users?.id }
    setBuyList([]);
    setIsActive(true)
    let data = await dispatch(getDepositHistory(formData));
    if (data.status === 200) {
      let record = data.data;
      const endOffset = 0 + itemPerPage;
      setPageCount(Math.ceil(record.length / itemPerPage));
      setItemOffset(endOffset)
      setBuyList(record.slice(0, endOffset));
      setAllPost(record);
      setIsActive(false)
    }
  }

  const getWithdrawTransactionHistory = async () => {
    setBuyList([]);
    setIsActive(true)
    let data = await dispatch(getUserWithdrawHistory());
    if (data.status === 200) {
      let record = data.results;
      const endOffset = 0 + itemPerPage;
      setPageCount(Math.ceil(record.length / itemPerPage));
      setItemOffset(endOffset)
      setBuyList(record.slice(0, endOffset));
      setAllPost(record);
      setIsActive(false)
    }

  }

  const getTransferList = async () => {
    setBuyList([]);
    setIsActive(true)
    let data = await dispatch(getUserTransferHistory());
    if (data.status === 200) {
      let record = data.results;
      const endOffset = 0 + itemPerPage;
      setPageCount(Math.ceil(record.length / itemPerPage));
      setItemOffset(endOffset)
      setBuyList(record.slice(0, endOffset));
      setAllPost(record);
      setIsActive(false)
    }
  }

  const getOrderList = async () => {
    setBuyList([]);
    setIsActive(true)
    let data = await dispatch(getAllOrderList());
    if (data.status === 200) {
      let record = data.data.data;
      const endOffset = 0 + itemPerPage;
      setPageCount(Math.ceil(record.length / itemPerPage));
      setItemOffset(endOffset)
      setBuyList(record.slice(0, endOffset));
      setAllPost(record);
      setIsActive(false)
    }
  }

  function handlePageClick(event) {
    let orderData = allPost;
    const newOffset = (event.selected * itemPerPage) % orderData.length;
    const endOffset = itemPerPage + newOffset;
    setBuyList(orderData.slice(newOffset, endOffset))
  }

  const activeDropdown = (e, index) => {
    e.preventDefault();
    if (index === show) {
      setShow(0)
    } else {
      setShow(index)
    }
  }

  const closeDropdown = () => {
    if (show !== false) {
      setShow(false);
    }
  }


  const filterWithCoin = async (coin) => {
    setCoin(coin)
    await handleSelectOption(coin, status);
  }

  const filterWithStatus = async (status) => {
    setStatus(status)
    await handleSelectOption(coin, status);
  }

  function handleSelectOption(coin, status, date, endDate) {
    let orderData = allPost

    if (status !== '') {
      orderData = orderData.filter((item) => {
        if (active === 0) {

          if (item.successful == status) {
            return item;
          }

        }
        else if (active === 1) {
          if (item.status.toString() == status) {
            return item;
          }
        }
        else if (active === 3) {
          if (item.orderData[status] === true) {
            return item;
          }
        }
      }

      )
    }

    if (coin !== '') {
      orderData = orderData.filter((item) => {
        if (active === 0 || active === 2) {
          if (item.coinName === coin) {
            return item;
          }
        }
        else if (active === 1) {
          if (item.requestObj.CoinName == coin) {
            return item;
          }
        }
        else if (active === 3) {
          if (item.orderData.receive_currency === coin) {
            return item;
          }
        }

      })
    }
    
    if (date !== '' && endDate !== '' && date !== undefined && endDate !== undefined) {
      orderData = orderData.filter((item) => {
        if (active !== 3) {
          if (item.createdAt.substr(0, 10) >= date && item.createdAt.substr(0, 10) <= endDate) {
            return item;
          }
        }
        else {
          if (item.orderData.createdAt.substr(0, 10) >= date && item.orderData.createdAt.substr(0, 10) <= endDate) {
            return item;
          }
        }
      })
    }

    const newOffset = (0 * itemPerPage) % orderData.length;
    const endOffset = itemPerPage + newOffset;
    setPageCount(Math.ceil(orderData.length / itemPerPage));
    setBuyList(orderData.slice(newOffset, endOffset));
  }

  const handleSubmit = (date, endDate) => {
    handleSelectOption(coin, status, date, endDate)
  }

  return (
    <>
      <LoadingOverlay
        active={isActive}
        spinner
        text='Loading...'
      >
        <section className='record-history' onClick={closeDropdown}>
          <div className='responsive_toggle' >
            <div className="side-panel__menubtn">
              <img className="side-panel__icon side-panel__menu-icon right_to_left_icon" src={menuicon} alt="" onClick={showSideBar} />
              <span className="side-panel__other-link-order"></span>
            </div>
          </div>
          <div className='history_records_trade'>
            <div className='history-tab-wrapper'>
              <button type='button' className={'tab-btn ' + (active === 0 ? 'tab-btn-active' : '')} onClick={(e) => {
                setActive(0)
                getDepositTransActionHistory()

              }}> Deposit</button>
              <button type='button' className={'tab-btn ' + (active === 1 ? 'tab-btn-active' : '')} onClick={(e) => {
                getWithdrawTransactionHistory();
                setActive(1)
              }}> Withdraw</button>
              <button type='button' className={'tab-btn ' + (active === 2 ? 'tab-btn-active' : '')} onClick={(e) => {
                getTransferList()
                setActive(2)
              }}> Transfer</button>
              <button type='button' className={'tab-btn ' + (active === 3 ? 'tab-btn-active' : '')} onClick={(e) => {
                getOrderList();
                setActive(3)
              }}> P2P</button>
            </div>
            <div className="trade-history-filter">
              <div className='trade-filter-form'>
                Coin
                <div className='filter_dropdown_wrapper' onClick={(e) => { activeDropdown(e, 1) }}>

                  <div className="deposit_button_text">
                    <span>{coin === '' ? 'All' : coin}</span>
                  </div>
                  <div className="deposit_button_icon">
                    <i className="fas fa-chevron-down"></i>
                  </div>
                  {show === 1 &&
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
                    </div>}
                </div>
                Status
                <div className='filter_dropdown_wrapper' onClick={(e) => { activeDropdown(e, 2) }}>

                  <div className="deposit_button_text">
                    <span>{active !== 3 ? status === '' ? 'All' : status === 'true' ? 'Completed' : 'Canceled' : status === '' ? 'All' : status === 'isComplete' ? 'Completed' : 'Canceled'}</span>
                  </div>
                  <div className="deposit_button_icon">
                    <i className="fas fa-chevron-down"></i>
                  </div>
                  {show === 2 &&
                    <div className="coin_list_dropdown">
                      <div className="coin_list_inner">
                        <ul className="content_wrapper">
                          <li className="list_content" onClick={() => filterWithStatus('')}>
                            <div className="list_text">
                              <p className="list_item_name">All</p>
                            </div>
                          </li>
                          <li className="list_content" onClick={() => {
                            (active === 3)
                              ?
                              filterWithStatus('isComplete')
                              :
                              filterWithStatus('true')
                          }
                          }>
                            <div className="list_text">
                              <p className="list_item_name">Completed</p>
                            </div>
                          </li>
                          <li className="list_content" onClick={() => {
                            (active === 3)
                              ?
                              filterWithStatus('isCanceled')
                              :
                              filterWithStatus('false')
                          }
                          }>
                            <div className="list_text">
                              <p className="list_item_name">Canceled</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>}
                </div>
                Date
                <div className='history-date-range'>
                  <input type='date' placeholder='Start Date' className='history_date'
                    onChange={(e) => {
                      let date = e.target.value
                      setDate(e.target.value)
                      handleSubmit(date, endDate)
                    }} />
                  <span role="img" aria-label="swap-right" className="anticon anticon-swap-right"><svg viewBox="0 0 1024 1024" focusable="false" data-icon="swap-right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path></svg></span>
                  <input type='date' placeholder='End Date' className='history_date'
                    onChange={(e) => {
                      let endDate = e.target.value
                      handleSubmit(date, endDate)
                      setEndDate(e.target.value)
                    }} />
                </div>
                {/* <button type="button" className="operation-default-btn" onClick={handleSubmit}>Search</button> */}
              </div>

            </div>
            {/* Deposit List */}
            {active === 0 &&
              <div className="history-list-info transfer">
                <table>
                  <thead>
                    <tr >
                      <th>
                        <span >Coin Pair</span>
                      </th>
                      <th>
                        <span >Service Providers</span>
                      </th>
                      <th>
                        <span >Quantity</span>
                      </th>
                      <th>
                        <span >Price</span>
                      </th>
                      <th>
                        <span >Total Amount</span>
                      </th>
                      <th>
                        <span >Status</span>
                      </th>
                      <th>
                        <span >TRX</span>
                      </th>
                      <th>
                        <span >Date&Time</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {buyList.length > 0 && buyList.map((item, index) => {
                      return <tr key={index}>
                        <td>
                          <span>{item.coinName}/ USDT</span>
                        </td>
                        <td>
                          <span>{item.network}</span>
                        </td>
                        <td>
                          <span>{item.amount}</span>
                        </td>
                        <td>
                          <span>{priceObj[item.coinName] !== undefined && priceObj[item.coinName]['USDT']}/{item.coinName}</span>
                        </td>
                        <td>
                          <span>{priceObj[item.coinName] !== undefined && item.amount * priceObj[item.coinName]['USDT']}</span>
                        </td>
                        <td>
                          <span>{item.successful}</span>
                        </td>
                        <td>
                          <span><span>{item.tx_hash !== undefined && item.tx_hash.substring(0, 5)}</span></span>
                        </td>
                        <td>
                          <span> {moment(item?.date).format('DD-MM-YYYY hh:mm:ss')}</span>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
                <div className='table_pagination'>
                  <ReactPaginate
                    nextLabel=" > "
                    onPageChange={(e) => { handlePageClick(e) }}
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
            }
            {/* withdraw list */}
            {active === 1 &&
              <div className="history-list-info transfer">
                <table>
                  <thead>
                    <tr >
                      <th>
                        <span >Coin</span>
                      </th>
                      <th>
                        <span >Network</span>
                      </th>
                      <th>
                        <span >Amount</span>
                      </th>
                      <th>
                        <span >Fee</span>
                      </th>
                      <th>
                        <span >Wallet</span>
                      </th>
                      <th>
                        <span >Status</span>
                      </th>
                      <th>
                        <span >Date&Time</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {buyList.length > 0 && buyList.map((item, index) => {
                      return <tr key={index}>
                        <td>
                          <span>{item.requestObj.CoinName}</span>
                        </td>
                        <td>
                          <span>{item.networkName}</span>
                        </td>
                        <td>
                          <span>{item.requestedAmount}</span>
                        </td>
                        <td>
                          <span>{item.fee}</span>
                        </td>
                        <td>
                          <span>{item.withdraw_wallet !== undefined && item.withdraw_wallet.substring(0, 5)}</span>
                        </td>
                        <td>
                          <span>{item.status === true ? 'true' : 'false'}</span>
                        </td>
                        <td>
                          <span> {moment(item?.createdAt).format('DD-MM-YYYY hh:mm:ss')}</span>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
                <div className='table_pagination'>
                  <ReactPaginate
                    nextLabel=" > "
                    onPageChange={(e) => { handlePageClick(e) }}
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
            }
            {/* Transfer list */}
            {/* {console.log("==========buyList", buyList)} */}
            {active === 2 &&
              <div className="history-list-info transfer">
                <table>
                  <thead >
                    <tr >
                      <th>
                        <span >Sender Account</span>
                      </th>
                      <th>
                        <span >Reciever Account</span>
                      </th>
                      <th>
                        <span >Coin</span>
                      </th>
                      <th>
                        <span >Amount</span>
                      </th>
                      <th>
                        <span >Time</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {buyList.length > 0 && buyList.map((item, index) => {
                      return <tr key={index}>
                        <td>
                          <span>{item.senderAccount}</span>
                        </td>
                        <td>
                          <span>{item.recieverAccount}</span>
                        </td>
                        <td>
                          <span>{item.coinName}</span>
                        </td>
                        <td>
                          <span>{item.amount}</span>
                        </td>
                        <td>
                          <span> {moment(item?.createdAt).format('DD-MM-YYYY hh:mm:ss')}</span>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
                <div className='table_pagination'>
                  <ReactPaginate
                    nextLabel=" > "
                    onPageChange={(e) => { handlePageClick(e) }}
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
            }
            {/* P2P list */}
            {active === 3 &&
              <div className="history-list-info transfer" >
                <table>
                  <thead >
                    <tr >
                      <th>
                        <span >Order Id</span>
                      </th>
                      <th>
                        <span >Type</span>
                      </th>
                      <th>
                        <span >Spend</span>
                      </th>
                      <th>
                        <span >Price</span>
                      </th>
                      <th>
                        <span >Recieve</span>
                      </th>
                      <th>
                        <span >Status</span>
                      </th>

                      <th>
                        <span >Time</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {buyList.length > 0 && buyList.map((item, index) => {
                      return <tr key={index}>
                        <td>
                          <span>{item.orderData._id}</span>
                        </td>
                        <td>
                          <span>{item.orderData.sell_userid == users.id ? 'Sell' : 'Buy'}</span>
                        </td>
                        <td>
                          <span>{item.orderData.order_amount} {item.orderData.spend_currency}</span>
                        </td>
                        <td>
                          <span>{item.orderData.price}</span>
                        </td>
                        <td>
                          <span>{item.orderData.quantity} {item.orderData.receive_currency}</span>
                        </td>
                        <td>
                          <span>{item.orderData.isCanceled === true ? 'Canceled' : item.orderData.isComplete === true ? 'Completed' : item.orderData.inProcess == true ? 'In-Progress' : 'In-Progress'}</span>
                        </td>
                        <td>
                          <span> {moment(item?.orderData.createdAt).format('DD-MM-YYYY hh:mm:ss')}</span>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>

                <div className='table_pagination'>
                  <ReactPaginate
                    nextLabel=" > "
                    onPageChange={(e) => { handlePageClick(e) }}
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
            }

          </div>

        </section>
      </LoadingOverlay>
    </>

  )
}
