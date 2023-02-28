import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TradingViewWidget from "../components/tradingChart/globalChart";
// import { TVChartContainer } from "../components/tradingChart/tradingChart";
import Trade from "../components/tradingChart/trade";
import { CryptoState } from "../CryptoContext";
import { marketCoinRequest } from "../Actions/marketAction";
import TradingLeft from "../components/tradingChart/tradingLeft";
import OrderHistory from "../components/tradingChart/orderHistory";
import SpotSection from "../components/tradingChart/spotSection";
import TopBar from "./topBar";

const TrendingChart = () => {
    const { currency } = CryptoState();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    localStorage.setItem("symbolName", id)
    const tokenList = useSelector((state) => state.deposittokens);
    let IsToken = tokenList.filter((item) => {
        return item.coinName === id
    });
    useEffect(() => {
        const getMarketCoins = async () => {
            await dispatch(marketCoinRequest());
        }
    
        if (IsToken.length === 0) {
            navigate('/trading-chart/BNB')
        }
        getMarketCoins();
    }, [dispatch]);

    const coins = useSelector((state) => state.coins);
    
    let type = coins.filter((item) => {
        return item.FROMSYMBOL === id
    });

    

    // console.log(type[0].TOKENTYPE, 'token type')
    // window.scroll({
    //     top: 0, 
    //     left: 0, 
    //     behavior: 'smooth'
    //   });
    return (
        <>
            {IsToken.length > 0 &&
                <div className='treding__graph__body trading--graph trading_main'>
                    <div className="graph__grid graph-m-top ">
                        <TradingLeft coins={coins} />
                        <div className="tradingview-widget-container ">

                            <TopBar id={id} />
                            {/* {type != undefined && type.length > 0 && type[0].TOKENTYPE === "global" ?
                        <TradingViewWidget symbol={id + currency} /> : <TVChartContainer symbol={id + currency} />
                    } */}
                            <TradingViewWidget symbol={id + currency} />
                            <div className="aside__box " style={{ maxWidth: '1266px', width: '100%', marginTop: '10px' }}>
                                <div className="aside__order__book">
                                    <Trade currencyId={id + 'usdt'} />
                                </div>
                            </div>
                        </div>
                        <div className="aside__box">
                            <div className="aside__order__book">
                                <div className="order__wapper">
                                    <OrderHistory />
                                    <SpotSection />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default TrendingChart;
