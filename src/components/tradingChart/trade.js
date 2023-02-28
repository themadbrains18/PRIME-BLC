import React from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import Loading from '../../Constants/Loading.js';
import { connect } from 'react-redux'
// import OrderBook from "./orderBook";
import OrderBookNew from './orderBookNew.js';
import { assetsRequest } from '../../Actions/assetsAction.js';
import { websocket_url } from './../../Api/index';

class Trade extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      bids: ' ',
      trades: ' ',
      time: '',
      buyBids: [],
      sellBids: [],
    };
    this.tradesCount = 100;
    this.streams = ['@ticker', '@depth20', '@trade'];
  }

  _connectSocketStreams(streams) {
    streams = streams.join('/');
    let connection = btoa(streams);
    // this[connection] = new WebSocket(`wss://blcexchange.net:5000/`);
    // this[connection] = new WebSocket(`ws://192.46.222.174:5000`);
    this[connection] = new WebSocket(websocket_url);

    // stream.binance.com:9443/stream?streams=${streams}
    // new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`) //

    this[connection].onopen = () => {
      console.log('WebSocket Client Connected');
    };

    this[connection].onmessage = evt => {

      let eventDataType = JSON.parse(evt.data).type;
      let eventData = JSON.parse(evt.data);

      if(eventDataType === 'all'){
        this.props.dispatch({
          type: 'SETORDERBOOK',
          payload : eventData
        })
      }
      else if(eventDataType === 'latest'){
        this.props.dispatch({
          type: 'SETORDERBOOKNEW',
          payload : eventData
        })
      }
      

      this.setState({
        loadedDepth: true,
        isLoaded: true
      })

      this.getAssets();

    };

    this[connection].onerror = evt => {
      console.error(evt);
    }
  }

  getAssets = async () => {
    await this.props.dispatch(assetsRequest());
  }

  _disconnectSocketStreams(streams) {
    streams = streams.join('/');
    let connection = btoa(streams);
    if (this[connection] !== undefined && this[connection].readyState === WebSocket.OPEN) {
      this[connection].close();
    }
  }

  componentDidMount() {

    let symbol = this.props.currencyId.toLowerCase();
    console.log('symbol', symbol)
    this._connectSocketStreams(this.streams.map(i => `${symbol}${i}`));
  }

  componentWillUnmount() {
    let symbol = this.props.currencyId.toLowerCase();
    this._disconnectSocketStreams(this.streams.map(i => `${symbol}${i}`))
  }

  render() {
    const { error, isLoaded, loadedDepth, loadedTicker, loadedTrades } = this.state;
    // console.log(isLoaded);
    if (error) {
    }
    return (
      <React.Fragment>

        {/* {loadedDepth ? <OrderBook bids={this.state.bids} asks={this.state.bids} id={this.props.currencyId} time={this.state.time} /> : <Loading />} */}
        {loadedDepth ? <OrderBookNew time={this.state.time} id={this.props.currencyId} /> : <Loading />}
      </React.Fragment>
    )
  }

}

export default connect(
  state => state
)(Trade)