import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/api';

const TaskCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    user_id: 1 // Hardcoded for now
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <h2>Create New Task</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="task-actions">
          <button type="submit" className="create-button">
            Create Task
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="delete-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};


export default TaskCreate;