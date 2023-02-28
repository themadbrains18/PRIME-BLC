import menuicon from '../images/menu.svg'

import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import TransferComponent from "../../dashboard/transferComponent";
import { assetsRequest } from '../../../Actions/assetsAction';

const TradingAccount = ({ showSideBar }) => {
  const dispatch = new useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState('');
  let assets = useSelector((state) => state.assets);
  let tokenList = useSelector((state) => state.deposittokens);
  assets = assets.filter((item) => {
    return item.accountType === 'Trading Account';
  })
  let total = 0;
  assets.map((item) => {
    total = total + parseFloat(item?.USDT);
  })
  const closeModel = async () => {
    setOpen(false);
    await dispatch(assetsRequest());
  }

  return (
    <div className="overview__container trading__account__container">
      <div className='responsive_toggle'>
        <div className="side-panel__menubtn">
          <img className="side-panel__icon side-panel__menu-icon right_to_left_icon" src={menuicon} alt="" onClick={showSideBar} />
          <span className="side-panel__other-link-order"></span>
        </div>
      </div>
      <div className="overview__container-top">
        <div className="overview__equity-card">
          <div className="overview__equity-card-top">
            <div className="overview__equity-card-account">
              Trading Account
              <span>
                <span role="img" aria-label="eye" tabIndex="-1" className="anticon anticon-eye skynetPoint">
                  <svg viewBox="64 64 896 896" focusable="false" data-icon="eye" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
                  </svg>
                </span>
              </span>
            </div>
          </div>
          <div className="overview__equity-card_inner">
            <div className="overview__equity-card-bottom">
              <div className="overview__equity-card-equity">
                <div className="available-card-level-total-top">Available Balance</div>
                <div className="overview__equity-card-total-center">
                  {total}
                  <span className="overview__equity-card-total-center-unit">USDT</span>
                  <span className="overview__equity-card-total-bottom">≈ 0.00 BTC</span>
                </div>
              </div>
            </div>
            {/* <div className="overview__equity-card-opt">
              <button color="brand" type="button" className="ant-btn overview__equity-opt-btn overview__equity-buy-btn" onClick={()=>{navigate('/p2p/trade/deposit')}}><span>Deposit</span></button>
              <button color="brand" type="button" className="ant-btn overview__equity-opt-btn" onClick={()=>{navigate('/user/assets/withdraw')}}><span>Withdraw</span></button>
              <button color="brand" type="button" className="ant-btn overview__equity-opt-btn"><span>Transfer</span></button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="account__wallet__list">
        <div className="account__wallet__list__tool">
          <span className="ant-input-affix-wrapper ant-input-affix-wrapper-lg">
            <span className="ant-input-prefix">
              <span role="img" aria-label="search" className="anticon anticon-search">
                <svg viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                </svg>
              </span>
            </span>
            <input placeholder="Search" type="text" className="ant-input ant-input-lg" />
            <span className="ant-input-suffix">
              <span role="button" aria-label="close-circle" tabIndex="-1" className="anticon anticon-close-circle ant-input-clear-icon-hidden ant-input-clear-icon">
                <svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
                </svg>
              </span>
            </span>
          </span>
        </div>
        <div className="account__wallet__list__info">
          <div className="account__wallet__list__info__header">
            <span className="column0">Coin</span>
            <span className="column1">Wallet Balance</span>
            <span className="column2">Available BAlance</span>
            <span className="column3">Equivalent</span>
            <span className="column4 text-align">Action</span>
          </div>
          {assets?.map((val) => {
            let token = tokenList.filter((item) => {
              let tokenSymbol = val?.token
              return item.coinName === tokenSymbol
            })

            return <div key={val?.token} className="account__wallet__list__info__row">
              <span className="column0">{val?.token}</span>
              <span className="column1">{(parseFloat(val?.balance)).toFixed(2)}</span>
              <span className="column2">{(parseFloat(val?.balance)).toFixed(2)}</span>
              <span className="column3">≈ {(parseFloat(val?.USDT)).toFixed(2)} USDT</span>
              <span className="column4">
                <button onClick={() => { navigate('/p2p/trade/deposit') }}>Deposit</button>
                <button onClick={() => { navigate('/user/assets/withdraw') }}>Withdraw</button>
                <button onClick={() => { setOpen(true), setSelectedToken(token[0]) }}>Transfer</button>
                <button onClick={() => navigate('/trading-chart/' + val?.token)}>Trade</button>
              </span>
            </div>
          })}
        </div>
      </div>
      <TransferComponent selectedToken={selectedToken} open={open} closeModel={closeModel} accountType="Trading Account" wallet="trading_wallet" />
    </div>
  ) 
}

export default TradingAccount