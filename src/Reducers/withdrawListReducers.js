import { GETSPECIFICTOKENWITHDRAW  } from "../Constants/Index"

const withdrawlist  = (withdraws  = [], action) => {

  switch (action.type) {
    case  GETSPECIFICTOKENWITHDRAW :
      
    return action.payload

    default:
      return withdraws
  }

}

export default withdrawlist ;
