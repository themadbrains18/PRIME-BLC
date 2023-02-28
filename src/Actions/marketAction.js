import * as api from '../Api'
import { MARKET_COIN } from '../Constants/Index'


/**
 * User Login
 * @param {*} formData 
 * @returns 
 */
 export const marketCoinRequest = (formData) =>  async (dispatch) => {
  try {
    const { data } = await api.getMarketCoins(formData);
    dispatch({ type :  MARKET_COIN, payload :  data })
  } catch (error) {
    
  }
}

export const cancelOrder = (data) => async(dispatch)=>{
  try {
    const {response} = await api.cancelMarketOrder(data);
  } catch (error) {
    console.log(error);
  }
}

export const mannualTokenChartDatafeeds =(symbol)=> async(dispatch)=>{
  try {
    const {response} = await api.marketTokenDatafeed(symbol);
    return response;
  } catch (error) {
    console.log(error);
  }
}