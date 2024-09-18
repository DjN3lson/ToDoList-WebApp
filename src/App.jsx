import { useState } from 'react'
import React from 'react'
import './App.css'
import Navbar from './navbar'

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskEndingDate, setTaskEndingDate] = useState('');
  const [taskStartingTime, setTaskStartingTime] = useState('');
  const [taskEndingTime, setTaskEndingTime] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = () => {
    const today = new Date().toISOString().split('T')[0];
    const defaultTask = {
      name: 'Unamed Task/Event',
      date: today,
      endingDate: null,
      start_time: '12:00',
      end_time: '13:00'
    };
    const newTask = {
      name: taskName || defaultTask.name,
      date: taskDate || defaultTask.date,
      endingDate: taskEndingDate || defaultTask.endingDate,
      start_time: taskStartingTime || defaultTask.start_time,
      end_time: taskEndingTime || defaultTask.endingDate
    };
    if (editingIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? newTask : task
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, newTask])
    }
    resetForm();
    setIsModalOpen(false);
  };

  const handleEditTask = (index) => {
    setTaskName(tasks[index].name);
    setTaskDate(tasks[index].date);
    setTaskEndingDate(tasks[index].endingDate);
    setTaskStartingTime(tasks[index].start_time);
    setTaskEndingTime(tasks[index].end_time);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTaskName('');
    setTaskDate('');
    setTaskStartingTime('');
    setTaskEndingTime('');
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
                {task.name} - {task.date} - {task.start_time} - {task.end_time}
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
              <input type="date" value={taskEndingDate} onChange={(e) => setTaskEndingDate(e.target.value)} /> 
              <input type='time' value={taskStartingTime} onChange={(e) => setTaskStartingTime(e.target.value)}/>
              <input type='time' value={taskEndingTime} onChange={(e) => setTaskEndingTime(e.target.value)}/>
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
