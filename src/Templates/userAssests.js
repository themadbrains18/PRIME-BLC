import '../components/user-assest/assets.css';
import { useState } from 'react';
import LoadingOverlay from 'react-loading-overlay'
import AssestLeft from '../components/user-assest/section/assetsLeft';
import AssetsOverView from '../components/user-assest/section/overview';
import MainAccount from '../components/user-assest/section/mainAccount';
import TradingAccount from '../components/user-assest/section/tradingAccount';
import FundingAccount from '../components/user-assest/section/fundingAccount';
import WithDraw from '../components/dashboard/withdraw';
import RecordHIstory from '../components/dashboard/recordHIstory';
import { useParams } from 'react-router-dom';

LoadingOverlay.propTypes = undefined

const UserAssests = () => {
  let { account } = useParams();
  const [isActive, setIsActive] = useState(account === "overview" ? true : false)

  function showSideBar(e) {
    let SideBar = document.querySelector(".assets-left-pannel");
    SideBar.classList.toggle("show");
  }

  const removeLoading = () => {
    setIsActive(false);
  }

  return (<>
    <LoadingOverlay
      active={isActive}
      spinner
      text='Loading...'
    >
      <div className="assets-main-container">
        <AssestLeft />
        <div className="assets-main-body">
          {account === 'overview' &&

            <AssetsOverView showSideBar={showSideBar} removeLoading={removeLoading} />

          }
          {account === 'main-account' &&
            <MainAccount showSideBar={showSideBar} />
          }
          {account === 'trading-account' &&
            <TradingAccount showSideBar={showSideBar} />
          }
          {account === 'funding-account' &&
            <FundingAccount showSideBar={showSideBar} />
          }
          {account === 'withdraw' &&
            <WithDraw showSideBar={showSideBar} />
          }
          {account === 'history' &&
            <RecordHIstory showSideBar={showSideBar} />
          }
        </div>
      </div>
    </LoadingOverlay>

  </>
  )
}

export default UserAssests;