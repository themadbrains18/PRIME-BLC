import * as api from '../Api'
import { TRANSFERHISTORY } from '../Constants/Index'

export const getUserTransferHistory=()=>async (dispatch) =>{
    try {
        const {data} = await api.getTransferHistory();
        dispatch ({type : TRANSFERHISTORY, payload : data})
        return data;
    } catch (error) {
        return error
    }
}