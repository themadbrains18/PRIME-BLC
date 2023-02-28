import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import "swiper/css";
import "swiper/css/navigation";
import Hero from "../components/about-components/hero";
import FeatureSec from "../components/about-components/feature-sec";
import CryptoArk from "../components/about-components/crypto-ark";
import SuiteOfproducts from './../components/about-components/suite-of-products';
import FoundersStory from './../components/about-components/founders-story';
import ThreePillars from "../components/about-components/three-pillars";

// new Splide('.splide').mount();

const About = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
});
  return (
    <>
      <Hero />

      <FeatureSec />

      <CryptoArk />

      <SuiteOfproducts />

      <FoundersStory />
      
      <ThreePillars />
      
    </>
  );
};
export default About;
