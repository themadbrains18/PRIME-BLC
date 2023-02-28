import Splide from '@splidejs/splide';
import '@splidejs/splide/css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { useEffect } from 'react';
import slide1 from '../assets/images/slide1.png'
import slide2 from '../assets/images/slide2.png'
import slide3 from '../assets/images/slide3.png'
import slide4 from '../assets/images/slide4.png'
import slide5 from '../assets/images/slide5.png'

const Slider = () => {

  useEffect(() => {
    new Splide('.splide', {
      perPage: 1,
      type: 'loop',
      // drag: 'free',
      focus: 'center',
      // autoScroll: {
      //   speed: 1,
      // },
    }).mount({});

  }, []);
  return (
  
    <section className='head_slider'>
      <div className='tmb_container'>
        <div className="splide" aria-labelledby="carousel-heading">
          <div className="splide__track">
            <ul className="splide__list">
              <li className="splide__slide">
                <img src={slide1} alt="error"/>
              </li>
              <li className="splide__slide">
                <img src={slide2} alt="error"/>
              </li>
              <li className="splide__slide">
                <img src={slide3} alt="error"/>
              </li>
              <li className="splide__slide">
                <img src={slide4} alt="error"/>
              </li>
              <li className="splide__slide">
                <img src={slide5} alt="error"/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  
  )
}

export default Slider;