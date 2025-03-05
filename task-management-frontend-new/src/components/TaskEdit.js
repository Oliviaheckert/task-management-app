import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask, updateTask } from '../services/api';

const TaskEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    user_id: 1
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(id);
        setFormData(response);
        setLoading(false);
      } catch (error) {
        setError('Error fetching task details');
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, formData);
      navigate('/');
    } catch (error) {
      setError('Error updating task');
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <h2>Edit Task</h2>
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
          <button type="submit" className="edit-button">
            Update Task
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

export default TaskEdit;