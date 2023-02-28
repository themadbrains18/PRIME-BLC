import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostListRequest, postCancel } from '../../../Actions/p2pAction';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import './ads.css';
import ReactPaginate from 'react-paginate';

const P2PAds = () => {

  const itemPerPage = 10;
  const [allPost, setAllPost] = useState([]);
  const [buyList, setBuyList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedpost, setSelectedPost] = useState('');
  const dispatch = new useDispatch();
  const onCloseModal = () => setOpen(false);
  const [active, setActive] = useState(0);
  const [type, setType] = useState('');
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(10);

  useEffect(() => {
    getPostList();
  }, [])

  const getPostList = async () => {
    let data = await dispatch(getPostListRequest());
    if (data.status === 200) {
      let record = data.data.data;
      const endOffset = itemOffset + itemPerPage;
      setPageCount(Math.ceil(record.length / itemPerPage));
      setItemOffset(endOffset)
      setBuyList(record.slice(itemOffset, endOffset));
      setAllPost(record);
    }
  }

  function handlePageClick(event) {
    let postData = allPost;
    const newOffset = (event.selected * itemPerPage) % postData.length;
    const endOffset = itemPerPage + newOffset;
    setBuyList(postData.slice(newOffset, endOffset));
  }
  const activeDropdown = (e, index) => {
    e.preventDefault();
    if (index === active) {
      setActive(0)
    } else {
      setActive(index)
    }
  }

  const cancelPost = async (e) => {
    e.preventDefault();
    let data = await dispatch(postCancel({ postid: selectedpost }));
    if (data.status === 200) {
      getPostList();
      setOpen(false);
    }

  }

  const filterWithOrderType = (type) => {
    setType(type)
    if (type !== '') {
      let filterPost = allPost.filter((item) => {
        if (item.type === type) {
          return item;
        }
      })
      const newOffset = (0 * itemPerPage) % filterPost.length;
      const endOffset = itemPerPage + newOffset;
      setPageCount(Math.ceil(buyList.length / itemPerPage));
      setBuyList(filterPost.slice(newOffset, endOffset));
    } else {
      const newOffset = (0 * itemPerPage) % buyList.length;
      const endOffset = itemPerPage + newOffset;
      setPageCount(Math.ceil(buyList.length / itemPerPage));
      setBuyList(allPost.slice(newOffset, endOffset));
    }

    setActive(0)

  }

  // console.log(buyList);

  return (
    <div className='p2p__myads__main'>
      <div className='p2p__ads__tmb_container'>
        <div className="p2p__order__overview">
          <div className='all_payment_methods'>
            <button className='coin_cta' onClick={(e) => { activeDropdown(e, 3) }}>
              <span className='span_wrapper'>
                <span>{type === '' ? 'Buy/Sell' : type === 'buy' ? 'Buy' : 'Sell'}</span>
                <img src={require('../P2PTrading/assets/images/menu-icon.png')} alt="error" />
              </span>
            </button>
            {active == 3 &&
              <div className="coin_list_dropdown">
                <div className="coin_list_inner">
                  <ul className="content_wrapper">
                    <li className="list_content" onClick={() => filterWithOrderType('')}>
                      <div className="list_text">
                        <p className="list_item_name">Buy/Sell</p>
                      </div>
                    </li>
                    <li className="list_content" onClick={() => filterWithOrderType('buy')}>
                      <div className="list_text">
                        <p className="list_item_name">Buy</p>
                      </div>
                    </li>
                    <li className="list_content" onClick={() => filterWithOrderType('sell')}>
                      <div className="list_text">
                        <p className="list_item_name">Sell</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            }

          </div>
        </div>
        <div className="p2p__orderListing__overview">
          <div className='p2p__postListing__main'>
            <div className="tab-content">
              <div id="USDT" className="tab-pane active">
                <div className="table-responsive-xl">
                  <Table hover>
                    <thead>
                      <tr>
                        <th className="w-25"> Trade/ID   </th>
                        <th>  Currency	  </th>
                        <th>  Price/Premium  </th>
                        <th> Remaining/Total </th>
                        <th> Type </th>
                        <th>  Time </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {buyList.length > 0 && buyList?.map((item) => {
                        return (<tr key={item?._id}>
                          <td>{item?._id}</td>
                          <td>{item?.currency}</td>
                          <td>{item?.price}</td>
                          <td>{item?.quantity}/{item.total_qty}</td>
                          <td>{item.type}</td>
                          <td>{moment(item?.createdAt).format('DD-MM-YYYY hh:mm:ss')}</td>
                          <td style={{ textAlign: 'center' }}><i className="fa fa-remove" onClick={(e) => { setSelectedPost(item?._id), setOpen(true) }} style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}></i></td>
                        </tr>)
                      })}

                    </tbody>
                  </Table>
                  <div className='table_pagination' >
                    <ReactPaginate
                      nextLabel=" > "
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      marginPagesDisplayed={2}
                      pageCount={pageCount}
                      previousLabel=" < "
                      pageClassName="table_pagination"
                      previousClassName="table_pagination"
                      nextClassName="table_pagination"
                      breakLabel="..."
                      breakClassName="table_pagination"
                      activeClassName="active-item"
                      renderOnZeroPageCount={null}
                    />
                  </div>
                </div>
              </div>
              <Modal show={open} centered onHide={() => onCloseModal()}>
                <Modal.Header className="text-center" closeButton={true}>
                  <div className="icon-box">

                  </div>
                  <h2>Are you sure?</h2>
                </Modal.Header>
                <Modal.Body>Do you really want to delete these records? This process cannot be undone.</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => { setOpen(false), setSelectedPost('') }}>Cancel</Button>{' '}
                  <Button variant="danger" onClick={(e) => cancelPost(e)}>Delete</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>

        </div>

      </div>


    </div>
  )
}

export default P2PAds;