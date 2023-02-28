import React, { useState, useEffect } from 'react';
import BigNumber from "bignumber.js";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from "moment";

import { getTokenCurrentMarketPrice } from '../../Core/common';

const OrderBookNew = (props) => {

  const [coinUsdtPrice, setCoinUsdtPrice] = useState(0)
  let orderbooks = useSelector((state) => state.orderbooks);
  const { id } = useParams();
  const [coin, setCoin] = useState(id);
  const [previousInterval, setNewInterval] = useState()
  useEffect(() => {
    getCoinUsdtActualPrice();
  }, [id]);

  const getCoinUsdtActualPrice = async () => {
    // let intervalID = setInterval(async() => {
    //   console.log(intervalID)
    //   if(previousInterval === undefined){
    //     setNewInterval(intervalID)
    //   }
    //   let price = await getTokenCurrentMarketPrice(id);
    //   setCoinUsdtPrice(price);
    // }, 10000);

    // if(id !== coin){
    //   clearInterval(previousInterval);
    //   setNewInterval(intervalID)
    // }
    let price = await getTokenCurrentMarketPrice(id);
    setCoinUsdtPrice(price);
  }

  let buyRecord = orderbooks.filter((item) => {
    if (item.order_type === 'buy' && item.token === id) {
      return item;
    }
  });

  let sellRecord = orderbooks.filter((item) => {
    if (item.order_type === 'sell' && item.token === id) {
      return item;
    }
  });


  orderbooks = orderbooks.filter((item) => {
    return item.token === id;
  })

  return (
    <>
      <div className="aside__tradde__main">
        <div>
          <div className="tred__data grid__tred__data active tabs__data__tmb">
            <div id="selling" className='tradeBorder'>
              <h2 className="sec__heading">Order Book</h2>
              <div className="inner__heading">
                <span>Price(USDT) Limit</span>
                <span>Amount({id.toUpperCase()})</span>
                <span>Recevie(USDT)</span>
              </div>
              <ul className="price down--price">
                <div>{sellRecord.map((item, index) => {
                  return <li className="data" key={`${index}`}>
                    <ul>
                      <li>{new BigNumber(item.limit_usdt).toFormat(null, 1)}</li>
                      <li>{new BigNumber(item.amount_token).toFormat(null, 1)}</li>
                      <li>{new BigNumber(item.volume_usdt).toFixed(2)}</li>
                    </ul>
                  </li>
                })}</div>
              </ul>
            </div>
            <div id="buying" className='tradeBorder'>

              <div className="chnage__trade">
                <div>
                  <span>
                    {new BigNumber(coinUsdtPrice).toFormat(null, 1)}
                  </span>
                  <span>  USDT</span>
                </div>
              </div>
              <div className="inner__heading">
                <span>Price(USDT) Limit</span>
                <span>Amount({id.toUpperCase()})</span>
                <span>Pay(USDT)</span>
              </div>
              <ul className="price up--price">
                <div>{buyRecord.map((item, index) => {
                  return <li className="data" key={`${index}`}>
                    <ul>
                      <li>{new BigNumber(item.limit_usdt).toFormat(null, 1)}</li>
                      <li>{new BigNumber(item.amount_token).toFormat(null, 1)}</li>
                      <li>{new BigNumber(item.volume_usdt).toFixed(2)}</li>
                    </ul>
                  </li>

                })}</div>
              </ul>
            </div>
          </div>
        </div>

        <div className='tradeBorder'>
          <div className="tabs__recent__trades">
            <button className="sec__heading tmb__tab__btn active">
              Recent Trades
            </button>
            <button className="sec__heading tmb__tab__btn">Market Depth</button>
          </div>
          <div className="tabs__recent__trades__content tabs__data__tmb active">
            <div className="inner__heading">
              <span>Price(USDT)</span>
              <span>Amount({id.toUpperCase()})</span>
              <span>Time</span>
            </div>
            <div className="tred__data recent__trade">
              <ul className="price price--height  trade">
                <div
                  className="text-success"
                  style={{ color: "green !importent" }}
                >
                  {orderbooks.map((item, index) => {
                    return <li className="data" key={`${index}`}>
                      <ul style={{ background: item.order_type === 'buy' ? '#49ed2b3d' : '#45191f' }}>
                        <li style={{ color: item.order_type === 'buy' ? '#58CCB6' : 'red' }}>{new BigNumber(item.limit_usdt).toFormat(null, 1)}</li>
                        <li>{new BigNumber(item.amount_token).toFormat(null, 1)}</li>
                        <li>
                          {/* {((props.ba[0]) * (props.ba[1])).toFixed(2)} */}
                          {moment(item.createdAt).format("MM DD YYYY, hh:mm:ss a")}
                          {/* {(new BigNumber(props.ba[0]).toFormat(null,1) * new BigNumber(props.ba[1]).toFormat(null,1) ).toFixed(2)} */}
                        </li>
                      </ul>
                    </li>
                  })}
                </div>

                {/* <div className='text-danger' >{asks}</div> */}
              </ul>
            </div>
          </div>
          <div className="tabs__recent__trades__content tabs__data__tmb"></div>
        </div>
      </div>
    </>
  )
}

export default OrderBookNew;