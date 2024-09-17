import { useState } from 'react'
import React from 'react'
import './App.css'
import Navbar from './navbar'

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = () => {
    if (editingIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? { name: taskName, date: taskDate, time: taskTime } : task
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, { name: taskName, date: taskDate, time: taskTime }])
    }
    resetForm();
    setIsModalOpen(false);
  };

  const handleEditTask = (index) => {
    setTaskName(tasks[index].name);
    setTaskDate(tasks[index].date);
    setTaskTime(tasks[index].time);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTaskName('');
    setTaskDate('');
    setTaskTime('');
  };


  return (
    <>
      <title>My To Do</title>
      <h1>To Do Application: Where you can track tasks and events <br /></h1>
      <Navbar />

      <div className='Box'>

        <div className='Task-list-column'>
          <h2>Task List</h2>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task.name} - {task.date} - {task.time}
                <button onClick={() => handleEditTask(index)}>Edit Task/Event</button>
                <button onClick={() => handleDeleteTask(index)}>Delete Task/Event</button>
              </li>
            ))}
          </ul>
          <button onClick={() => setIsModalOpen(true)}>Add Task/Event</button>

        </div>
        <div className='Task-layout'>
        </div>

        {isModalOpen && (
          <div className='modal'>
            <div className='modal-content'>
              <h2>{editingIndex !== null ? 'Edit task' : 'Add Task'}</h2>
              <input type='text' placeholder='Task name' value={taskName} onChange={(e) => setTaskName(e.target.value)} />
              <input type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)}/>
              <input type='time' value={taskTime} onChange={(e) => setTaskTime(e.target.value)}/>
              <button onClick={handleAddTask}>
                {editingIndex !== null ? 'Update Task' : 'Add Task'}
              </button>
              <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        )}

      </div>


    </>
  )
}

export default App