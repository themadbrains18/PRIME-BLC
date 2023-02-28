import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CryptoState } from "../CryptoContext";
import { marketCoinRequest } from "../Actions/marketAction";
import DesktopView from './Chart/desktopView';
import MobileView from './Chart/mobileView';


const Chart = () => {

  const { currency } = CryptoState();
  const { id } = useParams();
  const dispatch = useDispatch();
  localStorage.setItem("symbolName", id)

  const coins = useSelector((state) => state.coins);
  let type = coins.filter((item) => {
    return item.FROMSYMBOL === id
  });

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    const getMarketCoins = async () => {
      await dispatch(marketCoinRequest());
    }
    getMarketCoins();
    return (() => {
      window.removeEventListener('resize', setDimension);
    })

  }, [screenSize, dispatch])

  return (
    <>
      {screenSize.dynamicWidth > 768 ? <DesktopView /> : <MobileView currency={currency} type={type} id={id}/>}
    </>
  )
}

export default Chart;