import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Ensure this matches your backend URL

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('GET /tasks error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch tasks');
  }
};

export const getTask = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('GET /tasks/:id error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch task');
  }
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error('POST /tasks error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to create task');
  }
};

export const updateTask = async (id, task) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    console.error('PUT /tasks/:id error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to update task');
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('DELETE /tasks/:id error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to delete task');
  }
};