import { GETTOKENBALANCE  } from "../Constants/Index"

const withdraws  = (withdraws  = [], action) => {

  switch (action.type) {
    case   GETTOKENBALANCE :
      // console.log(action.payload)
    return action.payload

    default:
      return withdraws
  }

}

export default withdraws ;
