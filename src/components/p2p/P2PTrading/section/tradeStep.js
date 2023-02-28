import React, { useState } from 'react'

export default function TradeStep() {
  const [active, setActive] = useState(1);
  
  return (
    <section className='trade_step'>
      <div className='trade_step_container'>
        <h1>Complete P2P trades in three steps, and {active === 1 ? 'buy' : 'sell'} coins with zero fees!</h1>
        <div className='trade_button'>
          <span onClick={() => setActive(1)} className={'buy_btn ' + (active === 1 ? 'buy_btn_active' : '')} >Buy Coins</span>
          <span onClick={() => setActive(2)} className={'buy_btn ' + (active === 2 ? 'buy_btn_active' : '')}>Sell Coins</span>
        </div>
        {active === 1 ? <div className='d-flex trade_step_cont '>
          <div className='trade_step_content'>
            <div className='trade_step_img'>
              <img className='content_img' src={require('../assets/images/ad.png')}></img>
              <img className='arrowimg' src={require('../assets/images/arrowfor.png')}></img>
            </div>

            <h5 className='title'>1. Select Your Ad</h5>
            <p className='subtitle'>Choose the ad with desired price and payment method. Enter your buy quantity and transaction amount to complete the order.</p>
          </div>
          <div className='trade_step_content'>
            <div className='trade_step_img'>
              <img className='content_img' src={require('../assets/images/payment.png')}></img>
              <img className='arrowimg' src={require('../assets/images/arrowfor.png')}></img>
            </div>

            <h5 className='title'>2. Complete Bank Payments</h5>
            <p className='subtitle'>Complete your payments based on information provided by the seller. BLC Exchange will not charge any fees.</p>
          </div>
          <div className='trade_step_content'>
            <div className='trade_step_img'>
              <img className='content_img' src={require('../assets/images/coin.png')}></img>
            </div>
            <h5 className='title'>3. Receive Your Coins</h5>
            <p className='subtitle'>After the seller receives the payment, he will release coins. Head to the Funding Account to review coins you received.</p>
          </div>
        </div>
          :
          <div className='d-flex trade_step_cont '>
            <div className='trade_step_content'>
              <div className='trade_step_img'>
                <img className='content_img' src={require('../assets/images/ad.png')}></img>
                <img className='arrowimg' src={require('../assets/images/arrowfor.png')}></img>
              </div>

              <h5 className='title'>1. Select Your Ad</h5>
              <p className='subtitle'>Choose the ad with desired price and payment method. Enter your sell quantity and transaction amount to complete the order.</p>
            </div>
            <div className='trade_step_content'>
              <div className='trade_step_img'>
                <img className='content_img' src={require('../assets/images/payment.png')}></img>
                <img className='arrowimg' src={require('../assets/images/arrowfor.png')}></img>
              </div>

              <h5 className='title'>2. Recieve Payments</h5>
              <p className='subtitle'>Log in to your receiving account to confirm that you've received the full payments from your buyer.</p>
            </div>
            <div className='trade_step_content'>
              <div className='trade_step_img'>
                <img className='content_img' src={require('../assets/images/coin.png')}></img>
              </div>
              <h5 className='title'>3. Release Your Coins</h5>
              <p className='subtitle'>Release coins to your buyer only after you've received their payments in full.</p>
            </div>
          </div>
        }
      
      </div>

    </section>
  )
}
