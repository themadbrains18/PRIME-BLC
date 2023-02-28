import * as api from '../Api'
import { ORDERLIST, SELLLIST, UPDATEBUYORDER } from '../Constants/Index';

export const createOrder = (formData)=>async(dispatch)=>{
  try {
    let data = await api.saveOrder(formData);
    return data;
  } catch (error) {
    
  }
}

export const updateOrderPayment = (formData)=>async(dispatch)=>{
  try {
    let data = await api.updateOrder(formData);
    // if (data.status === 200) {
    //    dispatch({ type :  UPDATEBUYORDER, payload :  data })
    // }
    return data;
    
  } catch (error) {
    
  }
}

export const cancelOrderPayment = (formData)=>async(dispatch)=>{
  try {
    let data = await api.cancelOrder(formData);
    if (data.status === 200) {
      dispatch({ type : UPDATEBUYORDER, payload :  data })
    }
    return data;
  } catch (error) {
    
  }
}

export const getAllOrderList=()=>async(dispatch)=>{
  try {
    let data = await api.getUserOrderList();
    if(data.status === 200){
      dispatch({type : ORDERLIST, payload: data})
    }
    return data;
  } catch (error) {
    
  }
}

export const getSellOrderList=()=>async(dispatch)=>{
  try {
    let data = await api.getUserSellAssetsList();
    if(data.status === 200){
      dispatch({type : SELLLIST, payload: data})
    }
  } catch (error) {
    
  }
}

export const getOrderDetail=(orderid)=>async(dispatch)=>{
  try {
    let data = await api.getOrderByID(orderid);
    if(data.status === 200){
      return data;
    }
  } catch (error) {
    
  }
}

export const orderReleasedCoin=(formData)=>async(dispatch)=>{
  try {
    console.log(formData);
    let data = await api.releaseOrderCoin(formData)
    return data
  } catch (error) {
    
  }
}