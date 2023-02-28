import { DEPOSIT_TOKEN } from "../Constants/Index"

const deposittokens  = (deposittokens  = [], action) => {

  switch (action.type) {

    case DEPOSIT_TOKEN :
      
      /* session save */
      if(action.payload.status === 200){
        return action.payload.data
      }
      return []

    default:
      return deposittokens
  }

}

export default deposittokens ;
