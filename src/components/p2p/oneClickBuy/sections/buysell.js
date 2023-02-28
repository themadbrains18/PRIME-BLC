import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useDispatch } from "react-redux";
import 'react-tabs/style/react-tabs.css';
import Buy from './buy';
import Sell from './sell';
import { tokenRequest } from '../../../../Actions/tokenAction';

const HeroSec = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(0);
  const [active, setActive] = useState(0);
  function setBg(show) {
    setShow(show);
  }

  const closeDropdown = (e, index) => {
    if (active !== 0) {
      setActive(0);
    }
  }

  useEffect(()=>{
    getTokenList();
  },[]);

  const getTokenList = async () => {
    await dispatch(tokenRequest());
  }

  return (

    <section className='one_click_by_sec' onClick={closeDropdown}>
      <div className='tmb__buy__sell_container'>
        <div className='tmb_content'>
          <div className='tmb_top_header'>
            <div className='one_click_tab_content'>
              <div className='tab_text'>
                <h3 className='sec_main_heading'>How To Buy/Sell Crypto Instantly</h3>
                <ul>
                  <li>
                    <p className='list_item'>1. Choose a coin to Buy/Sell</p>
                  </li>
                  <li>
                    <p className='list_item'>2. Enter the sell amount and currency you want to Buy/Sell</p>
                  </li>
                  <li>
                    <p className='list_item'>3. Choose your preferred transaction method</p>
                  </li>
                </ul>
              </div>
              <div className='tab_form'>
                <div className='exchange_form'>
                  <Tabs>
                    <TabList className={'react-tabs__tab-list' + (show === 0 ? ' buy-class' : ' sell-class')} >
                      <Tab onClick={(e) => { setBg(0) }} >Buy</Tab>
                      <Tab onClick={(e) => { setBg(1) }} >Sell</Tab>
                    </TabList>

                    {/* ============Buy Section */}
                    <TabPanel>
                      <Buy active={active} setActive={setActive} show={show} />
                    </TabPanel>

                    {/* Buy Section ===============*/}

                    {/*============ Sell Section */}
                    <TabPanel>
                      <Sell active={active} setActive={setActive} show={show} />
                    </TabPanel>
                    {/* Sell Section ==============*/}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSec;