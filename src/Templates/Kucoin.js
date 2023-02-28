import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { marketCoinRequest } from "../Actions/marketAction";
import { Link, useNavigate } from "react-router-dom";
// import { Splide, SplideSlide } from '@splidejs/react-splide';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

// import section components
import HeroSection from "../components/home-components/hero";
import ExploreSec from "../components/home-components/explore";
import TopGainer from "../components/home-components/topgainer";
import { tokenRequest } from "../Actions/tokenAction";

// import Authentication from "../components/popup/authentication";


// new Splide('.splide').mount();

const Kucoin = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  const itemPerPage = 5;
  const [pageCount, setPageCount] = useState(10);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.coins);

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
    return (() => {
      window.removeEventListener('resize', setDimension);
    })

  }, [screenSize])


  useEffect(() => {
    new Splide('.splide', {
      perPage: 3,
      breakpoints: {
        2560: { fixedWidth: 420 },
        1500: { fixedWidth: 420 },
        1024: { perPage: 2, fixedWidth: 460 },
        800: { perPage: 2, fixedWidth: 330 },
        575: { perPage: 1, fixedWidth: 400 },
        375: { perPage: 1, fixedWidth: 350 },
        350: { perPage: 1, fixedWidth: 295 },
      },
    }).mount();
    const getMarketCoins = async () => {
      await dispatch(marketCoinRequest());
    };
    getMarketCoins();
    getTokenList();

  }, [dispatch]);

  const handlePageClick = (event) => {
    setIsRender(false);
    const newOffset = (event.selected * itemPerPage) % coins.length;
    setItemOffset(newOffset);
  };

  const getTokenList = async () => {
    await dispatch(tokenRequest());
  }

  if (coins.length > 0 && isRender === false) {
    setIsRender(true);
    const endOffset = itemOffset + itemPerPage;
    setCurrentItems(coins.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(coins.length / itemPerPage));
  }

  const navigate = useNavigate()

  return (
    <>
    
     {/* hero section */}
     
      <HeroSection />

      <section className="tradingCoinSection">
        <div className="container py-5">
          <section className="splide" aria-labelledby="carousel-heading">
            <h2 id="carousel-heading" className="carousel-heading">Catch Your Next Trading Opportunity</h2>
            <div className="splide__track">
              <ul className="splide__list">
                <li className="splide__slide">
                  <div className="Card_marketCard" dir="ltr">
                    <div className="Card_title">
                      <div className="Card_text">Hot Coins<span className="Tag_tag">Zero Fees</span>
                      </div>
                      <div>
                      </div>
                    </div>
                    <div className="Card_content">
                      <ul className="List_marketDataList">
                        {coins.length > 0 &&
                          coins.map((item, index) => {
                            return (
                              <li key={index} className="List_item" onClick={()=>navigate('/trading-chart/'+item.FROMSYMBOL)}>
                                <div className="List_left">
                                  <div className="List_imageWrapper">
                                    <span className="first-span">
                                      <span className="secod-span">
                                        <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2732%27%20height=%2732%27/%3e" className="first-image" />
                                      </span>
                                      <img alt="SWEAT/USDT" src={
                                        item.TOKENLOGOURL
                                      } decoding="async" data-nimg="intrinsic" className="List_image second-image" />
                                    </span>
                                  </div>
                                  <div className="List_info">
                                    <p className="List_leftTop">{item.FULLNAME}/USDT</p>
                                    <p className="List_leftBottom">{item.PRICE}</p>
                                  </div>
                                </div>
                                <div className="List_right">
                                  <p className="List_rightTop">
                                    <span dir="ltr" style={{ color: "#eb9f12" }}>{item.CHANGE24HOUR.toFixed(2)}</span>
                                  </p>
                                  <div className="List_rightBottom" dir="ltr">
                                    <span className="List_prefix">VOL</span>
                                    <span className="List_text">{item.VOLUME24HOUR.toFixed(2)}</span>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="splide__slide">
                  <div className="Card_marketCard" dir="ltr">
                    <div className="Card_title">
                      <div className="Card_text">Top Gainers
                      </div>
                      <div>
                      </div>
                    </div>
                    <div className="Card_content">
                      <ul className="List_marketDataList">
                        {coins.length > 0 &&
                          coins.map((item, index) => {
                            return (
                              <li key={index} className="List_item" onClick={()=>navigate('/trading-chart/'+item.FROMSYMBOL)}>
                                <div className="List_left">
                                  <div className="List_imageWrapper">
                                    <span className="first-span">
                                      <span className="secod-span">
                                        <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2732%27%20height=%2732%27/%3e" className="first-image" />
                                      </span>
                                      <img alt="SWEAT/USDT" src={
                                        item.TOKENLOGOURL
                                      } decoding="async" data-nimg="intrinsic" className="List_image second-image" />
                                    </span>
                                  </div>
                                  <div className="List_info">
                                    <p className="List_leftTop">{item.FULLNAME}/USDT</p>
                                    <p className="List_leftBottom">{item.PRICE}</p>
                                  </div>
                                </div>
                                <div className="List_right">
                                  <p className="List_rightTop">
                                    <span dir="ltr" style={{ color: "#eb9f12" }}>{item.CHANGE24HOUR.toFixed(2)}</span>
                                  </p>
                                  <div className="List_rightBottom" dir="ltr">
                                    <span className="List_prefix">VOL</span>
                                    <span className="List_text">{item.VOLUME24HOUR.toFixed(2)}</span>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="splide__slide">
                  <div className="Card_marketCard" dir="ltr">
                    <div className="Card_title">
                      <div className="Card_text">Recent Coins
                      </div>
                      <div>
                      </div>
                    </div>
                    <div className="Card_content">
                      <ul className="List_marketDataList">
                        {coins.length > 0 &&
                          coins.map((item, index) => {
                            return (
                              <li key={index} className="List_item" onClick={()=>navigate('/trading-chart/'+item.FROMSYMBOL)}>
                                <div className="List_left">
                                  <div className="List_imageWrapper">
                                    <span className="first-span">
                                      <span className="secod-span">
                                        <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2732%27%20height=%2732%27/%3e" className="first-image" />
                                      </span>
                                      <img alt="SWEAT/USDT" src={
                                        item.TOKENLOGOURL
                                      } decoding="async" data-nimg="intrinsic" className="List_image second-image" />
                                    </span>
                                  </div>
                                  <div className="List_info">
                                    <p className="List_leftTop">{item.FULLNAME}/USDT</p>
                                    <p className="List_leftBottom">{item.PRICE}</p>
                                  </div>
                                </div>
                                <div className="List_right">
                                  <p className="List_rightTop">
                                    <span dir="ltr" style={{ color: "#eb9f12" }}>{item.CHANGE24HOUR.toFixed(2)}</span>
                                  </p>
                                  <div className="List_rightBottom" dir="ltr">
                                    <span className="List_prefix">VOL</span>
                                    <span className="List_text">{item.VOLUME24HOUR.toFixed(2)}</span>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </section>

      <ExploreSec />
      
      <section className="why_section">
        <div className="container py-5">
          <h1 className="text-center themeColor mb-5">Why BLC Exchange?</h1>
          <div className="d-flex flex-wrap justify-content-center justify-content-xl-between gap-4">
            <div className="card bg-transparent text-center border-0 why_card">
              <div className="m-auto">
                <img
                  src={require("../assets/images/why-ex.png")}
                  className="card-img-top w-75"
                  alt="..."
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Simplicity</h5>
                <p className="card-text">
                  BLC Exchange makes it easy to buy and sell crypto using our{" "}
                  <a
                    className="themeColor text-decoration-none hover-overlay-none"
                    href="/"
                  >
                    mobile apps.{" "}
                  </a>
                </p>
              </div>
            </div>
            <div className="card bg-transparent text-center border-0 why_card">
              <div className="m-auto">
                <img
                  src={require("../assets/images/why-ex.png")}
                  className="card-img-top w-75"
                  alt="..."
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Simplicity</h5>
                <p className="card-text">
                  BLC Exchange makes it easy to buy and sell crypto using our{" "}
                  <a
                    className="themeColor text-decoration-none hover-overlay-none"
                    href="/"
                  >
                    mobile apps.{" "}
                  </a>
                </p>
              </div>
            </div>
            <div className="card bg-transparent text-center border-0 why_card">
              <div className="m-auto">
                <img
                  src={require("../assets/images/why-ex.png")}
                  className="card-img-top w-75"
                  alt="..."
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Simplicity</h5>
                <p className="card-text">
                  BLC Exchange makes it easy to buy and sell crypto using our{" "}
                  <a
                    className="themeColor text-decoration-none hover-overlay-none"
                    href="/"
                  >
                    mobile apps.{" "}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TopGainer />
      
      
      <section className="sec__media__saying">
        <div className="container">
          <div className="sec__content">
            <h2 className="sec__heading">What the Media Is Saying</h2>
          </div>
          <div className="sec__slider">
            {/*  Swiper */}
            <Swiper
              
              spaceBetween={30}
              centeredSlides={true}
              className="swiper mySwiper media__slider"
              navigation={true}
              modules={[Navigation]}
              breakpoints={{
                576: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 3,
                },
              }}
            >
              <SwiperSlide>
                <div className="media__logo">
                  <img src="./assets/img/media-icon1.png" alt="" />
                  <span>TokenInsight</span>
                </div>
                <div className="prernt">
                  <div className="slider__bottom__text">
                    <p>
                      Heavy hitter when it comes to the sheer amount of coins
                      available, BLC Exchange provides access to a wide library
                      of altcoins at low fees.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="media__logo">
                  <img src="./assets/img/media-icon2.png" alt="" />
                  <span>MarketWatch</span>
                </div>
                <div className="prernt">
                  <div className="slider__bottom__text">
                    <p>
                      BLC Exchange is the exchange with the most widely
                      distributed visitors. Also, 70% of its users come from
                      North America, Europe, Russia and SEA.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="media__logo">
                  <img src="./assets/img/media-icon3.png" alt="" />
                  <span>Coinmarketcap</span>
                </div>
                <div className="prernt">
                  <div className="slider__bottom__text">
                    <p>
                      BLC Exchange has, as a reputable and one of the most
                      well-known crypto platforms, been persistent in its
                      pursuit of finding and supporting blockchain and
                      cryptocurrency projects with real potential.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="media__logo">
                  <img src="./assets/img/media-icon4.png" alt="" />
                  <span>Forbes</span>
                </div>
                <div className="slider__bottom__text">
                  <p>
                    BLC Exchange is a top 5 spot exchange in terms of overall
                    performance
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/*  Faq Section */}
      <section className="sec__faq">
        <div className="container">
          <h2 className="sec__heading">FAQ</h2>
          <div className="sec__content">
            <div className="faq__card">
              <h3 className="card__heading">What is Bitcoin?</h3>
              <p className="card__info">
                Bitcoin is a decentralized digital currency, meaning that it
                lacks a central bank or single administrator. Bitcoin can be
                sent from user to user through the peer-to-peer network without
                the need for intermediaries.
              </p>
            </div>
            <div className="faq__card">
              <h3 className="card__heading">Is BLC Exchange safe?</h3>
              <p className="card__info">
                BLC Exchange boasts one of the world's most sophisticated
                security technology and maintenance team, and is constantly
                upgrading our security systems to ensure t
              </p>
            </div>
            <div className="faq__card">
              <h3 className="card__heading">
                Can I start trading with just $1?
              </h3>
              <p className="card__info">
                BLC Exchange allows users to improve their practical experience
                through a variety of trading and financial products for as low
                as $1..
              </p>
            </div>
            <div className="faq__card">
              <h3 className="card__heading">
                Is there an exchange limit between fiat and crypto?
              </h3>
              <p className="card__info">
                BLC Exchange has no restrictions on the exchange between fiat
                and crypto, and supports over 50 fiat currencies through our P2P
                market and credit/debit card channel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*  Section  */}
      <section className="sec__crypto__journey">
        <div className="container">
          <h2 className="sec__heading">Start Your Crypto Journey Now!</h2>
          <p className="sec__info">
            With the BLC Exchange app and website, trading has never been
            easier.
          </p>
          <Link to="/sign-up" className="sec__btn">
            Sign Up Now
          </Link>
        </div>
      </section>

      {/*  Service Buttons */}
      <ul className="service__items">
        <li>
          <Link to="/">
            <img src="./assets/svg/faq.svg" alt="" />
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src="./assets/svg/sms-icon.svg" alt="" />
          </Link>
          <div className="qr__code">
            <h4>Scan to Join</h4>
            <img src="./assets/img/sms-qr.png" alt="" />
            <div className="inner__link">
              <Link to="/">
                <span>BLC Exchange Community</span>
                <img src="./assets/svg/qr__code__arrow.svg" alt="" />
              </Link>
            </div>
          </div>
        </li>
        
      </ul>

      {/* <Authentication /> */}
    </>
  );
};
export default Kucoin;
