import React, {useContext, useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BACKEND_URL, userContext } from '../main'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'

const Register = () => {
  let {isAuthenticated, changeAuth} = useContext(userContext)
  let [credentials, updateCredentials] = useState({email:'', username:'', password:''})
  let changer = (e) => {
    updateCredentials({...credentials, [e.target.name]: e.target.value})
  }
  let submit = async() => {
    if(!credentials.email || !credentials.password || !credentials.username){
      toast.error('One or some of the fields are missing!')
      return 
    }
    axios.post(`${BACKEND_URL}/api/v1/register`, {
      email: credentials.email,
      username: credentials.username,
      password: credentials.password
    }, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      withCredentials: true
    })
    .then(data => {
      toast.success(data.data.message)
      updateCredentials({email:'', username:'', password:''})
      changeAuth(true)
    })
    .catch(err => {
      toast.error(err.response.data.message)
    })
  }

  if(isAuthenticated) return <Navigate to={'/'} replace/>
  return (
    <div className="login">
      <div className="login-box">
      <input type="text" name="email" id="email" onChange={changer} placeholder='Email' value={credentials.email}/>
        <input type="text" name="username" id="username" onChange={changer} placeholder='Username' value={credentials.username}/>
        <input type="password" name="password" id="password" onChange={changer} placeholder='Password' value={credentials.password}/>
        <button onClick={submit}>REGISTER</button>
        <p>or</p>
        <Link to={'/login'}>Sign In</Link>
      </div>
    </div>
  )
}

export default Register