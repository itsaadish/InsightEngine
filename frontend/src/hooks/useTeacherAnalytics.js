import { useState, useCallback } from 'react';
import api from '../services/api';

export const useTeacherAnalytics = () => {
  const [teacherAnalytics, setTeacherAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTeacherAnalytics = useCallback(async (id, params = {}) => {
    if (id === 'all' || !id) {
      setTeacherAnalytics(null);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get(`/analytics/teachers/${id}`, { params });
      setTeacherAnalytics(res.data.data);
    } catch (err) {
      console.error('Error fetching teacher detail', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { teacherAnalytics, loading, fetchTeacherAnalytics };
};
