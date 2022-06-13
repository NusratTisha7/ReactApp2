
import React, { useState, useEffect, useRef } from 'react';


function ChatItem({  user, msg, image }) {

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, []);

  return (
  
      <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${user ? user : ""}`}
      ref={messagesEndRef}
    >
      <div className="chat__item__content mt-3">
        <div>{msg}</div>
      </div>
     
      <div className="avatar">
        <img src={image} className='avatar_img' alt="#" />
      </div>
    </div>
  );
}

export default ChatItem;
