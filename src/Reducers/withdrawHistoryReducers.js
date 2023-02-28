import { WITHDRAWHISTORY  } from "../Constants/Index"

const withdrawhistory  = (withdrawhistory  = [], action) => {

  switch (action.type) {
    case  WITHDRAWHISTORY :
      
      return action.payload.results

    default:
      return withdrawhistory
  }

}

export default withdrawhistory ;
