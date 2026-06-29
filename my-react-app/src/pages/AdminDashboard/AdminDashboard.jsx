import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminNavbar  from '../../components/AdminNavbar/AdminNavbar';
import logo from "../../components/assets/finallogo.jpeg";
import {
  FiUsers,
  FiBell,
  FiDollarSign,
  FiHome,
  FiUser,
  FiFileText,
  FiMail,
  FiTrendingUp,
  FiZap,
  FiFolder
} from 'react-icons/fi';

import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { HiOutlineIdentification } from 'react-icons/hi2';
import './AdminDashboard.css';

/* ── Mock data ── */
const stats = [
  { icon:<FiUsers />, label:'Total Students',        val:'8', change:'+12%', color:'blue',   path:'/admin/students' },
  { icon:<HiOutlineOfficeBuilding />, label:'Universities',          val:'20',   change:'+3',   color:'green',  path:'/admin/universities' },
  { icon:<FiDollarSign />, label:'Scholarships',           val:'30',    change:'+5',   color:'orange', path:'/admin/scholarships' },
  { icon:<FiBell />, label:'Notifications Sent',     val:'3', change:'+28%', color:'purple', path:'/admin/notifications' },
];

const pendingApprovals = [
  { id:1, name:'Ahmed Khan',    email:'ahmed@gmail.com',    date:'Apr 6, 2026', avatar:'https://api.dicebear.com/7.x/thumbs/svg?seed=Ahmed' },
  { id:2, name:'Sara Malik',    email:'sara@gmail.com',     date:'Apr 6, 2026', avatar:'https://api.dicebear.com/7.x/thumbs/svg?seed=Sara' },
  { id:3, name:'Bilal Hussain', email:'bilal@gmail.com',    date:'Apr 5, 2026', avatar:'https://api.dicebear.com/7.x/thumbs/svg?seed=Bilal' },
  { id:4, name:'Hina Waqar',    email:'hina@gmail.com',     date:'Apr 5, 2026', avatar:'https://api.dicebear.com/7.x/thumbs/svg?seed=Hina' },
];

const recentActivity = [
  { icon:<FiUser />, text:'New student registered: Fatima Zahra',     time:'2 min ago',  type:'user' },
  { icon:<HiOutlineOfficeBuilding />, text:'University of Toronto details updated',    time:'1 hr ago',   type:'uni' },
  { icon:<FiDollarSign />, text:'Chevening Scholarship deadline updated',   time:'3 hr ago',   type:'sch' },
  { icon:<FiFileText />, text:'Document verified for Ahmed Khan',         time:'5 hr ago',   type:'doc' },
  { icon:<FiBell />, text:'Bulk notification sent to 120 students',   time:'1 day ago',  type:'notif' },
];

const monthlyData = [2, 5, 8, 14, 20, 28, 35, 42, 38, 45, 47, 50];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState(pendingApprovals);
  const [emailForm, setEmailForm] = useState({ subject:'', message:'' });
  const [emailSent, setEmailSent] = useState(false);

  const handleApprove = (id) => setApprovals(prev => prev.filter(a => a.id !== id));
  const handleReject  = (id) => setApprovals(prev => prev.filter(a => a.id !== id));

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!emailForm.subject || !emailForm.message) return;
    setEmailSent(true);
    setTimeout(() => { setEmailSent(false); setEmailForm({ subject:'', message:'' }); }, 2500);
  };

  const maxVal = Math.max(...monthlyData);

  return (
    <div className="adm-root">
      <AdminSidebar />
      <div className="adm-content">
        <AdminNavbar title="Dashboard" />

        <main className="adm-main">

          {/* ── Stats ── */}
          <div className="adm-stats">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`adm-stat adm-stat--${s.color}`}
                onClick={() => navigate(s.path)}
              >
                <div className="adm-stat__left">
                  <span className="adm-stat__icon">{s.icon}</span>
                  <div>
                    <p className="adm-stat__val">{s.val}</p>
                    <p className="adm-stat__label">{s.label}</p>
                  </div>
                </div>
                <div className="adm-stat__right">
                  <span className="adm-stat__change">{s.change}</span>
                  <button className="adm-stat__btn">
                    {s.label.includes('Student') ? 'Manage' :
                     s.label.includes('Uni')     ? 'View'   :
                     s.label.includes('Scholar') ? 'Manage' : 'View'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Row 1: Approvals + Email + University ── */}
          <div className="adm-row adm-row--3">

            {/* Pending Approvals */}
            <div className="adm-card">
              <div className="adm-card__header">
                <h3>User Approval Requests</h3>
                <button className="adm-link" onClick={() => navigate('/admin/students')}>View All</button>
              </div>
              <div className="adm-approval-list">
                {approvals.length === 0 ? (
                  <p className="adm-empty-text"> All approvals processed</p>
                ) : (
                  approvals.map(a => (
                    <div key={a.id} className="adm-approval-item">
                      <img src={a.avatar} alt={a.name} className="adm-approval-avatar" />
                      <div className="adm-approval-info">
                        <p className="adm-approval-name">{a.name}</p>
                        <p className="adm-approval-date">{a.date}</p>
                      </div>
                      <div className="adm-approval-actions">
                        <button className="adm-btn adm-btn--approve" onClick={() => handleApprove(a.id)}>Approve</button>
                        <button className="adm-btn adm-btn--reject"  onClick={() => handleReject(a.id)}>Reject</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Send Email Notifications */}
            <div className="adm-card">
              <div className="adm-card__header">
                <h3>Send Email Notifications</h3>
              </div>
              {emailSent ? (
                <div className="adm-email-success"> Email sent to all students!</div>
              ) : (
                <form className="adm-email-form" onSubmit={handleSendEmail}>
                  <div className="adm-form-field">
                    <label>Subject:</label>
                    <input
                      placeholder="Email subject..."
                      value={emailForm.subject}
                      onChange={e => setEmailForm({...emailForm, subject: e.target.value})}
                    />
                  </div>
                  <div className="adm-form-field">
                    <label>Message:</label>
                    <textarea
                      placeholder="Write your message..."
                      rows={4}
                      value={emailForm.message}
                      onChange={e => setEmailForm({...emailForm, message: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="adm-btn adm-btn--primary adm-btn--full">
                            <>
              <FiMail style={{ marginRight: 6 }} />
                    Send Email
                      </>
                  </button>
                </form>
              )}
            </div>

            {/* University Management Quick Actions */}
            <div className="adm-card">
              <div className="adm-card__header">
                <h3>University Management</h3>
              </div>
              <div className="adm-quick-actions">
                <button className="adm-btn adm-btn--primary" onClick={() => navigate('/admin/universities')}>
                  + Add University
                </button>
                <button className="adm-btn adm-btn--outline" onClick={() => navigate('/admin/universities')}>
                  Remove University
                </button>
                <button className="adm-btn adm-btn--outline" onClick={() => navigate('/admin/universities')}>
                  Manage Listings
                </button>
                <button className="adm-btn adm-btn--outline" onClick={() => navigate('/admin/universities')}>
                  View All →
                </button>
              </div>

              <div className="adm-card__divider" />

              <div className="adm-card__header" style={{marginTop:'4px'}}>
                <h3>Scholarship Management</h3>
              </div>
              <div className="adm-quick-actions">
                <button className="adm-btn adm-btn--primary" onClick={() => navigate('/admin/scholarships')}>
                  + Add Scholarship
                </button>
                <button className="adm-btn adm-btn--outline" onClick={() => navigate('/admin/scholarships')}>
                  Edit Scholarships
                </button>
                <button className="adm-btn adm-btn--outline" onClick={() => navigate('/admin/scholarships')}>
                  View Scholarships
                </button>
              </div>
            </div>
          </div>

          {/* ── Row 2: Chart + Activity + Visa ── */}
          <div className="adm-row adm-row--3">

            {/* User Growth Chart */}
            <div className="adm-card adm-card--span2">
              <div className="adm-card__header">
                <h3>
                   <FiTrendingUp style={{ marginRight: 6 }} />
                     Reports & Analytics — User Growth
                </h3>
                <button className="adm-link" onClick={() => navigate('/admin/settings')}>Full Report</button>
              </div>
              <div className="adm-chart">
                <div className="adm-chart__bars">
                  {monthlyData.map((val, i) => (
                    <div key={i} className="adm-chart__bar-wrap">
                      <div
                        className="adm-chart__bar"
                        style={{ height: `${(val / maxVal) * 140}px` }}
                        title={`${val}0 students`}
                      />
                      <span className="adm-chart__label">{months[i]}</span>
                    </div>
                  ))}
                </div>
                <div className="adm-chart__stats">
                  {[
                    { label:'Total Users',    val:'8', icon:<FiUsers /> },
                    { label:'This Month',     val:'5',  icon:<FiTrendingUp /> },
                    { label:'Active Today',   val:'3',   icon: <FiZap />},
                  ].map(s => (
                    <div key={s.label} className="adm-chart__stat">
                      <span>{s.icon}</span>
                      <div>
                        <p className="adm-chart__stat-val">{s.val}</p>
                        <p className="adm-chart__stat-label">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="adm-card">
              <div className="adm-card__header">
                <h3>Recent Activity</h3>
              </div>
              <div className="adm-activity-list">
                {recentActivity.map((a, i) => (
                  <div key={i} className="adm-activity-item">
                    <span className="adm-activity-icon">{a.icon}</span>
                    <div className="adm-activity-info">
                      <p className="adm-activity-text">{a.text}</p>
                      <span className="adm-activity-time">{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Row 3: Visa + Data Upload ── */}
          <div className="adm-row adm-row--2">

            {/* Visa Guidance */}
            <div className="adm-card">
              <div className="adm-card__header">
                <h3> <HiOutlineIdentification style={{ marginRight: 6 }} />
                   Visa Guidance Management</h3>
                <button className="adm-link" onClick={() => navigate('/admin/visa')}>Manage</button>
              </div>
              <div className="adm-quick-actions adm-quick-actions--wrap">
                <button className="adm-btn adm-btn--outline" onClick={() => navigate('/admin/visa')}>Visa Information</button>
                <button className="adm-btn adm-btn--outline" onClick={() => navigate('/admin/visa')}>Guides & Tips</button>
                <button className="adm-btn adm-btn--outline" onClick={() => navigate('/admin/visa')}>Add Country Guide</button>
                <button className="adm-btn adm-btn--outline" onClick={() => navigate('/admin/visa')}>Consultation Requests</button>
              </div>
            </div>

            {/* Data Upload */}
            <div className="adm-card">
              <div className="adm-card__header">
                <h3>  <FiFolder style={{ marginRight: 6 }} />
                   Data Upload Management</h3>
              </div>
              <div className="adm-quick-actions adm-quick-actions--wrap">
                <button className="adm-btn adm-btn--primary" onClick={() => navigate('/admin/students')}>Upload User Data</button>
                <button className="adm-btn adm-btn--outline" onClick={() => navigate('/admin/students')}>Manage Documents</button>
                <button className="adm-btn adm-btn--outline" onClick={() => navigate('/admin/students')}>View Pending Docs</button>
                <button className="adm-btn adm-btn--outline" onClick={() => navigate('/admin/notifications')}>Manage Reminders</button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;