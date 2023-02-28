import React,{useEffect} from 'react'
import './deposit.css'
import { useNavigate } from "react-router-dom";
import DepositCoin from './section/depositCoin'

export default function Deposit() {

  const navigate = useNavigate();
  const auth = sessionStorage.getItem('token');
  // console.log(auth)
  useEffect(()=>{
    if(auth === null){
      navigate('/login')
    }
  },[])
  
  return (
    <>
      <div className="deposit_main_section">
        <DepositCoin />
      </div>
    </>
  )
}
