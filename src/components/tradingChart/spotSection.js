import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assetsRequest } from '../../Actions/assetsAction';

import LimitBuy from './buysell/limitBuy';
import LimitSell from './buysell/limitSell';

import MarketBuy from './buysell/marketBuy';
import MarketSell from './buysell/marketSell';
import { websocket_url } from './../../Api/index';

const SpotSection = () => {

    const dispatch = new useDispatch();

    const [tabLimit, setTabLimit] = useState(true)
    const [buyLimit, setBuyLimit] = useState(true)

    const users = useSelector((state) => state.users);

    useEffect(() => {
        getAssets();
    }, []);

    const getAssets = async () => {
        await dispatch(assetsRequest());
    }

    const createOrders = (data) => {

        // const ws = new WebSocket(`wss://192.46.222.174:5000`);
        // const ws = new WebSocket(`wss://blcexchange.net:5000/`);
        const ws = new WebSocket(websocket_url);

        ws.addEventListener('open', () => {
            ws.send(JSON.stringify(data));
        })
    }

    return (
        <>
            <div className="aside__price__box">
                <div className="order__details">
                    {/* <div className="order__details__inner">
                        <button className="aside__tabs spot__tab__btn active" id='spot1' value="spotBtn">
                            Spot
                        </button>
                    </div> */}
                    {/* <div className="notification__icon tranding__fee">
                        <img src="../assets/svg/trading-fee-icon.svg" alt="" />
                    </div> */}
                    <div className="tranding__fee__popup">
                        <h3 className="popup__heading">
                            Trading Fee Rate
                        </h3>
                        <p className="popup__info">
                            Basic Trading Fee Rate of BTC/USDT: 0.1% for taker, 0.1% for maker
                        </p>
                        <p className="popup__info">
                            If you have KCS and enabled the 'KCS Pay Fees' feature, you'll get an extra 20% discount on
                            your
                            trading fees.
                        </p>
                    </div>
                </div>
                <div className="order__details">
                    <div className="order__details__inner">
                        <button className={`limit__tabs__button ${tabLimit === true ? 'active' : ''}`} onClick={() => setTabLimit(true)}>
                            Limit
                        </button>
                        <button className={`limit__tabs__button ${tabLimit === false ? 'active' : ''}`} value="1" onClick={() => setTabLimit(false)}>
                            Market
                        </button>
                    </div>
                </div>
                <div className="order__buysell__button">
                    <div className="order__button__details">
                        <button className={`buysell__btn ${buyLimit === true ? 'buysell__btn_active' : ''}`} onClick={() => setBuyLimit(true)}>
                            Buy
                        </button>
                        <button className={`buysell__btn ${buyLimit === false ? 'sell__btn_active' : ''}`} onClick={() => setBuyLimit(false)}>
                            Sell
                        </button>
                    </div>
                </div>

                {/* Limit */}
                <div className={`price__wrapper ${tabLimit === true ? 'active' : ''}`}>          
                    {buyLimit === true
                        ?
                        <LimitBuy createOrders={createOrders} />
                        :
                        <LimitSell users={users} createOrders={createOrders} />
                    }

                </div>

                {/* Market */}
                <div className={`price__wrapper ${tabLimit === false ? 'active' : ''}`}>
                {buyLimit === true
                  ?
                    <MarketBuy createOrders={createOrders} />

                   :
                    <MarketSell createOrders={createOrders} />
                }
                </div>

            </div>

        </>
    );
};

export default SpotSection;
