import * as api from '../Api'
import { DEPOSIT_TOKEN, TOKEN_DETAIL } from '../Constants/Index'


/**
 * Get Token List Request
 * @param {*} formData 
 * @returns 
 */
 export const tokenRequest = (formData) =>  async (dispatch) => {
  try {
    const { data } = await api.getTokenList();

    dispatch({ type :  DEPOSIT_TOKEN, payload :  data })
    return data
  } catch (error) {
    
  }
}

export const topGainerRequest=()=>async (dispatch)=>{
  try {
    const {data} = await api.getTopGainerTokenList();
    return data;
  } catch (error) {
    
  }
}
