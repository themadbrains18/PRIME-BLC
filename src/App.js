import React from "react";
import { Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import Header from './Header-Footer/Header';
import Footer from './Header-Footer/Footer';
import Login from './Templates/login';
import Kucoin from './Templates/Kucoin';
import ResetPaswrd from './Templates/reset-password';
import KucoinMarket from './Templates/kucoin-market';
import SignUp from './Templates/sign-up';
import Chart from "./Templates/chart";
// import Dashboard from "./Templates/dashboard";
// import P2P from "./Templates/p2p";
import Profile from "./Templates/profile";
import CookiesConsent from "./Core/cookiesConsent";
import About from './Templates/about';
import Blog from './Templates/blog';
import Conditions from "./Templates/conditions";
import PrivacyPolicy from "./components/footer/conditions/privacyPolicy";
import RiskDisclousure from "./components/footer/conditions/risk-disclousure";
import Feedback from './Templates/feedback'
import Carrers from "./Templates/carrers";

//Footer Service pages 
import Application from "./components/footer/services/application/application";
import TaxAPI from "./components/footer/services/taxApi/tax";
import Institutional from "./components/footer/services/institutional/institutional";

import OneClickBuy from "./components/p2p/index";
import Authentic from "./Templates/authentic";
import Learn from "./Templates/learn";
import P2pFaq from "./Templates/p2pFaq";
import Assests from "./Templates/userAssests";
import RecordHIstory from "./components/dashboard/recordHIstory";

const App = () => {

    const users = useSelector((state) => state.users);

    // console.log(users, ' after login users session ')

    let session = sessionStorage.getItem('token')

    // console.log(session, ' user session  ')

    return (
        <>
            <div className="header-div">
                <Header />
            </div>
            <Routes>
                <Route exact path="/" element={<Kucoin />}> </Route>
                <Route path="/login" element={<Login />}> </Route>
                <Route path="/sign-up" element={<SignUp />}> </Route>
                <Route exact path="/reset-password" element={<ResetPaswrd />}> </Route>
                
                {/* Profile Page Routes */}
                <Route exact path="/vendor/profile" element={users?.auth === true ? <Profile /> : <Navigate to="/" />}></Route>
                <Route exact path="/vendor/profile/:name" element={users?.auth === true ? <Profile /> : <Navigate to="/" />}></Route>

                <Route exact path="/market" element={<KucoinMarket /> }> </Route>
                
                {/* Market chart page routes */}
                <Route exact path="/trading-chart/:id" element={<Chart />}> </Route>

                {/* About page routes */}
                <Route exact path="/about-us" element={<About />}> </Route>
                <Route exact path="/blog" element={<Blog />}> </Route>
                <Route exact path="/terms-conditions" element={<Conditions />}> </Route>
                <Route exact path="/privacy-ploicy" element={<PrivacyPolicy />}> </Route>
                <Route exact path="/risk-disclouser" element={<RiskDisclousure />}> </Route>
                <Route exact path="/carrers" element={<Carrers />}> </Route>

                {/* Support page routes */}
                <Route exact path="/feedback" element={<Feedback />}> </Route>
                <Route exact path="/learn" element={<Learn />}> </Route>
                <Route exact path="/authenticity" element={<Authentic />}> </Route>
                <Route exact path="/p2p-faq" element={<P2pFaq />}> </Route>

                {/* Footer Page route  */}
                <Route exact path="/service/announcement" element={<Application />}></Route>
                <Route exact path="/service/taxapi" element={<TaxAPI />}></Route>
                <Route exact path="/service/institutional" element={<Institutional />}></Route>

                {/* P2P Route */}
                <Route exact path="/p2p/trade/:otc" element={<OneClickBuy />}></Route>
                <Route exact path="/p2p/trade/:otc/:orderid" element={<OneClickBuy />}></Route>

                {/* Assets Route New */}
                <Route exact path="/user/assets/:account" element={<Assests />}></Route>
                <Route exact path="/user/trade/history" element={<RecordHIstory />}></Route>
                <Route exact path="*" element={<Kucoin />}></Route>
            </Routes>
            <Footer />
            <CookiesConsent />
        </>
    )
}

export default App;

// "proxy": "https://blcexchange.net/api",