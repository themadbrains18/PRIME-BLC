
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import { getOrderChatList } from "../../../../../Actions/chatAction";

const MessageComponent = (props) => {

  const dispatch = new useDispatch();

  useEffect(() => {
    getChatList();
  }, [])

  const getChatList = async () => {
    let data = await dispatch(getOrderChatList(props.order._id))
    var element = document.querySelector(".chatContainor");
    element.scrollTop = element.scrollHeight;
  }
  const chats = useSelector((state) => state.chats);
  const users = useSelector((state) => state.users);
  const buyOrder = useSelector((state) => state.buyOrder);
  
  return (

    <div className="chatContainor">
      <div>
        {chats.length > 0 && chats.map((item,index) => {
          return <div key={item.message+index}>
            <div>
              {item.from === users.id ?
                <div className='chatTo'> 
                  <Card>
                    {/* <div className="profile_img"><p></p></div> */}
                    <Card.Body>{item.message}</Card.Body>
                  </Card>
                </div> :
                <div className='chatFrom'> 
                <Card>
                  {/* <div className="profile_img"><p></p></div> */}
                  <Card.Body>{item.message}</Card.Body>
                  </Card>
                </div>
              }
            </div>
          </div>
        })

        }
      </div>
    </div>
  )
}

export default MessageComponent;