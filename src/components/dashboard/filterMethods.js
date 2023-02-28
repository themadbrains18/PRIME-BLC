import "../p2p/P2PTrading/trading.css"
const FilterMethods = (props) => {
  return (
    <div className="filter_list_dropdown">
      <div className="filter_list_inner">

        <ul className="content_wrapper">
          <li className="list_content">
            <div className="list_text">
              <p className="list_item_name">All</p>
            </div>
          </li>
          <li className="list_content">
            <div className="list_text">
              <p className="list_item_name">USDT</p>
            </div>
          </li>
          <li className="list_content">
            <div className="list_text">
              <p className="list_item_name">ETH</p>
            </div>
          </li>
          <li className="list_content">
            <div className="list_text">
              <p className="list_item_name">BTC</p>
            </div>
          </li>
        </ul>
      </div>
     
    </div>
  );
};

export default FilterMethods;
