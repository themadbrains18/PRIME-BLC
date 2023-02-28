import { KYC } from "../Constants/Index"

const kycs  = (kycs  = [], action) => {

  switch (action.type) {

    case KYC :
      
      /* session save */
      if(action.payload.status === 200){
        return action.payload.data
      }
      return []

    default:
      return kycs
  }

}

export default kycs ;
