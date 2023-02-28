import { TOKEN_DETAIL } from "../Constants/Index"

const networks  = (networks  = [], action) => {

  switch (action.type) {

    case TOKEN_DETAIL :
      
      /* session save */
      if(action.payload.status === 200){
        return action.payload.data
      }
      return []

    default:
      return networks
  }

}

export default networks ;
