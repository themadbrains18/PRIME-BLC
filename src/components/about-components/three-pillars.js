import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const ThreePillars = () => {

  const [show, setShow] = useState(1);
  return (
    <section className='three_pillars_sec tmb_tabs_wrapper'>
        <div className='tmb_container'>
            <div className='tmb_sec_content'>
                <h2 className='sec_main_heading'>The<span> Three Pillars</span> We Pride Ourselves On</h2>
                <div className='sec_tabs tabs-for-mobile'>
                    <Tabs>
                        <TabList>
                            <Tab tmb-index="1">VISION</Tab>
                            <Tab tmb-index="2">MISSION</Tab>
                            <Tab tmb-index="3">VALUES</Tab>
                        </TabList>
                        <TabPanel>
                            <div className='tab_pannel_inner'>
                                <div className='card'>
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/global.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">  Unparalleled Customer Support</h3>
                                        <p className='card_info'>Dedicated live agents, available 24/7</p>
                                    </div>
                                </div>
                            
                            
                                <div className='card'>
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/all-time.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">Available and Active Globally</h3>
                                        <p className='card_info'>Available in over 160 countries and 16+ languages</p>
                                    </div>
                                </div>
                            
                            
                                <div className='card'>
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/security.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">No Outage or Breach Since Our Inception</h3>
                                        <p className='card_info'>Protected by industry-leading security and enhanced by leading blockchain custodial solutions</p>
                                    </div>
                                </div>

                                <div className='card'>
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/lock.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">Robust Security Frameworks</h3>
                                        <p className='card_info'>100k TPS matching engine and zero server downtime</p>
                                    </div>
                                </div>
                                
                                <div className='card'>
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/settings.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">99.99% Functionality</h3>
                                        <p className='card_info'>100k TPS matching engine</p>
                                    </div>
                                </div>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='tab_pannel_inner'>
                                <div className='card'>
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/light.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">Widest Range of Easy-to-Use Trading and Web3 Products</h3>
                                        <p className='card_info'>Wallet | Fiat | P2P | Credit Card | Earn | Spot | Derivatives | NFT</p>
                                    </div>
                                </div>

                                <div className='card'>
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/list.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">Latest Automated Trading Tools</h3>
                                        <p className='card_info'>Copy Trading, Al-powered bots, charting and trading tools</p>
                                    </div>
                                </div>

                                <div className='card'>
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/radio.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">First-in-Market USDC Options</h3>
                                        <p className='card_info'>World's Largest USDC Options Marketplace</p>
                                    </div>
                                </div>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='tab_pannel_inner'>
                                <div className='card'>
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/circle.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">BLC Exchange Wallet</h3>
                                        <p className='card_info'>Your gateway to Web3 in just one click</p>
                                    </div>
                                </div>

                                <div className='card'>
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/liquidity.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">Next-Level Liquidity</h3>
                                        <p className='card_info'>Industry-leading liquidity across Derivatives markets</p>
                                    </div>
                                </div>

                                <div className='card'>
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/investment.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">Best-in-Market High Yield, Low Risk Investments</h3>
                                        <p className='card_info'>BLC Exchange Earn and Crypto Loans</p>
                                    </div>
                                </div>
                              


                            </div>
                        </TabPanel>
                    </Tabs>
                </div>

                <div className='pillars_tabs tabs-for-desktop'>
                    <div className='tab_cta_wrapper'>
                        <Tabs  selectedIndex={show -1} onSelect={(index) => setShow(index +1)}>
                            <TabList>
                                <Tab tmb-index="1">NEXT LEVEL RELIABILITY</Tab>
                                <Tab tmb-index="2">NEXT LEVEL PRODUCTS</Tab>
                                <Tab tmb-index="3">NEXT LEVEL OPPORTUNITIES</Tab>
                            </TabList>
                        </Tabs>
                    </div>
                    
                    <div className='tab_content_wrapper'>
                        <div className='tab_content_first'>
                            <div className='tab_content_left'>
                                <div className='content_left_inner'>
                                    <div className={'card ' + (show === 1 ? '  active-card' : '')} tmb-index="1" >
                                        <div className='card_icon'>
                                            <img src={require('../../assets/images/about-us/global.png')} />
                                        </div>
                                        <div className='card_text'>
                                            <h3 className="card_title">  Unparalleled Customer Support</h3>
                                            <p className='card_info'>Dedicated live agents, available 24/7</p>
                                        </div>
                                    </div>
                                    <div className={'card ' + (show === 1 ? '  active-card' : '')} tmb-index="1">
                                        <div className='card_icon'>
                                            <img src={require('../../assets/images/about-us/all-time.png')} />
                                        </div>
                                        <div className='card_text'>
                                            <h3 className="card_title"> Available and Active Globally</h3>
                                            <p className='card_info'>Available in over 160 countries and 16+ languages</p>
                                        </div>
                                    </div>
                                </div>
                                <div  className={'card mb-16' + (show === 2 ? '  active-card' : '')} tmb-index="2">
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/light.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">Widest Range of Easy-to-Use Trading and Web3 Products</h3>
                                        <p className='card_info'>Wallet | Fiat | P2P | Credit Card | Earn | Spot | Derivatives | NFT</p>
                                    </div>
                                </div>
                                <div className={'card mb-16' + (show === 1 ? '  active-card' : '')} tmb-index="1">
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/security.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">No Outage or Breach Since Our Inception</h3>
                                        <p className='card_info'>Protected by industry-leading security and enhanced by leading blockchain custodial solutions</p>
                                    </div>
                                </div>
                            </div>
                            <div className='tab_content_right'>
                                <div className={'card card-modifier mb-16' + (show === 3 ? '  active-card' : '')}  tmb-index="3">
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/circle.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">BLC Exchange Wallet</h3>
                                        <p className='card_info'>Your gateway to Web3 in just one click</p>
                                    </div>
                                </div>
                                <div  className={'card card-modifier' + (show === 2 ? '   active-card' : '')} tmb-index="2">
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/contracts.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">Latest Automated Trading Tools</h3>
                                        <p className='card_info'>Copy Trading, Al-powered bots, charting and trading tools</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='tab_content_second'>
                            <div className='tab_content_left'>
                                <div  className={'card mb-16 card-modifier-2' + (show === 3 ? '  active-card' : '')}  tmb-index="3">
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/liquidity.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">Next-Level Liquidity</h3>
                                        <p className='card_info'>Industry-leading liquidity across Derivatives markets</p>
                                    </div>
                                </div>
                                <div className={'card card-modifier-2' + (show === 1 ? '  active-card' : '')}  tmb-index="1">
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/settings.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">99.99% Functionality</h3>
                                        <p className='card_info'>100k TPS matching engine</p>
                                    </div>
                                </div>
                            </div>
                            <div className='tab_content_right'>
                                <div className={'card mb-16' + (show === 1 ? '  active-card' : '')} tmb-index="1">
                                    <div className='card_icon'>
                                        <img src={require('../../assets/images/about-us/lock.png')} />
                                    </div>
                                    <div className='card_text'>
                                        <h3 className="card_title">Robust Security Frameworks</h3>
                                        <p className='card_info'>100k TPS matching engine and zero server downtime</p>
                                    </div>
                                </div>
                                <div className='content_right_inner'>
                                    <div className={'card ' + (show === 3 ? '  active-card' : '')}  tmb-index="3">
                                        <div className='card_icon'>
                                            <img src={require('../../assets/images/about-us/investment.png')} />
                                        </div>
                                        <div className='card_text'>
                                            <h3 className="card_title">Best-in-Market High Yield,Low Risk Investments</h3>
                                            <p className='card_info'>BLC Exchange Earn and Crypto Loans</p>
                                        </div>
                                    </div>
                                    <div className={'card ' + (show === 2 ? '  active-card' : '')}  tmb-index="2">
                                        <div className='card_icon'>
                                            <img src={require('../../assets/images/about-us/radio.png')} />
                                        </div>
                                        <div className='card_text'>
                                            <h3 className="card_title">First-in-Market USDC Options</h3>
                                            <p className='card_info'>World's Largest USDC Options Marketplace</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ThreePillars;