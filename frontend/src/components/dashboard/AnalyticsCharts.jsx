import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, Cell
} from 'recharts';
import { ChevronLeft, User, Book, Clock } from 'lucide-react';

const AnalyticsCharts = ({ selectedTeacherId, trends, displayName, teacherAnalytics, onBack, selectedGrade }) => {
  if (selectedTeacherId === 'all') {
    return (
      <div className="chart-card large">
        <div className="chart-header">
          <h2>Activity Trends</h2>
          <p>Content generation across time</p>
        </div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={trends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLesson" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorQuiz" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                cursor={{stroke: '#e2e8f0', strokeWidth: 1}}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Area type="monotone" dataKey="lesson" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorLesson)" name="Lessons" />
              <Area type="monotone" dataKey="quiz" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorQuiz)" name="Quizzes" />
              <Area type="monotone" dataKey="assessment" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorAss)" name="Assessments" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  const metadata = teacherAnalytics?.teacher?.teachingMetadata;
  const activities = teacherAnalytics?.teacher?.activities || [];
  
  // Group activities by Grade for Class-wise breakdown
  const gradeDataMap = {};
  activities.forEach(act => {
    const gradeKey = `Class ${act.grade}`;
    if (!gradeDataMap[gradeKey]) gradeDataMap[gradeKey] = { name: gradeKey, count: 0 };
    gradeDataMap[gradeKey].count += 1;
  });
  const classBreakdownData = Object.values(gradeDataMap).sort((a, b) => a.name.localeCompare(b.name, undefined, {numeric: true}));

  return (
    <div className="teacher-detail-view">
      <div className="teacher-meta-section">
        <div className="meta-card">
          <button className="back-btn" onClick={onBack}>
            <ChevronLeft size={20} />
          </button>
          <div className="meta-info-grid">
            <div className="meta-item-large">
              <span className="label">Subject:</span>
              <p>{metadata?.subjects?.join(', ') || 'N/A'}</p>
            </div>
            <div className="meta-item-large">
              <span className="label">Grade Taught:</span>
              <p>{metadata?.grades?.map(g => `Class ${g}`).join(', ') || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h2>Class-wise Breakdown</h2>
            <div className="chart-legend">
              <span className="legend-item"><span className="dot avg"></span> Avg Score</span>
              <span className="legend-item"><span className="dot completion"></span> Completion</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classBreakdownData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} />
                <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={40}>
                  {classBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8b5cf6' : '#c084fc'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h2>Recent Activity</h2>
          </div>
          <div className="table-responsive">
            <table className="activity-table mini">
              <thead>
                <tr>
                  <th>Activity Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.slice(0, 5).map(act => (
                  <tr key={act.id}>
                    <td>
                      <span className={`status-badge ${act.activity_type.toLowerCase()}`}>
                        {act.activity_type}
                      </span>
                    </td>
                    <td className="date-cell">{new Date(act.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {activities.length === 0 && (
                  <tr>
                    <td colSpan="2" className="empty-state">No recent activity</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
