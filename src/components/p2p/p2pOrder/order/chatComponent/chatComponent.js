import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageComponent from "./messageComponent";
import { saveOrderChat } from "../../../../../Actions/chatAction";
import { useEffect } from "react";
import { CREATECHAT } from "../../../../../Constants/Index";

import { websocket_url } from './../../../../../Api/index';

const ChatComponent = (props) => {

  const dispatch = new useDispatch();
  const [recipt, setRecipt] = useState();
  const [message, setMessage] = useState('');
  const [loading, setIsLoaading2] = useState(false);
  const users = useSelector((state) => state.users);

  const [streams, setStreams] = useState(['@ticker', '@depth20', '@trade'])

  const picFileUpload = (e) => {
    let uploadfile = document.querySelector('#photofile');
    uploadfile.click();

    setTimeout(() => {
      let file = uploadfile.files[0];
      // console.log(file);
      setRecipt(file);

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        setIsLoaading2(false);
      }.bind(this);

    }, 7000);
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      sendMessage(event)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    let from = users.id;
    let to = props.order.sell_userid;
    if (users.id === props.order.sell_userid) {
      to = props.order.buy_userid
    }
    formData.append('orderid', props.order._id);
    formData.append('postid', props.order.postid);
    formData.append('buy_userid', from);
    formData.append('sell_userid', to);
    formData.append('message', message);
    formData.append('files', recipt);
    setMessage('');

    let chatdata = {
      ws_type: 'chat',
      from: users.id,
      to: users.id === props.order.sell_userid ? props.order.buy_userid: props.order.sell_userid,
      orderid: props.order._id,
      message : message
    }

    // const ws = new WebSocket(`wss://blcexchange.net:5000/`);
    const ws = new WebSocket(websocket_url);
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify(chatdata));
    })

    let data = await dispatch(saveOrderChat(formData));
    // console.log(data);
    var element = document.querySelector(".chatContainor");
    element.scrollTop = element.scrollHeight;
    
  }

  useEffect(() => {
    let connection = btoa(streams.join('/'));
    // connection = new WebSocket(`wss://blcexchange.net:5000/`);
    connection = new WebSocket(websocket_url);

    connection.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    connection.onmessage = evt => {

      let eventDataType = JSON.parse(evt.data).type;
      let eventData = JSON.parse(evt.data);

      if(eventDataType === 'chat'){
        console.log(eventData,'============event Data========')
        if(eventData.data.orderid === props.order._id){
          dispatch({type :CREATECHAT, payload: eventData})
        }
      }

    };

    connection.onerror = evt => {
      console.error(evt);
    }
  }, [])

  return (
    <div className='chat'>
      <div className="chat_head">
        <div className="profile">
          <div className="profile_img">
            <p>S</p>
          </div>
          <div className="profile_info">
            <h4 className="profile_name">{users.username}</h4>
            <p>
              <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_118_8)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.6683 7.05828L14.5883 5.71828C14.4183 5.49828 14.3083 5.23828 14.2783 4.94828L14.0883 3.24828C14.0497 2.90883 13.8972 2.59248 13.6557 2.35091C13.4141 2.10934 13.0977 1.95682 12.7583 1.91828L11.0583 1.72828C10.7583 1.69828 10.4983 1.56828 10.2783 1.39828L8.93828 0.318281C8.38828 -0.121719 7.60828 -0.121719 7.05828 0.318281L5.71828 1.39828C5.49828 1.56828 5.23828 1.67828 4.94828 1.70828L3.24828 1.89828C2.54828 1.97828 1.99828 2.52828 1.91828 3.22828L1.72828 4.92828C1.69828 5.22828 1.56828 5.48828 1.39828 5.70828L0.318281 7.04828C-0.121719 7.59828 -0.121719 8.37828 0.318281 8.92828L1.39828 10.2683C1.56828 10.4883 1.67828 10.7483 1.70828 11.0383L1.89828 12.7383C1.97828 13.4383 2.52828 13.9883 3.22828 14.0683L4.92828 14.2583C5.22828 14.2883 5.48828 14.4183 5.70828 14.5883L7.04828 15.6683C7.59828 16.1083 8.37828 16.1083 8.92828 15.6683L10.2683 14.5883C10.4883 14.4183 10.7483 14.3083 11.0383 14.2783L12.7383 14.0883C13.4383 14.0083 13.9883 13.4583 14.0683 12.7583L14.2583 11.0583C14.2883 10.7583 14.4183 10.4983 14.5883 10.2783L15.6683 8.93828C16.1083 8.38828 16.1083 7.60828 15.6683 7.05828ZM6.49828 11.9983L2.99828 8.49828L4.49828 6.99828L6.49828 8.99828L11.4983 3.99828L12.9983 5.54828L6.49828 11.9983Z" fill="#EB9F12" />
                </g>
                <defs>
                  <clipPath id="clip0_118_8">
                    <rect width={16} height={16} fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>Verified :</span>
              <span className="profile_name_inner">&nbsp;{users.username}</span>
            </p>
          </div>
        </div>
      </div>
      {/* chat list component start */}

      <MessageComponent order={props.order} />

      {/* chat list component end */}

      {/* send message form section start */}

      {props.order.isCanceled === false &&
        <div className='chatForm'>
          <div>
            <div className="input-group">
              <div className="input-group-prepend">
                <div style={{ display: loading == true ? 'block' : 'none' }} className="overlay"></div>
                <button className="input-group-text" style={{ cursor: 'pointer' }} onClick={(e) => picFileUpload(e)}><i className="fa fa-paperclip"></i></button>
                <input type="file" name='profile' id='photofile' accept="" hidden onChange={(e) => { setIsLoaading2(true) }} />
              </div>
              <input className="w-65 form-control" placeholder="Enter Message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) =>handleKeyPress(e)}
                name="otp"
              />
              <button className="input-group-text" style={{ cursor: 'pointer' }} onClick={(e) => sendMessage(e)}><i className="fa fa-paper-plane"></i> </button>
            </div>
          </div>
        </div>
      }

      {/* send message form section end */}

    </div>
  )
}

export default ChatComponent;