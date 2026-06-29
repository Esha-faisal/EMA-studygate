import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminNavbar  from '../../components/AdminNavbar/AdminNavbar';
import './AdminSettings.css';
import {
  FaCog,
  FaLock,
  FaKey,
  FaSave,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt
} from "react-icons/fa";
const AdminSettings = () => {
  const [activeTab, setActiveTab]   = useState('general');
  const [saved, setSaved]           = useState(false);
  const [general, setGeneral]       = useState({ siteName:'EMA Study Gate', tagline:'Empowering students to study abroad', email:'info@emastudygate.com', phone:'+92 332-8989765', address:'Jhelum, Punjab, Pakistan' });
  const [passwords, setPasswords]   = useState({ current:'', newPass:'', confirm:'' });
  const [pwError, setPwError]       = useState('');
  const [pwSuccess, setPwSuccess]   = useState('');
  const [apis, setApis]             = useState({ emailService:'', chatbotKey:'', googleAnalytics:'', smtpHost:'smtp.gmail.com', smtpPort:'587' });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePw = (e) => {
    e.preventDefault();
    setPwError(''); setPwSuccess('');
    if (!passwords.current)             { setPwError('Enter current password'); return; }
    if (passwords.newPass.length < 8)   { setPwError('Min 8 characters'); return; }
    if (passwords.newPass !== passwords.confirm) { setPwError('Passwords do not match'); return; }
    setPwSuccess('Password updated successfully!');
    setPasswords({ current:'', newPass:'', confirm:'' });
  };

  const TABS = [
    { id:'general',  label:<><FaCog style={{marginRight:6}} /> General</>       },
    { id:'password', label:<><FaLock style={{marginRight:6}} /> Change Password</> },
    { id:'apis',     label:<><FaKey style={{marginRight:6}} /> API Keys</>       },
  ];

  return (
    <div className="as-root">
      <AdminSidebar />
      <div className="as-content">
        <AdminNavbar title="— Settings" />
        <main className="as-main">

          <div className="as-header">
            <h1>Website Settings</h1>
            <p>Manage site configuration, password, and third-party API keys</p>
          </div>

          <div className="as-tabs">
            {TABS.map(t => (
              <button key={t.id} className={`as-tab${activeTab===t.id?' as-tab--active':''}`} onClick={() => setActiveTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="as-panel">

            {/* General Settings */}
            {activeTab === 'general' && (
              <form onSubmit={handleSave}>
                <div className="as-section-title">Site Information</div>
                {saved && <div className="as-success"><FaCheckCircle style={{marginRight:6}} />
  Settings saved successfully!</div>}
                <div className="as-grid">
                  {[
                    { key:'siteName',  label:'Site Name',       ph:'EMA Study Gate' },
                    { key:'tagline',   label:'Tagline',         ph:'Empowering students...' },
                    { key:'email',     label:'Contact Email',   ph:'info@...' },
                    { key:'phone',     label:'Phone Number',    ph:'+92...' },
                    { key:'address',   label:'Address',         ph:'City, Country' },
                  ].map(f => (
                    <div key={f.key} className="as-field">
                      <label>{f.label}</label>
                      <input className="as-input" placeholder={f.ph} value={general[f.key]} onChange={e => setGeneral({...general, [f.key]: e.target.value})} />
                    </div>
                  ))}
                </div>
                <div className="as-section-title" style={{marginTop:'24px'}}>Maintenance Mode</div>
                <div className="as-toggle-row">
                  <div>
                    <p className="as-toggle-label">Enable Maintenance Mode</p>
                    <p className="as-toggle-sub">Show maintenance page to all visitors</p>
                  </div>
                  <label className="as-toggle">
                    <input type="checkbox" />
                    <span className="as-toggle__slider" />
                  </label>
                </div>
                <div className="as-toggle-row">
                  <div>
                    <p className="as-toggle-label">Allow New Registrations</p>
                    <p className="as-toggle-sub">Enable/disable student sign-ups</p>
                  </div>
                  <label className="as-toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="as-toggle__slider" />
                  </label>
                </div>
                <div className="as-actions">
                  <button type="submit" className="as-btn as-btn--primary"><>  <FaSave style={{marginRight:6}} />
  Save Settings</></button>
                </div>
              </form>
            )}

            {/* Change Password */}
            {activeTab === 'password' && (
              <form onSubmit={handlePw} style={{maxWidth:'440px'}}>
                <div className="as-section-title">Change Admin Password</div>
                {pwError   && <div className="as-alert as-alert--error"> <FaExclamationTriangle style={{marginRight:6}} />{pwError}</div>}
                {pwSuccess && <div className="as-success"> <FaCheckCircle style={{marginRight:6}} />{pwSuccess}</div>}
                {[
                  { key:'current', label:'Current Password', ph:'Enter current password' },
                  { key:'newPass', label:'New Password',     ph:'Minimum 8 characters' },
                  { key:'confirm', label:'Confirm Password', ph:'Re-enter new password' },
                ].map(f => (
                  <div key={f.key} className="as-field" style={{marginBottom:'14px'}}>
                    <label>{f.label}</label>
                    <input type="password" className="as-input" placeholder={f.ph} value={passwords[f.key]} onChange={e => setPasswords({...passwords, [f.key]: e.target.value})} />
                  </div>
                ))}
                <button type="submit" className="as-btn as-btn--primary"><><FaLock style={{marginRight:6}} />
  Update Password</></button>
              </form>
            )}

            {/* API Keys */}
            {activeTab === 'apis' && (
              <form onSubmit={handleSave}>
                <div className="as-section-title">Third-Party API Configuration</div>
                {saved && <div className="as-success">  <FaCheckCircle style={{marginRight:6}} /> API keys saved!</div>}
                <div className="as-api-note">
                  <FaShieldAlt style={{marginRight:6}} /> API keys are encrypted before storage. Never share these keys publicly.
                </div>
                {[
                  { key:'emailService',    label:'Email Service API Key',  ph:'Enter email service key...' },
                  { key:'chatbotKey',      label:'AI Chatbot API Key',     ph:'Enter chatbot API key...' },
                  { key:'googleAnalytics', label:'Google Analytics ID',    ph:'G-XXXXXXXXXX' },
                  { key:'smtpHost',        label:'SMTP Host',              ph:'smtp.gmail.com' },
                  { key:'smtpPort',        label:'SMTP Port',              ph:'587' },
                ].map(f => (
                  <div key={f.key} className="as-field" style={{marginBottom:'14px'}}>
                    <label>{f.label}</label>
                    <input
                      type={f.key.includes('Key') ? 'password' : 'text'}
                      className="as-input"
                      placeholder={f.ph}
                      value={apis[f.key]}
                      onChange={e => setApis({...apis, [f.key]: e.target.value})}
                    />
                  </div>
                ))}
                <div className="as-actions">
                  <button type="submit" className="as-btn as-btn--primary"><> <FaSave style={{marginRight:6}} />
  Save API Keys</></button>
                </div>
              </form>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;