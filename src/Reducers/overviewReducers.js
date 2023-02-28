import { USER_OVERALL_ASSETS } from "../Constants/Index"

const assetoverview  = (assetoverview  = [], action) => {

  switch (action.type) {

    case USER_OVERALL_ASSETS :
      
      /* session save */
      if(action.payload.status === 200){
        return action.payload.data
      }
      return []

    default:
      return assetoverview
  }

}

export default assetoverview ;
