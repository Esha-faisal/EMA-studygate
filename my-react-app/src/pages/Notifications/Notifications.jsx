import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarDashboard from '../../components/dashboard/NavbarDashboard';
import Sidebar from '../../components/dashboard/Sidebar';
import './Notifications.css';

import {
  Clock,
  Mail,
  BadgeDollarSign,
  Landmark,
  Stamp,
  Bell,
  Search,
  X,
  Check,
  Settings,
  AlertTriangle,
  ChevronRight,
  Trash2,
} from 'lucide-react';

/* ── Mock Notifications Data ── */
const allNotifications = [
  {
    id: 1,
    type: 'deadline',
    title: 'Application Deadline Approaching',
    message: 'Technical University of Munich application closes in 5 days. Submit your documents now.',
    time: '2 hours ago',
    date: 'Today',
    read: false,
    urgent: true,
    link: '/dashboard/find-uni',
    linkLabel: 'View University',
  },
  {
    id: 2,
    type: 'deadline',
    title: 'Chevening Scholarship Deadline',
    message: "Chevening Scholarship (UK) deadline is on Nov 5, 2025. Don't miss it!",
    time: '5 hours ago',
    date: 'Today',
    read: false,
    urgent: true,
    link: '/dashboard/UserScholarship',
    linkLabel: 'View Scholarship',
  },
  {
    id: 3,
    type: 'deadline',
    title: 'IELTS Registration Reminder',
    message: 'You set a reminder for IELTS Test Registration on Aug 15, 2025.',
    time: 'Yesterday',
    date: 'Yesterday',
    read: false,
    urgent: false,
    link: '/profile/edit',
    linkLabel: 'Manage Reminders',
  },
  {
    id: 4,
    type: 'email',
    title: 'New Message from EMA Study Gate',
    message: 'Your document verification request has been received. Our team will review within 3 business days.',
    time: '1 day ago',
    date: 'Yesterday',
    read: false,
    urgent: false,
    link: '/DocumentChecklist',
    linkLabel: 'View Documents',
  },
  {
    id: 5,
    type: 'email',
    title: 'Profile Review Complete',
    message: 'Our counsellor has reviewed your profile and left recommendations for improvement.',
    time: '2 days ago',
    date: 'Apr 2, 2025',
    read: true,
    urgent: false,
    link: '/profile/edit',
    linkLabel: 'View Profile',
  },
  {
    id: 6,
    type: 'scholarship',
    title: 'New Scholarship Available',
    message: 'DAAD Scholarship 2026 (Germany) is now open for applications. Monthly stipend of €861!',
    time: '3 days ago',
    date: 'Apr 1, 2025',
    read: true,
    urgent: false,
    link: '/dashboard/UserScholarship',
    linkLabel: 'View Scholarship',
  },
  {
    id: 7,
    type: 'scholarship',
    title: 'Scholarship Match Found',
    message: 'Based on your profile, Erasmus Mundus is a strong match for you. Check eligibility.',
    time: '4 days ago',
    date: 'Mar 31, 2025',
    read: true,
    urgent: false,
    link: '/dashboard/UserScholarship',
    linkLabel: 'Explore Now',
  },
  {
    id: 8,
    type: 'university',
    title: 'Aalto University Updated Requirements',
    message: 'Aalto University (Finland) has updated its English language requirements for 2026 intake.',
    time: '5 days ago',
    date: 'Mar 30, 2025',
    read: true,
    urgent: false,
    link: '/dashboard/find-uni',
    linkLabel: 'View Details',
  },
  {
    id: 9,
    type: 'visa',
    title: 'Germany Visa Processing Time Updated',
    message: 'Germany student visa processing time has increased to 10–14 weeks. Plan accordingly.',
    time: '1 week ago',
    date: 'Mar 28, 2025',
    read: true,
    urgent: false,
    link: '/dashboard/UserVisaGuide',
    linkLabel: 'Visa Guide',
  },
  {
    id: 10,
    type: 'system',
    title: 'Welcome to EMA Study Gate!',
    message: 'Your account is set up. Complete your profile to get personalized university recommendations.',
    time: '2 weeks ago',
    date: 'Mar 20, 2025',
    read: true,
    urgent: false,
    link: '/profile/edit',
    linkLabel: 'Complete Profile',
  },
];

/* ── Config per notification type ── */
const typeConfig = {
  deadline:    { icon: <Clock size={18} />,           color: '#e74c3c', bg: '#fdecea', label: 'Deadline'    },
  email:       { icon: <Mail size={18} />,            color: '#2d5fa6', bg: '#eef4ff', label: 'Email'       },
  scholarship: { icon: <BadgeDollarSign size={18} />, color: '#27ae60', bg: '#e8f8ef', label: 'Scholarship' },
  university:  { icon: <Landmark size={18} />,        color: '#8e44ad', bg: '#f3eeff', label: 'University'  },
  visa:        { icon: <Stamp size={18} />,           color: '#d35400', bg: '#fef0e6', label: 'Visa'        },
  system:      { icon: <Bell size={18} />,            color: '#5a7a9a', bg: '#f0f4fb', label: 'System'      },
};

