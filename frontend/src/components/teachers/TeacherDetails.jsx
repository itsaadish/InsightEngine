import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnalyticsCharts from '../dashboard/AnalyticsCharts';
import { useTeacherAnalytics } from '../../hooks/useTeacherAnalytics';

const TeacherDetails = ({ teacherId, onBack }) => {
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [timeframe, setTimeframe] = useState('all');

  const teacherParams = useMemo(() => ({ subject, timeframe, grade }), [subject, timeframe, grade]);
  const { teacherAnalytics, loading: loadingDetail, fetchTeacherAnalytics } = useTeacherAnalytics();

  useEffect(() => {
    if (teacherId) {
      fetchTeacherAnalytics(teacherId, teacherParams);
    }
  }, [teacherId, teacherParams, fetchTeacherAnalytics]);

  const displayName = teacherAnalytics?.teacher?.teacher_name;

  if (loadingDetail && !teacherAnalytics) {
    return <div className="loading-screen">Loading Teacher Insights...</div>;
  }

  return (
    <div className="teacher-details">
      <div className="filter-row mb-4">
        <div className="filters-bar">
          <select className="filter-select pill" value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="">All Grades</option>
            {[...Array(12)].map((_, i) => (
              <option key={i+1} value={i+1}>Grade {i+1}</option>
            ))}
          </select>

          <select className="filter-select pill" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Social Studies">Social Studies</option>
          </select>
        </div>
      </div>

      <AnalyticsCharts 
        selectedTeacherId={teacherId}
        displayName={displayName}
        teacherAnalytics={teacherAnalytics}
        onBack={onBack}
        selectedGrade={grade}
      />
    </div>
  );
};

export default TeacherDetails;
