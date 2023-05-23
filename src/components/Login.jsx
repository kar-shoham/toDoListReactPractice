import React, { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BACKEND_URL } from '../main'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { userContext } from '../main'

const Login = () => {
  let [credentials, updateCredentials] = useState({email:'', password:''})
  let {isAuthenticated, changeAuth} = useContext(userContext)
  let changer = (e) => {
    updateCredentials({...credentials, [e.target.name]: e.target.value})
  }
  let submit = async() => {
    if(!credentials.email || !credentials.password){
      toast.error('One or some of the fields are missing!')
      return 
    }
    axios.post(`${BACKEND_URL}/api/v1/login`, {
      email: credentials.email,
      password: credentials.password
    }, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      withCredentials: true
    })
    .then(data => {
      toast.success(data.data.message)
      updateCredentials({email:'', password:''})
      changeAuth(true)
    })
    .catch(err => {
      toast.error(err.response.data.message)
      changeAuth(false)
    })
  }

  if(isAuthenticated) return <Navigate to={'/'} replace/>


  return (
    <div className="login">
      <div className="login-box">
        <input type="text" name="email" id="email" onChange={changer} placeholder='Email' value={credentials.email}/>
        <input type="password" name="password" id="password" onChange={changer} placeholder='Password' value={credentials.password}/>
        <button onClick={submit}>LOGIN</button>
        <p>or</p>
        <Link to={'/register'}>Sign Up</Link>
      </div>
    </div>
  )
}

export default Login