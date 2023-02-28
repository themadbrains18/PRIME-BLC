import * as api from '../Api'



import { GETTOKENBALANCE, USER_ASSETS, GETSPECIFICTOKENWITHDRAW, WITHDRAWHISTORY } from '../Constants/Index'


//*********************************************************//
// getTknBalance
//*********************************************************//

export const getTknBalance = (token,userid) => async (dispatch) => {
    try {
        let { data } = await api.getTokenbalance(token,userid);
        dispatch({ type : GETTOKENBALANCE , payload : data })
    } catch (error) {
        
    }
}


//*********************************************************//
// withdrawNewRequest
//*********************************************************//

export const withdrawNewRequest = (fromData) => async (dispatch) => {
    try {
        const withdrawData = await api.withdrawNewRequest(fromData)

        const { data } = await api.getUserAssets();
        dispatch({ type: USER_ASSETS, payload: data })

        return withdrawData;
        
    } catch (error) {
        return error
        
    }
}

//*********************************************************//
// getSpecificTokenWithdraw
//*********************************************************//

export const getSpecificTokenWithdraw = (token) => async (dispatch) => {
    try {
        const { data } = await api.api_getSpecificTokenWithdraw(token)
        dispatch({type : GETSPECIFICTOKENWITHDRAW, payload : data})
    } catch (error) {
        return error
    }
}


export const getUserWithdrawHistory=()=>async (dispatch) =>{
    try {
        const {data} = await api.getwithdrawhistory();
        dispatch ({type : WITHDRAWHISTORY, payload : data})
        return data;
    } catch (error) {
        
    }
}