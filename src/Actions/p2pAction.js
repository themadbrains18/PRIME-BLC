import * as api from '../Api'
import { KYC,BUYLIST } from '../Constants/Index';

export const kycRequest= (formData)=>async (dispatch)=>{
  try {
    let data = await api.saveKyc(formData);
    dispatch({ type :  KYC, payload :  data })
    return data; 
  } catch (error) {
    return error;
  }
}

export const draftRequest= (formData)=>async (dispatch)=>{
  try {
    let data = await api.draftKyc(formData);
    dispatch({ type :  KYC, payload :  data })
    return data; 
  } catch (error) {
    return error;
  }
}

export const getKycRequest=()=>async(dispatch)=>{
  try {
     let data = await api.getKyc();
     dispatch({type :  KYC, payload :  data})
     return data; 
  } catch (error) {
    
  }
}

export const p2pPostRequest=(formData)=>async(dispatch)=>{
  try {
    let data = await api.savePost(formData);
    return data;
  } catch (error) {
    return error;      
  }
}

export const getPostListRequest=()=>async(dispatch)=>{
  try {
     let data = await api.getPost();
     dispatch({type :  BUYLIST, payload :  data})
     return data; 
  } catch (error) {
    
  }
}

export const postCancel=(formData)=>async(dispatch)=>{
  try {
    let data = await api.cancelPost(formData);
    return data;
  } catch (error) {
    
  }
}

export const postUpdate = (formData)=>async(dispatch)=>{
  try {
    let data = await api.updatePost(formData);
    return data;
  } catch (error) {
    
  }
}

export const getBuyListRequest =() =>async(dispatch)=>{
  try {
    let data = await api.getAllPost();
    return data;
  } catch (error) {
    
  }
}

export const getTokenLowestPrice=(token)=>async(dispatch)=>{
  try {
    let data = await api.getLowestPrice(token);
    return data;
  } catch (error) {
    
  }
}

