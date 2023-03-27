import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, storage, db} from '../firebase'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import userimg from '../assets/user.png'
import {Link, useNavigate} from "react-router-dom"

export default function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    const username=e.target[0].value;
    const email=e.target[2].value;
    const password=e.target[4].value;
    const file=e.target[6].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, username);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        (error) => {
          setErr(true)
        },
        () => {
          // Get image url
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user,{
              displayName:username,
              photoURL:downloadURL,

            });
            await setDoc(doc(db,"users", res.user.uid), {
              uid: res.user.uid,
              displayName:username,
              email,
              photoURL:downloadURL,
            });
            await setDoc(doc(db,"userChats", res.user.uid), {});
            navigate("/");
          
          });
        }
      
      )

    } catch (err) {
      setErr(true)
    }

  }
  
  
  
  return (
    <div>
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <TextField className="white" type="text" label="username"></TextField>  
          <TextField className="white" type="email" label="email"></TextField>
          <TextField className="white" type="password" label="password"></TextField> 
          <Button className="white" variant="outlined" component="label">
            <UploadFileIcon/>
            Upload picture
            <input accept="image/*" type="file" hidden />
          </Button>
          <Button variant="contained" type='submit' sx={{height:"50px"}}> Sign Up </Button>
        
          {err && <span>Something went wrong</span>}
        </form>
        <Link to={"/login"}><p>Already have an account? Just login!</p></Link>
      
      </div>


    </div>
  )
}
