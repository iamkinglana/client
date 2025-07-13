import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../services/api';
import WorkflowEditor from '../components/WorkflowEditor';

const EditorPage = () => {
  const [params] = useSearchParams();
  const id = params.get('id');
  const [existingData, setExistingData] = useState(null);

  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        if (id) {
          const res = await API.get(`/workflows`);
          const found = res.data.find(wf => wf.id.toString() === id);
          if (found) setExistingData(found);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchWorkflow();
  }, [id]);

  return <WorkflowEditor existing={existingData} />;
};

export default EditorPage;

