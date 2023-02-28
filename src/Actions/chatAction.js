import * as api from '../Api'
import { CHAT, NOTIFICATION } from '../Constants/Index';

export const getOrderChatList=(orderid)=>async(dispatch)=>{
  try {
    let data = await api.getChatByOrder(orderid);
    if(data.status === 200){
      dispatch({type :CHAT, payload: data})
    }
    return data.data;
  } catch (error) {
    
  }
}

export const saveOrderChat=(formData)=>async(dispatch)=>{
  try {
    let data = await api.saveChat(formData);
    if(data.status === 200){
      let chat = await api.getChatByOrder(data.data.data.orderid);
      if(chat.status === 200){
        dispatch({type :CHAT, payload: chat})
      }
      return chat;
    }
  } catch (error) {
    
  }
}

export const getUserNotification=()=>async(dispatch)=>{
  try {
    let data = await api.getNotification();
    if(data.status === 200){
      dispatch({type :NOTIFICATION, payload: data})
    }
  } catch (error) {
    
  }
}

export const updateNotificationStatus=(formData)=>async(dispatch)=>{
  try {
    let data =  await api.notificationUpdate(formData);
    if(data.status === 200){
      let record = await api.getNotification();
      if(record.status === 200){
        dispatch({type :NOTIFICATION, payload: record})
      }
    }
  } catch (error) {
    
  }
}