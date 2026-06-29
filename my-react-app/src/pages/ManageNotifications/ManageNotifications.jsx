import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminNavbar  from '../../components/AdminNavbar/AdminNavbar';
import './ManageNotifications.css';
import {
  FaEnvelope,
  FaClock,
  FaChartBar,
  FaUsers,
  FaTimes,
  FaPlus,
  FaPaperPlane,
  FaCheckCircle,
  FaTrash,
  FaCalendarAlt
} from "react-icons/fa";

const mockNotifs = [
  { id:1, title:'Application Deadline Reminder', message:'University of Toronto closes in 5 days', type:'deadline', recipients:'All Students', sent:'Apr 6, 2026', status:'sent' },
  { id:2, title:'New Scholarship Available',      message:'Australia Awards 2026 is now open',      type:'scholarship', recipients:'All Students', sent:'Apr 5, 2026', status:'sent' },
  { id:3, title:'Visa Processing Time Update',    message:'Canada visa now takes 12–16 weeks',      type:'visa',       recipients:'Canada Applicants', sent:'Apr 4, 2026', status:'sent' },
  { id:4, title:'System Maintenance Notice',      message:'Platform will be down Apr 10, 2–4AM',   type:'system',     recipients:'All Users', sent:'Scheduled', status:'scheduled' },
];

const ManageNotifications = () => {
  const [notifs, setNotifs]   = useState(mockNotifs);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]       = useState({ title:'', message:'', type:'system', recipients:'All Students' });
  const [sent, setSent]       = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!form.title || !form.message) return;
    setSent(true);
    setTimeout(() => {
      setNotifs(prev => [...prev, { ...form, id: Date.now(), sent:'Just now', status:'sent' }]);
      setForm({ title:'', message:'', type:'system', recipients:'All Students' });
      setShowForm(false);
      setSent(false);
    }, 1500);
  };

  const del = (id) => setNotifs(prev => prev.filter(n => n.id !== id));

  const typeColors = {
    deadline:   '#fdecea',
    scholarship:'#e8f8ef',
    visa:       '#fff4e6',
    system:     '#eef4ff',
  };

  return (
    <div className="mn-root">
      <AdminSidebar />
      <div className="mn-content">
        <AdminNavbar title="— Manage Notifications" />
        <main className="mn-main">
          <div className="mn-header">
            <div>
              <h1>Manage Notifications & Reminders</h1>
              <p>Send email notifications and manage student reminders</p>
            </div>
            <button className="mn-btn mn-btn--primary" onClick={() => setShowForm(!showForm)}>
                            {showForm ? (
  <>
    <FaTimes style={{ marginRight: 6 }} /> Cancel
  </>
) : (
  <>
    <FaPlus style={{ marginRight: 6 }} /> Send Notification
  </>
)}
            </button>
          </div>

          {/* Stats */}
          <div className="mn-stats">
            {[
              { label:'Total Sent',  val: notifs.filter(n=>n.status==='sent').length,      icon:<FaEnvelope />, color:'blue' },
              { label:'Scheduled',   val: notifs.filter(n=>n.status==='scheduled').length,  icon:<FaClock />, color:'orange' },
              { label:'This Week',   val: '3',                                               icon:<FaChartBar />, color:'green' },
              { label:'Recipients',  val: '5,230',                                           icon:<FaUsers />, color:'purple' },
            ].map(s => (
              <div key={s.label} className={`mn-stat mn-stat--${s.color}`}>
                <span className="mn-stat__icon">{s.icon}</span>
                <div>
                  <p className="mn-stat__val">{s.val}</p>
                  <p className="mn-stat__label">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          {showForm && (
            <div className="mn-form-card">
              <h3><FaEnvelope style={{ marginRight: 6 }} />  Send New Notification</h3>
              <form onSubmit={handleSend}>
                <div className="mn-form-grid">
                  <div className="mn-field">
                    <label>Notification Title *</label>
                    <input className="mn-input" placeholder="e.g. Deadline Reminder" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                  </div>
                  <div className="mn-field">
                    <label>Type</label>
                    <select className="mn-input" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                      {['system','deadline','scholarship','visa'].map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
                    </select>
                  </div>
                  <div className="mn-field">
                    <label>Recipients</label>
                    <select className="mn-input" value={form.recipients} onChange={e => setForm({...form, recipients: e.target.value})}>
                      {['All Students','All Users','Canada Applicants','UK Applicants','New Registrations'].map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="mn-field mn-field--full">
                    <label>Message *</label>
                    <textarea className="mn-input mn-textarea" rows={3} placeholder="Write notification message..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  </div>
                </div>
                <div className="mn-form-actions">
                  <button type="submit" className="mn-btn mn-btn--primary" disabled={sent}>
                    {sent ? <><span className="mn-spinner" /> Sending...</> : <> <FaPaperPlane style={{ marginRight: 6 }} />
  Send Now</>}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notification list */}
          <div className="mn-list-card">
            <h3>Notification History</h3>
            <div className="mn-list">
              {notifs.map(n => (
                <div key={n.id} className="mn-item" style={{ borderLeft:`4px solid ${typeColors[n.type] ? '#4a86d4' : '#ccc'}` }}>
                  <div className="mn-item__info">
                    <div className="mn-item__top">
                      <p className="mn-item__title">{n.title}</p>
                      <span className={`mn-item__status mn-item__status--${n.status}`}>
                        {n.status === 'sent' ? (<>  <FaCheckCircle style={{ marginRight: 5 }} /> Sent</>) :(<>   <FaClock style={{ marginRight: 5 }} /> Scheduled</>) }
                      </span>
                    </div>
                    <p className="mn-item__msg">{n.message}</p>
                    <div className="mn-item__meta">
                      <span><FaUsers style={{ marginRight: 5 }} />  {n.recipients}</span>
                      <span><FaCalendarAlt style={{ marginRight: 5 }} /> {n.sent}</span>
                      <span className="mn-item__type">{n.type}</span>
                    </div>
                  </div>
                  <button className="mn-item__del" onClick={() => del(n.id)} title="Delete"><FaTrash /></button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageNotifications;