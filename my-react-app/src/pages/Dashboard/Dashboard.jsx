import { useNavigate } from 'react-router-dom';
import NavbarDashboard from '../../components/dashboard/NavbarDashboard';
import Sidebar from '../../components/dashboard/Sidebar';
//backend
import axios from "axios";
import { useEffect, useState } from "react";


// react icons import
import {
  FaUser,
  FaBookmark,
  FaMoneyBill,
  FaUniversity,
  FaFileAlt,
  FaClock,
  FaGlobe,
  FaComments
} from "react-icons/fa";
import { HiOutlineHand } from "react-icons/hi";

import './Dashboard.css';

const upcomingTasks = [
  {
    id: 1,
    title: 'Complete Visa Application',
    subtitle: 'Submit all required documents',
    href: '/dashboard/UserVisaGuide',
    status: 'urgent',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M6 8h8M6 11h5M6 14h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Search for Universities',
    subtitle: 'Find the best universities for your goals',
    href: '/dashboard/find-uni',
    status: 'pending',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M14 14L17.5 17.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Check Email Regularly',
    subtitle: 'Receive important updates from EMA',
    href: '/dashboard/notifications',
    status: 'info',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Apply for Scholarships',
    subtitle: 'Look for scholarships to reduce costs',
    href: '/dashboard/UserScholarship',
    status: 'pending',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 6v8M7.5 8.5C7.5 7.12 8.62 6 10 6s2.5 1.12 2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const recentActivity = [
  {
    id: 1,
    title: 'Completed profile',
    desc: 'Your profile is 70% complete',
    date: 'April 25, 2024',
    icon:  <FaUser />,
    href: '/profile/edit',
    type: 'profile',
  },
  {
    id: 2,
    title: 'Bookmarked University of Toronto',
    desc: 'Added to your saved universities',
    date: 'April 20, 2024',
    icon: <FaBookmark />,
    href: '/dashboard/find-uni',
    type: 'bookmark',
  },
  {
    id: 3,
    title: 'Viewed Chevening Scholarship',
    desc: 'UK — Fully Funded Scholarship',
    date: 'April 18, 2024',
    icon: <FaMoneyBill />,
    href: '/dashboard/UserScholarship',
    type: 'scholarship',
  },
];

const statusConfig = {
  urgent:  { label: 'Urgent',   color: '#e74c3c', bg: '#fdecea' },
  pending: { label: 'Pending',  color: '#f39c12', bg: '#fef5e7' },
  info:    { label: 'Reminder', color: '#2d5fa6', bg: '#eef4ff' },
  done:    { label: 'Done',     color: '#27ae60', bg: '#e8f8ef' },
};

const activityColors = {
  profile:    '#4a86d4',
  bookmark:   '#f39c12',
  scholarship:'#27ae60',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const profileCompletion = 70;
  const [dismissedTasks, setDismissedTasks] = useState([]);

  const visibleTasks = upcomingTasks.filter(t => !dismissedTasks.includes(t.id));
  //backend
  const [user, setUser] = useState(null);
//Api call
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/students/profile",
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log(res.data);

      setUser(res.data);

    } catch (err) {
      console.log("PROFILE ERROR:", err);

      navigate("/login");
    }
  };

  fetchProfile();
}, [navigate]);





 

  const dismissTask = (e, id) => {
    e.stopPropagation();
    setDismissedTasks(prev => [...prev, id]);
  };

  return (
    <div className="dash-root">
      <NavbarDashboard />

      <div className="dash-body">
        <Sidebar />

        <main className="dash-main">

          {/* ── Hero ── */}
          <div className="dash-hero">
            <div className="dash-hero__text">
              <h1 className="dash-hero__title">Dashboard</h1>
                 <p className="dash-hero__welcome">
                   Welcome back, 
<span className="dash-hero__name">
  {user ? user.fullName : "Loading..."}
</span>
                     <span className="dash-wave-icon">
                         <HiOutlineHand />
                     </span>
                      </p>

              <div className="dash-profile-card">
                <div className="dash-profile-card__top">
                  <p className="dash-profile-card__label">Profile Completion</p>
                  <span className="dash-profile-card__pct-badge">{profileCompletion}%</span>
                </div>
                <div className="dash-profile-card__bar-wrap">
                  <div
                    className="dash-profile-card__bar-fill"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
                <p className="dash-profile-card__hint">
                  Complete your profile to get better recommendations
                </p>
                <button
                  className="dash-profile-card__btn"
                  onClick={() => navigate('/profile/edit')}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="dash-hero__illustration">
              <div className="dash-hero__circle">
                <img
                  src="https://api.dicebear.com/7.x/adventurer/svg?seed=student&backgroundColor=b6e3f4"
                  alt="Student"
                  className="dash-hero__avatar-img"
                />
                <div className="dash-hero__float dash-hero__float--globe"> <FaGlobe /></div>
                <div className="dash-hero__float dash-hero__float--chat"><FaComments /></div>
              </div>
            </div>
          </div>

          {/* ── Quick Stats ── */}
          <div className="dash-quick-stats">
            {[
              { icon: <FaUniversity />, label: 'Universities Saved', val: '3',  color: 'blue',   href: '/dashboard/find-uni' },
              { icon: <FaMoneyBill />, label: 'Scholarships Saved', val: '2',  color: 'green',  href: '/dashboard/UserScholarship' },
              { icon: <FaFileAlt />, label: 'Docs Uploaded',      val: '4',  color: 'orange', href: '/DocumentChecklist' },
              { icon: <FaClock />, label: 'Reminders Set',       val: '3',  color: 'purple', href: '/profile/edit' },
            ].map(s => (
              <div
                key={s.label}
                className={`dash-quick-stat dash-quick-stat--${s.color}`}
                onClick={() => navigate(s.href)}
              >
                <span className="dash-quick-stat__icon">{s.icon}</span>
                <div>
                  <p className="dash-quick-stat__val">{s.val}</p>
                  <p className="dash-quick-stat__label">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Upcoming Tasks ── */}
          <section className="dash-section">
            <div className="dash-section__header">
              <h2 className="dash-section__title">Upcoming Tasks</h2>
              <span className="dash-section__badge">{visibleTasks.length} remaining</span>
            </div>

            <div className="dash-tasks">
              {visibleTasks.map((task) => {
                const cfg = statusConfig[task.status];
                return (
                  <div
                    key={task.id}
                    className={`dash-task-card${task.href ? ' dash-task-card--clickable' : ''}`}
                    onClick={() => task.href && navigate(task.href)}
                  >
                    <div className="dash-task-card__icon-wrap">
                      {task.icon}
                    </div>

                    <div className="dash-task-card__content">
                      <div className="dash-task-card__row">
                        <p className="dash-task-card__title">{task.title}</p>
                        <span
                          className="dash-task-card__status-tag"
                          style={{ color: cfg.color, background: cfg.bg }}
                        >
                          {cfg.label}
                        </span>
                      </div>
                      <p className="dash-task-card__subtitle">{task.subtitle}</p>
                    </div>

                    <div className="dash-task-card__action">
                      {task.href ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6 3l5 5-5 5" stroke="#9ab3d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <button
                          className="dash-task-dismiss"
                          onClick={(e) => dismissTask(e, task.id)}
                          title="Dismiss reminder"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {visibleTasks.length === 0 && (
                <div className="dash-tasks-empty">
                  <span>🎉</span>
                  <p>All tasks completed! You're on top of things.</p>
                </div>
              )}
            </div>
          </section>

          {/* ── Recent Activity ── */}
          <section className="dash-section">
            <div className="dash-section__header">
              <h2 className="dash-section__title">Recent Activity</h2>
              <span className="dash-section__badge">{recentActivity.length} items</span>
            </div>

            <div className="dash-activity">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="dash-activity-card"
                  onClick={() => item.href && navigate(item.href)}
                  style={{ cursor: item.href ? 'pointer' : 'default' }}
                >
                  <div
                    className="dash-activity-card__icon"
                    style={{
                      background: activityColors[item.type] + '20',
                      color: activityColors[item.type],
                    }}
                  >
                    {item.icon}
                  </div>

                  <div className="dash-activity-card__content">
                    <p className="dash-activity-card__title">{item.title}</p>
                    <p className="dash-activity-card__desc">{item.desc}</p>
                  </div>

                  <div className="dash-activity-card__meta">
                    <p className="dash-activity-card__date">{item.date}</p>
                    {item.href && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3l5 5-5 5" stroke="#c0d4ef" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>

      {/* ── Footer ── */}
      <footer className="dash-footer">
        <div className="dash-footer__brand">
          <div className="dash-footer__logo">
            <svg width="24" height="18" viewBox="0 0 28 22" fill="none">
              <path d="M2 2H10L14 8L18 2H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 11H26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M2 20H10L14 14L18 20H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>EMA STUDY GATE</span>
          </div>
          <p>Empowering students to achieve their dreams of studying abroad with ease.</p>
          <small>© 2022 EMA Study Gate. All rights reserved.</small>
        </div>

        <div className="dash-footer__col">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/dashboard/find-uni">Find Universities</a>
          <a href="/dashboard/UserVisaGuide">Visa Guidance</a>
        </div>

        <div className="dash-footer__col">
          <h4>Resources</h4>
          <a href="#">Blog</a>
          <a href="#">Support</a>
        </div>

        <div className="dash-footer__col">
          <h4>Contact Us</h4>
          <div className="dash-footer__socials">
            <a href="#" className="dash-footer__social-btn">f</a>
            <a href="#" className="dash-footer__social-btn">t</a>
            <a href="#" className="dash-footer__social-btn">in</a>
          </div>
          <a href="mailto:info@emastudygate.com" className="dash-footer__email">
            ✉ info@emastudygate.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

