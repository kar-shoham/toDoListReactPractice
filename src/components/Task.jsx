import React, { useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../main'
import { toast } from 'react-hot-toast'

const Task = ({title, completed, id, updateTasks, tasks}) => {
    let [taskTitle, updateTitle] = useState(title)
    let [isCompleted, updateCompletion] = useState(completed)
  let deleteTask = () => {
    axios.delete(`${BACKEND_URL}/api/v1/task/${id}`, {withCredentials: true})
    .then(() => {
        toast.success('Deleted Successfully!')
        updateTasks(tasks.filter(task => task._id !== id))
    })
    .catch(err => {
        console.log(err)
        toast.error('Unable to delete!')
    })
  }
  let changeCompletion = () => {
    axios.patch(`${BACKEND_URL}/api/v1/task/flip/${id}`, {}, {withCredentials: true})
    .then(() => {
        toast.success('Updated successfully')
        updateCompletion(!isCompleted)
    })
    .catch(err => {
        console.log(err)
        toast.error('Some error occured')
    })
  }
  let updateTask = () => {
    if(!taskTitle){
        return toast.error('Task cannot be empty!')
    }
    axios.patch(`${BACKEND_URL}/api/v1/task/${id}`, {
        task: taskTitle
    }, {
        withCredentials: true
    })
    .then(() => {
        console.log(taskTitle)
    })
    .catch(err => {
        console.log(err)
        toast.error('Some error occured')
    })
  }
  return (
    <div className="task">
        <input type="text" id="" value={taskTitle} onChange={(e) => updateTitle(e.target.value)}/>
        <div className="options">
            <input type="checkbox" name="" id="" checked={isCompleted} onChange={changeCompletion}/>
            <button onClick={updateTask}>UPDATE</button>
            <button onClick={deleteTask}>DELETE</button>
        </div>
    </div>
  )
}

export default Task