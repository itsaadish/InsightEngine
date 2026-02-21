import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherDetails from '../components/teachers/TeacherDetails';

const TeacherDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="teacher-detail-page">
      <TeacherDetails 
        teacherId={id} 
        onBack={() => navigate('/teachers')} 
      />
    </div>
  );
};

export default TeacherDetailPage;
