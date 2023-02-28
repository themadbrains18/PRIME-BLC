import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import menuicon from '../images/menu.svg'

const AssestLeft = (props) => {
  let {account} = useParams();
  const [show, setShow] = useState(true);
  const navigate = useNavigate();


  return (
    <>
      <div className={`assets-left-pannel ${show === false ? 'hide':''}`}>
        <div className="side-panel__menubtn">
          <img className="side-panel__icon side-panel__menu-icon right_to_left_icon" src={menuicon} alt="" onClick={()=>setShow(!show)} />
          <span className="side-panel__other-link-order"></span>
        </div>
        <ul role="menu" style={{ border: 'none' }}>
          <li className={`${account === 'overview' ?'item-selected' : 'item-unselected' }`} title="Overview" role="menuitem" style={{ paddingLeft: '24px' }} onClick={()=>{ navigate('/user/assets/overview')}}>
          <a className="nav-link">
              <p className="icon" ><span>Ov</span></p>
              <div className={`${show === false ? 'remove__link' : 'link'}`}>
                <p>Overview
                </p>
              </div>
            </a>
          </li>
          <li className={`${account === 'main-account' ?'item-selected' : 'item-unselected' }`} title="Spot" role="menuitem" style={{ paddingLeft: '24px' }} onClick={()=>{navigate('/user/assets/main-account')}}>
            <a className="nav-link">
              <p className="icon" ><span>Ma</span></p>
              <div className={`${show === false ? 'remove__link' : 'link'}`}>
                <p>Main Account
                </p>
              </div>
            </a>
          </li>
          <li className={`${account === 'trading-account' ?'item-selected' : 'item-unselected' }`} title="Derivatives" role="menuitem" style={{ paddingLeft: '24px' }} onClick={()=>{navigate('/user/assets/trading-account')}}>
          <a className="nav-link">
              <p className="icon" ><span>Tr</span></p>
              <div className={`${show === false ? 'remove__link' : 'link'}`}>
                <p>Trading Account
                </p>
              </div>
            </a>
          </li>
          <li className={`${account === 'funding-account' ?'item-selected' : 'item-unselected' }`} title="USDC Derivatives" role="menuitem" style={{ paddingLeft: '24px' }} onClick={()=>{navigate('/user/assets/funding-account')}}>
            <a className="nav-link">
              <p className="icon" ><span>Fu</span></p>
              <div className={`${show === false ? 'remove__link' : 'link'}`}>
                <p>Funding Account
                </p>
              </div>
            </a>
          </li>
          <li className={`${account === 'withdraw' ?'item-selected' : 'item-unselected' }`} title="USDC Derivatives" role="menuitem" style={{ paddingLeft: '24px' }} onClick={()=>{navigate('/user/assets/withdraw')}}>
            <a className="nav-link">
              <p className="icon" ><span>Wd</span></p>
              <div className={`${show === false ? 'remove__link' : 'link'}`}>
                <p>Withdraw
                </p>
              </div>
            </a>
          </li>
          <li className={`${account === 'history' ?'item-selected' : 'item-unselected' }`} title="USDC Derivatives" role="menuitem" style={{ paddingLeft: '24px' }} onClick={()=>{navigate('/user/assets/history')}}>
            <a className="nav-link">
              <p className="icon" ><span>Hi</span></p>
              <div className={`${show === false ? 'remove__link' : 'link'}`}>
                <p>Trade History
                </p>
              </div>
            </a>
          </li>
        </ul>
        {/* <div className="side-panel__other-link-wraper">
          <div className="side-panel__other-link-border"></div>
          <a className="side-panel__order-link" href="/user/assets/order/all-orders/inverse" target="_blank" rel="noopener noreferrer">
            <span className="side-panel__other-link-order">Orders</span>
            <span className="right_to_left_icon">
              <span role="img" aria-label="right" className="anticon anticon-right" style={{ fontSize: '8px' }}>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z">
                  </path>
                </svg>
              </span>
            </span>
          </a>
        </div> */}
      </div>
    </>

  )
}

export default AssestLeft;