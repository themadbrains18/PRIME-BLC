import { Link, useNavigate } from "react-router-dom";
const TradingLeft = (props) => {

  const navigate = useNavigate();
  return (
    <div className="react-tabs trading_left" data-rttabs="true">
      <ul className="nav ul___left" role="tablist">
        <li className="react-tabs__tab react-tabs__tab--selected" role="tab" id="tab:r0:0" aria-selected="true" aria-disabled="false" aria-controls="panel:r0:0" tabIndex="0" data-rttab="true">
          <a className="btn active"> EUSD</a>
        </li>
      </ul>
      <div className="ul__search_left">
        <form>
          <label htmlFor="sd"></label>
          <input type="text" className="form-control" placeholder="Search" />
        </form>
      </div>
      <div className="searchItem__header">
        <div className="searchItem__data"><p>Pair</p></div>
        <div className="searchItem__data"><p>Vol</p>
        </div>
        <div className="searchItem__data">
          <p>Changed</p>
        </div>
      </div>
      <div className="tab_as mt-2">
        <div className="react-tabs__tab-panel react-tabs__tab-panel--selected" role="tabpanel" id="panel:r0:0" aria-labelledby="tab:r0:0">
          <div className="tab___data__flex">
            {/* <tr className="d-value"></tr> */}
            {props.coins.map((item) => {
              return <div key={item.FROMSYMBOL} className="col_left__trading__1">
                <Link to={"/trading-chart/" + item.FROMSYMBOL} className="tab__data__inner">
                  <div className="tab__data__inner__left">
                    <div className="coin__img">
                      <img className="coin__icon" src={item.TOKENLOGOURL} alt="" />
                    </div>
                    <div className="coin__name">
                      <p>{item.FROMSYMBOL} <small>/usdt</small></p>
                      <div className="trading__status">
                        <h6 className="red__status">
                          <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon">
                            <path d="m7 10 5 5 5-5z"></path></svg>
                          <span>{item.CHANGE24HOUR.toFixed(2)}%</span>
                        </h6></div>
                    </div>
                  </div>
                  <div className="coin__values">
                    <p> {item.VOLUME24HOUR} <span className="coin__name_values">USDT</span></p>
                    <h6><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AttachMoneyIcon"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path></svg>
                      <small>{item.PRICE} </small></h6></div></Link>
              </div>
            })}
       

          </div>
          
        </div>
      </div>
    </div>
  )
}

export default TradingLeft;