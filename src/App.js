import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import WorkflowEditor from './components/WorkflowEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/workflow/:id" element={<WorkflowEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
