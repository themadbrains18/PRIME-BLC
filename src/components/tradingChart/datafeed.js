import axios from 'axios';
import { apiBaseUrl } from '../../Api';

const configurationData = {
    supported_resolutions: ['5','15', '30', '60', '1D', '1W', '1M']
};

export default {
    
    // This method is used by the Charting Library to get a configuration of your datafeed 
    // (e.g. supported resolutions, exchanges and so on)
    onReady: (callback) => {
        // console.log('[onReady]: Method called!!');
        setTimeout(() => callback(configurationData));
    },
    // This method is used by the library to retrieve information about a specific symbol 
    // (exchange, price scale, full symbol etc.).
    resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        // console.log('[resolveSymbol]: Method called!!', symbolName);
        let symbolParam = localStorage.getItem("symbolName")
        try {
            const symbol = {
                ticker: symbolParam,
                name: `${symbolParam}/USDT`,
                session: '24x7',
                timezone: 'Etc/UTC',
                minmov: 1,
                pricescale: 10000000,
                has_intraday: true,
                intraday_multipliers: ['1', '5', '15', '30', '60'],
                has_empty_bars: true,
                has_weekly_and_monthly: false,
                supported_resolutions: configurationData.supported_resolutions,
                volume_precision: 1,
                data_status: 'streaming',
                has_emtpy_bars: true,
                visible_plots_set: 'ohlc'
            }
            onSymbolResolvedCallback(symbol)
        } catch (error) {
            console.log(error)
        }
    },

    // This method is used by the charting library to get historical data for the symbol. 
    getBars: async(symbolInfo, resolution, onHistoryCallback,onDataCallback, onErrorCallback, first) =>{
       try {
            onDataCallback([], { noData: true });

        } catch (error) {
            // console.log('[getBars]: Get error', error);
            onErrorCallback(error);
        }
    },

    subscribeBars: async (symbolInfo, resolution, onRealtimeCallback, subscribeID, onResetCacheNeededCallback) => {
        try {
            // console.log('[subscribeBars]: Method call with subscribeUID:', subscribeID);
            if (resolution === '1D') {
                resolution = 1440;
            }
            let symbol = localStorage.getItem("symbolName")
            var config = {
                method: 'get',
                url: apiBaseUrl + '/market/chartData?symbol='+symbol,
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            const response2 = await axios(config)
                .then(function (response) {

                    const bars = response.data.data;

                    if (bars.length) {
                        bars.map(function (obj,index, arr) {
                            const prevBar = arr[index + 1];
                            if(prevBar != undefined){
                                let bar = {time: new Date(obj.createdAt).getTime(), close: prevBar.limit_usdt, high: prevBar.limit_usdt, low: obj.limit_usdt, open: obj.limit_usdt, volume: 0} // in subscribeBars
                                onRealtimeCallback(bar)
                            }
                            // else{
                            //     let bar = {time: new Date(obj.createdAt).getTime(), close: obj.limit_usdt+0.01, high: obj.limit_usdt+0.01, low: obj.limit_usdt, open: obj.limit_usdt, volume: 0} // in subscribeBars
                            //     onRealtimeCallback(bar)
                            // }
                            
                        });
                    } else {
                        let bar = {time: new Date().getTime(), close: 0, high: 0, low: 0, open: 0, volume: 0}
                        onRealtimeCallback(bar, { noData: true });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });



        } catch (err) {
            console.log({ err })
            // onErrorCallback(err)
        }
    },
    unsubscribeBars: (subscribeID) => {
        console.log('[unsubscribeBars]: Method call with subscriberUID:', subscribeID);
    }
};
