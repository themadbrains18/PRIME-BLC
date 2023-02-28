import CoinListDropdown from '../../oneClickBuy/sections/coin-list-dropdown';
import {useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import trade from "../../oneClickBuy/assets/trade.png";
import indianRupee from '../../../../assets/coinIcon/rupee.png'
import firstCoinList from '../../../../Core/firstCoinList.json'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getTokenPrice } from '../../../../Core/common';
import { getTokenLowestPrice } from '../../../../Actions/p2pAction';

const schema = yup
  .object()
  .shape({
    token: yup.string().required('This field is required'),
    currency: yup.string().required('This field is required'),
    price: yup.number().positive().typeError("This Field is required").nullable()
  })
  .required();

const StepOne = ({ showDrp, setshowDrp, setTotalAmount, currentStep, setCurrentStep, setForm1, form1, settrnsferId }) => {
  const tokenList = useSelector((state) => state.deposittokens);
  const [selectedCoinName, setcoinName] = useState('USDT');
  const [selectedRecieveCoinName, setRecieveCoinName] = useState('INR');
  const [convertPrice, setConvertPrice] = useState(0)
  const [lowestPrice, setLowestPrice] = useState(0) 
  let assets = useSelector((state) => state.assets);
  const dispatch = new useDispatch();
  const [selectedCoin, setSelectedCoin] = useState({
    image: trade,
    coinName: "Select any Coin"
  });

  const [selectedSpendCoin, setSelectdSpendCoin] = useState({
    image: indianRupee,
    coinName: "Select any Coin"
  });

  const [price, setPrice] = useState()

  const { register, setValue, handleSubmit, formState: { errors }, } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const setSelectCoin = (data) => {
    settrnsferId(data?._id);
    setValue('token', data.coinName, { shouldValidate: true })
    setSelectedCoin({ image: data.image, coinName: data.coinName });
    let selectedToken = assets.filter((item) => {
      return item.token === data?.coinName;
    })
    let totalBal = 0;
    selectedToken.map((item) => {
      totalBal = totalBal + item.balance;
    })
    setTotalAmount(totalBal);
    setcoinName(data.coinName);
    getInitTokenPrice(data?._id, data.coinName);
  }

  const setSelectSpendCoin = (data) => {
    setValue('currency', data.coinName, { shouldValidate: true })
    setSelectdSpendCoin({ image: data.image, coinName: data.coinName });
    setRecieveCoinName(data.coinName)
    getInitTokenPrice();
  }

  const incrementValue = () => {
    let InputFeild = document.querySelector(".fixed_input input");
    let InputFeildvalue = parseFloat(InputFeild.value).toFixed(2)
    let finalVale = parseFloat(InputFeildvalue) + 10;
    InputFeild.value = finalVale.toFixed(2);
  }

  const decementValue = () => {
    let InputFeild = document.querySelector(".fixed_input input");
    let InputFeildvalue = parseFloat(InputFeild.value).toFixed(2);

    let finalVale = parseFloat(InputFeildvalue) - 10;

    if (finalVale > 0) {
      InputFeild.value = finalVale.toFixed(2);
    }
  }

  const onSubmitform = async (data) => {
    let obj = {
      token: data.token,
      tokenImage: selectedCoin.image,
      currency: data.currency,
      price: data.price,
    }
    setForm1(obj);
    setCurrentStep(currentStep + 1)

  }

  useEffect(() => {
    
    if (form1.token !== undefined) {
      setValue('token', form1.token, { shouldValidate: true })
      setSelectedCoin({ image: form1.tokenImage, coinName: form1.token });
      setValue('currency', form1.currency, { shouldValidate: true })
      setSelectdSpendCoin({ image: '', coinName: form1.currency });
      setValue('price', form1.price, { shouldValidate: true })
      setPrice(form1.price)
    }
  }, [])

  const getInitTokenPrice = async (tokenid, coinName) => {
    if (tokenList.length > 0) {
      let amount = await getTokenPrice(coinName === undefined ? selectedCoinName : coinName, selectedRecieveCoinName)
      if(tokenid !== undefined){
        let post = await dispatch(getTokenLowestPrice(tokenid))
        if(post.status === 200){
          if(post.data.data.length > 0){
            setLowestPrice(post.data.data[0].price)
          }
          else{
            setLowestPrice(0)
          }
          
        }
      }
      setConvertPrice(amount)
    }
  }

  return (
    <div className="post_normal_step1">
      <form onSubmit={handleSubmit(onSubmitform)}>
        <div className="input_exchange_wrapper">
          <div className="input_wrapper">
            <label className="exchange_label">Asset</label>
            <div className="input_inner" onClick={() => { setshowDrp(1) }}>
              <div>
                <img src={selectedCoin.image} alt="error" />
              </div>
              <p className='coin_name'>{selectedCoin.coinName}</p>
              <svg className='arrow_icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z" />
              </svg>
            </div>
            {errors.token?.message && <p className='pm_error'>{errors.token?.message}</p>}
            {showDrp === 1 && <CoinListDropdown tokenList={tokenList} selectCoin={setSelectCoin} />}
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path d="M1 26h43.586l-6.293 6.293 1.414 1.414L48.414 25l-8.707-8.707-1.414 1.414L44.586 24H1z" />
          </svg>
          <div className="input_wrapper">
            <label className="exchange_label">With Fiat</label>
            <div className="input_inner" onClick={() => { setshowDrp(2) }}>

              <div>
                <img src={indianRupee} alt="error" />
              </div>

              <p className='coin_name'>{selectedRecieveCoinName}</p>
              <svg className='arrow_icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z" />
              </svg>
            </div>
            {errors.currency?.message && <p className='pm_error'>{errors.currency?.message}</p>}
            {showDrp === 2 && <CoinListDropdown tokenList={firstCoinList} selectCoin={setSelectSpendCoin} />}
          </div>
        </div>
        <div className='prices'>
          <div className='prices_inner'>
            <p className='price_label'>Your Price</p>
            <h2 className='actual_price'><img src={indianRupee} alt="error" />{convertPrice}</h2>
          </div>
          <div className='prices_inner'>
            <p className='price_label'>Lowest Order Price</p>
            <h2 className='actual_price'><img src={indianRupee} alt="error" />{lowestPrice}</h2>
          </div>
        </div>
        <div className='fixed_wrapper'>
          <p className='price_label'>Fixed</p>
          <div className='fixed_input_wrapper'>
            <div className="signe signe-minus" onClick={decementValue}><span>-</span></div>
            <div className='fixed_input'>
              <input type="number" value={price} step="0.01" {...register('price')} onChange={(e) => { setPrice(e.target.value), setValue('price', e.target.value, { shouldValidate: true }) }} />
            </div>
            <div className="signe signe-plus" onClick={incrementValue}><span>+</span></div>
          </div>
          {errors.price?.message && <p className='pm_error'>{errors.price?.message}</p>}
        </div>
        <div className="form-group text-right">
          <button type="submit" style={{ backgroundColor: '#f7a600', padding: '5px 18px', fontSize: '18px' }} className=' submit__btn btn text-white' name="submit">Next</button>
        </div>
      </form>

    </div>
  )
}

export default StepOne;