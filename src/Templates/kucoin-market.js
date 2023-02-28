import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { assetsnav, mainAccountpage } from "../Constants/lang/lang";
import ReactPaginate from 'react-paginate';
import marketTabs from '../assets/marketdata.json';
import { marketCoinRequest } from "../Actions/marketAction";
import Table from 'react-bootstrap/Table';

const KucoinMarket = () => {
    const navigate = useNavigate();
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    let tabs = marketTabs.SpotTabs;
    let futureTabs = marketTabs.FutureTabs;
    let InnerTab = tabs[0].subTabs;
    const dispatch = useDispatch();
    const coins = useSelector((state) => state.coins);

    const [innerTabs, setInnerTabs] = useState(InnerTab);
    const [currentHeaderTab, setCurrentHeaderTab] = useState(0);
    const [currentMainTab, setCurrentMainTab] = useState(0);
    const [currentInnerTab, setCurrentInnerTab] = useState(0);
    const itemPerPage = 10;
    const [pageCount, setPageCount] = useState(10);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [isRender, setIsRender] = useState(false);

    useEffect(() => {
        const getMarketCoins = async () => {
            await dispatch(marketCoinRequest());
        }
        getMarketCoins();
    }, [dispatch]);

    const handleMainTabClick = (id) => {
        let tab = tabs.filter((item) => {
            return item.id === id;
        })
        setCurrentMainTab(id);
        setInnerTabs(tab[0].subTabs);
    };

    const handleInnerTabClick = (id) => {
        setCurrentInnerTab(id);
    }

    const handlePageClick = (event) => {
        setIsRender(false);
        const newOffset = (event.selected * itemPerPage) % coins.length;
        setItemOffset(newOffset);
    }

    if (Object.keys(coins).length > 0 && isRender === false) {
        setIsRender(true);
        const endOffset = itemOffset + itemPerPage;
        setCurrentItems(coins.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(coins.length / itemPerPage));
    }

    const ref = useRef(null);

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    return (
        <>
            <section className="market__wrapper new_market_sec">
                <div className="main__multi__tabs">
                    <div className="container">
                        <div className="multi__tab__wrapper">
                            <button className={currentHeaderTab === 0 ? "multi__tab__btn show" : "multi__tab__btn "} onClick={() => setCurrentHeaderTab(0)}>Spot</button>
                            <button className={currentHeaderTab === 1 ? "multi__tab__btn show" : "multi__tab__btn "}>Futures</button>
                            <a href="#" className="new__listing__link">New Listings</a>
                            <div className="other__filters">
                                <input type="text" className="search__input" autoComplete="off" placeholder="Search Market" />
                            </div>
                            <span className="tabs__bottom__line line-modifier"></span>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className={currentHeaderTab === 0 ? "main__multi__tab__content mainTabContent show" : "main__multi__tab__content mainTabContent"} >

                        <div className="innerTabContent">
                            <div className="inner__tab__content show tabs--perent" id="USD">
                                {/* table header section start -->*/}
                                <div className="pair__coins">
                                    <Table responsive="sm">
                                        <thead>
                                            <tr>
                                                <th className="table__data first"><button
                                                    className="confrigation Contracts">Pair</button></th>
                                                <th className="table__data"><button className="confrigation">Last Price</button>
                                                </th>
                                                <th className="table__data"><button className="confrigation">24H Change</button>
                                                </th>
                                                <th className="table__data"><button className="confrigation">MarketCap Supply
                                                </button></th>
                                                <th className="table__data"><button className="confrigation">Volume (24H)</button>
                                                </th>
                                                <th className="table__data"><button className="confrigation">Action</button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item,index) => {
                                                return <tr key={index} className="content__row">
                                                    <td className="table__data first">
                                                        <div className="coin futures">
                                                            <div className="coin__icons">
                                                                <svg width="16" height="16" viewBox="0 0 16 16"
                                                                    fill="#97989b" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill="#97989b"
                                                                        d="M13.4698 4.5188L13.7689 4.2196C14.3185 3.67004 14.3186 2.78064 13.7689 2.23108C13.2207 1.68286 12.3286 1.68286 11.7804 2.23108L11.291 2.72046C10.6997 2.40649 10.066 2.17957 9.40625 2.04626V0.9375H9.875C10.1339 0.9375 10.3438 0.727661 10.3438 0.46875C10.3438 0.209839 10.1339 0 9.875 0H6.125C5.86609 0 5.65625 0.209839 5.65625 0.46875C5.65625 0.727661 5.86609 0.9375 6.125 0.9375H6.59375V2.04626C5.93396 2.17957 5.30029 2.40649 4.70898 2.72046L4.2196 2.23108C3.67139 1.68286 2.7793 1.68286 2.23108 2.23108C1.68152 2.78064 1.6814 3.67004 2.23108 4.2196L2.53015 4.5188C1.51868 5.76599 0.96875 7.30945 0.96875 8.9375C0.96875 12.8318 4.12292 16 8 16C11.8771 16 15.0312 12.8318 15.0312 8.9375C15.0312 7.30945 14.4813 5.76599 13.4698 4.5188V4.5188ZM12.4432 2.89392C12.626 2.71118 12.9233 2.71118 13.1061 2.89392C13.2892 3.07715 13.2893 3.37354 13.1061 3.55676L12.8325 3.83032C12.6027 3.61255 12.3604 3.41223 12.1077 3.22949L12.4432 2.89392ZM7.53125 0.9375H8.46875V1.922C8.31335 1.91187 8.1571 1.90625 8 1.90625C7.8429 1.90625 7.68665 1.91187 7.53125 1.922V0.9375ZM2.89392 2.89392C3.07666 2.7113 3.3739 2.7113 3.55676 2.89392L3.89233 3.22961C3.63965 3.41223 3.39734 3.61255 3.16748 3.83032L2.89392 3.55676C2.71082 3.37354 2.71069 3.07715 2.89392 2.89392ZM8 15.0625C4.63989 15.0625 1.90625 12.3148 1.90625 8.9375C1.90625 5.57739 4.63989 2.84375 8 2.84375C11.3601 2.84375 14.0938 5.57739 14.0938 8.9375C14.0938 12.3148 11.3601 15.0625 8 15.0625V15.0625Z">
                                                                    </path>
                                                                    <path fill="#97989b"
                                                                        d="M8 3.78125C5.15686 3.78125 2.84375 6.09436 2.84375 8.9375C2.84375 11.7806 5.15686 14.0938 8 14.0938C10.8431 14.0938 13.1562 11.7806 13.1562 8.9375C13.1562 6.09436 10.8431 3.78125 8 3.78125ZM8.46875 13.13V12.6875C8.46875 12.4286 8.25891 12.2188 8 12.2188C7.74109 12.2188 7.53125 12.4286 7.53125 12.6875V13.13C5.57874 12.9132 4.02429 11.3588 3.8075 9.40625H4.25C4.50891 9.40625 4.71875 9.19641 4.71875 8.9375C4.71875 8.67859 4.50891 8.46875 4.25 8.46875H3.8075C4.02429 6.51624 5.57874 4.96179 7.53125 4.745V5.1875C7.53125 5.44641 7.74109 5.65625 8 5.65625C8.25891 5.65625 8.46875 5.44641 8.46875 5.1875V4.745C10.4213 4.96179 11.9757 6.51636 12.1925 8.46875H11.75C11.4911 8.46875 11.2812 8.67859 11.2812 8.9375C11.2812 9.19641 11.4911 9.40625 11.75 9.40625H12.1925C11.9757 11.3588 10.4213 12.9132 8.46875 13.13V13.13Z">
                                                                    </path>
                                                                    <path fill="#97989b"
                                                                        d="M9.875 8.46875H8.46875V7.0625C8.46875 6.80359 8.25891 6.59375 8 6.59375C7.74109 6.59375 7.53125 6.80359 7.53125 7.0625V8.9375C7.53125 9.19641 7.74109 9.40625 8 9.40625H9.875C10.1339 9.40625 10.3438 9.19641 10.3438 8.9375C10.3438 8.67859 10.1339 8.46875 9.875 8.46875Z">
                                                                    </path>
                                                                </svg>

                                                                <svg width="12" height="12" viewBox="0 0 11 11"
                                                                    fill="#97989b" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill="#97989b"
                                                                        d="M10.2819 4.72645L8.14067 6.8137L8.64633 9.7617C8.66833 9.89061 8.61539 10.0209 8.50952 10.0979C8.44971 10.1415 8.37855 10.1635 8.30739 10.1635C8.25274 10.1635 8.19774 10.1505 8.14755 10.124L5.49999 8.73217L2.85277 10.1237C2.73727 10.1849 2.59668 10.1749 2.4908 10.0975C2.38493 10.0205 2.33199 9.89026 2.35399 9.76136L2.85965 6.81335L0.718087 4.72645C0.624587 4.63501 0.590555 4.4982 0.631118 4.3741C0.67168 4.25001 0.779274 4.15891 0.908868 4.14001L3.86821 3.71032L5.19165 1.02838C5.30749 0.7936 5.69249 0.7936 5.80833 1.02838L7.13177 3.71032L10.0911 4.14001C10.2207 4.15891 10.3283 4.24967 10.3689 4.3741C10.4094 4.49854 10.3754 4.63467 10.2819 4.72645V4.72645Z">
                                                                    </path>
                                                                </svg>
                                                            </div>
                                                            <div className="coin__info">
                                                                <img src={item.TOKENLOGOURL} alt="error" />
                                                                <p className="coin__name">{item.FULLNAME} </p>

                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="table__data">
                                                        <p className="last__price ">{item.PRICE}</p>
                                                    </td>
                                                    <td className="table__data">
                                                        <p className="last__price change">{item.CHANGE24HOUR.toFixed(2)}%</p>
                                                    </td>
                                                    <td className="table__data">
                                                        <p className="last__price">{item.MKTCAP}</p>
                                                    </td>
                                                    <td className="table__data">
                                                        <p className="last__price">{item.VOLUME24HOUR}</p>
                                                    </td>
                                                    <td className="table__data">
                                                        <div style={{ maxHeight: '80px', overflowWrap: 'break-word' }}>
                                                            <div className="actionCol___2onsg">
                                                                <a onClick={() => navigate('/p2p/trade/' + assetsnav['0']['Deposit']['url'])} className="actionLink___1_b7r border"><i className="fas fa-sort-amount-down"></i>{mainAccountpage['0']['Deposit']['en']}</a>
                                                                <a onClick={() => navigate('/user/assets/' + assetsnav['0']['Withdraw']['url'])} className="actionLink___1_b7r border"><i className="fas fa-sort-amount-up"></i>{mainAccountpage['0']['Withdraw']['en']}</a>
                                                                <a className="actionLink___1_b7r border" onClick={() => navigate("/trading-chart/" + item.FROMSYMBOL)}><i className="fas fa-exchange-alt"></i>Trade</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                                {/* table header section end -->*/}
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12">
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
                        </div>
                    </div>
                    {/** Spot Tab End */}

                    {/** Futures Tab Start */}
                    <div className={currentHeaderTab === 1 ? "main__multi__tab__content mainTabContent futures show" : "main__multi__tab__content mainTabContent futures"} >
                        {/* multi tab content -->*/}
                        <div className="crypto__tabs__wrapper">
                            <div className="crypto__tabs">
                                <div className="tabs__btns">
                                    <a href="/">
                                        <svg width={11} height={11} viewBox="0 0 11 11" fill="#97989b" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#97989b" d="M10.2819 4.72645L8.14067 6.8137L8.64633 9.7617C8.66833 9.89061 8.61539 10.0209 8.50952 10.0979C8.44971 10.1415 8.37855 10.1635 8.30739 10.1635C8.25274 10.1635 8.19774 10.1505 8.14755 10.124L5.49999 8.73217L2.85277 10.1237C2.73727 10.1849 2.59668 10.1749 2.4908 10.0975C2.38493 10.0205 2.33199 9.89026 2.35399 9.76136L2.85965 6.81335L0.718087 4.72645C0.624587 4.63501 0.590555 4.4982 0.631118 4.3741C0.67168 4.25001 0.779274 4.15891 0.908868 4.14001L3.86821 3.71032L5.19165 1.02838C5.30749 0.7936 5.69249 0.7936 5.80833 1.02838L7.13177 3.71032L10.0911 4.14001C10.2207 4.15891 10.3283 4.24967 10.3689 4.3741C10.4094 4.49854 10.3754 4.63467 10.2819 4.72645V4.72645Z" />
                                        </svg>
                                        Favorites
                                    </a>
                                    {futureTabs.map((item, index) => {
                                        return <button key={index} className="inner__tabs__btn show">{item.name}</button>
                                    })}
                                    <span className="tabs__bottom__line  future-line" style={{ width: '84px', left: '483.8125px' }} />
                                </div>
                            </div>
                            <div className="other__filters">
                                <input type="text" className="search__input" autoComplete="off" placeholder="Search" />
                            </div>
                        </div>

                        <div className="inner__tab__content show">
                            <div className="coins__tabs__content visible">
                                <div className="all__coins__content">
                                    <div className="upper__filters">
                                        <Table responsive="sm">
                                            <thead>
                                                <tr>
                                                    <th className="table__data first"><button
                                                        className="confrigation Contracts">Contracts</button></th>
                                                    <th className="table__data"><button className="confrigation">Last Price</button>
                                                    </th>
                                                    <th className="table__data"><button className="confrigation">24H Change</button>
                                                    </th>
                                                    <th className="table__data"><button className="confrigation">Volume
                                                        (24H)</button></th>
                                                    <th className="table__data"><button className="confrigation">24H High</button>
                                                    </th>
                                                    <th className="table__data"><button className="confrigation">24H Low</button>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {futureTabs.map((item, index) => {
                                                    return <tr key={index} className="content__row">
                                                        <td className="table__data first">
                                                            <div className="coin futures">
                                                                <div className="coin__icons futures">
                                                                    <svg width="12" height="12" viewBox="0 0 11 11"
                                                                        fill="#97989b" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill="#97989b"
                                                                            d="M10.2819 4.72645L8.14067 6.8137L8.64633 9.7617C8.66833 9.89061 8.61539 10.0209 8.50952 10.0979C8.44971 10.1415 8.37855 10.1635 8.30739 10.1635C8.25274 10.1635 8.19774 10.1505 8.14755 10.124L5.49999 8.73217L2.85277 10.1237C2.73727 10.1849 2.59668 10.1749 2.4908 10.0975C2.38493 10.0205 2.33199 9.89026 2.35399 9.76136L2.85965 6.81335L0.718087 4.72645C0.624587 4.63501 0.590555 4.4982 0.631118 4.3741C0.67168 4.25001 0.779274 4.15891 0.908868 4.14001L3.86821 3.71032L5.19165 1.02838C5.30749 0.7936 5.69249 0.7936 5.80833 1.02838L7.13177 3.71032L10.0911 4.14001C10.2207 4.15891 10.3283 4.24967 10.3689 4.3741C10.4094 4.49854 10.3754 4.63467 10.2819 4.72645V4.72645Z">
                                                                        </path>
                                                                    </svg>
                                                                </div>
                                                                <div className="coin__info">
                                                                    <img src="assets/img/BTC.png" alt="error" />
                                                                    <p className="coin__name">BTC PERP/USDT </p>

                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="table__data">
                                                            <p className="last__price ">38,340 <span>38,350.33 USD</span></p>
                                                        </td>
                                                        <td className="table__data">
                                                            <p className="last__price change">-0.04%</p>
                                                        </td>
                                                        <td className="table__data">
                                                            <p className="last__price">1,128,912,385.83</p>
                                                        </td>
                                                        <td className="table__data">
                                                            <p className="last__price">39,210</p>
                                                        </td>
                                                        <td className="table__data">
                                                            <p className="last__price">2,716.6</p>
                                                        </td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/** Futures Tab End */}
                </div>

            </section>
        </>
    )
}

export default KucoinMarket;

