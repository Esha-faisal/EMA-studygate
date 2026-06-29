import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminNavbar  from '../../components/AdminNavbar/AdminNavbar';
import './AdminReports.css';
import {
  FaUsers, FaUniversity, FaMoneyBillWave, FaBell,
  FaFileAlt, FaComments, FaGlobe, FaChartBar,
  FaDownload, FaFileCsv, FaFilePdf, FaCheckCircle,
  FaTrophy, FaEye, FaBookmark, FaClipboardList,
  FaBolt, FaChartLine,
} from 'react-icons/fa';
import { MdSchool, MdBarChart } from 'react-icons/md';

/* ── Mock Data ── */
const monthlyUsers = [
  { month:'Jan', students:120,  universities:8,  scholarships:3  },
  { month:'Feb', students:185,  universities:5,  scholarships:2  },
  { month:'Mar', students:240,  universities:10, scholarships:5  },
  { month:'Apr', students:310,  universities:7,  scholarships:4  },
  { month:'May', students:420,  universities:12, scholarships:6  },
  { month:'Jun', students:580,  universities:9,  scholarships:3  },
  { month:'Jul', students:650,  universities:14, scholarships:7  },
  { month:'Aug', students:720,  universities:11, scholarships:5  },
  { month:'Sep', students:850,  universities:8,  scholarships:4  },
  { month:'Oct', students:920,  universities:15, scholarships:8  },
  { month:'Nov', students:980,  universities:10, scholarships:6  },
  { month:'Dec', students:1050, universities:12, scholarships:9  },
];

const topCountries = [
  { country:'Canada',      flag:'🇨🇦', searches:1842, pct:32 },
  { country:'UK',          flag:'🇬🇧', searches:1256, pct:22 },
  { country:'Australia',   flag:'🇦🇺', searches:987,  pct:17 },
  { country:'Germany',     flag:'🇩🇪', searches:756,  pct:13 },
  { country:'USA',         flag:'🇺🇸', searches:643,  pct:11 },
  { country:'Netherlands', flag:'🇳🇱', searches:298,  pct:5  },
];

const topScholarships = [
  { name:'Chevening Scholarship', views:3420, bookmarks:892 },
  { name:'Fulbright Program',      views:2980, bookmarks:741 },
  { name:'DAAD Scholarship',       views:2340, bookmarks:623 },
  { name:'Australia Awards',       views:1890, bookmarks:498 },
  { name:'HEC Overseas',           views:1560, bookmarks:412 },
];

const recentExports = [
  { name:'Student Report - April 2026',    date:'Apr 6, 2026',  type:'PDF' },
  { name:'University Analytics - Q1 2026', date:'Apr 1, 2026',  type:'CSV' },
  { name:'Scholarship Views - Mar 2026',   date:'Mar 31, 2026', type:'PDF' },
];

