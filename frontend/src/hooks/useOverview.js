import { useState, useEffect } from 'react';
import api from '../services/api';

export const useOverview = (params = {}) => {
  const [overview, setOverview] = useState({ 
    totalTeachers: 0, 
    activities: { lesson: 0, quiz: 0, assessment: 0, total: 0 } 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      setLoading(true);
      try {
        const res = await api.get('/analytics/overview', { params });
        setOverview(res.data.data);
      } catch (err) {
        console.error('Error fetching overview', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, [JSON.stringify(params)]);

  return { overview, loading };
};
