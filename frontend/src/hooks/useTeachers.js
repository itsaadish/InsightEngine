import { useState, useCallback } from 'react';
import api from '../services/api';

export const useTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTeachers = useCallback(async () => {
    if (teachers.length > 0) return;
    setLoading(true);
    try {
      const res = await api.get('/analytics/teachers');
      setTeachers(res.data.data);
    } catch (err) {
      console.error('Error fetching teachers', err);
    } finally {
      setLoading(false);
    }
  }, [teachers.length]);

  return { teachers, loading, fetchTeachers };
};
