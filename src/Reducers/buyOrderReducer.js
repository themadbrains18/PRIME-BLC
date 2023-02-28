import { BUYORDER, UPDATEBUYORDER } from "../Constants/Index"

const buyOrder  = (buyOrder  = {}, action) => {

  switch (action.type) {

    case BUYORDER :
      
      if(action.payload.status === 200){
        return action.payload.data.data[0]
      }
      return {}
    
    case UPDATEBUYORDER :
      
      console.log(action.payload.data,'=========after in status update===========')
      if(action.payload.status === 200){
        buyOrder.orderData.isComplete= action.payload.data.isComplete
        buyOrder.orderData.isReleased= action.payload.data.isReleased
        buyOrder.orderData.inProcess= action.payload.data.inProcess
        buyOrder.orderData.isCanceled= action.payload.data.isCanceled
        buyOrder.orderData.p_method = action.payload.data.p_method
        return buyOrder
      } 

    default:
      return buyOrder
  }

}

export default buyOrder ;
