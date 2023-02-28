import { SETORDERBOOK, SETORDERBOOKNEW } from "../Constants/Index"


const orderbooks = (orderbooks = [], action) => {

  switch (action.type) {

    case SETORDERBOOK:
      // debugger
      if (action.payload.status === 200) {
        return action.payload.data
      }
      return []

    case SETORDERBOOKNEW:
      if (action.payload.status === 200) {
        // console.log(action.payload.data,'orderbook new')
        return [action.payload.data, ...orderbooks ]
      }
      return []
    default:
      return orderbooks
  }

}



export default orderbooks;
