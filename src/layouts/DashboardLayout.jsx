// DashboardLayout.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../index.css';

const DashboardLayout = ({ children }) => {
  return (    
      <div className='App flex-fill container-fluid'>
      <Sidebar />
        <div className="dashboard--content">
      <div className="dashboard">
        <Topbar />
        {children}
      </div>
    </div>
    </div>
    
  );
};

export default DashboardLayout;
