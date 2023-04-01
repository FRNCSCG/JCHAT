import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import {useEffect, useState } from 'react';
import { useMyContext} from '../context/LayoutContext';


export default function Home() {
  const [state, setState] = useMyContext();
  const [showSidebar, setShowSidebar] = useState(true)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    if (state.selected)
    {
      setShowSidebar(false)
      setShowChat(true)
    }
    else {
      setShowSidebar(true)
      setShowChat(false)
    }
  

  }, [state])
  
  

  return (

    <div className='home'>
      <div className='container'>
        <Sidebar show={showSidebar}/>
        <Chat show={showChat} />
      </div>
    </div>
  )
}
