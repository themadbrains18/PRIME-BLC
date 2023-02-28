import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import transferdata from '../../assets/images/transferdata.svg';
import Downarrow from '../../assets/images/down-arrow.svg';
import { transferWalletRequest } from '../../Actions/assetsAction'
import { assetsRequest, getOverViewAssets } from "../../Actions/assetsAction";
// import 'react-responsive-modal/styles.css';
// import Modal from 'react-responsive-modal';
import { sta_Toaster } from '../../Core/toaster';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import '../../Style/transferModel.css';
import CoinListDropdown from '../p2p/oneClickBuy/sections/coin-list-dropdown'


const TransferComponent = (props) => {
  // console.log(props, 'Props')
  const [dropdownVisible, setdropdownVisible] = useState(false);
  const [dropdownVisible1, setdropdownVisible1] = useState(0);
  const [dropdownVisible2, setdropdownVisible2] = useState(false);
  const [first_wallet, setfirst_wallet] = useState(props.wallet);
  const [first_wallet_name, setfirst_wallet_name] = useState(props.accountType);
  const [isRender, setIsRender] = useState(false);
  const [second_wallet, setsecond_wallet] = useState(props.wallet === 'main_wallet' ? 'trading_wallet' : 'main_wallet');
  const [second_wallet_name, setsecond_wallet_name] = useState(props.accountType === 'Main Account' ? 'Trading Account' : 'Main Account');
  const [trnsferId, settrnsferId] = useState('');
  const [trnsferIdname, settrnsferIdname] = useState('');
  const [trensferAmount, settrensferAmount] = useState('');
  const [selectedTokenBal, setSelectedTokenBal] = useState('');
  const [selectedCoin, setSelectedCoin] = useState();
  const tokenList = useSelector((state) => state.deposittokens);
  let assets = useSelector((state) => state.assets);


  useEffect(() => {
    if (tokenList.length > 0) {
      selectCoin(tokenList[0])
    }
    
    function handleClick(e) {
      if (e !== null && e.target !== null && e.target.className !== null && e.target.className.includes('form-control') === false && e.target.className.includes('symbole') === false && e.target.parentElement.parentElement.className.includes('autocomplete-search-result') === false && e.target.className.includes('autocomplete-search-result') != true) {
        setdropdownVisible2(false)
        setdropdownVisible1(false)
      }
    }


    document.body.addEventListener('click', (e) => handleClick(e));

    return () => {
      document.body.removeEventListener('click', (e) => handleClick(e));
    };
  }, []);


  const onCloseModal = () => {
    props.closeModel();
    settrnsferIdname('')
    settrnsferId('');

    setSelectedTokenBal('');
    setIsRender(false);
    settrensferAmount(0)
  };
  const [search, setsearch] = useState();
  const dispatch = new useDispatch();
 

  assets = assets.filter((item) => {
    return item.accountType === first_wallet_name;
  })
  const users = useSelector((state) => state.users);


  var config = {
    headers: {
      'Authorization': users.access_token
    }
  };
  const sender_wallet = (id, name) => {
    setfirst_wallet(id);
    setfirst_wallet_name(name);
    assets = assets.filter((item) => {
      return item.accountType === first_wallet_name;
    })
    setdropdownVisible2(false)
  }
  const receiver_wallet = (id, name) => {
    setsecond_wallet(id);
    setsecond_wallet_name(name);
    setdropdownVisible1(false)
  }

  const flipValue = (val1, name1, val2, name2) => {
    setfirst_wallet(val2);
    setsecond_wallet(val1);
    setfirst_wallet_name(name2);
    setsecond_wallet_name(name1);

  }
  const handelSubmit = async (e) => {
    e.preventDefault();
    let val = selectedCoin;
    let selectedToken = assets.filter((item) => {
      return item.token === val?.coinName;
    })
    let currentBalance= (selectedToken.length > 0 ? selectedToken[0].balance : '')

    if (parseFloat(trensferAmount) < 0 || parseFloat(trensferAmount) > currentBalance) {
      sta_Toaster('Please Enter amount less or equal of your current balance', 'error');
      return;
    }
    const trn = {
      user_id: users.id,
      sender: first_wallet,
      receiver: second_wallet,
      amount: trensferAmount,
      token_id: trnsferId,
    }

    const data = await dispatch(transferWalletRequest(trn, config));
    if (data.status === 200) {
      getAssetsOverview();
      getAssets();
      props.closeModel();
    }
  }

  const getAssetsOverview = async () => {
    let data = await dispatch(getOverViewAssets('USD'));
  }

  const getAssets = async () => {
    let data = await dispatch(assetsRequest());
  }

  const selectCoin = async (val) => {
    settrnsferId(val?._id);
    settrnsferIdname(val?.coinName)
    let selectedToken = assets.filter((item) => {
      return item.token === val?.coinName;
    })
    settrensferAmount(0)
    setSelectedTokenBal(selectedToken.length > 0 ? selectedToken[0].balance : '')
    setSelectedCoin(val)
    setdropdownVisible(false);
  }

  const getTokenAllBalance = async () => {
    let val = selectedCoin;
    settrnsferId(val?._id);
    settrnsferIdname(val?.coinName)
    let selectedToken = assets.filter((item) => {
      return item.token === val?.coinName;
    })
    settrensferAmount(selectedToken.length > 0 ? selectedToken[0].balance : '')
    setSelectedTokenBal(selectedToken.length > 0 ? selectedToken[0].balance : '')
  }

  if (props.selectedToken !== '') {
    if (isRender == false) {
      settrnsferIdname(props.selectedToken?.coinName)
      settrnsferId(props.selectedToken?._id);
      let selectedToken = assets.filter((item) => {
        return item.token === props.selectedToken?.coinName;
      })
      setSelectedCoin(props.selectedToken)
      setSelectedTokenBal(selectedToken.length > 0 ? selectedToken[0].balance : '')
      setIsRender(true);
    }
  }

  return (
    <>
      <ToastContainer position="top-right" />
      <Modal

        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered show={props.open}
        onHide={() => onCloseModal()}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title className="h5" id="contained-modal-title-vcenter">
            Transfer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <div className='row deposit-modal tmb--modal'>
              <div className='col-md-12'>

                <div>
                  <form onSubmit={handelSubmit} id='mainForm' method='post'>
                    <div className='fromtosection'>
                      <div className='wallet' style={{ position: 'relative' }}>
                        <label className="tolabel">From</label>
                        <div className={"inputfrom " + (dropdownVisible1 === 1 ? 'inputfrom-active' : '')} onChange={e => setsearch(e.target.value)}
                          onClick={() => setdropdownVisible1(1)}>

                          <input
                            type="text"
                            placeholder="Type to search list"
                            onChange={e => setsearch(e.target.value)}
                            onFocus={() => setdropdownVisible1(1)}
                            className='form-control'
                            value={first_wallet_name}
                            readonly="readonly"
                          />
                          <img src={Downarrow} />
                        </div>
                        {dropdownVisible1 === 1 && (
                          <div className="autocomplete-dropdown TEXT w-100">
                            <ul className="autocomplete-search-results-list">
                              <li className="autocomplete-search-result" style={{ display: second_wallet == 'main_wallet' ? 'none' : 'block' }} onClick={() => sender_wallet('main_wallet', 'Main Account')}>{'Main Account'}</li>
                              <li className="autocomplete-search-result" style={{ display: second_wallet == 'funding_wallet' ? 'none' : 'block' }} onClick={() => sender_wallet('funding_wallet', 'Funding Account')}>{'Funding Account'}</li>
                              <li className="autocomplete-search-result" style={{ display: second_wallet == 'trading_wallet' ? 'none' : 'block' }} onClick={() => sender_wallet('trading_wallet', 'Trading Account')}>{'Trading Account'}</li>

                            </ul>
                          </div>
                        )}

                      </div>
                      <div className=" transfer_img" >
                        <img src={transferdata} className='transfer_img' onClick={() => flipValue(first_wallet, first_wallet_name, second_wallet, second_wallet_name)} />
                      </div>
                      <div className='wallet'>
                        <label className="tolabel">To</label>
                        <div className={"inputfrom " + (dropdownVisible1 === 2 ? 'inputfrom-active' : '')}
                          onClick={() => setdropdownVisible1(2)}>
                          <input
                            type="text"
                            placeholder="Type to search list"
                            onChange={e => setsearch(e.target.value)}
                            onFocus={() => setdropdownVisible1(2)}
                            className='form-control my-0 py-1 w-100'
                            value={second_wallet_name}
                            readonly="readonly"
                          />
                          <img src={Downarrow} onClick={() => setdropdownVisible1(2)} />
                        </div>

                        {dropdownVisible1 === 2 && (
                          <div className="autocomplete-dropdown2 TEXT w-100">
                            <ul className="autocomplete-search-results-list">

                              <li className="autocomplete-search-result" style={{ display: first_wallet == 'main_wallet' ? 'none' : 'block' }} onClick={() => receiver_wallet('main_wallet', 'Main Account')}>{'Main Account'}</li>
                              <li className="autocomplete-search-result" style={{ display: first_wallet == 'funding_wallet' ? 'none' : 'block' }} onClick={() => receiver_wallet('funding_wallet', 'Funding Account')}>{'Funding Account'}</li>
                              <li className="autocomplete-search-result" style={{ display: first_wallet == 'trading_wallet' ? 'none' : 'block' }} onClick={() => receiver_wallet('trading_wallet', 'Trading Account')}>{'Trading Account'}</li>

                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='coin-transfer' style={{ position: 'relative' }}>
                      <label className="tolabel">Coin</label>
                      <div className={"inputfrom " + (dropdownVisible ? 'inputfrom-active' : '')} onChange={e => setsearch(e.target.value)}
                        onClick={() => setdropdownVisible(true)}>

                        <input
                          type="text"
                          placeholder="Type to search list"
                          onChange={e => setsearch(e.target.value)}
                          onFocus={() => setdropdownVisible(true)}
                          className='form-control'
                          value={trnsferIdname}
                        />
                        <img src={Downarrow} />
                      </div>

                      {dropdownVisible && <CoinListDropdown tokenList={tokenList} selectCoin={selectCoin} />}

                    </div>


                    <div className="amount-transfer">
                      <label className="tolabel" >Amount </label>
                      <div className="amountform">
                        <input type='number' min="0" max={selectedTokenBal} step="any" className='form-control' onChange={(e) => settrensferAmount(e.target.value)} value={trensferAmount} placeholder='Amount' required />
                        <div className="icon-transfer">
                          <span className="all-btn" onClick={() => { getTokenAllBalance(selectedTokenBal) }}>
                            ALL
                          </span>

                          <span>{trnsferIdname}</span>
                        </div>


                      </div>
                    </div>

                    <div className="transfer-exchange-info">
                      <div>
                        Transferable Amount
                      </div>
                      <div>
                        {trensferAmount} {trnsferIdname}
                      </div>
                    </div>

                    <div className="transfer-submit-btn text-center">
                      <button type="submit" className=' submit__btn btn ' name="submit" >Confirm</button>
                    </div>

                  </form>
                </div>

              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default TransferComponent;