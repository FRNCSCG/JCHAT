import { Divider, IconButton, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { collection, where, getDocs, query, getDoc, doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import ClearIcon from '@mui/icons-material/Clear';

export default function Search() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query (
      collection (db, "users"),
      where ("displayName", "==", username)
    )
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true)
    }
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };

  const handleClearClick = () => {
    setUsername("")
    setUser("")
  }

  return (
    <div className='search'>
      <TextField
        type="text"
        onKeyDown={handleKey}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{width: "100%", backgroundColor:''}} 
        size='small' variant="filled"  label='search users, chats...'
        InputLabelProps={{
          style: { color: '#3f51b5' },
        }}
        InputProps={{
          className:"textfield-input",
          endAdornment:(<IconButton onClick={handleClearClick} sx={{visibility: username ? "visible" : "hidden", color:"aliceblue"}}><ClearIcon/></IconButton>)
        }}

      />
      <div style={{height:'auto', width:'100%', backgroundColor:'darkblue'}}>
        {(user) ?  (
          <div className="chat-item" onClick={handleSelect}>
            <img src={user.photoURL} className="chat-img" alt="" />
            <div className='chat-info'>
              <p className='chat-title'>{user.displayName}</p>
            </div>
            <Divider variant='middle'/>
          </div>
          
        )
        :
          <></>
        }
      </div>
    </div>
  )
}
