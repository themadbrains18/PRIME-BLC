import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const CryptoArk = () => {
  return (
    <section className='crypto_ark_sec tmb_tabs_wrapper'>
        <div className='tmb_container'>
            <img className='side_img' src={require('../../assets/images/about-us/crypto-ark-side.png')} alt="error" />
            <div className='sec_head'>
                <h2 className='sec_main_heading'>Your Crypto Ark and<br /><span>Gateway to Web3</span></h2>
                <p className='sec_info'>Welcome aboard our crypto ark. We're here to nurture your every step as you scale and grow your way towards financial freedom.</p>
            </div>
            <div className='sec_content'>
                <div className='sec_tabs'>
                    <Tabs>
                        <TabList>
                            <Tab>VISION</Tab>
                            <Tab>MISSION</Tab>
                            <Tab>VALUES</Tab>
                        </TabList>

                        <TabPanel>
                            <h4 className='tab_info'>Be the crypto ark of the world.</h4>
                        </TabPanel>
                        <TabPanel>
                            <h4 className='tab_info'>Empowering crypto believers with next generation tools, support, and opportunities to unleash their full potential and level up with Web3.</h4>
                        </TabPanel>
                        <TabPanel>
                            <h4 className='tab_info'>We constantly Listen, Care, and Improve to deliver a next level trading experience.<br/><br/>Our community is at the center of everything we do. With our advanced, user-friendly platform, and top-notch products, we provide reliable navigation toward financial freedom. Combined with a best-in-class infrastructure, we move you forward toward a better, brighter decentralized future. </h4>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CryptoArk