import * as api from '../Api'
import { USER_ASSETS, DEPOSITTRX, USER_OVERALL_ASSETS } from '../Constants/Index';
/**
 * Get user Assets List Request
 * @param {*} formData 
 * @returns 
 */
export const assetsRequest = () => async (dispatch) => {
  try {
    const { data } = await api.getUserAssets();
    dispatch({ type: USER_ASSETS, payload: data })
    return data
  } catch (error) {

  }
}

/**
 * Exxchange Token within wallet 
 * @param {*} formData 
 * @returns 
 */
export const transferWalletRequest = (formData,config) => async (dispatch) => {
  try {
    const { data } = await api.transferToWallet(formData,config);
    dispatch({ type: USER_ASSETS, payload: data })
    return data;
  } catch (error) {

  }
}

export const getOverViewAssets=(currency)=>async(dispatch)=>{
  try {
    const { data } = await api.getOverViewAssets(currency);
    dispatch({ type: USER_OVERALL_ASSETS, payload: data })
    return data;
  } catch (error) {
    
  } 
}

