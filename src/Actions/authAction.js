import * as api from '../Api'
import storage from 'redux-persist/lib/storage'
import { LOGIN, LOGOUT,USER_ASSETS,USER_OVERALL_ASSETS,DEPOSIT_TOKEN,
  DEPOSITTRX,KYC,MARKET_COIN,TRADING_PASSWORD,GETTOKENBALANCE,ORDERLIST,
  PMLIST,GETSAVEDPMLIST, GOOGLE_AUTHENTICATION, UPDATE_USER,USER_SECRET } from '../Constants/Index'

/**
 * User Login
 * @param {*} formData 
 * @returns 
 */
export const loginRequest = (formData) =>  async (dispatch) => {
  try {
    const { data } = await api.loginRequestApi(formData);
    
    if(data.status === 200){
      sessionStorage.setItem('token', data.access_token);
      if(data.secutiryFA === 'enable'){
        return data;
      }
      else{
        await dispatch({ type :  LOGIN, payload :  data })
        return data;
      }
    }
    else{
      return data;
    }
    
  } catch (error) {
    
  }
}

/**
 * User register 
 * @param {*} formData 
 * @returns 
 */
export const sendRegisterRequest =  (formData) =>  async (dispatch) =>{
  try {
    // console.log(formData)
    const { data } = await api.registerRequest(formData);
    if(data.status === 200){
      // let obj = {id : data.data._id};
      // api.updateUserWallet(obj);
      return data;
    }
    else{
      return data;
    }

    
  } catch (error) {
    return error;
  }
}

/**
 * Send email and phone number verification OTP 
 * @param {*} email 
 * @returns 
 */
export const sendOtp =  (formData) => async (dispatch) =>{
  const {data}= await api.otpRequest(formData);
  localStorage.setItem('otp',data?.otp)
  return data;
}

/**
 * Reset Password request
 * @returns 
 */
export const resetPassword=(formData)=>async(dispatch)=>{
  const {data}=await api.resetPasswordRequest(formData);

  return data;
}
/**
 * Update User
 * Email/Numnber
 */

export const updateProfileRequest =  (formData) =>  async (dispatch) =>{
  try {
    // console.log(formData)
    const { data } = await api.updateUserProfile(formData);
    if(data.status === 200){
      dispatch({type: UPDATE_USER, payload : data });
      return data;
    }
    else{
      return data;
    }

    
  } catch (error) {
    return error;
  }
}


/**
 * Enable / Disable 2FA 
 * @returns 
 */
export const twoFA=(formData)=>async(dispatch)=>{
  const {data}=await api.enabledisableTwoFA(formData);
  if(data.status === 200){
    dispatch({type: GOOGLE_AUTHENTICATION, payload : data });
  }
  
  return data;
}

/**
 * get deposit adddress
 * @returns 
 */

 export const depositAddress=(formData)=>async(dispatch)=>{
  const {data} = await api.getDepositAddress(formData);
  return data;
 }

export const logout = () => async(dispatch) => {
    // localStorage.removeItem(`persist:STA`);
    await dispatch({type : USER_OVERALL_ASSETS, payload : {}})
    await dispatch({type : USER_ASSETS, payload : []})
    await dispatch({type : DEPOSIT_TOKEN, payload : {}})
    await dispatch({type : DEPOSITTRX, payload : {}})
    await dispatch({type : MARKET_COIN ,payload:{}})
    await dispatch({type : GETTOKENBALANCE, payload:{}})
    await dispatch({type : ORDERLIST, payload :{}})
    await dispatch({type : PMLIST, payload :{}})
    await dispatch({type : GETSAVEDPMLIST, payload :{}})
    await dispatch({type : KYC, payload :{}})
    storage.removeItem(`persist:STA`);
    await dispatch({type : LOGOUT, payload : {}})
    dispatch({ type: USER_SECRET, payload: '' })
    localStorage.clear();
} 

export const checkIsVerifidUser=(config)=>async(dispatch)=>{
  try {
    const {data} = await api.getUserSession(config);
    if(data.status === 200){
      return data  
    }
    
  } catch (error) {
    
  }
  
}

export const setTradingPassword =(formData)=> async(dispatch)=>{
  try {
    const {data} = await api.updateTradingPwdRequest(formData);
    
    if(data.status === 200){
      dispatch({type: TRADING_PASSWORD, payload : data});
      return data
    }
    else{
      return data;
    }
    
  } catch (error) {
    
  }
}

export const verify2faRequest=(formData)=>async(dispatch)=>{
  try {
    const {data} = await api.verify2FA(formData);
    return data;
  } catch (error) {
    
  }
}