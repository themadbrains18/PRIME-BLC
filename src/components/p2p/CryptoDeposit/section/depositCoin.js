import React, { useEffect, useState } from 'react'
import CoinListDropdown from '../../oneClickBuy/sections/coin-list-dropdown';
import NetworkListDropDown from '../../oneClickBuy/sections/network-list-dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import { depositAddress } from '../../../../Actions/authAction';
import { sta_Toaster } from '../../../../Core/toaster';
import { ToastContainer } from 'react-toastify';

export default function DepositCoin() {
    const [active, setActive] = useState(false);
    const [item, setItem] = useState('Main');
    const [show, setShow] = useState(true)

    const dispatch = new useDispatch();
    const users = useSelector((state) => state.users);
    const tokenList = useSelector((state) => state.deposittokens);

    const [networkList, setnetworkList] = useState([]);
    const [coinName, setcoinName] = useState('Select Coin');
    const [coinImage, setcoinImage] = useState('');
    const [networkName, setNetworkcoinName] = useState('Select Network');
    const [address, setDepositAddress] = useState('');

    useEffect(() => {
        if (tokenList.length > 0) {
            selectCoin(tokenList[0])
        }
    }, []);

    const handleCopyText = (e) => {
        setCopyText(e.target.value);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(address)
        sta_Toaster(`Text Copied`, 'success');
    }

    const activeDropdown = (e, index) => {
        e.preventDefault();
        if (index === active) {
            setActive(0)
        } else {
            setActive(index)
        }

    }
    const closeDropdown = () => {
        if (active !== false) {
            setActive(false);
        }
    }

    const selectCoin = async (data) => {
        var token = { "tokenID": data._id };
        setcoinName(data.coinName)
        setcoinImage(data.image)
        setNetworkcoinName('Select Network')
        setDepositAddress('')
        setnetworkList(data.network);
    }

    const selectNetwork = async (item) => {
        setNetworkcoinName(item.Network);
        let formData = { "userid": users?.id, "type": item.type }
        let data = await dispatch(depositAddress(formData));
        if (data.status === 200) {
            setDepositAddress(data.deposit_address)
        }
    }

    return (
        <>
        <ToastContainer />
        <section className='deposit_coin_wrapper' onClick={closeDropdown}>
            <div className='deposit_coin_container'>
                <div className='deposit_coin'>
                    <div className="coin_title_wrapper">
                        <div className="coin_title_icon">1</div>
                        <div className="coin_title_text">Choose coin to deposit</div>
                    </div>
                    <div className="deposit_coin_title">Coin</div>
                    <div className='deposit_dropdown_wrapper' onClick={(e) => { activeDropdown(e, 1) }}>
                        <div className="deposit_button_img">

                            <img src={coinImage} width='30' />
                        </div>
                        <div className="deposit_button_text">
                            <span>{coinName}</span>
                        </div>
                        <div className="deposit_button_icon">
                            <img src={require('../assets/images/menu-icon.png')} alt="error" />
                        </div>
                        {active === 1 && <CoinListDropdown tokenList={tokenList} selectCoin={selectCoin} />
                        }
                    </div>

                    <div className='deposit_coin_benefits_wrapper'>
                        <h2 className="deposit_coin_benefits_title">New User Rewards</h2>
                        <p className="deposit_coin_benefits_desc">Earn up to $5,000 when you complete simple tasks on BLC Exchange — It's that easy!</p>

                    </div>
                    <div className="deposit_import_wraper">
                        <strong>Important:</strong>
                        <ul>
                            <li className="deposit_list">
                                <div className="deposit_list_icon"></div>
                                Please make sure that only {coinName} deposit is made via this address. Otherwise, your deposited funds will not be added to your available balance — nor will it be refunded.
                            </li>
                            <li className="deposit_list">
                                <div className="deposit_list_icon"></div>
                                Please make sure that your BLC Exchange deposit address is correct. Otherwise, your deposited funds will not be added to your available balance — nor will it be refunded.
                            </li>
                            <li className="deposit_list">
                                <div className="deposit_list_icon"></div>
                                If the current address is used, 1 block confirmations are required before your deposited funds can be added to your available balance.
                            </li>
                            <li className="deposit_list">
                                <div className="deposit_list_icon"></div>
                                BEP2 and BEP20 (BSC) deposits not supported.
                            </li>
                            <li className="deposit_list">
                                <div className="deposit_list_icon"></div>
                                2 block confirmations are required to make withdrawals of this coin.
                            </li>
                        </ul>
                    </div>
                    {/* ====== list Dropdown ====== */}

                </div>

                <div className='deposit_coin_info'>
                    <div className="coin_title_wrapper">
                        <div className="coin_title_icon">2</div>
                        <div className="coin_title_text">Confirm Deposit Detail</div>
                    </div>
                    <div className='deposit_coin_info_wrapper'>
                        <div className="deposit_coin_title">Chain Type</div>
                        <div className='deposit_coin_select' onClick={(e) => { activeDropdown(e, 2) }}>
                            <input autoComplete="off" type="search" className="deposit_search_input" aria-expanded="false" value={networkName} />
                            {active === 2 && <NetworkListDropDown networkList={networkList} selectNetwork={selectNetwork} />
                            }
                        </div>
                        {/* ====== list Dropdown ====== */}

                        <div className="deposit_tips_parent">
                            <div className="deposit_address_title">Deposit address</div>
                            <div className="deposit_qrcode_container">
                                {address === '' ? <img className="deposit_qrcode" src={require('../assets/images/ar.png')} alt="" /> : 
                                
                                <img src={'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=' + address} className='' alt="website qrcode" />
                                }
                                
                            </div>
                            <div className="deposit_copy_wraper">
                                <span className="deposit_copy"
                                    onChange={handleCopyText} >{address}</span>
                                <span className="deposit_copy_text" onClick={copyToClipboard}>Copy</span>
                            </div>
                            <div className="deposit_transfer">
                                <div className="deposit_transfer_left">
                                    <span className="deposit_transfer_left_text">Deposits auto channeled to</span>

                                </div>
                                <div>
                                    <div className="by_group">
                                        <Dropdown>
                                            <Dropdown.Toggle className='deposiy_btn_contained'>
                                                {item}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => { setItem("Main") }}>Main</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setItem("Trading") }}>Trading</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                            <div className={show ? 'deposit_tips_container' : "deposit_tips_container_show"}>
                                <ul className="deposit_tips_list">
                                    <li>Deposits will be performed directly via the <b>Spot Account</b>. Your deposited funds and deposit history can be viewed under the Spot Account.</li>
                                </ul>
                                <div className="deposit_tips_btn_wraper">
                                    <button className="deposit_tips_btn" type="button" onClick={() => { setShow(false) }}>
                                        Acknowledge
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </section>
        </>
    )
}
