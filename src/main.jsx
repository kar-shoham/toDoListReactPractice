import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export let userContext = React.createContext({isAuthenticated: false})

let AppWrapper = () => {
  let [isAuthenticated, changeAuth] = useState(false)
  let [user, updateUser] = useState({})
  return (
  <>
  <userContext.Provider value={{isAuthenticated, changeAuth, user, updateUser}}>
    <App />
  </userContext.Provider>
  </>
  )
}

export let BACKEND_URL = 'https://todolist-jfw5.onrender.com'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AppWrapper/>
)
