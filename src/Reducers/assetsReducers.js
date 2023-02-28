import { USER_ASSETS } from "../Constants/Index"

const assets  = (assets  = [], action) => {

  switch (action.type) {

    case USER_ASSETS :
      
      /* session save */
      if(action.payload.status === 200){
        return action.payload.data
      }
      return []

    default:
      return assets
  }

}

export default assets ;
