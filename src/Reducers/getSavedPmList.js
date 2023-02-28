import { PMLIST, GETSAVEDPMLIST, UPDATESAVEDPMLIST, DELETESAVEDPMLIST, CREATESAVEDPMLIST,EDITSAVEDPMLIST } from "../Constants/Index"

const userpmlist = (userpmlist = { result: [] }, action) => {
  switch (action.type) {
    case GETSAVEDPMLIST:
      /* session save */
      if (action.payload.status === 200) {
        return {
          //  ...userpmlist,
          result: action.payload.result
        }
      }
      return {result:[]}
      

    case UPDATESAVEDPMLIST:
      if (action.payload.status === 200) {
        return {
          ...userpmlist,
          result: userpmlist.result.map((d) => {
            if (d._id === action.payload.result[0]._id) {
              return action.payload.result[0]
              // console.log(action.payload.result[0])
            } else {
              return d
            }
          })
        }
      }

      case EDITSAVEDPMLIST:
        if (action.payload.status === 200) {
          return {
            ...userpmlist,
            result: userpmlist.result.map((d) => {
              if (d._id === action.payload.result._id) {
                return action.payload.result
                // console.log(action.payload.result[0])
              } else {
                return d
              }
            })
          }
        }  



    // return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

    case DELETESAVEDPMLIST:

      if (action.payload.status === 200) {
        return { ...userpmlist, result: userpmlist.result.filter((d) => (d._id !== action.id)) }
      }

    case CREATESAVEDPMLIST : 
      if(action.payload.status === 200){
        return {
          ...userpmlist,
          result: [...userpmlist.result, action.payload.result]
        }
      }  

    default:
      return userpmlist
  }

}

export default userpmlist;
