// import { useNavigate } from "react-router-dom"
import { LOGIN, LOGOUT, TRADING_PASSWORD, GOOGLE_AUTHENTICATION, UPDATE_USER } from "../Constants/Index"



// const navigation = useNavigate();

const users = (users = {}, action) => {

  switch (action.type) {

    case LOGIN:
      // debugger
      if (action.payload!== undefined && action.payload.status === 200) {
        // console.log(action.payload);
        // sessionStorage.setItem('token', action.payload.access_token)
        return action.payload
      }

    case LOGOUT:
      localStorage.clear();
      sessionStorage.removeItem('token')
      return action.payload

    case TRADING_PASSWORD:
      if (action.payload.status === 200) {
        users = { ...users, tradePassword: action.payload.data }
        return users
      }
    case GOOGLE_AUTHENTICATION :  
      if (action.payload.status === 200) {
        users = { ...users, secutiryFA: action.payload.user.TwoFA}
        return users
      }
    case UPDATE_USER:
      if (action.payload.status === 200) {
        users = { ...users, secutiryFA: action.payload.data.TwoFA}
        users = { ...users, email: action.payload.data.email}
        users = { ...users, number: action.payload.data.number}
        users = { ...users, dial_code: action.payload.data.dial_code}
        return users
      }
    default:
      return users
  }

}



export default users;
