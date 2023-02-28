import { ORDERLIST } from "../Constants/Index"

const orders  = (orders  = [], action) => {

  switch (action.type) {

    case ORDERLIST :
      
      /* session save */
      if(action.payload.status === 200){
        return action.payload.data
      }
      return []

    default:
      return orders
  }

}

export default orders ;
