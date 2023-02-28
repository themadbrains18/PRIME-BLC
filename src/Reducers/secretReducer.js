import {  USER_SECRET } from "../Constants/Index"

const secret = (secret = '', action) => {

  switch (action.type) {

    case USER_SECRET:
        return action.payload
    
    default:
      return secret
  }

}


export default secret;
