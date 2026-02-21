import React, { useEffect } from 'react';

const TeacherList = ({ teachers, onTeacherClick, onLoad }) => {
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <section className="teachers-list-section">
      <div className="chart-card large">
        <div className="chart-header">
          <h2>All Teachers</h2>
          <p>Click on a teacher to view their detailed performance analytics.</p>
        </div>
        <div className="table-responsive">
          <table className="activity-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(t => (
                <tr key={t.teacher_id}>
                  <td><strong>{t.teacher_id}</strong></td>
                  <td>{t.teacher_name}</td>
                  <td>
                    <button 
                      className="view-btn" 
                      style={{ 
                        backgroundColor: '#6366f1', 
                        color: 'white', 
                        padding: '0.5rem 1rem', 
                        border: 'none', 
                        borderRadius: '6px',
                        fontSize: '0.85rem'
                      }}
                      onClick={() => onTeacherClick(t)}
                    >
                      View Insights
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TeacherList;
