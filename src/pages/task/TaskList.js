import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useCollection } from '../../hooks/useCollection'
import TaskItems from '../../components/TaskItems'

import './Task.css'

export default function TaskList() {
    let history = useHistory()
    const location = useLocation()
    const projectId = location.state.projectId
    const projectName = location.state.projectName
    const { documents, error } = useCollection('tasks', ["projectId", "==", projectId], ["dueDate", "asc"])


    const handleCreate = (e) => {
        history.push({
          pathname: '/taskCreate',
          state: {projectId : projectId, projectName : projectName}
        })
    }

    return (
        <div>
            <button className="btn" onClick={handleCreate}>New Task</button> <br/>
            <h2 className="taskList-title">TaskList for Project '{projectName}'</h2>
            {error && <p className="error">{error}</p>}
            {documents &&
                (<div className="task-list">
                    {documents.length === 0 && <p>No tasks for this project yet!</p>}
                    <div className='column1'>
                        <p className='column-text'>To Do</p>
                        <TaskItems tasks={documents.filter(task => task.status === "new")} />
                    </div>
                    <div className='column2'>
                        <p className='column-text'>In Process</p>
                        <TaskItems tasks={documents.filter(task => task.status === "doing")} />
                    </div>
                    <div className='column3'>
                        <p className='column-text'>Complete</p>
                        <TaskItems tasks={documents.filter(task => task.status === "complete")} />
                    </div>
                </div>)
            }
        </div>
    )
}
