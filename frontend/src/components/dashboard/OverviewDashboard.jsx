import React, { useState, useMemo } from 'react';
import StatsGrid from './StatsGrid';
import AnalyticsCharts from './AnalyticsCharts';
import { useOverview } from '../../hooks/useOverview';
import { useTrends } from '../../hooks/useTrends';

const OverviewDashboard = () => {
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [timeframe, setTimeframe] = useState('all');

  const overviewParams = useMemo(() => ({ grade, subject, timeframe }), [grade, subject, timeframe]);
  const { overview, loading: loadingOverview } = useOverview(overviewParams);
  const { trends, loading: loadingTrends } = useTrends(true, 'all', overviewParams);

  if (loadingOverview) {
    return <div className="loading-screen">Loading Institution Overview...</div>;
  }

  return (
    <div className="overview-dashboard">
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

      <div className="insights-header">
        <h2>Insights</h2>
        <div className="timeframe-pills">
          {['week', 'month', 'year', 'all'].map((t) => (
            <button 
              key={t}
              className={`time-pill ${timeframe === t ? 'active' : ''}`}
              onClick={() => setTimeframe(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1).replace('all', 'All Time')}
            </button>
          ))}
        </div>
      </div>

      <StatsGrid 
        displayStats={overview.activities} 
        totalTeachers={overview.totalTeachers} 
        showTeacherBadge={true}
        timeframe={timeframe}
      />

      {loadingTrends ? (
        <div className="loading-screen" style={{ height: '350px' }}>
          Fetching Trends...
        </div>
      ) : (
        <AnalyticsCharts 
          selectedTeacherId="all"
          trends={trends}
          selectedGrade={grade}
        />
      )}
    </div>
  );
};

export default OverviewDashboard;
