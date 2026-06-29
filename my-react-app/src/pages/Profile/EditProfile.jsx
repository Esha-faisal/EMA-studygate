import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import NavbarDashboard from '../../components/dashboard/NavbarDashboard';
import './EditProfile.css';
import Sidebar from '../../components/dashboard/Sidebar';

import axios from "axios";

import {
  User,
  GraduationCap,
  Lock,
  Bookmark,
  Clock,
  Bell,
  Camera,
  CheckCircle,
  LogOut,
  Save,
  ShieldCheck,
  AlertTriangle,
  Landmark,
  BadgeDollarSign,
  CalendarDays,
  Plus,
  X,
  Mail,
  Circle,
} from 'lucide-react';

/* ── Tab IDs ── */
const TABS = [
  { id: 'personal',      label: 'Personal Info',   icon: <User size={15} />          },
  { id: 'academic',      label: 'Academic Info',    icon: <GraduationCap size={15} /> },
  { id: 'password',      label: 'Change Password',  icon: <Lock size={15} />          },
  { id: 'bookmarks',     label: 'Bookmarks',        icon: <Bookmark size={15} />      },
  { id: 'reminders',     label: 'Reminders',        icon: <Clock size={15} />         },
  { id: 'notifications', label: 'Notifications',    icon: <Bell size={15} />          },
];

/* ── Mock saved bookmarks ── */
const mockBookmarks = [
  { id: 1, type: 'university',  name: 'Technical University of Munich', country: '🇩🇪 Germany', field: 'Engineering' },
  { id: 2, type: 'scholarship', name: 'DAAD Scholarship',               country: '🇩🇪 Germany', field: 'All Fields'  },
  { id: 3, type: 'university',  name: 'Aalto University',               country: '🇫🇮 Finland',  field: 'Engineering' },
  { id: 4, type: 'scholarship', name: 'Chevening Scholarship',          country: '🇬🇧 England',  field: 'All Fields'  },
];

/* ── Mock reminders ── */
const mockReminders = [
  { id: 1, title: 'IELTS Test Registration',                    date: '2025-08-15', priority: 'high'   },
  { id: 2, title: 'Technical University of Munich Application', date: '2025-09-01', priority: 'high'   },
  { id: 3, title: 'Chevening Scholarship Deadline',             date: '2025-11-05', priority: 'medium' },
];

/* Priority dot colors */
const priorityColor = { high: '#e74c3c', medium: '#f39c12', low: '#27ae60' };

