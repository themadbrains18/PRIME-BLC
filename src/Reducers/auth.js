// import { useNavigate } from "react-router-dom"
import { LOGIN, LOGOUT, TRADING_PASSWORD } from "../Constants/Index"


// const navigation = useNavigate();

const users  = (users  = {}, action) => {

  switch (action.type) {

    case LOGIN :
      
      if(action.payload.status === 200){
        return action.payload
      }
      return {}

    case LOGOUT:
      localStorage.clear();
      sessionStorage.clear();
      sessionStorage.removeItem('token')
      return action.payload
      

    default:
      return users
  }

}

export default users ;
