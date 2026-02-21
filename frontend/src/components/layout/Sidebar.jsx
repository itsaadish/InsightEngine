import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Home, FileText, LogOut } from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>SAVRA</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink 
          to="/teachers" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Users size={20} />
          <span>Teachers</span>
        </NavLink>
        <div className="nav-item">
          <Home size={20} />
          <span>Classrooms</span>
        </div>
        <div className="nav-item">
          <FileText size={20} />
          <span>Reports</span>
        </div>
      </nav>
      <div className="sidebar-bottom">
        <div className="user-profile">
          <div className="user-avatar">SR</div>
          <div className="user-info">
            <span className="user-name">Shauryaman Ray</span>
            <span className="user-role">School Admin</span>
          </div>
        </div>
        <div className="nav-item logout" onClick={onLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
