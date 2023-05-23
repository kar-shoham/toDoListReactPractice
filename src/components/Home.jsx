import React, { useContext, useState } from 'react'
import { userContext } from '../main'
import { Navigate } from 'react-router-dom'
import Task from './Task'
import axios from 'axios'
import { useEffect } from 'react'
import { BACKEND_URL } from '../main'
import { Toaster, toast } from 'react-hot-toast'

const Home = () => {
  let {isAuthenticated} = useContext(userContext)
  let [tasks, updateTasks] = useState([])
  let [taskName, updateTaskName] = useState('')
  
  let addTask = () => {
    if(!taskName){
      return toast.error('Please enter a task name')
    }
    axios.post(`${BACKEND_URL}/api/v1/task`, {
      task: taskName
    }, {
      withCredentials: true
    })
    .then(({data}) => {
      toast.success(data.message)
      updateTasks([...tasks, data.task])
      updateTaskName('')
    })
    .catch(err => {
      console.log(err)
      toast.error('Unable to add task')
    })
  }
  
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/tasks`, {withCredentials: true})
    .then(({data}) => {
      updateTasks(data.tasks)
    })
    .catch((err) => {
      toast.error('Please login first')
    })
  }, [])
  if(!isAuthenticated) return <Navigate to={'/login'}/>
  return (
    <div className="home">
      <div className="create">
        <input type="text" name="task" id="" placeholder='Task Name' value={taskName} onChange={(e) => updateTaskName(e.target.value)}/>
        <button onClick={addTask}>Add Task</button>
      </div> 
      {tasks.map(task => <Task 
        title={task.task} 
        id={task._id} 
        key={task._id} 
        tasks={tasks}
        updateTasks={updateTasks}
        completed={task.isCompleted}/>)}
    </div>
  )
}

export default Home