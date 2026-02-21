import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherList from '../components/teachers/TeacherList';
import { useTeachers } from '../hooks/useTeachers';

const TeachersPage = () => {
  const navigate = useNavigate();
  const { teachers, loading: loadingTeachers, fetchTeachers } = useTeachers();
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');

  const filteredTeachers = useMemo(() => {
    return teachers.filter(t => {
      // Basic filtering if needed, though TeacherList might handle it or we can do it here
      return true; 
    });
  }, [teachers]);

  const handleTeacherClick = (teacher) => {
    navigate(`/teachers/${teacher.teacher_id}`, { 
      state: { teacherName: teacher.teacher_name } 
    });
  };

  return (
    <div className="teachers-page">
      <TeacherList 
        teachers={filteredTeachers} 
        onTeacherClick={handleTeacherClick}
        onLoad={fetchTeachers}
      />
    </div>
  );
};

export default TeachersPage;
