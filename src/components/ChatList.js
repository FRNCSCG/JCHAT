import React, { useContext, useEffect, useState } from 'react'
import userimg from '../assets/user.png'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {useMyContext} from '../context/LayoutContext';

export default function ChatList() {

  const [chats, setChats] = useState([])
  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)
  const [selected, setSelected] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [state, setState] = useMyContext();

  

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    
    currentUser.uid && getChats()
  
  }, [currentUser.uid])

  const handleSelect = (u, k) => {
    dispatch({type:"CHANGE_USER", payload: u })
    setSelected(true)
    setSelectedStyle(k)
    setState({ ...state, selected: true, selectedId: k})


  }

  return (

    <div className='chat-list'>
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat, id) => (
          //chat[0] is the element id, chat[1] is the chat data
          <div 
          key={chat[0]}
          id={chat[0]} 
          className={`chat-item ${(selectedStyle===chat[0] && state.selected===true) && "selected"} `}
          onClick={()=>handleSelect(chat[1].userInfo, chat[0])}>
           <img className='chat-img' src={chat[1].userInfo.photoURL} alt=''/>
           <div className='chat-info '>
             <p className='chat-title textbreak'>{chat[1].userInfo.displayName}</p>
             <p className='last-msg textbreak'>{chat[1].lastMessage?.text}</p>
           </div>
          </div>
        ))}
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat, id) => (
          //chat[0] is the element id, chat[1] is the chat data
          <div 
          key={chat[0]}
          id={chat[0]} 
          className={`chat-item ${(selectedStyle===chat[0] && state.selected===true) && "selected"} `}
          onClick={()=>handleSelect(chat[1].userInfo, chat[0])}>
           <img className='chat-img' src={chat[1].userInfo.photoURL} alt=''/>
           <div className='chat-info '>
             <p className='chat-title textbreak'>{chat[1].userInfo.displayName}</p>
             <p className='last-msg textbreak'>{chat[1].lastMessage?.text}</p>
           </div>
          </div>
        ))}
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat, id) => (
          //chat[0] is the element id, chat[1] is the chat data
          <div 
          key={chat[0]}
          id={chat[0]} 
          className={`chat-item ${(selectedStyle===chat[0] && state.selected===true) && "selected"} `}
          onClick={()=>handleSelect(chat[1].userInfo, chat[0])}>
           <img className='chat-img' src={chat[1].userInfo.photoURL} alt=''/>
           <div className='chat-info '>
             <p className='chat-title textbreak'>{chat[1].userInfo.displayName}</p>
             <p className='last-msg textbreak'>{chat[1].lastMessage?.text}</p>
           </div>
          </div>
        ))}
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat, id) => (
          //chat[0] is the element id, chat[1] is the chat data
          <div 
          key={chat[0]}
          id={chat[0]} 
          className={`chat-item ${(selectedStyle===chat[0] && state.selected===true) && "selected"} `}
          onClick={()=>handleSelect(chat[1].userInfo, chat[0])}>
           <img className='chat-img' src={chat[1].userInfo.photoURL} alt=''/>
           <div className='chat-info '>
             <p className='chat-title textbreak'>{chat[1].userInfo.displayName}</p>
             <p className='last-msg textbreak'>{chat[1].lastMessage?.text}</p>
           </div>
          </div>
        ))}
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat, id) => (
          //chat[0] is the element id, chat[1] is the chat data
          <div 
          key={chat[0]}
          id={chat[0]} 
          className={`chat-item ${(selectedStyle===chat[0] && state.selected===true) && "selected"} `}
          onClick={()=>handleSelect(chat[1].userInfo, chat[0])}>
           <img className='chat-img' src={chat[1].userInfo.photoURL} alt=''/>
           <div className='chat-info '>
             <p className='chat-title textbreak'>{chat[1].userInfo.displayName}</p>
             <p className='last-msg textbreak'>{chat[1].lastMessage?.text}</p>
           </div>
          </div>
        ))}
    </div>
  )
}
