import * as api from '../Api'
import { DEPOSITTRX } from '../Constants/Index';

export const saveDepositHistory = (formData) => async (dispatch) => {
  try {
    const { data } = await api.saveDepositTransaction(formData);
    if (data.status === 200) {
      return data;
    }

  } catch (error) {
    return error;
  }
}

export const getDepositHistory = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getDepositTransaction(formData);
    if (data.status === 200) {
      dispatch({ type: DEPOSITTRX, payload: data })
      return data;
    }

  } catch (error) {
    return error;
  }
}

export const saveDepositTRXHistory = (formData) => async (dispatch) => {
  try {
    const { data } = await api.saveDepositTRXTransaction(formData);
    if (data.status === 200) {
      return data;
    }

  } catch (error) {
    return error;
  }
}

export const saveDepositTRC20History = (formData) => async (dispatch) => {
  try {
    const { data } = await api.saveDepositTRC20Transaction(formData);
    if (data.status === 200) {
      return data;
    }

  } catch (error) {
    return error;
  }
}