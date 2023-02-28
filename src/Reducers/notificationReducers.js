import { NOTIFICATION } from "../Constants/Index"

const notifications  = (notifications  = [], action) => {

  switch (action.type) {

    case NOTIFICATION :
      
      /* session save */
      if(action.payload.status === 200){
        return action.payload.data.data
      }
      return []
    default:
      return notifications
  }

}

export default notifications ;
