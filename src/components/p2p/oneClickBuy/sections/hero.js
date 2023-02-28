import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const HeroSec = () => {
  const [show, setShow] = useState(1);

  function setBg(show){
    
    setShow(show);
  }

  return (

    <section className='one_click_by_sec'>
      <div className='tmb_container'>
          <div className='tmb_content'>
            <div className='tmb_top_header'>
              <Tabs>
                <TabList>
                  <Tab>One-Click Buy</Tab>
                  <Tab>P2P</Tab>
                  <Tab>Fiat Deposit</Tab>
                </TabList>

                <TabPanel>
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
                        <form className='exchange_form'>
                            <Tabs>
                                <TabList className={'react-tabs__tab-list' + (show === 1 ? ' buy-class' : ' sell-class')} >
                                    <Tab onClick={(e)=>{setBg(1)}}>Buy</Tab>
                                    <Tab onClick={(e)=>{setBg(2)}}>Sell</Tab>
                                </TabList>
                                <TabPanel>
                                    <div className='spend_wrapper'>
                                      <div className='input_wrapper'>
                                        <label className='input_label'>Spend</label>
                                        <input className='spend_input' type="text" value="0.0000"></input>
                                      </div>
                                      <div className='dropdown_wrapper'>
                                        <div className="button_img">
                                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="48" height="48" rx="24" fill="#10D173"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M32.4094 14V18.0612H26.2231V20.7164C31.2325 20.9436 35 21.9244 35 23.0996C35 24.2746 31.2325 25.2552 26.2231 25.4827V34H21.8155V25.4847C16.7867 25.2605 13 24.2783 13 23.0996C13 21.9211 16.7867 20.9387 21.8155 20.7146V18.0613H15.6292V14H32.4094ZM26.2231 24.4656C30.1774 24.2851 33.1054 23.6349 33.1054 22.8597C33.1054 22.0846 30.177 21.4341 26.2193 21.254V23.708C25.5179 23.7453 24.7693 23.7651 23.9961 23.7651C23.2351 23.7651 22.5013 23.7456 21.8115 23.71V21.2467C17.8381 21.4264 14.8906 22.077 14.8906 22.856C14.8906 23.6349 17.8376 24.2873 21.8115 24.4651L22.0733 24.4763H22.0768C22.3397 24.4864 22.6065 24.4947 22.8775 24.5007H22.9026L23.1312 24.5054H23.1977L23.3891 24.508H24.6135L24.8069 24.5054H24.8761L25.1212 24.5004H25.1325C25.3152 24.4963 25.4955 24.4911 25.6738 24.4851H25.6997L25.9393 24.4763H25.9676L26.2231 24.4656Z" fill="white"/>
                                          </svg>
                                        </div>
                                        <div className="button_text">
                                            <span>USDT</span>
                                        </div>
                                        <div className="button_icon">
                                          <img src={require('../assets/menu-icon.png')} alt="error" />
                                        </div>
                                      </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>

                                </TabPanel>
                            </Tabs>

                        </form>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <h2>Any content 2</h2>
                </TabPanel>
                <TabPanel>
                  <h2>Any content 3</h2>
                </TabPanel>
              </Tabs>
            </div>
          </div>
      </div>    
    </section>
  )
}

export default HeroSec;