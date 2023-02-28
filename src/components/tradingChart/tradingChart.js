import * as React from 'react';
import Datafeed from './datafeed'; 
import { websocket_url } from './../../Api/index';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
         
export class TVChartContainer extends React.PureComponent { 
  
  constructor(props) {
    super(props);
    this.streams = ['@ticker', '@depth20', '@trade'];
  }
  
	static defaultProps = {
		interval: '5',
		containerId: 'tv_chart_container',
		libraryPath: '/charting_library/', 
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true
	};

	tvWidget = null;

	componentDidMount() {
    let symbol = localStorage.getItem("symbolName")
    let streams = this.streams.join('/');
    let connection = btoa(streams);
    // this[connection] = new WebSocket(`wss://blcexchange.net:5000/`);
		// this[connection] = new WebSocket(`wss://192.46.222.174:5000`);
		this[connection] = new WebSocket(websocket_url);

    const widgetOptions = {
			symbol: symbol,
      height: 500,
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: Datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			theme: 'Dark',
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings', 'header_symbol_search', 'symbol_search_hot_key'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
		};

    // this[connection].onmessage = evt => {
    //   const tvWidget = new window.TradingView.widget(widgetOptions);
		//   this.tvWidget = tvWidget;
    // }
		
		const tvWidget = new window.TradingView.widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
        console.log('TradingView Charting Library API works correctly')
			});
		});
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	render() {
		return (
			<div
				id={ this.props.containerId }
				className={ 'TVChartContainer' }
			/>
		);
	}
}
