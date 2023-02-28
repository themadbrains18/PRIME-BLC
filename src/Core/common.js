import axios from 'axios';

export const getTokenCurrentMarketPrice= async(id)=>{
  let data = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + id + '&tsyms=USDT').then((response) => {
     return response.data[id]['USDT'];
  })

  return data;
}

export const getTokenPrice= async(receive,spend )=>{
  let data = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + receive + '&tsyms='+spend).then((response) => {
     return response.data[receive][spend];
  })

  return data;
}

