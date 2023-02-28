import { SELLLIST } from "../Constants/Index"

const sells  = (sells  = [], action) => {

  switch (action.type) {

    case SELLLIST :
      
      /* session save */
      if(action.payload.status === 200){
        return action.payload.data
      }
      return []

    default:
      return sells
  }

}

export default sells ;