const AdminReports = () => {
  const [activeChart, setActiveChart] = useState('students');
  const [period, setPeriod]           = useState('yearly');
  const [exported, setExported]       = useState(false);

  const maxVal = Math.max(...monthlyUsers.map(m => m[activeChart]));

  const handleExport = (type) => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  const summaryStats = [
    { icon:<FaUsers />,        label:'Total Students',      val:'8', change:'+18%', sub:'vs last month',  color:'blue'   },
    { icon:<FaUniversity />,   label:'Universities Listed', val:'20',   change:'+3',   sub:'new this month', color:'green'  },
    { icon:<FaMoneyBillWave />,label:'Scholarships Active', val:'30',    change:'+5',   sub:'new this month', color:'orange' },
    { icon:<FaBell />,         label:'Notifications Sent',  val:'3', change:'+28%', sub:'this month',     color:'purple' },
    { icon:<FaFileAlt />,      label:'Docs Uploaded',       val:'7', change:'+12%', sub:'total',          color:'teal'   },
    { icon:<FaComments />,     label:'Forum Posts',         val:'8',   change:'+34%', sub:'this month',     color:'pink'   },
  ];

  return (
    <div className="ar-root">
      <AdminSidebar />
      <div className="ar-content">
        <AdminNavbar title="— Reports & Analytics" />

        <main className="ar-main">

          {/* Header */}
          <div className="ar-header">
            <div>
              <h1 className="ar-header__title">Reports &amp; Analytics</h1>
              <p className="ar-header__sub">System monitoring, usage statistics and performance insights</p>
            </div>
            <div className="ar-header__actions">
              {exported && (
                <span className="ar-export-success">
                  <FaCheckCircle style={{ marginRight:5, color:'#27ae60' }} /> Report exported!
                </span>
              )}
              <button className="ar-btn ar-btn--outline" onClick={() => handleExport('CSV')}>
                <FaFileCsv style={{ marginRight:5 }} /> Export CSV
              </button>
              <button className="ar-btn ar-btn--primary" onClick={() => handleExport('PDF')}>
                <FaFilePdf style={{ marginRight:5 }} /> Export PDF
              </button>
            </div>
          </div>

          {/* ── Summary Stats ── */}
          <div className="ar-stats-grid">
            {summaryStats.map(s => (
              <div key={s.label} className={`ar-stat ar-stat--${s.color}`}>
                <div className="ar-stat__top">
                  <span className="ar-stat__icon">{s.icon}</span>
                  <span className="ar-stat__change">↑ {s.change}</span>
                </div>
                <p className="ar-stat__val">{s.val}</p>
                <p className="ar-stat__label">{s.label}</p>
                <p className="ar-stat__sub">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* ── Growth Chart ── */}
          <div className="ar-card">
            <div className="ar-card__header">
              <h3><FaChartLine style={{ marginRight:6 }} /> Platform Growth</h3>
              <div className="ar-chart-controls">
                <div className="ar-chart-tabs">
                  {[
                    { key:'students',     label:'Students'     },
                    { key:'universities', label:'Universities' },
                    { key:'scholarships', label:'Scholarships' },
                  ].map(t => (
                    <button
                      key={t.key}
                      className={`ar-chart-tab${activeChart === t.key ? ' ar-chart-tab--active' : ''}`}
                      onClick={() => setActiveChart(t.key)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <select className="ar-select" value={period} onChange={e => setPeriod(e.target.value)}>
                  <option value="yearly">This Year</option>
                  <option value="quarterly">Last Quarter</option>
                  <option value="monthly">This Month</option>
                </select>
              </div>
            </div>

            <div className="ar-chart">
              <div className="ar-chart__bars">
                {monthlyUsers.map((m, i) => (
                  <div key={i} className="ar-chart__bar-col">
                    <span className="ar-chart__bar-val">{m[activeChart]}</span>
                    <div
                      className="ar-chart__bar"
                      style={{ height:`${Math.max((m[activeChart] / maxVal) * 180, 6)}px` }}
                      title={`${m.month}: ${m[activeChart]}`}
                    />
                    <span className="ar-chart__bar-label">{m.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart summary row */}
            <div className="ar-chart__summary">
              {[
                { label:'Total This Year', val: monthlyUsers.reduce((s,m) => s + m[activeChart], 0).toLocaleString() },
                { label:'Monthly Average',  val: Math.round(monthlyUsers.reduce((s,m) => s + m[activeChart], 0) / 12).toLocaleString() },
                { label:'Peak Month',       val: monthlyUsers.reduce((a,b) => a[activeChart] > b[activeChart] ? a : b).month },
                { label:'Growth Rate',      val: '+' + Math.round(((monthlyUsers[11][activeChart] - monthlyUsers[0][activeChart]) / monthlyUsers[0][activeChart]) * 100) + '%' },
              ].map(s => (
                <div key={s.label} className="ar-chart__summary-item">
                  <p className="ar-chart__summary-val">{s.val}</p>
                  <p className="ar-chart__summary-label">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Row 2: Countries + Scholarships ── */}
          <div className="ar-row">

            {/* Top Destination Countries */}
            <div className="ar-card">
              <div className="ar-card__header">
                <h3><FaGlobe style={{ marginRight:6 }} /> Top Study Destinations</h3>
                <span className="ar-card__sub">By search frequency</span>
              </div>
              <div className="ar-country-list">
                {topCountries.map((c, i) => (
                  <div key={i} className="ar-country-item">
                    <span className="ar-country-item__rank">#{i + 1}</span>
                    <span className="ar-country-item__flag">{c.flag}</span>
                    <div className="ar-country-item__info">
                      <div className="ar-country-item__top">
                        <span className="ar-country-item__name">{c.country}</span>
                        <span className="ar-country-item__count">{c.searches.toLocaleString()} searches</span>
                      </div>
                      <div className="ar-bar-wrap">
                        <div className="ar-bar-fill" style={{ width:`${c.pct}%` }} />
                      </div>
                    </div>
                    <span className="ar-country-item__pct">{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Scholarships */}
            <div className="ar-card">
              <div className="ar-card__header">
                <h3><FaTrophy style={{ marginRight:6, color:'#f39c12' }} /> Top Scholarships</h3>
                <span className="ar-card__sub">By views &amp; bookmarks</span>
              </div>
              <div className="ar-sch-list">
                {topScholarships.map((s, i) => (
                  <div key={i} className="ar-sch-item">
                    <span className="ar-sch-item__rank">#{i + 1}</span>
                    <div className="ar-sch-item__info">
                      <p className="ar-sch-item__name">{s.name}</p>
                      <div className="ar-sch-item__stats">
                        <span><FaEye style={{ marginRight:4 }} />{s.views.toLocaleString()} views</span>
                        <span><FaBookmark style={{ marginRight:4 }} />{s.bookmarks.toLocaleString()} bookmarks</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Row 3: User Activity + Recent Exports ── */}
          <div className="ar-row">

            {/* User Activity Breakdown */}
            <div className="ar-card">
              <div className="ar-card__header">
                <h3><FaUsers style={{ marginRight:6 }} /> User Activity Breakdown</h3>
              </div>
              <div className="ar-activity-breakdown">
                {[
                  { label:'Active Students',      val:'7', pct:79, color:'#4a86d4' },
                  { label:'Pending Verification', val:'6',   pct:13, color:'#f39c12' },
                  { label:'Banned Accounts',      val:'0',   pct:8,  color:'#e74c3c' },
                ].map(a => (
                  <div key={a.label} className="ar-breakdown-item">
                    <div className="ar-breakdown-item__top">
                      <span className="ar-breakdown-item__label">{a.label}</span>
                      <span className="ar-breakdown-item__val">{a.val}</span>
                    </div>
                    <div className="ar-breakdown-item__bar">
                      <div className="ar-breakdown-item__fill" style={{ width:`${a.pct}%`, background:a.color }} />
                    </div>
                    <span className="ar-breakdown-item__pct">{a.pct}%</span>
                  </div>
                ))}
              </div>

              <div className="ar-card__divider" />

              <div className="ar-card__header" style={{ marginTop:'8px' }}>
                <h3><FaClipboardList style={{ marginRight:6 }} /> Document Status</h3>
              </div>
              <div className="ar-activity-breakdown">
                {[
                  { label:'Verified Documents', val:'7', pct:78, color:'#27ae60' },
                  { label:'Pending Review',      val:'6',   pct:17, color:'#f39c12' },
                  { label:'Rejected',            val:'0',   pct:5,  color:'#e74c3c' },
                ].map(a => (
                  <div key={a.label} className="ar-breakdown-item">
                    <div className="ar-breakdown-item__top">
                      <span className="ar-breakdown-item__label">{a.label}</span>
                      <span className="ar-breakdown-item__val">{a.val}</span>
                    </div>
                    <div className="ar-breakdown-item__bar">
                      <div className="ar-breakdown-item__fill" style={{ width:`${a.pct}%`, background:a.color }} />
                    </div>
                    <span className="ar-breakdown-item__pct">{a.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Exports */}
            <div className="ar-card">
              <div className="ar-card__header">
                <h3><FaDownload style={{ marginRight:6 }} /> Recent Exports</h3>
              </div>
              <div className="ar-export-list">
                {recentExports.map((e, i) => (
                  <div key={i} className="ar-export-item">
                    <span className="ar-export-item__icon">
                      {e.type === 'PDF' ? <FaFilePdf color="#e74c3c" /> : <FaFileCsv color="#27ae60" />}
                    </span>
                    <div className="ar-export-item__info">
                      <p className="ar-export-item__name">{e.name}</p>
                      <p className="ar-export-item__date">{e.date} · {e.type}</p>
                    </div>
                    <button className="ar-btn ar-btn--outline ar-btn--sm" onClick={() => handleExport(e.type)}>
                      <FaDownload style={{ marginRight:4 }} /> Download
                    </button>
                  </div>
                ))}
              </div>

              <div className="ar-card__divider" />

              {/* Quick export buttons */}
              <div className="ar-card__header" style={{ marginTop:'8px' }}>
                <h3><FaBolt style={{ marginRight:6, color:'#f39c12' }} /> Quick Export</h3>
              </div>
              <div className="ar-quick-exports">
                {[
                  'Student Report',
                  'University Stats',
                  'Scholarship Report',
                  'Notification Log',
                  'Feedback Summary',
                  'Full System Report',
                ].map(r => (
                  <button key={r} className="ar-quick-export-btn" onClick={() => handleExport('PDF')}>
                    <FaFileAlt style={{ marginRight:5 }} /> {r}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminReports;