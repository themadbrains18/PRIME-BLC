
import { DASHBOARDINTERVAL } from "../Constants/Index"

const intervals = (intervals={},action)=>{
  switch (action.type){
    case DASHBOARDINTERVAL :
      return action.payload

    default:
        return intervals  
  }
}

export default intervals;