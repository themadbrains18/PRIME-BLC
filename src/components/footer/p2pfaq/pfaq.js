import React from 'react'
import './pfaq.css'

export default function Pfaq() {
    return (
        <section className='p2p-faq'>
            <div className='container'>
                <div className='p2p-faq-content'>
                    <div className='content-header'>
                        <div className='content-header-title'>
                            <h1>FAQ —  P2P Trading</h1>
                            <h5> Last updated on 08 01 2023</h5>
                        </div>
                        <div className='content-header-search'>
                            <div className='search_ico' >
                                <img src="https://img.icons8.com/material-outlined/24/null/search--v1.png" />
                            </div>

                            <input className="search_ipt" id="input1" placeholder="Search" type="text" />
                        </div>

                    </div>
                    <div className='content-faq-container'>
                        <div className='content-faq-question'>
                            < div className='contnt-faq' >
                                <h2 className='contnt-faq-heading'>What is P2P on BLC Exchange?</h2>
                                <p className='contnt-faq-description'>P2P on BLC Exchange is an easy and secure peer-to-peer trading platform. It facilitates the buying and selling of two users' holdings at an optimal, agreed-upon price between them. Please note that BLC Exchange does not provide the buy and sell offers on the P2P page.</p>

                                <br />
                                <h2 className='contnt-faq-heading'>Is P2P on BLC Exchange secure?</h2>
                                <p className='contnt-faq-description'>Once a buy order is submitted, the amount of coin specified will be reserved on the P2P platform. This means that if the seller doesn’t release the coin within 10 minutes after receiving the payment, our customer support has the right to release the coin from the reserved funds to the buyer after verification.
                                    <br /> If you’re a seller, please make sure you’ve received the funds from the buyer before releasing your coin.
                                </p>
                                <br />
                                <h2 className='contnt-faq-heading'>How can I get in touch if there’s any problem with my P2P order?</h2>
                                <p className='contnt-faq-description'>If you encounter any issues with your order, you can reach out to BLC Exchange Customer Support by submitting a case via this link, select P2P Trading. You will receive an automation email with your case number and our customer support will reach out to you within 1-2 business days.</p>
                                <p className='contnt-faq-description'>To help you solve any problems more efficiently, please provide your UID, P2P order number and any applicable screenshot(s).</p>

                                <br />
                                <h2 className='contnt-faq-heading'>Which coins can I trade on the P2P Platform?</h2>
                                <p className='contnt-faq-description'>PCurrently, USDT, BTC, USDC and ETH coins are supported.</p>

                                <br />
                                <h2 className='contnt-faq-heading'>Which fiat currencies does the platform support?</h2>
                                <p className='contnt-faq-description'>Please refer to P2P order limits for the full list of fiat currencies supported on P2P Trading. </p>

                                <br />
                                <h2 className='contnt-faq-heading'>How much are transaction fees on the P2P Platform?</h2>
                                <p className='contnt-faq-description'>P2P on BLC Exchange offers zero transaction fees for either buyer or seller. However, traders may need to pay transaction fees to the payment provider based on the payment method selected. </p>

                                <br />
                                <h2 className='contnt-faq-heading'>Why am I ineligible to buy or sell my coin?</h2>
                                <p className='contnt-faq-description'>This is because you did not fully meet the requirement set by the advertiser. You can click on the ineligible button to check on the missing criteria. </p>

                                <br />
                                <h2 className='contnt-faq-heading'>What payment methods are supported for P2P trade?</h2>
                                <p className='contnt-faq-description'>P2P on BLC Exchange supports more than 300 payment methods, including debit cards, credit cards, in-person cash payments and more.
                                </p>

                                <br />
                                <h2 className='contnt-faq-heading'>Do I need KYC to perform P2P Trading? </h2>
                                <p className='contnt-faq-description'>Yes, Individual KYC Lv.1 is required. Please note that only individual KYC is accepted. Business KYC is not accepted. For more info, please refer to How to Complete Individual KYC Verification.</p>

                                <br />
                                <h2 className='contnt-faq-heading'>How do I submit my KYC?</h2>
                                <p className='contnt-faq-description'>Simply proceed with the following steps:<br /></p>
                                <p className='contnt-faq-description'> 1. Click on <strong>Account & Security</strong> in the upper right-hand corner of the page.<br /></p>
                                <p className='contnt-faq-description'>2. Click on <strong>Verify Now</strong> in the <strong>Identity Verification</strong> column under <strong>Account Information.</strong><br /></p>
                                <p className='contnt-faq-description'>3. Click on <strong>Verify Now</strong> under Level 1 Basic Verification.<br /></p>
                                <p className='contnt-faq-description'> Or you can click <a href='http://localhost:3000/vendor/profile/kyc-verification'>here</a>  to complete the verification. </p>

                                <br />
                                <h2 className='contnt-faq-heading'>Can I trade with users in other countries or regions?</h2>
                                <p className='contnt-faq-description'>Yes. You can trade with any advertiser as long as you can successfully conduct your transfer in the fiat currency requested by the advertiser.</p>

                                <br />
                                <h2 className='contnt-faq-heading'>What’s the minimum amount to trade per P2P order?</h2>
                                <p className='contnt-faq-description'>Please refer to P2P order limits for more details. The actual tradable amount depends on the range limit set by the advertiser.</p>

                                <br />
                                <h2 className='contnt-faq-heading'>How will I be notified of a new order?</h2>
                                <p className='contnt-faq-description'>You’ll receive the order information by SMS and email if you've enabled them. To set up, please head to <strong>Account & Security --{'>'} Two-Factor Authentication</strong> to select the authentication you wish to enable.</p>

                                <br />
                                <h2 className='contnt-faq-heading'>How to view a P2P completed order</h2>
                                <p className='contnt-faq-description'>You can check your <a href='http://localhost:3000/user/assets/history'>order history here.</a></p>
                                <p>Or, you can click <strong>Assets --{'>'} Funding Account</strong>  in the upper right corner of the page to view the assets you’ve purchased under<strong> Available Balance.</strong><br />
                                    If you want to start derivatives trading or using our BLC Exchange, please click on <strong>Transfer</strong> to transfer assets from your Funding Account to your Derivatives Account or Earn Account.</p>

                                <br />
                                <h2 className='contnt-faq-heading'>Is P2P available on the BLC Exchange website and App?</h2>
                                <p className='contnt-faq-description'>Yes. P2P trading are available on the PC trading site and the BLC Exchange app.</p>
                                <br />
                                <h2 className='contnt-faq-heading'>How do I change my nickname?</h2>
                                <p className='contnt-faq-description'>Your nickname cannot be changed once it has been set.</p>


                            </div>
                            <div className='faq-content-button'>
                                <div className='faq-button-content'>
                                    Was this article helpful?
                                    <div className="likebutton">
                                        <a className='yesbutton' title="Yes">Yes</a>
                                        <a className='yesbutton' title="No">No</a>
                                        <p className='buttondesc' >
                                            25 out of 42 found this helpful
                                        </p>
                                        <div className='morequestion'>
                                            Have more questions? <a href="" >Submit a request</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='right-faq-content'>

                            <div className="most">
                                <h3>Related Articles</h3>
                                <ul className='articles_list'>
                                    <li><a href='#'>How to Post a Trade Ad on P2P</a></li>
                                    <li><a href="#">How to Sell Crypto with P2P Trading</a></li>
                                    <li><a href="#">How to Buy Crypto with P2P Trading</a></li>
                                    <li><a href="#">How to Make Payments to Advertisers on P2P Trading</a></li>
                                    <li><a href="#">How to Buy Coins with Your Credit/Debit Card on BLC Exchange</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

               
            </div>
        </div>

        </section >
    )
}
