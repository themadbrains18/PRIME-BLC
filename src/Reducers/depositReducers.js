import { DEPOSITTRX } from "../Constants/Index"

const deposittrxs  = (deposittrxs  = [], action) => {

  switch (action.type) {

    case DEPOSITTRX :
      
      /* session save */
      if(action.payload.status === 200){
        return action.payload.data
      }
      return []

    default:
      return deposittrxs
  }

}

export default deposittrxs ;
