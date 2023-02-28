import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { cancelOrder } from '../../Actions/marketAction';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';

const OrderTable = (props) => {

    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loadOrderList, setLoadOrderList] = useState('');
    const [orderList, setOrderList] = useState([]);
    const [filterType, setFilterType] = useState({ pairType: 'All', marketType: 'All', orderType: 'All' });
    const dispatch = new useDispatch();

    const orderCancel = (orderid, e) => {
        e.preventDefault();
        let orders = [orderid];
        setOrders(orders)
        setOpen(true);
    }

    const cancelAllOrders = async (e) => {
        e.preventDefault();
        let orders = [];
        await props.orderList.map((item) => {
            orders.push(item._id.toString())
        })
        if (orders.length > 0) {
            setOrders(orders)
            setOpen(true);
        }
    }

    const cancel = (e) => {
        let data = { "orders": orders };
        let response = dispatch(cancelOrder(data))
        let filterRemoveItem = orderList.filter((item)=>{
            return item._id.toString() != orders[0]
        })

        setOrderList(filterRemoveItem);
        setOpen(false);
    }

    const filterOrder = (type) => {
        let data = props.orderList.filter((item) => {
            if (type === 'marketlimit' || type === 'limit' || type === 'market') {
                setFilterType(prevState => ({
                    ...prevState,
                    marketType: type === 'marketlimit' ? 'All' : type
                }));
                if (type === 'marketlimit') {
                    return item
                }
                else {
                    return item.market_type === type
                }

            }
            else if (type === 'buysell' || type === 'buy' || type === 'sell') {
                setFilterType(prevState => ({
                    ...prevState,
                    orderType: type === 'buysell' ? 'All' : type
                }));
                if (type === 'buysell') {
                    return item
                }
                else {
                    return item.order_type === type
                }
            }
            else if (type === 'pairs' || type === 'current') {
                setFilterType(prevState => ({
                    ...prevState,
                    pairType: type === 'pairs' ? 'All' : type
                }));
                if (type === 'pairs') {
                    return item
                }
                else {
                    return item.token === id
                }
            }
        })

        setOrderList(data);
    }

    return (
        <div className="order__wrapper market">
            <div className="order__data active" id='myElement'>
                <Table responsive>
                    <thead>
                        <tr>
                            <th><div className="order__tabs__inner__Data">
                                <h4>
                                    Pair
                                </h4>
                            </div>
                            </th>
                           

                            <th><div className="order__tabs__inner__Data">
                                <h4>
                                    Price
                                </h4>
                            </div></th>
                            <th><div className="order__tabs__inner__Data">
                                <h4>
                                    Amount
                                </h4>
                            </div></th>
                            
                            <th><div className="order__tabs__inner__Data cancer__order" style={{ justifyContent: 'center' }}>
                                <button className="cancel__btn" onClick={(e) => cancelAllOrders(e)}>
                                    <span>
                                        Cancel All
                                    </span>
                                    <span className="cancel__icon">
                                        <img className="cancel-order-icon" src="../assets/svg/cancel-order-icon.svg" alt="" />
                                    </span>

                                    <div className="cancel__Popup">
                                        <p>
                                            Click here to all the open oders as specified (included order note display
                                            here)
                                        </p>
                                    </div>
                                </button>
                            </div></th>

                        </tr>
                    </thead>
                    <tbody>
                        {props.orderList.map((item, index) => {
                            return <tr key={item.token + index} className="data">
                                <td>{item.token}/USDT</td>
                                <td>{item.limit_usdt.toFixed(5)} USDT</td>
                                <td>{item.amount_token.toFixed(5)} {item.token}</td>
                                <td style={{ textAlign: 'center' }}><i className="fa fa-remove" style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }} onClick={(e) => orderCancel(item._id.toString(), e)}></i></td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
            <div className="order__data stop__orders__data" id='myElement1'>
                {props.orderList.length > 0 ? <Table responsive>
                    <thead>
                        <tr>
                            <th><div className="order__tabs__inner__Data">
                                <h4>
                                    Pair
                                </h4>
                            </div></th>
                           
                            <th><div className="order__tabs__inner__Data">
                                <h4>
                                    Price
                                </h4>
                            </div></th>
                            <th><div className="order__tabs__inner__Data">
                                <h4>
                                    amount
                                </h4>
                            </div></th>

                        </tr>
                    </thead>
                    <tbody>
                        {props.orderList.map((item, index) => {
                            return <tr key={item.token + index} className="data">   
                                <td>{item.token}/USDT</td>
                                <td>{item.limit_usdt.toFixed(5)} USDT</td>
                                <td>{item.amount_token.toFixed(5)} {item.token}</td>
                          

                            </tr>
                        })}
                    </tbody>
                </Table> :
                    <div className="bottom__resul"><span>Found <span>0</span> Results. Only display the recent 30 order
                        details in the past three months.</span>
                        <span className="history__popup__btn" style={{ marginleft: '4px' }}>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                            >
                            </svg>

                        </span>
                    </div>
                }

            </div>

           
            <div className="history__popup">
                <span>
                    For more order details, please check <a href="">Order History</a>.
                </span>
            </div>

            <Modal show={open} centered onHide={() => setOpen(false)}>
                <Modal.Header className="text-center" closeButton={true}>
                    <div className="icon-box">

                    </div>
                    <h2>Are you sure?</h2>
                </Modal.Header>
                <Modal.Body>Do you really want to cancel this order?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setOpen(false) }}>No</Button>{' '}
                    <Button variant="danger" onClick={(e) => cancel(e)}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OrderTable;
