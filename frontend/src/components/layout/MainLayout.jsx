import React, { useContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { AuthContext } from '../../context/AuthContext';
import { Search } from 'lucide-react';
import '../../pages/Dashboard.css';

const MainLayout = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const getHeaderInfo = () => {
    const path = location.pathname;
    if (path === '/dashboard') {
      return {
        title: 'Admin Companion',
        subtitle: "See What's Happening Across Your School"
      };
    }
    if (path === '/teachers') {
      return {
        title: 'Teacher Directory',
        subtitle: 'Manage and View Teacher Performance'
      };
    }
    if (path.startsWith('/teachers/')) {
      const teacherName = location.state?.teacherName || 'Teacher Statistics';
      return {
        title: teacherName,
        subtitle: 'Performance Profile'
      };
    }
    return { title: 'Admin Companion', subtitle: '' };
  };

  const { title, subtitle } = getHeaderInfo();

  return (
    <div className="dashboard-container">
      <Sidebar onLogout={logout} />
      
      <main className="main-content">
        <header className="main-header">
          <div className="header-title-area">
            <h1>{title}</h1>
            <p className="subtitle">{subtitle}</p>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
