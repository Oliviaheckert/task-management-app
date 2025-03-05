import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, deleteTask } from '../services/api';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(id);
        setTask(response);
        setLoading(false);
      } catch (error) {
        setError('Error fetching task details');
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        navigate('/');
      } catch (error) {
        setError('Error deleting task');
      }
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;
  if (!task) return <div className="container">Task not found</div>;

  return (
    <div className="container">
      <h2>Task Details</h2>
      <div className="task-form">
        <div className="form-group">
          <label>Title:</label>
          <p className="task-detail-text">{task.title}</p>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <p className="task-detail-text">
            {task.description || 'No description provided'}
          </p>
        </div>
        <div className="form-group">
          <label>Status:</label>
          <span className={`task-status status-${task.status}`}>
            {task.status}
          </span>
        </div>
        <div className="form-group">
          <label>Created:</label>
          <p className="task-detail-text">
            {new Date(task.created_at).toLocaleString()}
          </p>
        </div>
        <div className="task-actions">
          <button
            onClick={() => navigate(`/tasks/${id}/edit`)}
            className="edit-button"
          >
            Edit
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
          <button onClick={() => navigate('/')} className="create-button">
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};


export default TaskDetails;