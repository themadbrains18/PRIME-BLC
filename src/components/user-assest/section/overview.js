import nodata from '../images/nodata.png'
import menuicon from '../images/menu.svg'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { saveDepositHistory, saveDepositTRXHistory, saveDepositTRC20History } from '../../../Actions/depositAction';
import { logout, checkIsVerifidUser } from "../../../Actions/authAction";
import { DASHBOARDINTERVAL, LOGIN } from "../../../Constants/Index";
import { assetsRequest, getOverViewAssets } from '../../../Actions/assetsAction';
import { tokenRequest } from "../../../Actions/tokenAction";
import TransferComponent from '../../dashboard/transferComponent';
import { getAllOrderList } from '../../../Actions/orderAction';

const AssetsOverView = ({ showSideBar,removeLoading }) => {

  const navigate = useNavigate();
  const dispatch = new useDispatch();
  const users = useSelector((state) => state.users);
  let assetsOverView = useSelector((state) => state.assetoverview);
  const preinterval = useSelector((state) => state.intervals)
  const [coinType, setcoinType] = useState('USDT');
  const [walletType, setWalletType] = useState('main_wallet')
  const [accountType, setAccountType] = useState('Main Account')

  const [open, setOpen] = useState(false);

  var config = {
    headers: {
      'Authorization': users.access_token
    }
  };

  useEffect(() => {
    getAssetsOverview(coinType);
    getTokenList();
    getAssets();
    saveTransaction();
    getOrderList();
    const interval = setInterval(() => {
      saveTransaction();
      getUserProfile();
    }, 60000);
    dispatch({ type: DASHBOARDINTERVAL, payload: interval })

  }, []);

  const getAssetsOverview = async (currency) => {
    let data = await dispatch(getOverViewAssets(currency));
    if(data.status === 200){
      removeLoading();
    }
  }

  const getTokenList = async () => {
    await dispatch(tokenRequest());
  }

  const getAssets = async () => {
    let data = await dispatch(assetsRequest());
  }

  const getOrderList = async () => {
    let data = await dispatch(getAllOrderList());
    
  }

  const saveTransaction = async () => {
    clearInterval(preinterval);
    let formData = { "userId": users?.id }
    let data = await dispatch(saveDepositHistory(formData));
    let TrxData = await dispatch(saveDepositTRXHistory(formData));
    let Trc20Data = await dispatch(saveDepositTRC20History(formData));
    getAssets();
    getAssetsOverview(coinType);
  }

  const getUserProfile = async () => {
    let data = await dispatch(checkIsVerifidUser(config))
    if (data != undefined && data.status === 404) {
      // console.log('get user profile')
      dispatch(logout());
    }
    else {
      dispatch({ type: LOGIN, payload: data })
    }
  }

  const closeModel = async () => {
    setOpen(false);
    await dispatch(assetsRequest());
  }

  return (
    <div className="overview__container">
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
              Assets Overview
              <span><span role="img" aria-label="eye" tabIndex="-1" className="anticon anticon-eye skynetPoint"><svg viewBox="64 64 896 896" focusable="false" data-icon="eye" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg></span></span>
            </div>
          </div>
          <div className="overview__equity-card_inner">
            <div className="overview__equity-card-bottom">
              <div className="overview__equity-card-equity">
                <div className="overview__equity-card-total-center">
                  {(Object.keys(assetsOverView).length > 0 && assetsOverView?.overall !== undefined) ? assetsOverView?.overall.toFixed(2) : '0.0000'}
                  <span className="overview__equity-card-total-center-unit">USDT</span>
                  <span className="overview__equity-card-total-bottom">≈ 0.00 BTC</span>
                </div>
              </div>
            </div>
            <div className="overview__equity-card-opt">
              <button color="brand" type="button" className="ant-btn overview__equity-opt-btn overview__equity-buy-btn" onClick={() => { navigate('/p2p/trade/deposit') }}><span>Deposit</span></button>
              <button color="brand" type="button" className="ant-btn overview__equity-opt-btn" onClick={() => { navigate('/user/assets/withdraw') }}><span>Withdraw</span></button>
              <button color="brand" type="button" className="ant-btn overview__equity-opt-btn" onClick={() => { setOpen(true), setWalletType('main_wallet'), setAccountType('Main Account') }}><span>Transfer</span></button>
            </div>
          </div>
        </div>
      </div>
      <div className="overview__asset-records">
        <div className="overview__list">
          <div className="overview__list-title"><i className="overview__list-title-line">
          </i>My Assets</div>
          <div className="overview__list-asset">
            <div className="overview__list-asset-icon">
              <a className="nav-link">
                <p className="icon" >Ma</p>
              </a>
            </div>
            <div className="overview__list-asset-equity">
              <div className="overview__list-asset-equity-account-name">Main</div>
              <div className="overview__list-asset-equity-asset">
                <span className="overview__list-asset-equity-btc">{(Object.keys(assetsOverView).length > 0 && assetsOverView?.main !== undefined) ? assetsOverView?.main.toFixed(2) : '0.0000'} USDT</span>
                <span className="overview__list-asset-equity-usd">≈ 0.00 BTC</span>
              </div>
            </div>
            <div className="overview__list-asset-opt">
              <button color="brand" type="button" className="ant-btn ant-btn-sm opt-primary-btn" ant-click-animating-without-extra-node="false" onClick={() => { navigate('/p2p/trade/deposit') }}><span>Deposit</span></button>
              <button type="button" className="ant-btn ant-btn-sm opt-primary-btn" ant-click-animating-without-extra-node="false" onClick={() => { navigate('/user/assets/withdraw') }}><span>Withdraw</span></button>
              <button type="button" className="ant-btn ant-btn-sm opt-primary-btn" ant-click-animating-without-extra-node="false" onClick={() => { setOpen(true),setWalletType('main_wallet'), setAccountType('Main Account') }}><span>Transfer</span></button>
              <button type="button" className="ant-btn ant-btn-sm opt-primary-btn" onClick={()=>navigate('/trading-chart/BNB')}><span>Trade</span></button>
            </div>
          </div>
          <div className="overview__list-asset">
            <div className="overview__list-asset-icon">
              <a className="nav-link">
                <p className="icon" >Tr</p>
              </a>
            </div>
            <div className="overview__list-asset-equity">
              <div className="overview__list-asset-equity-account-name">Trading</div>
              <div className="overview__list-asset-equity-asset">
                <span className="overview__list-asset-equity-btc">{(Object.keys(assetsOverView).length > 0 && assetsOverView?.trade !== undefined) ? assetsOverView?.trade.toFixed(2) : '0.0000'} USDT</span>
                <span className="overview__list-asset-equity-usd">≈ 0.00 BTC</span>
              </div>
            </div>
            <div className="overview__list-asset-opt">
              <button color="brand" type="button" className="ant-btn ant-btn-sm opt-primary-btn" onClick={() => { navigate('/p2p/trade/deposit') }}><span>Deposit</span></button>
              <button type="button" className="ant-btn ant-btn-sm opt-primary-btn" onClick={() => { setOpen(true),setWalletType('trading_wallet'), setAccountType('Trading Account') }}><span>Transfer</span></button>
            </div>
          </div>
          <div className="overview__list-asset">
            <div className="overview__list-asset-icon">
              <a className="nav-link">
                <p className="icon" >Fu</p>
              </a>
            </div>
            <div className="overview__list-asset-equity">
              <div className="overview__list-asset-equity-account-name">Funding</div>
              <div className="overview__list-asset-equity-asset">
                <span className="overview__list-asset-equity-btc">{(Object.keys(assetsOverView).length > 0 && assetsOverView?.funding !== undefined) ? assetsOverView?.funding.toFixed(2) : '0.0000'} USDT</span>
                <span className="overview__list-asset-equity-usd">≈ 0.00 BTC</span>
              </div>
            </div>
            <div className="overview__list-asset-opt">
              <button type="button" className="ant-btn ant-btn-sm opt-primary-btn" onClick={() => { setOpen(true),setWalletType('funding_wallet'), setAccountType('Funding Account') }}><span>Transfer</span></button>
            </div>
          </div>
        </div>
        <div className="overview__recent-records">
          <div className="overview__recent-records-title">
            <i className="overview__recent-records-title-left-line"></i>
            <div className="overview__recent-records-title-left">Recent Deposit &amp; Withdrawal History</div>
            <a className="overview__recent-records-title-right" href="/user/assets/records/trade-spot/deposit">All</a>
          </div>
          <div className="table__no-data">
            <img src={nodata} alt="no data" />
            <p>No recent history found.</p>
          </div>
        </div>
      </div>
      <TransferComponent open={open} closeModel={closeModel} accountType={accountType} wallet={walletType} />
    </div>
  )
}

export default AssetsOverView;
// Assets Overview