import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

// export default function Dashboard() {
//   const [workflows, setWorkflows] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     API.get('/workflows').then(res => setWorkflows(res.data));
//   }, []);

//   return (
//     <div>
//       <h2>Workflows</h2>
//       <button onClick={() => navigate('/workflow/new')}>+ New Workflow</button>
//       <ul>
//         {workflows.map(wf => (
//           <li key={wf.id} onClick={() => navigate(`/workflow/${wf.id}`)}>
//             {wf.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


const Dashboard = () => {
  const [workflows, setWorkflows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/workflows') 
        setWorkflows(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch workflows');
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧩 My Workflows</h2>
      <button onClick={() => navigate('/editor')}>➕ New Workflow</button>

      <ul>
        {workflows.map((wf) => (
          <li key={wf.id} style={{ marginBottom: '1rem' }}>
            <strong>{wf.title}</strong>
            <button onClick={() => navigate(`/editor?id=${wf.id}`)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
