import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useSelector, useDispatch } from 'react-redux';
import 'react-tabs/style/react-tabs.css';
import TradingLeft from '../../components/tradingChart/tradingLeft';
import TradingViewWidget from "../../components/tradingChart/globalChart";
import { TVChartContainer } from "../../components/tradingChart/tradingChart";
import Trade from "../../components/tradingChart/trade";
import SpotSection from '../../components/tradingChart/spotSection';
import OrderHistory from '../../components/tradingChart/orderHistory';

const MobileView = (props) => {
  const coins = useSelector((state) => state.coins);

  return (
    <Tabs className='bottom-tab'>
      <TabList>
        <Tab>
          <div className='label_wrapper'>
            <svg className="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ListIcon">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path>
            </svg>
            <p className='market-label'> Market</p>
          </div>
        </Tab>
        <Tab>
          <div className='label_wrapper'>
            <svg className="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AutoGraphIcon">
              <path d="M14.06 9.94 12 9l2.06-.94L15 6l.94 2.06L18 9l-2.06.94L15 12l-.94-2.06zM4 14l.94-2.06L7 11l-2.06-.94L4 8l-.94 2.06L1 11l2.06.94L4 14zm4.5-5 1.09-2.41L12 5.5 9.59 4.41 8.5 2 7.41 4.41 5 5.5l2.41 1.09L8.5 9zm-4 11.5 6-6.01 4 4L23 8.93l-1.41-1.41-7.09 7.97-4-4L3 19l1.5 1.5z"></path>
            </svg>
            <p className='market-label'> Charts</p>
          </div>
        </Tab>
        <Tab>
          <div className='label_wrapper'>
            <img className='logo' src={require('../../assets/images/blcprime.png')} alt="error" />
            <p className='market-label'>  Buy/Sell </p>
          </div>
        </Tab>
        <Tab>
          <div className='label_wrapper'>
            <svg className="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="HistoryIcon">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path>
            </svg>
            <p className='market-label'> Trades </p>
          </div>
        </Tab>
        <Tab>
          <div className='label_wrapper'>
            <svg className="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonPinIcon">
              <path d="M12 2c-4.97 0-9 4.03-9 9 0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11c0-4.97-4.03-9-9-9zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.3c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
            </svg>
            <p className='market-label'> My Orders </p>
          </div>
        </Tab>
      </TabList>

      <TabPanel>
        <div className='treding__graph__body treding__graph__body_section trading--graph trading_main'>
          <div className="graph__grid graph-m-top">
            <TradingLeft coins={coins} />
          </div>
        </div>
      </TabPanel>

      <TabPanel>
        <div className='treding__graph__body trading--graph trading_main'>
          <div className="graph__grid graph-m-top">
            <TradingViewWidget symbol={props.id + props.currency} /> 
            
          </div>
        </div>
      </TabPanel>

      <TabPanel>
        <div className='treding__graph__body treding__graph__body_section trading--graph trading_main'>
          <div className="graph__grid graph-m-top">
            <SpotSection />
          </div>
        </div>
      </TabPanel>
      <TabPanel>

        <div className='treding__graph__body trading--graph trading_main'>
          <div className="graph__grid graph-m-top">
            <div className="aside__box" style={{ marginTop: '10px' }}>
              <div className="aside__order__book">
                <Trade currencyId={props.id + 'usdt'} />
              </div>
            </div>

          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <div className='treding__graph__body treding__graph__body_section trading--graph trading_main'>
          <div className="graph__grid graph-m-top">
            <div className="aside__box" style={{ marginTop: '10px' }}>
              <div className="aside__order__book">
                <OrderHistory />
              </div>
            </div>

          </div>
        </div>

      </TabPanel>
    </Tabs>
  )
}

export default MobileView;