import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    label: 'Find Universities',
    path: '/dashboard/find-uni',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M13 13L16.5 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Scholarships',
    path: '/dashboard/UserScholarship',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M9 5v8M6.5 7.5C6.5 6.12 7.62 5 9 5s2.5 1.12 2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Visa Guidance',
    path: '/dashboard/UserVisaGuide',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M5 7h8M5 10h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Documents',
    path: '/DocumentChecklist',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4 2h7l4 4v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M11 2v4h4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
  label: 'Notifications',
  path: '/dashboard/notifications',
  icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2a5 5 0 00-5 5v3l-1.5 2H15.5L14 10V7a5 5 0 00-5-5z" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M7 14a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  
},
{
  label: 'Study Plan',
  path: '/dashboard/studyplan',
  icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M2 7h14" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M6 1v4M12 1v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M6 10h2M10 10h2M6 13h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
},
{
  label: 'Forums',
  path: '/dashboard/forum',
  icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 3h12v9H7l-4 3V3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M6 7h6M6 9.5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
},
{
  label: 'Feedback',
  path: '/dashboard/feedback',
  icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2l2.2 4.5L16 7l-3.5 3.4L13.5 16 9 13.5 4.5 16l1-5.6L2 7l4.8-.5L9 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
},

];

const bottomItems = [
  {
    label: 'Profile & Settings',
    path: '/profile/edit',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M2.5 15.5c0-3.31 2.91-6 6.5-6s6.5 2.69 6.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__wave" />
      <nav className="sidebar__nav">
        <div className="sidebar__nav-group">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar__item${isActive ? ' sidebar__item--active' : ''}`
              }
            >
              <span className="sidebar__icon">{item.icon}</span>
              <span className="sidebar__label">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="sidebar__divider" />

        <div className="sidebar__nav-group">
          {bottomItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar__item${isActive ? ' sidebar__item--active' : ''}`
              }
            >
              <span className="sidebar__icon">{item.icon}</span>
              <span className="sidebar__label">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__footer-card">
          <p className="sidebar__footer-text">Need help with your application?</p>
          <Link to="/dashboard/contact" className="sidebar__footer-btn">
           Contact Us
          </Link>

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;