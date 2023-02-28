import Slider from "./section/slider";
import FilterSection from "./section/filterSection";
import TokenListing from "./section/tokenListing";
import Faq from "./section/faq";
import TradeStep from "./section/tradeStep";

const P2PTrading = () => {
  return (<>
    <div className="trade_main_section">
      <Slider />
      <FilterSection />
      <TokenListing />
      <TradeStep />
      <Faq />
    </div>
  </>)
}

export default P2PTrading;