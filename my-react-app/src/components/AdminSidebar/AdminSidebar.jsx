import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdminSidebar.css';

const navItems = [
  {
    label: 'Dashboard', path: '/admin',
    icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/></svg>),
  },
  {
    label: 'Manage Students', path: '/admin/students',
    icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.8"/><path d="M2.5 15.5c0-3.31 2.91-6 6.5-6s6.5 2.69 6.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  },
  {
    label: 'Universities', path: '/admin/universities',
    icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 7l8-5 8 5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><rect x="3" y="7" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.8"/><rect x="7" y="11" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/></svg>),
  },
  {
    label: 'Scholarships', path: '/admin/scholarships',
    icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M9 5v8M6.5 7.5C6.5 6.12 7.62 5 9 5s2.5 1.12 2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  },
  {
    label: 'Visa Guidance', path: '/admin/visa',
    icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M5 7h8M5 10h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  },
  {
    label: 'Notifications', path: '/admin/notifications',
    icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2a5 5 0 00-5 5v3l-1.5 2H15.5L14 10V7a5 5 0 00-5-5z" stroke="currentColor" strokeWidth="1.8"/><path d="M7 14a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  },
  {
    label: 'Feedback', path: '/admin/feedback', badge: '8',
    icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 3h14a1 1 0 011 1v8a1 1 0 01-1 1H5l-3 3V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M6 7h6M6 10h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  },
  {
    label: 'Reports', path: '/admin/reports',
    icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M5 11l3-4 3 3 3-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  },
  {
    label: 'Settings', path: '/admin/settings',
    icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.22 3.22l1.42 1.42M13.36 13.36l1.42 1.42M3.22 14.78l1.42-1.42M13.36 4.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <div className="admin-sidebar__brand-icon">
          <svg width="24" height="20" viewBox="0 0 28 22" fill="none">
            <path d="M2 2H10L14 8L18 2H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 11H26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M2 20H10L14 14L18 20H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="admin-sidebar__brand-name">EMA StudyGate</p>
          <span className="admin-sidebar__brand-tag">Admin Panel</span>
        </div>
      </div>

      <nav className="admin-sidebar__nav">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `admin-sidebar__item${isActive ? ' admin-sidebar__item--active' : ''}`
            }
          >
            <span className="admin-sidebar__item-icon">{item.icon}</span>
            <span className="admin-sidebar__item-label">{item.label}</span>
            {item.badge && (
              <span className="admin-sidebar__item-badge">{item.badge}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar__bottom">
        <div className="admin-sidebar__profile">
          <div className="admin-sidebar__avatar">A</div>
          <div>
            <p className="admin-sidebar__profile-name">Admin</p>
            <p className="admin-sidebar__profile-role">Super Admin</p>
          </div>
        </div>
        <button className="admin-sidebar__logout" onClick={() => navigate('/admin/login')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;