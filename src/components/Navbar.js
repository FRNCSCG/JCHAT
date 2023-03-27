import { IconButton } from '@mui/material'
import React, { useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import userimg from '../assets/user.png'
import logo from '../assets/justchatlogo.png'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';



export default function Navbar() {
  const {currentUser}= useContext(AuthContext)

  return (
    <div className='navbar'>
      <img className='logo' src={logo} alt='' />
      <div className='user'>
        <img className='avatar' src={currentUser.photoURL} alt=''/>
        <div>{currentUser.displayName}</div>
        <IconButton color='primary' sx={{borderRadius: "5px"}}
        onClick={()=>signOut(auth)}
        > 
          <LogoutIcon/>
        </IconButton>
      </div>
    </div>
  )
}