const FILTERS = ['All', 'Unread', 'Deadline', 'Email', 'Scholarship', 'University', 'Visa', 'System'];

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(allNotifications);
  const [activeFilter, setActiveFilter]   = useState('All');
  const [search, setSearch]               = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = notifications.filter(n => {
    const matchFilter =
      activeFilter === 'All'    ? true :
      activeFilter === 'Unread' ? !n.read :
      n.type === activeFilter.toLowerCase();
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const grouped = filtered.reduce((acc, n) => {
    if (!acc[n.date]) acc[n.date] = [];
    acc[n.date].push(n);
    return acc;
  }, {});

  const markRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotif = (e, id) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClick = (notif) => {
    markRead(notif.id);
    if (notif.link) navigate(notif.link);
  };

  return (
    <div className="notif-root">
      <NavbarDashboard />
      <div className="notif-body">
        <Sidebar />

        <main className="notif-main">

          {/* ── Header ── */}
          <div className="notif-header">
            <div className="notif-header__left">
              <h1 className="notif-header__title">
                Notifications
                {unreadCount > 0 && (
                  <span className="notif-header__badge">{unreadCount}</span>
                )}
              </h1>
              <p className="notif-header__sub">
                Stay updated with deadlines, emails, and important alerts
              </p>
            </div>
            <div className="notif-header__actions">
              {unreadCount > 0 && (
                <button className="notif-btn notif-btn--ghost" onClick={markAllRead}>
                  <Check size={14} style={{ marginRight: 5 }} /> Mark all as read
                </button>
              )}
              <button className="notif-btn notif-btn--outline" onClick={() => navigate('/profile/edit')}>
                <Settings size={14} style={{ marginRight: 5 }} /> Manage Preferences
              </button>
            </div>
          </div>

          {/* ── Stats Row ── */}
          <div className="notif-stats">
            {[
              { label: 'Total',     val: notifications.length,                                color: 'blue'   },
              { label: 'Unread',    val: unreadCount,                                         color: 'red'    },
              { label: 'Deadlines', val: notifications.filter(n => n.type==='deadline').length, color: 'orange' },
              { label: 'Urgent',    val: notifications.filter(n => n.urgent).length,          color: 'purple' },
            ].map(s => (
              <div key={s.label} className={`notif-stat notif-stat--${s.color}`}>
                <p className="notif-stat__val">{s.val}</p>
                <p className="notif-stat__label">{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── Search ── */}
          <div className="notif-search">
            <Search size={15} />
            <input
              placeholder="Search notifications..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="notif-search__clear" onClick={() => setSearch('')}>
                <X size={13} />
              </button>
            )}
          </div>

          {/* ── Filter Tabs ── */}
          <div className="notif-filters">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`notif-filter${activeFilter === f ? ' notif-filter--active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
                {f === 'Unread' && unreadCount > 0 && (
                  <span className="notif-filter__dot" />
                )}
              </button>
            ))}
          </div>

          {/* ── Notification Groups ── */}
          {Object.keys(grouped).length === 0 ? (
            <div className="notif-empty">
              <Bell size={40} />
              <p>No notifications found.</p>
              {search && (
                <button className="notif-btn notif-btn--outline" onClick={() => setSearch('')}>
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            Object.entries(grouped).map(([date, items]) => (
              <div key={date} className="notif-group">
                <div className="notif-group__label">{date}</div>

                <div className="notif-list">
                  {items.map(notif => {
                    const cfg = typeConfig[notif.type];
                    return (
                      <div
                        key={notif.id}
                        className={`notif-card${!notif.read ? ' notif-card--unread' : ''}${notif.urgent ? ' notif-card--urgent' : ''}`}
                        onClick={() => handleClick(notif)}
                      >
                        {/* Unread dot */}
                        {!notif.read && <div className="notif-card__dot" />}

                        {/* Icon */}
                        <div
                          className="notif-card__icon"
                          style={{ background: cfg.bg, color: cfg.color }}
                        >
                          {cfg.icon}
                        </div>

                        {/* Content */}
                        <div className="notif-card__content">
                          <div className="notif-card__top">
                            <p className="notif-card__title">{notif.title}</p>
                            <div className="notif-card__tags">
                              <span
                                className="notif-card__type-tag"
                                style={{ color: cfg.color, background: cfg.bg }}
                              >
                                {cfg.label}
                              </span>
                              {notif.urgent && (
                                <span className="notif-card__urgent-tag">
                                  <AlertTriangle size={12} style={{ marginRight: 4 }} /> Urgent
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="notif-card__message">{notif.message}</p>
                          <div className="notif-card__bottom">
                            <span className="notif-card__time">
                              <Clock size={12} style={{ marginRight: 4 }} /> {notif.time}
                            </span>
                            {notif.link && (
                              <span className="notif-card__link">
                                {notif.linkLabel} <ChevronRight size={12} />
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Delete */}
                        <button
                          className="notif-card__delete"
                          onClick={(e) => deleteNotif(e, notif.id)}
                          title="Remove notification"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}

        </main>
      </div>
    </div>
  );
};

export default Notifications;