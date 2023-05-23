import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../main'
import {BACKEND_URL} from '../main'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'

const Navbar = () => {
  let {isAuthenticated, changeAuth} = useContext(userContext)
  let logout = async() => {
    await axios.post(`${BACKEND_URL}/api/v1/logout`, {}, {withCredentials: true})
    .then(() => {
      changeAuth(false)
      toast.success('Logged out successfully!')
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <div className="navbar">
        <h2>TODO APP.</h2>
        <div className="navbar-inner">
        <Link to={'/'}>HOME</Link>
        <Link to={'/about'}>PROFILE</Link>
        {isAuthenticated ? <button onClick={logout}>LOGOUT</button>:<Link to={'/login'}>LOGIN</Link>}
        </div>
    </div>
  )
}

export default Navbar