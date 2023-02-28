import * as api from '../Api'
import { PMLIST, CREATESAVEDPMLIST,GETSAVEDPMLIST, UPDATESAVEDPMLIST, DELETESAVEDPMLIST,EDITSAVEDPMLIST  } from '../Constants/Index';

//**************************************************//
// get payment methods lists
//**************************************************//


export const getPmList = () => async (dispatch) => {
    try {
        let {data} = await api.pm_methods()
        dispatch({type : PMLIST, payload : data })
        return data
    } catch (error) {
        console.log(error)
    }
} 


//**************************************************//
// save payment for specfic user
//**************************************************//

export const saveUserPm = (formData) => async (dispatch) => {
    // debugger
    try {
        const { data } = await api.save_pm_method(formData)
        if(formData.editID!==""){
            dispatch({ type : EDITSAVEDPMLIST, payload : data })    
        }
        else{
            dispatch({ type : CREATESAVEDPMLIST, payload : data })
        }
        // console.log(data)
        return data;
        
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
}


//**************************************************//
// get payment method for specific user
//**************************************************//

export const getSavedPm = () => async (dispatch) => {
    try {
        // GETSAVEDPMLIST
        const {data} = await api.saved_pm_list()
        dispatch({ type : GETSAVEDPMLIST, payload : data })
        return data;
    } catch (error) {
        
    }
}


//**************************************************//
// update payment status (disabled/enabled)
//**************************************************//

export const enabledANDdisabled = (formData) => async (dispatch) => {
    try {
        const {data} = await api.enabledAndDisabled(formData)
        // console.log(data.result[0]._id)
        dispatch({type : UPDATESAVEDPMLIST, payload : data}) 
    } catch (error) {
        console.log(error)
    }   
}

//**************************************************//
// user delete PM 
//**************************************************//

export const deletePaymentMethod = (pmid) => async (dispatch) => {
    try {
        const {data} = await api.deletePm(pmid)
        dispatch({type : DELETESAVEDPMLIST, payload : data, id : pmid })
    } catch (error) {
        console.log(error.message)
    }
}
