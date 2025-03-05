import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTasks, deleteTask } from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response);
      setLoading(false);
    } catch (error) {
      setError('Failed to load tasks. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks(); // Refresh the list after deletion
    } catch (error) {
      setError('Failed to delete task.');
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h2>Tasks</h2>
      <div className="task-list-header">
        <Link to="/tasks/create">
          <button className="create-new-task-button">Create New Task</button>
        </Link>
      </div>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks found</p>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span className={`task-status status-${task.status}`}>
                {task.status}
              </span>
              <div className="task-actions">
                <Link to={`/tasks/${task.id}`}>
                  <button className="create-button">View</button>
                </Link>
                <Link to={`/tasks/${task.id}/edit`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button 
                  className="delete-button"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

  export default TaskList;