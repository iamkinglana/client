import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [workflows, setWorkflows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/workflows').then(res => setWorkflows(res.data));
  }, []);

  return (
    <div>
      <h2>Workflows</h2>
      <button onClick={() => navigate('/workflow/new')}>+ New Workflow</button>
      <ul>
        {workflows.map(wf => (
          <li key={wf.id} onClick={() => navigate(`/workflow/${wf.id}`)}>
            {wf.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
