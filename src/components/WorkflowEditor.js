import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';

const initialNodes = [
  {
    id: '1',
    data: { label: 'Start' },
    position: { x: 250, y: 5 },
  }
];

const initialEdges = [];

const WorkflowEditor = ({ existing }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(existing?.nodes || initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(existing?.edges || []);
  const [workflowTitle, setWorkflowTitle] = useState(existing?.title || 'Untitled');

  // ✅ Fix dependency warning
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // ✅ Load data if passed from EditorPage
  useEffect(() => {
    if (existing) {
      setWorkflowTitle(existing.title);
      setNodes(existing.nodes || []);
      setEdges(existing.edges || []);
    }
  }, [existing, setNodes, setEdges]);

  const addNewNode = () => {
    const id = (nodes.length + 1).toString();
    const newNode = {
      id,
      data: { label: `Step ${id}` },
      position: { x: Math.random() * 300, y: Math.random() * 300 }
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const saveWorkflow = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/workflows', {
        title: workflowTitle,
        nodes,
        edges
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert('Workflow saved ✅');
    } catch (err) {
      console.error(err);
      alert('Failed to save ❌');
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div style={{ padding: '10px' }}>
        <input
          type="text"
          value={workflowTitle}
          onChange={(e) => setWorkflowTitle(e.target.value)}
          placeholder="Workflow Title"
        />
        <button onClick={addNewNode}>➕ Add Step</button>
        <button onClick={saveWorkflow}>💾 Save</button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
