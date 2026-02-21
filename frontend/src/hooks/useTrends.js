import { useState, useEffect } from 'react';
import api from '../services/api';

export const useTrends = (isActive, selectedId, params = {}) => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isActive && selectedId === 'all') {
      const fetchTrends = async () => {
        setLoading(true);
        try {
          const res = await api.get('/analytics/trends', { params });
          setTrends(res.data.data);
        } catch (err) {
          console.error('Error fetching trends', err);
        } finally {
          setLoading(false);
        }
      };
      fetchTrends();
    }
  }, [isActive, selectedId, JSON.stringify(params)]);

  return { trends, loading };
};
