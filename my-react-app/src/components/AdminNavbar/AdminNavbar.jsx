import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiHelpCircle } from 'react-icons/fi';
import './AdminNavbar.css';

const AdminNavbar = ({ title = 'Dashboard' }) => {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="admin-navbar">
      <div className="admin-navbar__left">
        <h1 className="admin-navbar__title">Admin {title}</h1>
      </div>

      <div className="admin-navbar__right">
        {/* Search */}
        <div className="admin-navbar__search">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="#9ab3d4" strokeWidth="1.8"/>
            <path d="M11 11l3.5 3.5" stroke="#9ab3d4" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input placeholder="Search..." />
        </div>

        {/* Notification bell */}
        <div className="admin-navbar__notif-wrap">
          <button
            className="admin-navbar__icon-btn"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <FiBell size={18} />
            <span className="admin-navbar__notif-badge">3</span>
          </button>
          {notifOpen && (
            <div className="admin-navbar__notif-dropdown">
              <p className="admin-navbar__notif-title">Notifications</p>
              {[
                { text: '12 new student registrations', time: '2 min ago' },
                { text: 'Document verification pending', time: '1 hr ago' },
                { text: 'New feedback submitted', time: '3 hr ago' },
              ].map((n, i) => (
                <div key={i} className="admin-navbar__notif-item">
                  <p className="admin-navbar__notif-text">{n.text}</p>
                  <span className="admin-navbar__notif-time">{n.time}</span>
                </div>
              ))}
              <button
                className="admin-navbar__notif-view"
                onClick={() => { setNotifOpen(false); navigate('/admin/notifications'); }}
              >
                View All →
              </button>
            </div>
          )}
        </div>

        {/* Help */}
        <button className="admin-navbar__icon-btn"><FiHelpCircle size={18} /></button>

        {/* Admin avatar */}
        <div className="admin-navbar__admin">
          <div className="admin-navbar__admin-avatar">A</div>
          <div className="admin-navbar__admin-info">
            <p className="admin-navbar__admin-name">Admin</p>
            <p className="admin-navbar__admin-role">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;