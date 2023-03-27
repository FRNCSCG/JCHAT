import React, { useContext, useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { IconButton, TextField } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import {v4 as uuid} from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import { db, storage } from '../firebase';

export default function Input() {

  const [text, setText] = useState("")
  const [image, setImage] = useState(null)
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  const [prev, setPrev] = useState(null);
  const [label, setLabel] = useState("write a message here");



  
  const handleSend = async () => {
    if (image || text.trim().length !== 0)
    {
      setText("")
      if (image){
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, image);
        setImage(null)

        uploadTask.on('state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log("ta mal esto", error)
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  image: downloadURL
                }),
              })   
            });

          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now()
          })
        })
      }
      await updateDoc (doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text
        },
        [data.chatId+".date"]: serverTimestamp()
      })
      await updateDoc (doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId+".date"]: serverTimestamp()
      })
    }
   

  }
  
  useEffect(() => {
    if (image) {
      setPrev (URL.createObjectURL(image))
      setLabel("write a description")
    }
    else {
      setPrev (null)
      setLabel("write a message here")
    }
    
  }, [image])
     
  return (
    <div className='input'>
      {prev ? 
        <div className='file-preview'>
          <div className='close-icon' >
            <IconButton color='secondary' sx={{ borderRadius: "5px" }}
              onClick={()=>setImage(null)}
            >
              <CloseIcon/>
            </IconButton>
          </div>
          <h3>Image preview</h3>
          <img className="img-preview" src={prev} alt= ""></img>
        </div> 
        : 
        <></>
      }
      <div className='input-bar'>
        <div className='input-icons'>
          <IconButton color='secondary' sx={{ borderRadius: "5px" }}>
            <AttachFileIcon/>
          </IconButton>
          <IconButton color='secondary' sx={{ borderRadius: "5px" }} component="label">
            <ImageIcon>
            </ImageIcon>
            <input hidden accept="image/*" type="file" onChange={e =>  setImage(e.target.files[0]) }/>
          </IconButton>
        </div>
        <div className='inputbox'>
          <TextField 
            onChange = {e=>setText(e.target.value)}
            onKeyPress={(event) => event.key === 'Enter' && handleSend()}
            value = {text}
            sx={{ width: "100%"}} 
            size='normal' variant="filled" label={label}
            InputLabelProps={{
              style: { color: '#3f51b5' },
            }}
            InputProps={{
              className:"textfield-input"
            }}
          />
        </div>
        <div className='send-icons'>
          <IconButton color='secondary' sx={{ borderRadius: "5px" }}>
            <KeyboardVoiceIcon/>
          </IconButton>
          <IconButton onClick={handleSend} color='success' sx={{ borderRadius: "5px" }}>
            <SendIcon/>
          </IconButton>
        </div>
      </div>
    </div>
  )
}
