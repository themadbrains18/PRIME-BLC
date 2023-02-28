import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { getTokenCurrentMarketPrice } from "../Core/common";
function TopBar(props) {

  const [coinUsdtPrice, setCoinUsdtPrice] = useState(0)
  let coins = useSelector((state) => state.coins);
  let token = coins.filter((item) => {
    return item.FROMSYMBOL === props.id
  });
  useEffect(() => {
    getCoinUsdtActualPrice();
  }, [props.id]);
  console.log(token);
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
    let price = await getTokenCurrentMarketPrice(props.id);
    setCoinUsdtPrice(price);
  }
  return (
    <div className='chart__top__bar'>
      <ul className="top_bar d-flex justify-content-between align-items-center p-2 border border-secondary mb-3" >
        <li className=" border-right border-secondary px-5 text-white fw-bold"><span className="fw-bold fs-5 tokenName">{props.id}</span></li>
        <li className=" border-right border-secondary px-5 text-white "><h6 className="themeColor tokenPriceUp">{coinUsdtPrice}</h6><small className="mb-0 tokenPriceDown">${coinUsdtPrice}</small></li>
        <li className="border-right border-secondary px-5 text-white "><h6 className="themeColor changeTitle">24h Change</h6><p className="mb-0 changePrice">{token[0].CHANGE24HOUR!==undefined && token[0].CHANGE24HOUR.toFixed(2)}</p></li>
        <li className=" border-right border-secondary px-5 text-white "><h6 className="themeColor changeTitle">24h High</h6><p className="mb-0 changePrice">{token[0].HIGH24HOUR}</p></li>
        <li className=" border-right border-secondary px-5 text-white "><h6 className="themeColor changeTitle">24h Low</h6> <p className="mb-0 changeLowPrice" >{token[0].LOW24HOUR}</p></li>
        <li className=" px-5 text-white "><h6 className="themeColor changeTitle">volume</h6> <p className="mb-0 changePrice" >{token[0].VOLUME24HOUR !== undefined && token[0].VOLUME24HOUR.toFixed(2)}</p></li>


      </ul>
    </div>
  );
}

export default TopBar;
