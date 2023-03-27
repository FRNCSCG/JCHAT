import React, { useContext, useEffect, useRef } from 'react'
import userimg from '../assets/user.png'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

export default function Message({message}) {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const fireBaseTime = new Date(
    message.date.seconds * 1000 + message.date.nanoseconds / 1000000,
  );
  const date = fireBaseTime.toDateString();
  const atTime = fireBaseTime.toLocaleTimeString();


  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  
  return (
    // owner decides side of the message
    <div ref={ref}
     className={`message ${message.senderId===currentUser.uid && "owner"}`} >
      <div className='message-info'>
        <img className='avatar' src={message.senderId===currentUser.uid ? currentUser.photoURL : data.user.photoURL } alt=''/>
      </div>
      <div className='message-content'>
        {message.image && <img  src={message.image} alt=''/>}
        <p>{message.text}</p>

      </div>
      <div className='time'>{atTime.slice(0, -3) }</div>
    </div>
  )
}
