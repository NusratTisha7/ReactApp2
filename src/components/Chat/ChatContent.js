import React, { useState, useEffect } from "react";
import "./chatContent.css";
import ChatItem from "./ChatItem";
import { chatList } from '../../Api/Api'
import { useParams } from 'react-router-dom'
import { ImageUrl } from '../../utils/config';

function ChatContent() {

  const [chat, setChat] = useState([])

  const [currentUser, setCurrentUser] = useState({
    name: '',
    img: ''
  })

  const { id, mail } = useParams()

  useEffect(() => {
    console.log(ImageUrl)
    chatList(id, mail)
      .then(res => {
        setChat(res.data.msgList)
        for (let user of res.data.msgList) {
          if (user.email === mail) {
            setCurrentUser({
              name: user.name,
              img: user.imgURL
            })
            break;
          }
        }
      })
  }, [])


  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div>
          <div className="current-chatting-user">
              <div className="avatar">
                <img src={`${ImageUrl}/${currentUser.img}`} className='avatar_img' alt="#" />
              </div>
            <p style={{ marginLeft: '5px' }}>{currentUser.name}</p>
          </div>
        </div>

      </div>
      <div className="content__body">
        <div >
          {chat.map((itm, index) => {
            return (
              <ChatItem
                animationDelay={index + 2}
                key={itm.key}
                user={itm.email === mail ? 'other' : "me"}
                msg={itm.msg}
                image={`${ImageUrl}/${itm.imgURL}`}
              />
            );
          })}

        </div>
      </div>

    </div>
  );
}

export default ChatContent;