const EditProfile = () => {

 useEffect(() => {
  axios.get("http://localhost:5000/api/students/profile", {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  })
  .then(res => {

    setPersonal({
  firstName: res.data.fullName?.split(" ")[0] || "",
  lastName: res.data.lastName || "",
  email: res.data.email || "",
  phone: res.data.phone || "",
  dob: res.data.dob || "",
  gender: res.data.gender || "",
  country: res.data.countryInterested || "",
  city: res.data.city || "",
  bio: res.data.bio || "",
});
   setAcademic({
  degreeLevel: res.data.degreeLevel || "",
  fieldOfStudy: res.data.fieldOfStudy || "",
  currentGpa: res.data.currentGpa || "",
  ieltsScore: res.data.ieltsScore || "",
  targetCountry: res.data.targetCountry || "",
  intakeSemester: res.data.intakeSemester || "",
  budget: res.data.budget || "",
});

  })
  .catch(err => {
    console.log(err);
  });

}, []);


  const navigate = useNavigate();
  const [activeTab, setActiveTab]           = useState('personal');
  const [saved, setSaved]                   = useState(false);
  const [bookmarks, setBookmarks]           = useState(mockBookmarks);
  const [reminders, setReminders]           = useState(mockReminders);
  const [showReminderForm, setShowReminderForm] = useState(false);

  const [personal, setPersonal] = useState({
    firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com',
    phone: '+92 300 1234567', dob: '2000-03-15', gender: 'male',
    country: 'Pakistan', city: 'Lahore', bio: '',
  });

  const [academic, setAcademic] = useState({
    degreeLevel: 'bachelors', fieldOfStudy: 'Computer Science',
    currentGpa: '3.5', ieltsScore: '7.0', targetCountry: 'Germany',
    intakeSemester: 'Fall 2026', budget: '20000',
  });

  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [pwError, setPwError]     = useState('');
  const [pwSuccess, setPwSuccess] = useState('');

  const [notifs, setNotifs] = useState({
    emailDeadlines: true, emailNewScholarships: true,
    emailWeeklyDigest: false, siteReminders: true, siteMessages: true,
  });

  const [newReminder, setNewReminder] = useState({ title: '', date: '', priority: 'medium' });

  const profileCompletion = () => {
    let score = 0;
    if (personal.firstName)     score += 10;
    if (personal.lastName)      score += 10;
    if (personal.phone)         score += 10;
    if (personal.dob)           score += 10;
    if (personal.country)       score += 10;
    if (academic.fieldOfStudy)  score += 10;
    if (academic.currentGpa)    score += 10;
    if (academic.ieltsScore)    score += 10;
    if (academic.targetCountry) score += 10;
    if (personal.bio)           score += 10;
    return score;
  };

const handleSave = async (e) => {
  e.preventDefault();

  try {

    const response = await axios.put(
      "http://localhost:5000/api/students/update-profile",
      {
        fullName: personal.firstName,
        lastName: personal.lastName,
        email: personal.email,
        phone: personal.phone,
        dob: personal.dob,
        gender: personal.gender,
        countryInterested: personal.country,
        city: personal.city,
        bio: personal.bio,

        degreeLevel: academic.degreeLevel,
        fieldOfStudy: academic.fieldOfStudy,
        currentGpa: academic.currentGpa,
        ieltsScore: academic.ieltsScore,
        targetCountry: academic.targetCountry,
        intakeSemester: academic.intakeSemester,
        budget: academic.budget
      },
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    );

    console.log(response.data);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);

  } catch (err) {
    console.log(err);
  }
};
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPwError(''); setPwSuccess('');
    if (!passwords.current)               { setPwError('Please enter current password.'); return; }
    if (passwords.newPass.length < 8)     { setPwError('New password must be at least 8 characters.'); return; }
    if (passwords.newPass !== passwords.confirm) { setPwError('Passwords do not match.'); return; }
    setPwSuccess('Password changed successfully!');
    setPasswords({ current: '', newPass: '', confirm: '' });
  };

  const removeBookmark = (id) => setBookmarks(b => b.filter(x => x.id !== id));

  const addReminder = (e) => {
    e.preventDefault();
    if (!newReminder.title || !newReminder.date) return;
    setReminders(r => [...r, { ...newReminder, id: Date.now() }]);
    setNewReminder({ title: '', date: '', priority: 'medium' });
    setShowReminderForm(false);
  };

  const removeReminder = (id) => setReminders(r => r.filter(x => x.id !== id));

  const completion = profileCompletion();

  return (
    <div className="ep-root">
      <NavbarDashboard />
      <div className="ep-body">
        <Sidebar />

        <main className="ep-main">

          {/* ── Page Header ── */}
          <div className="ep-header">
            <div className="ep-header__left">
              <h1 className="ep-header__title">Profile & Settings</h1>
              <p className="ep-header__sub">Manage your personal information and preferences</p>
            </div>
            <div className="ep-header__right">
              <div className="ep-completion">
                <span className="ep-completion__label">Profile Complete</span>
                <div className="ep-completion__bar">
                  <div className="ep-completion__fill" style={{ width: `${completion}%` }} />
                </div>
                <span className="ep-completion__pct">{completion}%</span>
              </div>
            </div>
          </div>

          {/* ── Avatar Card ── */}
          <div className="ep-avatar-card">
            <div className="ep-avatar-card__img-wrap">
              <img
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${personal.firstName}`}
                alt="avatar"
                className="ep-avatar-card__img"
              />
              <button className="ep-avatar-card__change-btn" title="Change photo">
                <Camera size={14} />
              </button>
            </div>
            <div className="ep-avatar-card__info">
              <h2 className="ep-avatar-card__name">{personal.firstName} {personal.lastName}</h2>
              <p className="ep-avatar-card__email">{personal.email}</p>
              <div className="ep-avatar-card__badges">
                <span className="ep-badge ep-badge--blue">
                  <GraduationCap size={12} style={{ marginRight: 4 }} /> Student
                </span>
                <span className="ep-badge ep-badge--green">
                  <CheckCircle size={12} style={{ marginRight: 4 }} /> Verified
                </span>
              </div>
            </div>
            <button className="ep-avatar-card__logout" onClick={() => navigate('/login')}>
              <LogOut size={15} style={{ marginRight: 6 }} /> Logout
            </button>
          </div>

          {/* ── Tabs ── */}
          <div className="ep-tabs">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`ep-tab${activeTab === t.id ? ' ep-tab--active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>

          {/* ── Tab Panels ── */}
          <div className="ep-panel">

            {/* ── PERSONAL INFO ── */}
            {activeTab === 'personal' && (
              <form className="ep-form" onSubmit={handleSave}>
                <div className="ep-form__grid">
                  <div className="ep-form__field">
                    <label>First Name *</label>
                    <input value={personal.firstName} onChange={e => setPersonal({...personal, firstName: e.target.value})} placeholder="First Name" required />
                  </div>
                  <div className="ep-form__field">
                    <label>Last Name *</label>
                    <input value={personal.lastName} onChange={e => setPersonal({...personal, lastName: e.target.value})} placeholder="Last Name" required />
                  </div>
                  <div className="ep-form__field">
                    <label>Email Address *</label>
                    <input type="email" value={personal.email} onChange={e => setPersonal({...personal, email: e.target.value})} placeholder="Email" required />
                  </div>
                  <div className="ep-form__field">
                    <label>Phone Number</label>
                    <input value={personal.phone} onChange={e => setPersonal({...personal, phone: e.target.value})} placeholder="+92 300 0000000" />
                  </div>
                  <div className="ep-form__field">
                    <label>Date of Birth</label>
                    <input type="date" value={personal.dob} onChange={e => setPersonal({...personal, dob: e.target.value})} />
                  </div>
                  <div className="ep-form__field">
                    <label>Gender</label>
                    <select value={personal.gender} onChange={e => setPersonal({...personal, gender: e.target.value})}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not">Prefer not to say</option>
                    </select>
                  </div>
                  <div className="ep-form__field">
                    <label>Country</label>
                    <select value={personal.country} onChange={e => setPersonal({...personal, country: e.target.value})}>
                      {['Pakistan','India','Bangladesh','Nigeria','Kenya','USA','UK','Canada','Australia','Other'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="ep-form__field">
                    <label>City</label>
                    <input value={personal.city} onChange={e => setPersonal({...personal, city: e.target.value})} placeholder="Your city" />
                  </div>
                  <div className="ep-form__field ep-form__field--full">
                    <label>Bio / About Me</label>
                    <textarea
                      value={personal.bio}
                      onChange={e => setPersonal({...personal, bio: e.target.value})}
                      placeholder="Tell us about yourself, your goals, and aspirations..."
                      rows={4}
                    />
                  </div>
                </div>
                <div className="ep-form__actions">
                  <button type="submit" className="ep-btn ep-btn--primary">
                    {saved
                      ? <><CheckCircle size={14} style={{ marginRight: 6 }} />Saved!</>
                      : <><Save size={14} style={{ marginRight: 6 }} />Save Changes</>
                    }
                  </button>
                </div>
              </form>
            )}

            {/* ── ACADEMIC INFO ── */}
            {activeTab === 'academic' && (
              <form className="ep-form" onSubmit={handleSave}>
                <div className="ep-form__section-title">Academic Background</div>
                <div className="ep-form__grid">
                  <div className="ep-form__field">
                    <label>Degree Level</label>
                    <select value={academic.degreeLevel} onChange={e => setAcademic({...academic, degreeLevel: e.target.value})}>
                      <option value="bachelors">Bachelor's</option>
                      <option value="masters">Master's</option>
                      <option value="phd">PhD</option>
                      <option value="diploma">Diploma</option>
                    </select>
                  </div>
                  <div className="ep-form__field">
                    <label>Field of Study</label>
                    <input value={academic.fieldOfStudy} onChange={e => setAcademic({...academic, fieldOfStudy: e.target.value})} placeholder="e.g. Computer Science" />
                  </div>
                  <div className="ep-form__field">
                    <label>Current GPA (out of 4.0)</label>
                    <input type="number" step="0.01" min="0" max="4" value={academic.currentGpa} onChange={e => setAcademic({...academic, currentGpa: e.target.value})} placeholder="3.5" />
                  </div>
                  <div className="ep-form__field">
                    <label>IELTS / TOEFL Score</label>
                    <input value={academic.ieltsScore} onChange={e => setAcademic({...academic, ieltsScore: e.target.value})} placeholder="e.g. 7.0" />
                  </div>
                </div>

                <div className="ep-form__section-title" style={{ marginTop: '24px' }}>Study Preferences</div>
                <div className="ep-form__grid">
                  <div className="ep-form__field">
                    <label>Target Country</label>
                    <select value={academic.targetCountry} onChange={e => setAcademic({...academic, targetCountry: e.target.value})}>
                      {['Germany','England','Italy','Finland','Other'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="ep-form__field">
                    <label>Target Intake</label>
                    <select value={academic.intakeSemester} onChange={e => setAcademic({...academic, intakeSemester: e.target.value})}>
                      {['Fall 2025','Spring 2026','Fall 2026','Spring 2027'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="ep-form__field">
                    <label>Annual Budget (USD)</label>
                    <input type="number" value={academic.budget} onChange={e => setAcademic({...academic, budget: e.target.value})} placeholder="20000" />
                  </div>
                </div>
                <div className="ep-form__actions">
                  <button type="submit" className="ep-btn ep-btn--primary">
                    {saved
                      ? <><CheckCircle size={14} style={{ marginRight: 6 }} />Saved!</>
                      : <><Save size={14} style={{ marginRight: 6 }} />Save Changes</>
                    }
                  </button>
                </div>
              </form>
            )}

            {/* ── CHANGE PASSWORD ── */}
            {activeTab === 'password' && (
              <form className="ep-form ep-form--narrow" onSubmit={handlePasswordChange}>
                <div className="ep-pw-info">
                  <Lock size={14} style={{ marginRight: 6 }} />
                  Password must be at least <strong>8 characters</strong> and include a mix of letters and numbers.
                </div>
                {pwError   && (
                  <div className="ep-alert ep-alert--error">
                    <AlertTriangle size={14} style={{ marginRight: 6 }} /> {pwError}
                  </div>
                )}
                {pwSuccess && (
                  <div className="ep-alert ep-alert--success">
                    <CheckCircle size={14} style={{ marginRight: 6 }} /> {pwSuccess}
                  </div>
                )}
                <div className="ep-form__field">
                  <label>Current Password *</label>
                  <input type="password" value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} placeholder="Enter current password" />
                </div>
                <div className="ep-form__field">
                  <label>New Password *</label>
                  <input type="password" value={passwords.newPass} onChange={e => setPasswords({...passwords, newPass: e.target.value})} placeholder="Minimum 8 characters" />
                  <div className="ep-pw-strength">
                    {['Weak','Fair','Strong','Very Strong'].map((l, i) => (
                      <div key={l} className={`ep-pw-strength__bar${passwords.newPass.length > i * 3 ? ' ep-pw-strength__bar--filled' : ''}`} />
                    ))}
                    <span className="ep-pw-strength__label">
                      {passwords.newPass.length === 0 ? '' : passwords.newPass.length < 6 ? 'Weak' : passwords.newPass.length < 10 ? 'Fair' : 'Strong'}
                    </span>
                  </div>
                </div>
                <div className="ep-form__field">
                  <label>Confirm New Password *</label>
                  <input type="password" value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} placeholder="Re-enter new password" />
                </div>
                <div className="ep-form__actions">
                  <button type="submit" className="ep-btn ep-btn--primary">
                    <ShieldCheck size={14} style={{ marginRight: 6 }} /> Update Password
                  </button>
                </div>
              </form>
            )}

            {/* ── BOOKMARKS ── */}
            {activeTab === 'bookmarks' && (
              <div className="ep-bookmarks">
                <div className="ep-bookmarks__header">
                  <h3>Saved Universities & Scholarships</h3>
                  <span className="ep-bookmarks__count">{bookmarks.length} saved</span>
                </div>
                {bookmarks.length === 0 && (
                  <div className="ep-empty">
                    <Bookmark size={40} />
                    <p>No bookmarks yet. Browse universities and scholarships to save them here.</p>
                    <button className="ep-btn ep-btn--primary" onClick={() => navigate('/StudyDestinations')}>Browse Universities</button>
                  </div>
                )}
                <div className="ep-bookmark-list">
                  {bookmarks.map(b => (
                    <div key={b.id} className="ep-bookmark-card">
                      <div className={`ep-bookmark-card__badge ep-bookmark-card__badge--${b.type}`}>
                        {b.type === 'university'
                          ? <><Landmark size={13} style={{ marginRight: 5 }} />University</>
                          : <><BadgeDollarSign size={13} style={{ marginRight: 5 }} />Scholarship</>
                        }
                      </div>
                      <div className="ep-bookmark-card__info">
                        <p className="ep-bookmark-card__name">{b.name}</p>
                        <p className="ep-bookmark-card__meta">{b.country} &nbsp;·&nbsp; {b.field}</p>
                      </div>
                      <div className="ep-bookmark-card__actions">
                        <button className="ep-btn ep-btn--outline ep-btn--sm" onClick={() => navigate('/StudyDestinations')}>View</button>
                        <button className="ep-btn ep-btn--danger ep-btn--sm" onClick={() => removeBookmark(b.id)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── REMINDERS ── */}
            {activeTab === 'reminders' && (
              <div className="ep-reminders">
                <div className="ep-reminders__header">
                  <h3>Deadline Reminders</h3>
                  <button className="ep-btn ep-btn--primary ep-btn--sm" onClick={() => setShowReminderForm(!showReminderForm)}>
                    {showReminderForm
                      ? <><X size={13} style={{ marginRight: 4 }} />Cancel</>
                      : <><Plus size={13} style={{ marginRight: 4 }} />Add Reminder</>
                    }
                  </button>
                </div>

                {showReminderForm && (
                  <form className="ep-reminder-form" onSubmit={addReminder}>
                    <div className="ep-form__grid ep-form__grid--3">
                      <div className="ep-form__field">
                        <label>Reminder Title *</label>
                        <input value={newReminder.title} onChange={e => setNewReminder({...newReminder, title: e.target.value})} placeholder="e.g. IELTS Registration" />
                      </div>
                      <div className="ep-form__field">
                        <label>Deadline Date *</label>
                        <input type="date" value={newReminder.date} onChange={e => setNewReminder({...newReminder, date: e.target.value})} />
                      </div>
                      <div className="ep-form__field">
                        <label>Priority</label>
                        <select value={newReminder.priority} onChange={e => setNewReminder({...newReminder, priority: e.target.value})}>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="ep-btn ep-btn--primary">Save Reminder</button>
                  </form>
                )}

                <div className="ep-reminder-list">
                  {reminders.map(r => (
                    <div key={r.id} className={`ep-reminder-card ep-reminder-card--${r.priority}`}>
                      <div className="ep-reminder-card__dot" style={{ background: priorityColor[r.priority] }} />
                      <div className="ep-reminder-card__info">
                        <p className="ep-reminder-card__title">{r.title}</p>
                        <p className="ep-reminder-card__date">
                          <CalendarDays size={12} style={{ marginRight: 5 }} />
                          {new Date(r.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                      <span className={`ep-priority ep-priority--${r.priority}`}>
                        <Circle
                          size={10}
                          fill={priorityColor[r.priority]}
                          color={priorityColor[r.priority]}
                          style={{ marginRight: 5 }}
                        />
                        {r.priority.charAt(0).toUpperCase() + r.priority.slice(1)}
                      </span>
                      <button className="ep-btn ep-btn--danger ep-btn--sm" onClick={() => removeReminder(r.id)}>
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── NOTIFICATIONS ── */}
            {activeTab === 'notifications' && (
              <div className="ep-notifs">
                <div className="ep-notifs__group">
                  <h3 className="ep-notifs__group-title">
                    <Mail size={16} style={{ marginRight: 7 }} /> Email Notifications
                  </h3>
                  {[
                    { key: 'emailDeadlines',       label: 'Deadline Reminders',     desc: 'Get emailed when a deadline is approaching' },
                    { key: 'emailNewScholarships',  label: 'New Scholarship Alerts', desc: 'Be notified when new scholarships are added' },
                    { key: 'emailWeeklyDigest',     label: 'Weekly Digest',          desc: 'A summary of recommendations every week' },
                  ].map(n => (
                    <div key={n.key} className="ep-notif-row">
                      <div className="ep-notif-row__info">
                        <p className="ep-notif-row__label">{n.label}</p>
                        <p className="ep-notif-row__desc">{n.desc}</p>
                      </div>
                      <label className="ep-toggle">
                        <input type="checkbox" checked={notifs[n.key]} onChange={() => setNotifs({...notifs, [n.key]: !notifs[n.key]})} />
                        <span className="ep-toggle__slider" />
                      </label>
                    </div>
                  ))}
                </div>

                <div className="ep-notifs__group">
                  <h3 className="ep-notifs__group-title">
                    <Bell size={16} style={{ marginRight: 7 }} /> On-Site Notifications
                  </h3>
                  {[
                    { key: 'siteReminders', label: 'Reminder Alerts', desc: 'Show notifications for saved reminders' },
                    { key: 'siteMessages',  label: 'System Messages', desc: 'Platform updates and announcements' },
                  ].map(n => (
                    <div key={n.key} className="ep-notif-row">
                      <div className="ep-notif-row__info">
                        <p className="ep-notif-row__label">{n.label}</p>
                        <p className="ep-notif-row__desc">{n.desc}</p>
                      </div>
                      <label className="ep-toggle">
                        <input type="checkbox" checked={notifs[n.key]} onChange={() => setNotifs({...notifs, [n.key]: !notifs[n.key]})} />
                        <span className="ep-toggle__slider" />
                      </label>
                    </div>
                  ))}
                </div>

                <div className="ep-form__actions">
                  <button className="ep-btn ep-btn--primary" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}>
                    {saved
                      ? <><CheckCircle size={14} style={{ marginRight: 6 }} />Saved!</>
                      : <><Save size={14} style={{ marginRight: 6 }} />Save Preferences</>
                    }
                  </button>
                </div>
              </div>
            )}

          </div>{/* end ep-panel */}
        </main>
      </div>
    </div>
  );
};

export default EditProfile;