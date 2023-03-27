import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

export default function Login() {

  const [err, setErr] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    const email=e.target[0].value;
    const password=e.target[2].value;

    try {
      await signInWithEmailAndPassword(auth, email, password)

      navigate("/");
    } catch (err) {
      setErr(true)
    }

  }

  return (
    <div>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <TextField className="white" type="email" label="email"></TextField>
          <TextField  className="white" type="password" label="password"></TextField> 
          <Button variant="contained" type='submit' sx={{height:"50px"}}> Sign In </Button>
        </form>

        <Link to={"/register"}><p>Don't have an account yet? Register here!</p></Link>
      
      </div>

    </div>
  )
}
