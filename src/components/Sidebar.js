import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import ChatList from './ChatList'



export default function Sidebar({show}) {
  return (
    <div className={`sidebar ${show!==true && "hidden"}`}>
      <Navbar/>
      <Search/>
      <ChatList/>
    </div>
  )
}
