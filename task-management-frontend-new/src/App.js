import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskCreate from './components/TaskCreate';
import TaskEdit from './components/TaskEdit';
import TaskDetails from './components/TaskDetails';

const App = () => {
  // Add a test message to verify rendering
  console.log('App component rendering');
  
  return (
    <Router>
      <div>
        <h1>Task Management App</h1> {/* Add this to test basic rendering */}
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/create" element={<TaskCreate />} />
          <Route path="/tasks/:id/edit" element={<TaskEdit />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;