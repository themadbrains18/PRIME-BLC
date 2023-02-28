import React from "react";
import BigNumber from "bignumber.js";
import { CryptoState } from "../../CryptoContext";
// import Moment from 'react-moment';
import moment from "moment";

const OrderRow = (props) => (
    <>
        <li className="data" key={`${props.i}:${props.ba[0]}:${props.ba[1]}`}>
            <ul>
                <li>{new BigNumber(props.ba[0]).toFormat(null, 1)}</li>
                <li>{new BigNumber(props.ba[1]).toFormat(null, 1)}</li>
                <li>{new BigNumber(props.ba[0] * props.ba[1]).toFixed(2)}</li>
            </ul>
        </li>
    </>
);

const OrderRowTimer = (props) => (
    <>
        <li className="data" key={`${props.i}:${props.ba[0]}:${props.ba[1]}`}>
            <ul>
                <li>{new BigNumber(props.ba[0]).toFormat(null, 1)}</li>
                <li>{new BigNumber(props.ba[1]).toFormat(null, 1)}</li>
                <li>
                    {moment(props.times).format('MMMM DD YYYY, hh:mm:ss')}
                </li>
            </ul>
        </li>
    </>
);

const OrderBook = (props) => {
    const { currency, symbol, currencyId } = CryptoState();

    // console.log('order props',props.asks[0][0])
    let bids = [];
    let asks = [];
    let asksTime = [];
    let numRowsBid = Math.min(20, props.bids.length);
    let numRowsAsk = Math.min(20, props.asks.length);
    let maxBid = BigNumber.maximum(props.bids.map((bid) => bid[0])).toFormat();
    let minAsk = BigNumber.minimum(props.asks.map((ask) => ask[0])).toFormat();
    let minBid = new BigNumber(maxBid)
        .minus(BigNumber.minimum(props.bids.map((bid) => bid[0])))
        .toFormat();
    let maxAsk = new BigNumber(minAsk)
        .minus(BigNumber.maximum(props.asks.map((ask) => ask[0])))
        .toFormat();
    for (var b = 0; b < numRowsBid; b++) {
        bids.push(
            <OrderRow
                i={b}
                ba={props.bids[b]}
                diff={maxBid}
                max={minBid}
                className="bg-success"
            />
        );
    }
    for (var a = 0; a < numRowsAsk; a++) {
        asks.unshift(
            <OrderRow
                i={a}
                ba={props.asks[a]}
                diff={minAsk}
                max={maxAsk}
                className="bg-danger"
            />
        );
    }

    for (var a = 0; a < numRowsAsk; a++) {
        asksTime.unshift(
            <OrderRowTimer
                i={a}
                ba={props.asks[a]}
                diff={minAsk}
                max={maxAsk}
                times={props.time}
                className="bg-danger"
            />
        );
    }
    return (
        <>
            {/* <div className=" my-2 w-100 order-book">
            <div className="card-header">Order Book <span className="text-muted small">Bid-Ask Spread</span></div>
            <ul className="list-group list-group-flush">
            <div className="row">

            <div className="col-12 col-sm-6 text-danger">{asks}</div>
            <div className="col-12 col-sm-6 text-success" >  {bids}</div>
            </div>
            </ul>
        </div>   */}

            <div className="aside__tradde__main">
                <div>
                    <div className="tred__data grid__tred__data active tabs__data__tmb">
                        <div id="selling">
                            <h2 className="sec__heading">Order Book</h2>
                            <div className="inner__heading">
                                <span>Price(USDT)</span>
                                <span>Amount({props.id.toUpperCase()})</span>
                                <span>Total({props.id.toUpperCase()})</span>
                            </div>
                            <ul className="price down--price">
                                <div>{asks}</div>
                            </ul>
                        </div>
                        <div id="buying">

                            <div className="chnage__trade">
                                <div>
                                    <span>
                                        {new BigNumber(props.asks[0][0]).toFormat(null, 1)}
                                    </span>
                                    <span>USDT</span>
                                </div>
                            </div>
                            <div className="inner__heading">
                                <span>Price(USDT)</span>
                                <span>Amount({props.id.toUpperCase()})</span>
                                <span>Total({props.id.toUpperCase()})</span>
                            </div>
                            <ul className="price up--price">
                                <div>{bids}</div>
                            </ul>
                        </div>
                    </div>

                </div>

                <div>
                    <div className="tabs__recent__trades">
                        <button className="sec__heading tmb__tab__btn active">
                            Recent Trades
                        </button>
                        <button className="sec__heading tmb__tab__btn">Market Depth</button>
                    </div>
                    <div className="tabs__recent__trades__content tabs__data__tmb active">
                        <div className="inner__heading">
                            <span>Price(USDT)</span>
                            <span>Amount({props.id.toUpperCase()})</span>
                            <span>Time</span>
                        </div>
                        <div className="tred__data recent__trade">
                            <ul className="price price--height  trade">
                                <div
                                    className="text-success"
                                    style={{ color: "green !importent" }}
                                >
                                    {" "}
                                    {asksTime}
                                </div>

                                {/* <div className='text-danger' >{asks}</div> */}
                            </ul>
                        </div>
                    </div>
                    <div className="tabs__recent__trades__content tabs__data__tmb"></div>
                </div>
            </div>
        </>
    );
};

export default OrderBook;
