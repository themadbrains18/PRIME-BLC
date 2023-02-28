import React from 'react'

const ExploreSec = () => {
  return (
    <section className='explore_sec'> 
        <div className='container'>
            <h2 className='sec_main_heading'>Explore Our Full Product Suite Here</h2>
            <div className='grid_wraper'>
                <div className='grid_item'>
                    <a href="#" className='item_anchor'>
                        <div className='grid_inner'>
                            <div className='grid_text'>
                                <div className='grid_text_inner'>
                                    <h2 className='explore_sec_heading'>Spot</h2>
                                    <p className='explore_sec_info'>Buy and sell popular cryptos on the Spot with low fees.</p>
                                </div>
                                <button className='sec_cta'>
                                    <span className='cta_ext'>Check</span>
                                    <span className='cta_icon'>
                                        <svg width={24} height={24} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.00083 13.9999H21.1871L14.5844 7.42536C14.2076 7.04906 13.996 6.53869 13.996 6.00653C13.996 5.47437 14.2076 4.964 14.5844 4.5877C14.9612 4.2114 15.4722 4 16.005 4C16.5378 4 17.0488 4.2114 17.4256 4.5877L27.4297 14.5795C27.6119 14.7695 27.7547 14.9936 27.8499 15.2389C28.05 15.7254 28.05 16.2711 27.8499 16.7577C27.7547 17.003 27.6119 17.2271 27.4297 17.4171L17.4256 27.4089C17.2396 27.5962 17.0183 27.7449 16.7745 27.8463C16.5306 27.9478 16.2691 28 16.005 28C15.7409 28 15.4793 27.9478 15.2355 27.8463C14.9917 27.7449 14.7704 27.5962 14.5844 27.4089C14.3969 27.2231 14.248 27.0021 14.1464 26.7586C14.0449 26.5151 13.9926 26.2539 13.9926 25.9901C13.9926 25.7263 14.0449 25.4651 14.1464 25.2215C14.248 24.978 14.3969 24.757 14.5844 24.5712L21.1871 17.9966H6.00083C5.47018 17.9966 4.96126 17.7861 4.58603 17.4113C4.2108 17.0366 4 16.5283 4 15.9983C4 15.4683 4.2108 14.96 4.58603 14.5852C4.96126 14.2105 5.47018 13.9999 6.00083 13.9999Z" fill="#eb9f12" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div className='grid_img'>
                                <img src={require('../../assets/images/home-explore-sec/spot.jpg')} alt="error" />
                            </div>
                        </div>
                    </a>
                </div>
                <div className='grid_item'>
                    <a href="#" className='item_anchor'>
                        <div className='grid_inner'>
                            <div className='grid_text'>
                                <div className='grid_text_inner'>
                                    <h2 className='explore_sec_heading'>Derivatives</h2>
                                    <p className='explore_sec_info'>Upgrade your trades with USDT Perpetual, Inverse Futures, and more.</p>
                                </div>
                                <button className='sec_cta'>
                                    <span className='cta_ext'>Check</span>
                                    <span className='cta_icon'>
                                        <svg width={24} height={24} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.00083 13.9999H21.1871L14.5844 7.42536C14.2076 7.04906 13.996 6.53869 13.996 6.00653C13.996 5.47437 14.2076 4.964 14.5844 4.5877C14.9612 4.2114 15.4722 4 16.005 4C16.5378 4 17.0488 4.2114 17.4256 4.5877L27.4297 14.5795C27.6119 14.7695 27.7547 14.9936 27.8499 15.2389C28.05 15.7254 28.05 16.2711 27.8499 16.7577C27.7547 17.003 27.6119 17.2271 27.4297 17.4171L17.4256 27.4089C17.2396 27.5962 17.0183 27.7449 16.7745 27.8463C16.5306 27.9478 16.2691 28 16.005 28C15.7409 28 15.4793 27.9478 15.2355 27.8463C14.9917 27.7449 14.7704 27.5962 14.5844 27.4089C14.3969 27.2231 14.248 27.0021 14.1464 26.7586C14.0449 26.5151 13.9926 26.2539 13.9926 25.9901C13.9926 25.7263 14.0449 25.4651 14.1464 25.2215C14.248 24.978 14.3969 24.757 14.5844 24.5712L21.1871 17.9966H6.00083C5.47018 17.9966 4.96126 17.7861 4.58603 17.4113C4.2108 17.0366 4 16.5283 4 15.9983C4 15.4683 4.2108 14.96 4.58603 14.5852C4.96126 14.2105 5.47018 13.9999 6.00083 13.9999Z" fill="#eb9f12" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div className='grid_img'>
                                <img src={require('../../assets/images/home-explore-sec/derivatives.jpg')} alt="error" />
                            </div>
                        </div>
                    </a>
                </div>
                <div className='grid_item'>
                    <a href="#" className='item_anchor'>
                        <div className='grid_inner'>
                            <div className='grid_text'>
                                <div className='grid_text_inner'>
                                    <h2 className='explore_sec_heading'>NFT Marketplace</h2>
                                    <p className='explore_sec_info'>Explore, buy and trade unique NFTs from creators worldwide.</p>
                                </div>
                                <button className='sec_cta'>
                                    <span className='cta_ext'>Check</span>
                                    <span className='cta_icon'>
                                        <svg width={24} height={24} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.00083 13.9999H21.1871L14.5844 7.42536C14.2076 7.04906 13.996 6.53869 13.996 6.00653C13.996 5.47437 14.2076 4.964 14.5844 4.5877C14.9612 4.2114 15.4722 4 16.005 4C16.5378 4 17.0488 4.2114 17.4256 4.5877L27.4297 14.5795C27.6119 14.7695 27.7547 14.9936 27.8499 15.2389C28.05 15.7254 28.05 16.2711 27.8499 16.7577C27.7547 17.003 27.6119 17.2271 27.4297 17.4171L17.4256 27.4089C17.2396 27.5962 17.0183 27.7449 16.7745 27.8463C16.5306 27.9478 16.2691 28 16.005 28C15.7409 28 15.4793 27.9478 15.2355 27.8463C14.9917 27.7449 14.7704 27.5962 14.5844 27.4089C14.3969 27.2231 14.248 27.0021 14.1464 26.7586C14.0449 26.5151 13.9926 26.2539 13.9926 25.9901C13.9926 25.7263 14.0449 25.4651 14.1464 25.2215C14.248 24.978 14.3969 24.757 14.5844 24.5712L21.1871 17.9966H6.00083C5.47018 17.9966 4.96126 17.7861 4.58603 17.4113C4.2108 17.0366 4 16.5283 4 15.9983C4 15.4683 4.2108 14.96 4.58603 14.5852C4.96126 14.2105 5.47018 13.9999 6.00083 13.9999Z" fill="#eb9f12" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div className='grid_img'>
                                <img src={require('../../assets/images/home-explore-sec/nft-marketplace.jpg')} alt="error" />
                            </div>
                        </div>
                    </a>
                </div>
                <div className='grid_item'>
                    <a href="#" className='item_anchor'>
                        <div className='grid_inner'>
                            <div className='grid_text'>
                                <div className='grid_text_inner'>
                                    <h2 className='explore_sec_heading'>BLC Exchange Earn</h2>
                                    <p className='explore_sec_info'>Get high yields with our diverse staking products.</p>
                                </div>
                                <button className='sec_cta'>
                                    <span className='cta_ext'>Check</span>
                                    <span className='cta_icon'>
                                        <svg width={24} height={24} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.00083 13.9999H21.1871L14.5844 7.42536C14.2076 7.04906 13.996 6.53869 13.996 6.00653C13.996 5.47437 14.2076 4.964 14.5844 4.5877C14.9612 4.2114 15.4722 4 16.005 4C16.5378 4 17.0488 4.2114 17.4256 4.5877L27.4297 14.5795C27.6119 14.7695 27.7547 14.9936 27.8499 15.2389C28.05 15.7254 28.05 16.2711 27.8499 16.7577C27.7547 17.003 27.6119 17.2271 27.4297 17.4171L17.4256 27.4089C17.2396 27.5962 17.0183 27.7449 16.7745 27.8463C16.5306 27.9478 16.2691 28 16.005 28C15.7409 28 15.4793 27.9478 15.2355 27.8463C14.9917 27.7449 14.7704 27.5962 14.5844 27.4089C14.3969 27.2231 14.248 27.0021 14.1464 26.7586C14.0449 26.5151 13.9926 26.2539 13.9926 25.9901C13.9926 25.7263 14.0449 25.4651 14.1464 25.2215C14.248 24.978 14.3969 24.757 14.5844 24.5712L21.1871 17.9966H6.00083C5.47018 17.9966 4.96126 17.7861 4.58603 17.4113C4.2108 17.0366 4 16.5283 4 15.9983C4 15.4683 4.2108 14.96 4.58603 14.5852C4.96126 14.2105 5.47018 13.9999 6.00083 13.9999Z" fill="#eb9f12" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div className='grid_img'>
                                <img src={require('../../assets/images/home-explore-sec/prime-earn.jpg')} alt="error" />
                            </div>
                        </div>
                    </a>
                </div>
                <div className='grid_item'>
                    <a href="#" className='item_anchor'>
                        <div className='grid_inner'>
                            <div className='grid_text'>
                                <div className='grid_text_inner'>
                                    <h2 className='explore_sec_heading'>Buy Crypto</h2>
                                    <p className='explore_sec_info'>Purchase crypto with your credit or debit card in a few clicks.</p>
                                </div>
                                <button className='sec_cta'>
                                    <span className='cta_ext'>Check</span>
                                    <span className='cta_icon'>
                                        <svg width={24} height={24} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.00083 13.9999H21.1871L14.5844 7.42536C14.2076 7.04906 13.996 6.53869 13.996 6.00653C13.996 5.47437 14.2076 4.964 14.5844 4.5877C14.9612 4.2114 15.4722 4 16.005 4C16.5378 4 17.0488 4.2114 17.4256 4.5877L27.4297 14.5795C27.6119 14.7695 27.7547 14.9936 27.8499 15.2389C28.05 15.7254 28.05 16.2711 27.8499 16.7577C27.7547 17.003 27.6119 17.2271 27.4297 17.4171L17.4256 27.4089C17.2396 27.5962 17.0183 27.7449 16.7745 27.8463C16.5306 27.9478 16.2691 28 16.005 28C15.7409 28 15.4793 27.9478 15.2355 27.8463C14.9917 27.7449 14.7704 27.5962 14.5844 27.4089C14.3969 27.2231 14.248 27.0021 14.1464 26.7586C14.0449 26.5151 13.9926 26.2539 13.9926 25.9901C13.9926 25.7263 14.0449 25.4651 14.1464 25.2215C14.248 24.978 14.3969 24.757 14.5844 24.5712L21.1871 17.9966H6.00083C5.47018 17.9966 4.96126 17.7861 4.58603 17.4113C4.2108 17.0366 4 16.5283 4 15.9983C4 15.4683 4.2108 14.96 4.58603 14.5852C4.96126 14.2105 5.47018 13.9999 6.00083 13.9999Z" fill="#eb9f12" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div className='grid_img'>
                                <img src={require('../../assets/images/home-explore-sec/buy-crypto.jpg')} alt="error" />
                            </div>
                        </div>
                    </a>
                </div>
                <div className='grid_item'>
                    <a href="#" className='item_anchor'>
                        <div className='grid_inner'>
                            <div className='grid_text'>
                                <div className='grid_text_inner'>
                                    <h2 className='explore_sec_heading'>Options</h2>
                                    <p className='explore_sec_info'>Diversify your trades with stablecoin-margined Options contracts.</p>
                                </div>
                                <button className='sec_cta'>
                                    <span className='cta_ext'>Check</span>
                                    <span className='cta_icon'>
                                        <svg width={24} height={24} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.00083 13.9999H21.1871L14.5844 7.42536C14.2076 7.04906 13.996 6.53869 13.996 6.00653C13.996 5.47437 14.2076 4.964 14.5844 4.5877C14.9612 4.2114 15.4722 4 16.005 4C16.5378 4 17.0488 4.2114 17.4256 4.5877L27.4297 14.5795C27.6119 14.7695 27.7547 14.9936 27.8499 15.2389C28.05 15.7254 28.05 16.2711 27.8499 16.7577C27.7547 17.003 27.6119 17.2271 27.4297 17.4171L17.4256 27.4089C17.2396 27.5962 17.0183 27.7449 16.7745 27.8463C16.5306 27.9478 16.2691 28 16.005 28C15.7409 28 15.4793 27.9478 15.2355 27.8463C14.9917 27.7449 14.7704 27.5962 14.5844 27.4089C14.3969 27.2231 14.248 27.0021 14.1464 26.7586C14.0449 26.5151 13.9926 26.2539 13.9926 25.9901C13.9926 25.7263 14.0449 25.4651 14.1464 25.2215C14.248 24.978 14.3969 24.757 14.5844 24.5712L21.1871 17.9966H6.00083C5.47018 17.9966 4.96126 17.7861 4.58603 17.4113C4.2108 17.0366 4 16.5283 4 15.9983C4 15.4683 4.2108 14.96 4.58603 14.5852C4.96126 14.2105 5.47018 13.9999 6.00083 13.9999Z" fill="#eb9f12" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div className='grid_img'>
                                <img src={require('../../assets/images/home-explore-sec/options.jpg')} alt="error" />
                            </div>
                        </div>
                    </a>
                </div>
                <div className='grid_item'>
                    <a href="#" className='item_anchor'>
                        <div className='grid_inner'>
                            <div className='grid_text'>
                                <div className='grid_text_inner'>
                                    <h2 className='explore_sec_heading'>BLC Exchange Web3</h2>
                                    <p className='explore_sec_info'>Your Trusted Gateway to Web 3.0</p>
                                </div>
                                <button className='sec_cta'>
                                    <span className='cta_ext'>Check</span>
                                    <span className='cta_icon'>
                                        <svg width={24} height={24} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.00083 13.9999H21.1871L14.5844 7.42536C14.2076 7.04906 13.996 6.53869 13.996 6.00653C13.996 5.47437 14.2076 4.964 14.5844 4.5877C14.9612 4.2114 15.4722 4 16.005 4C16.5378 4 17.0488 4.2114 17.4256 4.5877L27.4297 14.5795C27.6119 14.7695 27.7547 14.9936 27.8499 15.2389C28.05 15.7254 28.05 16.2711 27.8499 16.7577C27.7547 17.003 27.6119 17.2271 27.4297 17.4171L17.4256 27.4089C17.2396 27.5962 17.0183 27.7449 16.7745 27.8463C16.5306 27.9478 16.2691 28 16.005 28C15.7409 28 15.4793 27.9478 15.2355 27.8463C14.9917 27.7449 14.7704 27.5962 14.5844 27.4089C14.3969 27.2231 14.248 27.0021 14.1464 26.7586C14.0449 26.5151 13.9926 26.2539 13.9926 25.9901C13.9926 25.7263 14.0449 25.4651 14.1464 25.2215C14.248 24.978 14.3969 24.757 14.5844 24.5712L21.1871 17.9966H6.00083C5.47018 17.9966 4.96126 17.7861 4.58603 17.4113C4.2108 17.0366 4 16.5283 4 15.9983C4 15.4683 4.2108 14.96 4.58603 14.5852C4.96126 14.2105 5.47018 13.9999 6.00083 13.9999Z" fill="#eb9f12" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div className='grid_img'>
                                <img src={require('../../assets/images/home-explore-sec/web3.png')} alt="error" />
                            </div>
                        </div>
                    </a>
                </div>
                <div className='grid_item'>
                    <a href="#" className='item_anchor'>
                        <div className='grid_inner'>
                            <div className='grid_text'>
                                <div className='grid_text_inner'>
                                    <h2 className='explore_sec_heading'>DEX</h2>
                                    <p className='explore_sec_info'>Scale derivatives trades on a non-custodial, multi-chain DEX</p>
                                </div>
                                <button className='sec_cta'>
                                    <span className='cta_ext'>Check</span>
                                    <span className='cta_icon'>
                                        <svg width={24} height={24} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.00083 13.9999H21.1871L14.5844 7.42536C14.2076 7.04906 13.996 6.53869 13.996 6.00653C13.996 5.47437 14.2076 4.964 14.5844 4.5877C14.9612 4.2114 15.4722 4 16.005 4C16.5378 4 17.0488 4.2114 17.4256 4.5877L27.4297 14.5795C27.6119 14.7695 27.7547 14.9936 27.8499 15.2389C28.05 15.7254 28.05 16.2711 27.8499 16.7577C27.7547 17.003 27.6119 17.2271 27.4297 17.4171L17.4256 27.4089C17.2396 27.5962 17.0183 27.7449 16.7745 27.8463C16.5306 27.9478 16.2691 28 16.005 28C15.7409 28 15.4793 27.9478 15.2355 27.8463C14.9917 27.7449 14.7704 27.5962 14.5844 27.4089C14.3969 27.2231 14.248 27.0021 14.1464 26.7586C14.0449 26.5151 13.9926 26.2539 13.9926 25.9901C13.9926 25.7263 14.0449 25.4651 14.1464 25.2215C14.248 24.978 14.3969 24.757 14.5844 24.5712L21.1871 17.9966H6.00083C5.47018 17.9966 4.96126 17.7861 4.58603 17.4113C4.2108 17.0366 4 16.5283 4 15.9983C4 15.4683 4.2108 14.96 4.58603 14.5852C4.96126 14.2105 5.47018 13.9999 6.00083 13.9999Z" fill="#eb9f12" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div className='grid_img'>
                                <img src={require('../../assets/images/home-explore-sec/DEX.png')} alt="error" />
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ExploreSec;