import React from 'react';
import Sidebar from "../../components/Sidebar";
import Topbar from '../../components/Topbar';
import Dashboard from './Dashboard';
const Dashboardpage = () => {
  return (
    <div className="app">
        <Sidebar />
    <div className="maincontent">
        <Topbar />
        <Dashboard />
        
    </div>
    </div>
  )
}

export default Dashboardpage