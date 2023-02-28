import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import OrderTable from './orderTable';
import { useParams } from 'react-router-dom';

const OrderHistory = () => {

  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const assets = useSelector((state) => state.assets);
  const orderbooks = useSelector((state) => state.orderbooks);
  const [orderTab, setOrderTab] = useState('open');
  const [orderList, setOrderList] = useState([]);

  const [selected, setselectbtn] = useState('myElement');

  useEffect(() => {
    let data = orderbooks.filter((item) => {
      return (item.status === 'pending' && item.userid === users.id && item.token === id && item.isCanceled === false)
    })
    // console.log(data, 'order section component');
    setOrderList(data);
  }, [id])
  function myFunction(myElement, btn) {
    document.getElementById(myElement).className = "order__data active";
    document.getElementById(btn).className = "order__button active";

    if (myElement != 'myElement') {
      document.getElementById('myElement').className = "order__data stop__orders__data";
      document.getElementById('btn').className = "order__button";
    }
    if (myElement != 'myElement1') {
      document.getElementById('myElement1').className = "order__data stop__orders__data";
      document.getElementById('btn1').className = "order__button";
    }

    let data = orderbooks.filter((item) => {
      if (myElement === 'myElement') {
        setOrderTab('open')
        return (item.status === 'pending' && item.userid === users.id && item.token === id && item.isCanceled === false)
      }
      else if (myElement === 'myElement1') {
        setOrderTab('close')
        return item.status === 'success' && item.userid === users.id && item.token === id && item.isCanceled === false
      }

    })

    setOrderList(data);
  }


  return (
    <div className="order__tabs">
      <div className="order__details">
        <div className="order__details__inner">
          <button className=" order__button active" id='btn' onClick={() => { myFunction('myElement', 'btn') }}>
            Open Orders
          </button>
          <button className="order__button " id='btn1' onClick={() => { myFunction('myElement1', 'btn1') }} selected={selected == 'myElement1'}>
            Completed Orders
          </button>
        </div>

      </div>

      <OrderTable orderList={orderList} orderTab={orderTab} />
    </div>
  )
}

export default OrderHistory;