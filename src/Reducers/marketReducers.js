import { MARKET_COIN } from "../Constants/Index"

const coins  = (coins  = [], action) => {

  switch (action.type) {

    case MARKET_COIN :
      
      /* session save */
      if(action.payload.status === 200){
        return action.payload.data
      }
      return []

    default:
      return coins
  }

}

export default coins ;
