import { PMLIST } from "../Constants/Index"

const pmlist  = (pmlist  = [], action) => {

  switch (action.type) {
    case PMLIST :
      /* session save */
      // console.log(action.payload)
      if(action.payload.status === 200){
        return action.payload
      }
      return []

    default:
      return pmlist
  }

}

export default pmlist ;
