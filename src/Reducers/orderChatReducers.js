import { CHAT ,CREATECHAT } from "../Constants/Index"

const chats  = (chats  = [], action) => {

  switch (action.type) {

    case CHAT :
      
      /* session save */
      if(action.payload.status === 200){
        return action.payload.data.data
      }
      return []
    case CREATECHAT :
      if(action.payload.status === 200){
        // console.log(action.payload.data,'after create order');
        if(Object.keys(chats).length > 0){
          return [...chats, action.payload.data ]
        }
        else{
          return [action.payload.data]
        }
        
      }
      return []
    default:
      return chats
  }

}

export default chats ;
