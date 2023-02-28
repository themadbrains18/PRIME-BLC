import { TRANSFERHISTORY  } from "../Constants/Index"

const transferhistory  = (transferhistory  = [], action) => {

  switch (action.type) {
    case  TRANSFERHISTORY :
      
      return action.payload.results

    default:
      return transferhistory
  }

}

export default transferhistory ;
