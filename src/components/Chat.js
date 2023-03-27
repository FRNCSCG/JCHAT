import React, {useContext} from 'react'
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import userimg from '../assets/user.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext';
import {useMyContext} from '../context/LayoutContext';

export default function Chat({show}) {

  const {data} = useContext(ChatContext)
  const [state, setState] = useMyContext();



  return (
    <div className={`chat ${show!==true && "hidden"}`}>
      {state.selected ? 
        <>
          <div className='chat-header'>
            <div className='chat-name'>
              <IconButton color='primary' sx={{ borderRadius: "5px" }} 
                onClick={e => setState({ ...state, selected: false, selectedId: null})}
              >
                <ArrowBackIcon />
              </IconButton>
              <img className='header-img' src={data.user.photoURL} alt='' />
              <p>{data.user.displayName}</p>
            </div>
            <div className='header-icons'>
              <IconButton color='primary' sx={{ borderRadius: "5px" }}>
                <VideocamIcon />
              </IconButton>
              <IconButton color='primary' sx={{ borderRadius: "5px" }}>
                <PersonAddIcon />
              </IconButton>
              <IconButton color='primary' sx={{ borderRadius: "5px" }}>
                <MoreHorizIcon />
              </IconButton>
            </div>
          </div>
          <Messages/>
          <Input/>
        </>
        :
        <div className='chat'>
          <div className='chat-header'> 
          </div>
          <div className='no-chat'> 
            <p>Select a chat to begin chatting</p>
          </div>
          
        </div>
      } 

    </div>
  )
}
