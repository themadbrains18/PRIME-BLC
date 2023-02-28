import { toast } from 'react-toastify';

let option= {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  }

export const sta_Toaster=(message,type)=>{
  switch(type){
    case 'success' :
      toast.success(message,option);
      break;
    case 'warning' :
      toast.warn(message,option);
      break;
    case 'error' : 
      toast.error(message,option);
      break;
     case 'info' : 
      toast.info(message,option);
      break;
    default : 
      toast(message,option);       
  }
  
}  