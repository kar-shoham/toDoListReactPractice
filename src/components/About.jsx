import React, { useContext } from 'react'
import { userContext } from '../main'
import { Navigate } from 'react-router-dom'


const About = () => {
  let {isAuthenticated, user} = useContext(userContext)
  if(!isAuthenticated) return <Navigate exact to={'/login'}/>
  return (
    <div className="profile">
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  )
}

export default About