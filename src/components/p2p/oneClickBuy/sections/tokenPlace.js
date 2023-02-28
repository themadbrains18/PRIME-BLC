import React from 'react'

export default function TokenPlace() {
  return (
    <section className='best_place'>
      <div className='best_place_container'>
        <h1>The best place to buy coin</h1>
        <div className='d-flex best_place_cont '>
          <div className='best_place_content'>
            <img src={require('../assets/platform.png')}></img>
            <h5 className='title'>A platform you can count on</h5>
            <p className='subtitle'>Trade worry-free with our 99% availability track record even through volatile market periods.</p>
          </div>
          <div className='best_place_content'>
            <img src={require('../assets/trade.png')}></img>
            <h5 className='title'>Multiple payment methods</h5>
            <p className='subtitle'>Buy crypto with your credit or debit card, bank transfers, and more!</p>
          </div>
          <div className='best_place_content'>
            <img src={require('../assets/supportt.png')}></img>
            <h5 className='title'>Round-the-clock support</h5>
            <p className='subtitle'>With 24/7 multilingual support you'll always get answers</p>
          </div>
        </div>

      </div>

    </section>
  )
}
