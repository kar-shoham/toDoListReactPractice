import React, { useContext, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/About'
import Navbar from './components/Navbar'
import axios from 'axios'
import {BACKEND_URL, userContext} from './main'
import { Toaster } from 'react-hot-toast'

const App = () => {
  let {isAuthenticated, changeAuth, updateUser} = useContext(userContext)
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/me`, {
      withCredentials: true
    })
    .then(({data}) => {
      changeAuth(true)
      updateUser({username: data.user.username, email: data.user.email, role: data.user.role})
    })
    .catch(err => {
      changeAuth(false)
      updateUser({})
    })
  }, [])
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/about' exact element={<About/>}/>
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/register' exact element={<Register/>}/>
      </Routes>
      <Toaster/>
    </Router>
  )
}
export default App