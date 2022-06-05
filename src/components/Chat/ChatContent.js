import React, { Component, useState, createRef, useEffect } from "react";
import "./chatContent.css";
import Avatar from "./Avatar";
import ChatItem from "./ChatItem";
import { chatList } from '../../Api/Api'
import { useParams } from 'react-router-dom'
import { ImageUrl } from '../../utils/config';

function ChatContent() {

const [chat,setChat] = useState([])

const { id,mail } = useParams()

  useEffect(()=>{
    console.log(ImageUrl)
    chatList(id,mail)
    .then(res=>{
      setChat(res.data.msgList)
    })
  },[])

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div>
          <div className="current-chatting-user">
            
            <div className="avatar">
                                    <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" className='avatar_img' alt="#" />
                                </div>
            <p>auereseis</p>
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
                user={itm.email===mail ? 'other' : "me"}
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
