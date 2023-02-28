import React from "react";
import './info.css'
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import ArticlesImg from './images/articles.png'
const Info = () => {

    return (
        <>
            <section className='blog-info'>
                <div className="container py-5">
                    <div style={{
                        marginTop: '50px',

                    }}>
                        <h1 className="text-center">BLC Exchange Blog</h1>
                        <span className="register-ctn">
                            <input contenteditable="true" className="register-ctn-input" placeholder="Email / Phone number" />
                            <a className="blog-button register-ctn-button" href="/sign-up">Register</a>
                        </span>

                    </div>

                    <Splide hasTrack={false} aria-label="...">
                        <SplideTrack>
                            <SplideSlide  >
                                <div className="page-index-banner-item" >
                                    <div className="page-index-banner-item-img" >
                                        <img src={ArticlesImg} />
                                    </div>
                                    <div className="page-index-banner-item-content" >
                                        <h2 className="page_index_banner_title">Four Years of Milestones: A Message From Ben</h2>                           
                                                 <div className="page-index-banner-item-content-subheader">
                                            <span >Dec 1, 2022</span>
                                        </div>
                                        <div  >A letter from Ben Zhou, our CEO to wrap up 2022.
                                        </div>
                                    </div>
                                </div>
                            </SplideSlide>
                            <SplideSlide  >
                                <div className="page-index-banner-item" >
                                    <div className="page-index-banner-item-img" >
                                    <img src={ArticlesImg} />                                 
                                       </div>
                                    <div className="page-index-banner-item-content" >
                                        <h2 className="page_index_banner_title">Four Years of Milestones: A Message From Ben</h2>                                    <div className="page-index-banner-item-content-subheader">
                                            <span >Dec 1, 2022</span>
                                        </div>
                                        <div  >A letter from Ben Zhou, our CEO to wrap up 2022.
                                        </div>
                                    </div>
                                </div>
                            </SplideSlide>
                        </SplideTrack>

                        <div className="splide__arrows">
                            <button className="splide__arrow splide__arrow--prev"><img src="https://img.icons8.com/ios-glyphs/30/null/chevron-left.png" /></button>
                            <button className="splide__arrow splide__arrow--next"><img src="https://img.icons8.com/ios-glyphs/30/null/chevron-right.png" /></button>
                        </div>
                    </Splide>

                    {/* <Splide
                        options={{
                            rewind: true,
                            gap: '1rem',
                           isNavigation:true
                        }}
                        aria-label="My Favorite Images"
                    >
                        <SplideSlide  >
                            <div className="page-index-banner-item" >
                                <div className="page-index-banner-item-img" >
                                    <img src="https://images.contentstack.io/v3/assets/bltd582a520b3ab6888/bltb7c0b2fe3bb5781f/638817471686b510627b09e0/31369_EN_Bybit_4th_Anniversary_-_Phase_1_-_Blog_Letter_from_Ben_3200x1800_11zon.webp" />
                                </div>
                                <div className="page-index-banner-item-content" >
                                    <h2 className="page_index_banner_title">Four Years of Milestones: A Message From Ben</h2>                                    <div className="page-index-banner-item-content-subheader">
                                        <span >Dec 1, 2022</span>
                                    </div>
                                    <div  >A letter from Ben Zhou, our CEO to wrap up 2022.
                                    </div>
                                </div>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="page-index-banner-item" >
                                <div className="page-index-banner-item-img" >
                                    <img src="https://images.contentstack.io/v3/assets/bltd582a520b3ab6888/bltb7c0b2fe3bb5781f/638817471686b510627b09e0/31369_EN_Bybit_4th_Anniversary_-_Phase_1_-_Blog_Letter_from_Ben_3200x1800_11zon.webp" />
                                </div>
                                <div className="page-index-banner-item-content" >
                                    <div><h2>Four Years of Milestones: A Message From Ben</h2></div>
                                    <div className="page-index-banner-item-content-subheader">
                                        <span >Dec 1, 2022</span>
                                    </div>
                                    <div  >A letter from Ben Zhou, our CEO to wrap up 2022.
                                    </div>
                                </div>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="page-index-banner-item" >
                                <div className="page-index-banner-item-img" >
                                    <img src="https://images.contentstack.io/v3/assets/bltd582a520b3ab6888/bltb7c0b2fe3bb5781f/638817471686b510627b09e0/31369_EN_Bybit_4th_Anniversary_-_Phase_1_-_Blog_Letter_from_Ben_3200x1800_11zon.webp" />
                                </div>
                                <div className="page-index-banner-item-content" >
                                    <div><h2>Four Years of Milestones: A Message From Ben</h2></div>
                                    <div className="page-index-banner-item-content-subheader">
                                        <span >Dec 1, 2022</span>
                                    </div>
                                    <div  >A letter from Ben Zhou, our CEO to wrap up 2022.
                                    </div>
                                </div>
                            </div>
                        </SplideSlide>
                        <div className="splide__arrows">
    <button className="splide__arrow splide__arrow--prev">Prev</button>
    <button className="splide__arrow splide__arrow--next">Next</button>
  </div>
                    </Splide> */}


                </div>
            </section>

        </>
    );
};
export default Info;
