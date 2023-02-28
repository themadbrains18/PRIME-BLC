import HeroSection from "../../../home-components/hero";
import './institutional.css';

import liquidity from '../assets/img/liquidity.svg'
import reliability from '../assets/img/reliability.svg'
import apiConnection from '../assets/img/API-connection.svg'

import tradingfee from '../assets/img/trading-fee.svg'
import marketmaker from '../assets/img/market-maker.svg'
import lendingService from '../assets/img/lending-service.svg'
import tradingSubaccount from '../assets/img/trading-subaccount.svg'
import brokerProgram from '../assets/img/broker-program.svg'

const Institutional = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  return (<>
    <HeroSection />

    <div className="trade__TradeContainer">
      <div className="container">
        <div className="main__container container-padding">
          <div className="trade__header">
            <div className="main__title trade__title">
              Trade to the Next Level
            </div>
          </div>
          <div className="trade__features">
            <div className="trade__advantages-item">
              <img className="trade__advantages-img" src={liquidity} alt="" />
              <h5 className="trade__advantages-title">Consistent Deep Liquidity</h5>
            </div>
            <span className="trade__advantages-divide-line"></span>
            <div className="trade__advantages-item">
              <img className="trade__advantages-img" src={reliability} alt="" />
              <h5 className="trade__advantages-title">Time-tested Reliability</h5>
            </div>
            <span className="trade__advantages-divide-line"></span>
            <div className="trade__advantages-item">
              <img className="trade__advantages-img" src={apiConnection} alt="" />
              <h5 className="trade__advantages-title">Express API Connection</h5>
            </div>
          </div>
          <div className="trade__advantages">
            <div className="card__CardContainer card__box-bg">
              <div className="trade_card__box">
                <div className="card__title">
                  <span className="card__border"></span>Futures Trading
                </div>
                <div className="card__content-bg">
                  <div className="card__content-top">
                    <p className="card__count">&gt;160</p>
                    <p className="card__unit">Pairs</p>
                  </div>
                  <p className="section__desc">One of the largest futures by trading volume and an extensive selection of BLC Exchange Futures contracts.</p>
                </div>
              </div>
            </div>
            <div className="card__CardContainer card__box-bg">
              <div className="trade_card__box">
                <div className="card__title">
                  <span className="card__border"></span>Options Trading
                </div>
                <div className="card__content-bg">
                  <div className="card__content-top">
                    <p className="card__count">&gt;3</p>
                    <p className="card__unit">Options</p>
                  </div>
                  <p className="section__desc">BLC Exchange’s USDC Options is the first stablecoin-settled linear options with portfolio margin in the market.</p>
                </div>
              </div>
            </div>
            <div className="card__CardContainer card__box-bg">
              <div className="trade_card__box">
                <div className="card__title">
                  <span className="card__border"></span>Spot Trading
                </div>
                <div className="card__content-bg">
                  <div className="card__content-top">
                    <p className="card__count">&gt;250</p>
                    <p className="card__unit">Pairs</p>
                  </div>
                  <p className="section__desc">Manage diverse assets from margin trading to leveraged tokens — all with the best-in-the-industry trading fees.</p>
                </div>
              </div>
            </div>
            <div className="card__CardContainer card__box-bg">
              <div className="trade_card__box">
                <div className="card__title">
                  <span className="card__border"></span>Block Trading
                </div>
                <div className="card__content-bg">
                  <div className="card__content-top">
                    <p className="card__count">&gt;500+</p>
                    <p className="card__unit">Pairs</p>
                  </div>
                  <p className="section__desc">Block trades simplified with Paradigm with the best price on large positions.</p>
                </div>
              </div>
            </div>
          </div>
          <button className="institution__contained-btn institution-trade__btn">Get Started</button>
        </div>

        <div className="solution__Container">
          <div className="solution_main_container">
            <div className="solution__header">
              <h2 className="solution__main__title">
                Tailor-made Solutions for Every Institutions Need
              </h2>
            </div>
            <div className="institution-solution__content">
              <div className="card__CardContainer-sc-z1lxr9-0 jfsJKa">
                <div className="institution-card__box">
                  <img src={tradingfee} alt="" className="institution-card__img" />
                  <div className="institution-card__content-bg">
                    <div className="institution-card__title">Competitive Trading Fee</div>
                    <div className="institution-card__content">
                      <div className="institution-card__content-item">
                        <span className="institution-card__content-item-dot"></span>
                        <p className="institution-card__content-item-text">Tier fees with up to 80% discounts</p>
                      </div>
                      <div className="institution-card__content-item">
                        <span className="institution-card__content-item-dot"></span>
                        <p className="institution-card__content-item-text">Dedicated Ins Ambassador</p>
                      </div>
                      <div className="institution-card__content-item">
                        <span className="institution-card__content-item-dot"></span>
                        <p className="institution-card__content-item-text">Invitation Program with benefit</p>
                      </div>
                    </div>
                    <p className="institution-section__desc">Enjoy competitive trading perks all year round — from discounted trading fees to exclusive events.</p>
                  </div>
                  <div className="institution-card__btn-bg">
                    <button className="institution__contained-btn institution-card__explore-btn">Apply Now</button>
                    <button className="institution__outline-btn institution-card__view-btn">View Detail</button>
                  </div>
                </div>
              </div>
              <div className="card__CardContainer-sc-z1lxr9-0 jfsJKa">
                <div className="institution-card__box"><img src={marketmaker} alt="" className="institution-card__img" />
                  <div className="institution-card__content-bg"><div className="institution-card__title">Market Maker Program</div>
                    <div className="institution-card__content"><div className="institution-card__content-item">
                      <span className="institution-card__content-item-dot"></span>
                      <p className="institution-card__content-item-text">Attractive maker rebates</p>
                    </div>
                      <div className="institution-card__content-item">
                        <span className="institution-card__content-item-dot"></span>
                        <p className="institution-card__content-item-text">Higher API Rate Limit</p>
                      </div>
                      <div className="institution-card__content-item">
                        <span className="institution-card__content-item-dot"></span>
                        <p className="institution-card__content-item-text">Unparalleled data services</p>
                      </div>
                    </div>
                    <p className="institution-section__desc">Unlock competitive maker rebates by enabling your tokens to be liquid on BLC Exchange Spot or Derivatives.</p>
                  </div>
                  <div className="institution-card__btn-bg">
                    <button className="institution__contained-btn institution-card__explore-btn">Apply Now</button>
                    <button className="institution__outline-btn institution-card__view-btn">View Detail</button>
                  </div>
                </div>
              </div>
              <div className="card__CardContainer-sc-z1lxr9-0 jfsJKa">
                <div className="institution-card__box"><img src={lendingService} alt="" className="institution-card__img" />
                  <div className="institution-card__content-bg">
                    <div className="institution-card__title">Institutional Lending Service</div>
                    <div className="institution-card__content">
                      <div className="institution-card__content-item">
                        <span className="institution-card__content-item-dot">
                        </span>
                        <p className="institution-card__content-item-text">Competitive loan rates</p>
                      </div>
                      <div className="institution-card__content-item">
                        <span className="institution-card__content-item-dot"></span>
                        <p className="institution-card__content-item-text">Full ownership of the borrowed funds</p>
                      </div>
                      <div className="institution-card__content-item">
                        <span className="institution-card__content-item-dot"></span>
                        <p className="institution-card__content-item-text">Wide selection of collaterals and assets</p>
                      </div>
                    </div>
                    <p className="institution-section__desc">Fulfill your funding needs with BLC Exchange's immediate lending solutions to maximize market opportunities.</p>
                  </div>
                  <div className="institution-card__btn-bg">
                    <button className="institution__contained-btn institution-card__explore-btn">Apply Now</button>
                    <button className="institution__outline-btn institution-card__view-btn">View Detail</button>
                  </div>
                </div>
              </div>
              <div className="card__CardContainer-sc-z1lxr9-0 jfsJKa">
                <div className="institution-card__box"><img src={lendingService} alt="" className="institution-card__img" />
                  <div className="institution-card__content-bg">
                    <div className="institution-card__title">Custodial Trading Subaccount</div>
                    <div className="institution-card__content">
                      <div className="institution-card__content-item">
                        <span className="institution-card__content-item-dot">
                        </span>
                        <p className="institution-card__content-item-text">Controllable asset management</p>
                      </div>
                      <div className="institution-card__content-item">
                        <span className="institution-card__content-item-dot"></span>
                        <p className="institution-card__content-item-text">Share & Enjoy Competitive fee rates</p>
                      </div>
                      <div className="institution-card__content-item">
                        <span className="institution-card__content-item-dot"></span>
                        <p className="institution-card__content-item-text">Trading strategies protection</p>
                      </div>
                    </div>
                    <p className="institution-section__desc">A bespoke asset management service to secure institutional-grade crypto that is regulatory compliant.</p>
                  </div>
                  <div className="institution-card__btn-bg">
                    <button className="institution__contained-btn institution-card__explore-btn">Apply Now</button>
                    <button className="institution__outline-btn institution-card__view-btn">View Detail</button>
                  </div>
                </div>
              </div>
              <div className="card__CardContainer-sc-z1lxr9-0 jfsJKa">
                <div className="institution-card__box"><img src={lendingService} alt="" className="institution-card__img" />
                  <div className="institution-card__content-bg">
                    <div className="institution-card__title">Broker Program</div>
                    <div className="institution-card__content">
                      <div className="institution-card__content-item">
                        <span className="institution-card__content-item-dot">
                        </span>
                        <p className="institution-card__content-item-text">up to 45% rebates</p>
                      </div>
                      <div className="institution-card__content-item">
                        <span className="institution-card__content-item-dot"></span>
                        <p className="institution-card__content-item-text">Easy Onboarding</p>
                      </div>
                      <div className="institution-card__content-item">
                        <span className="institution-card__content-item-dot"></span>
                        <p className="institution-card__content-item-text">Dedicated Technical Support</p>
                      </div>
                    </div>
                    <p className="institution-section__desc">Connect clients to tap onto BLC Exchange's liquidity and market depth to unlock higher-tier trading rebates.</p>
                  </div>
                  <div className="institution-card__btn-bg">
                    <button className="institution__contained-btn institution-card__explore-btn">Apply Now</button>
                    <button className="institution__outline-btn institution-card__view-btn">View Detail</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Institutional;