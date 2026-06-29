import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminNavbar  from '../../components/AdminNavbar/AdminNavbar';
import './AdminFeedback.css';
import {
  FaComments, FaRegBell, FaCheckCircle, FaStar, FaRegStar,
  FaSearch, FaTimes, FaTrash, FaReply, FaEnvelope,
  FaEdit, FaArrowLeft, FaUniversity, FaPassport,
  FaMoneyBillWave, FaBug, FaLightbulb, FaTools,
  FaRegCommentDots, FaPaperPlane,
} from 'react-icons/fa';
import { MdFiberNew } from 'react-icons/md';

/* ── Mock feedback data ── */
const mockFeedback = [
  {
    id: 1,
    name: 'Ahmed Khan',
    email: 'ahmed@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Ahmed',
    category: 'general',
    subject: 'Great platform overall!',
    message: 'EMA Study Gate has been extremely helpful for my study abroad journey. The visa guidance section is very detailed and accurate. Would love to see more universities from Germany added.',
    rating: 5,
    date: 'Apr 6, 2026',
    status: 'new',
    reply: '',
  },
  {
    id: 2,
    name: 'Sara Malik',
    email: 'sara@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Sara',
    category: 'university',
    subject: 'University search filters not working properly',
    message: 'When I filter by field of study "Medicine", some results show unrelated programs. Please fix the filtering accuracy for better results.',
    rating: 3,
    date: 'Apr 5, 2026',
    status: 'new',
    reply: '',
  },
  {
    id: 3,
    name: 'Bilal Hussain',
    email: 'bilal@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Bilal',
    category: 'scholarship',
    subject: 'Chevening deadline information outdated',
    message: 'The Chevening Scholarship deadline shown on the platform is Nov 5, 2025 but the official website shows Nov 12, 2025. Please update scholarship deadlines regularly.',
    rating: 4,
    date: 'Apr 4, 2026',
    status: 'resolved',
    reply: 'Thank you for pointing this out. We have updated the Chevening deadline to reflect the correct date. We appreciate your vigilance!',
  },
  {
    id: 4,
    name: 'Hina Waqar',
    email: 'hina@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Hina',
    category: 'visa',
    subject: 'Add more countries to visa guidance',
    message: 'The visa guidance section only covers 4 countries. Please add Sweden, Norway, and New Zealand as they are popular study destinations for Pakistani students.',
    rating: 4,
    date: 'Apr 3, 2026',
    status: 'in-progress',
    reply: '',
  },
  {
    id: 5,
    name: 'Fatima Zahra',
    email: 'fatima@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Fatima',
    category: 'bug',
    subject: 'Document upload failing for PDF files above 3MB',
    message: 'I tried uploading my transcript (4.2MB PDF) and it keeps failing even though the limit says 5MB. The error message is not very clear either.',
    rating: 2,
    date: 'Apr 2, 2026',
    status: 'new',
    reply: '',
  },
  {
    id: 6,
    name: 'Omar Abdullah',
    email: 'omar@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Omar',
    category: 'suggestion',
    subject: 'Add a comparison feature for scholarships',
    message: 'It would be great to compare two or three scholarships side by side just like the university comparison feature. This would help students decide which scholarship to prioritize.',
    rating: 5,
    date: 'Apr 1, 2026',
    status: 'resolved',
    reply: 'Great suggestion! We have added this to our development roadmap for the next release.',
  },
  {
    id: 7,
    name: 'Nadia Siddiqui',
    email: 'nadia@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Nadia',
    category: 'general',
    subject: 'AI chatbot response quality',
    message: 'The chatbot is helpful for basic questions but sometimes gives generic answers. It would be better if it could give country-specific advice based on my profile.',
    rating: 3,
    date: 'Mar 30, 2026',
    status: 'in-progress',
    reply: '',
  },
  {
    id: 8,
    name: 'Anonymous',
    email: '',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=anon',
    category: 'technical',
    subject: 'Login page takes too long to load',
    message: 'The login page sometimes takes 5-7 seconds to load on mobile networks. Please optimize the loading speed.',
    rating: 2,
    date: 'Mar 28, 2026',
    status: 'new',
    reply: '',
  },
];

const categoryConfig = {
  general:     { label: 'General',         color: '#4a86d4', bg: '#eef4ff', icon: <FaRegCommentDots /> },
  university:  { label: 'University',      color: '#8e44ad', bg: '#f3eeff', icon: <FaUniversity />     },
  scholarship: { label: 'Scholarship',     color: '#27ae60', bg: '#e8f8ef', icon: <FaMoneyBillWave />  },
  visa:        { label: 'Visa',            color: '#d35400', bg: '#fef0e6', icon: <FaPassport />       },
  bug:         { label: 'Bug Report',      color: '#e74c3c', bg: '#fdecea', icon: <FaBug />            },
  suggestion:  { label: 'Feature Request', color: '#f39c12', bg: '#fff4e6', icon: <FaLightbulb />      },
  technical:   { label: 'Technical',       color: '#5a7a9a', bg: '#f0f4fb', icon: <FaTools />          },
};

const statusConfig = {
  'new':         { label: 'New',         color: '#2d5fa6', bg: '#eef4ff' },
  'in-progress': { label: 'In Progress', color: '#f39c12', bg: '#fff4e6' },
  'resolved':    { label: 'Resolved',    color: '#27ae60', bg: '#e8f8ef' },
};

/* Star rating renderer using react-icons */
const StarRating = ({ rating }) => (
  <span style={{ display: 'inline-flex', gap: '2px' }}>
    {[1, 2, 3, 4, 5].map(n =>
      n <= rating
        ? <FaStar key={n} color="#f39c12" />
        : <FaRegStar key={n} color="#ccc" />
    )}
  </span>
);

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks]         = useState(mockFeedback);
  const [search, setSearch]               = useState('');
  const [catFilter, setCatFilter]         = useState('all');
  const [statusFilter, setStatusFilter]   = useState('all');
  const [selected, setSelected]           = useState(null);
  const [replyText, setReplyText]         = useState('');
  const [replySent, setReplySent]         = useState(false);

  /* ── Computed stats ── */
  const total     = feedbacks.length;
  const newCount  = feedbacks.filter(f => f.status === 'new').length;
  const resolved  = feedbacks.filter(f => f.status === 'resolved').length;
  const avgRating = (feedbacks.reduce((s, f) => s + f.rating, 0) / total).toFixed(1);

  /* ── Filtered ── */
  const filtered = feedbacks.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
                        f.subject.toLowerCase().includes(search.toLowerCase()) ||
                        f.message.toLowerCase().includes(search.toLowerCase());
    const matchCat    = catFilter    === 'all' || f.category === catFilter;
    const matchStatus = statusFilter === 'all' || f.status   === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  /* ── Handlers ── */
  const updateStatus = (id, status) => {
    setFeedbacks(prev => prev.map(f => f.id === id ? { ...f, status } : f));
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
  };

  const sendReply = () => {
    if (!replyText.trim()) return;
    setFeedbacks(prev => prev.map(f =>
      f.id === selected.id ? { ...f, reply: replyText.trim(), status: 'resolved' } : f
    ));
    setSelected(prev => ({ ...prev, reply: replyText.trim(), status: 'resolved' }));
    setReplySent(true);
    setTimeout(() => setReplySent(false), 2500);
    setReplyText('');
  };

  const deleteFeedback = (id) => {
    setFeedbacks(prev => prev.filter(f => f.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const summaryStats = [
    { icon: <FaComments />,  label: 'Total Feedback', val: total,     color: 'blue'   },
    { icon: <MdFiberNew />,  label: 'New / Unread',   val: newCount,  color: 'orange' },
    { icon: <FaCheckCircle />, label: 'Resolved',     val: resolved,  color: 'green'  },
    { icon: <FaStar />,      label: 'Avg Rating',     val: avgRating, color: 'yellow' },
  ];

  return (
    <div className="af-root">
      <AdminSidebar />
      <div className="af-content">
        <AdminNavbar title="— Feedback Management" />

        <main className="af-main">

          {/* ── Header ── */}
          <div className="af-header">
            <div>
              <h1 className="af-header__title">Student Feedback</h1>
              <p className="af-header__sub">View and respond to all feedback submitted by students (UC_17)</p>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="af-stats">
            {summaryStats.map(s => (
              <div key={s.label} className={`af-stat af-stat--${s.color}`}>
                <span className="af-stat__icon">{s.icon}</span>
                <div>
                  <p className="af-stat__val">{s.val}</p>
                  <p className="af-stat__label">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Controls ── */}
          <div className="af-controls">
            <div className="af-search">
              <FaSearch />
              <input
                placeholder="Search feedback..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="af-search__clear" onClick={() => setSearch('')}>
                  <FaTimes />
                </button>
              )}
            </div>
            <div className="af-filters">
              <select value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                <option value="all">All Categories</option>
                {Object.entries(categoryConfig).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* ── Two-column layout ── */}
          <div className="af-layout">

            {/* ── Feedback List ── */}
            <div className="af-list-panel">
              <p className="af-list-panel__count">
                Showing <strong>{filtered.length}</strong> of {total} submissions
              </p>

              {filtered.length === 0 ? (
                <div className="af-empty">
                  <FaComments style={{ fontSize: '2rem', opacity: 0.4 }} />
                  <p>No feedback found matching your filters.</p>
                </div>
              ) : (
                filtered.map(f => {
                  const cat = categoryConfig[f.category] || categoryConfig.general;
                  const sts = statusConfig[f.status];
                  return (
                    <div
                      key={f.id}
                      className={`af-card${selected?.id === f.id ? ' af-card--active' : ''}${f.status === 'new' ? ' af-card--new' : ''}`}
                      onClick={() => { setSelected(f); setReplyText(f.reply || ''); }}
                    >
                      {f.status === 'new' && <div className="af-card__dot" />}

                      <div className="af-card__top">
                        <img src={f.avatar} alt={f.name} className="af-avatar" />
                        <div className="af-card__meta">
                          <p className="af-card__name">{f.name}</p>
                          <p className="af-card__date">{f.date}</p>
                        </div>
                        <div className="af-card__badges">
                          <span className="af-badge" style={{ background: cat.bg, color: cat.color }}>
                            <span style={{ marginRight: 4 }}>{cat.icon}</span>{cat.label}
                          </span>
                          <span className="af-badge" style={{ background: sts.bg, color: sts.color }}>
                            {sts.label}
                          </span>
                        </div>
                      </div>

                      <p className="af-card__subject">{f.subject}</p>
                      <p className="af-card__preview">
                        {f.message.length > 90 ? f.message.slice(0, 90) + '...' : f.message}
                      </p>

                      <div className="af-card__footer">
                        <span className="af-card__stars" title={`${f.rating}/5`}>
                          <StarRating rating={f.rating} />
                        </span>
                        {f.reply && (
                          <span className="af-card__replied">
                            <FaEnvelope style={{ marginRight: 4 }} /> Replied
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* ── Detail Panel ── */}
            <div className="af-detail-panel">
              {!selected ? (
                <div className="af-detail-empty">
                  <FaArrowLeft style={{ fontSize: '2rem', opacity: 0.35 }} />
                  <p>Select a feedback item to view details and reply</p>
                </div>
              ) : (
                <div className="af-detail">

                  {/* Header */}
                  <div className="af-detail__header">
                    <div className="af-detail__user">
                      <img src={selected.avatar} alt={selected.name} className="af-detail__avatar" />
                      <div>
                        <h3 className="af-detail__name">{selected.name}</h3>
                        {selected.email && (
                          <p className="af-detail__email">
                            <FaEnvelope style={{ marginRight: 5, opacity: 0.6 }} />{selected.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="af-detail__header-right">
                      <span
                        className="af-badge"
                        style={{
                          background: categoryConfig[selected.category]?.bg,
                          color: categoryConfig[selected.category]?.color,
                        }}
                      >
                        <span style={{ marginRight: 4 }}>{categoryConfig[selected.category]?.icon}</span>
                        {categoryConfig[selected.category]?.label}
                      </span>
                      <p className="af-detail__date">{selected.date}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="af-detail__rating">
                    <span className="af-detail__stars">
                      <StarRating rating={selected.rating} />
                    </span>
                    <span className="af-detail__rating-num">{selected.rating}/5</span>
                  </div>

                  {/* Subject + Message */}
                  <h4 className="af-detail__subject">{selected.subject}</h4>
                  <p className="af-detail__message">{selected.message}</p>

                  {/* Previous reply */}
                  {selected.reply && (
                    <div className="af-detail__prev-reply">
                      <p className="af-detail__prev-reply-label">
                        <FaReply style={{ marginRight: 5 }} /> Admin Reply:
                      </p>
                      <p className="af-detail__prev-reply-text">{selected.reply}</p>
                    </div>
                  )}

                  {/* Status actions */}
                  <div className="af-detail__status-row">
                    <span className="af-detail__status-label">Status:</span>
                    <div className="af-detail__status-btns">
                      {['new', 'in-progress', 'resolved'].map(s => (
                        <button
                          key={s}
                          className={`af-status-btn${selected.status === s ? ' af-status-btn--active' : ''}`}
                          style={
                            selected.status === s
                              ? { background: statusConfig[s].bg, color: statusConfig[s].color, borderColor: statusConfig[s].color }
                              : {}
                          }
                          onClick={() => updateStatus(selected.id, s)}
                        >
                          {statusConfig[s].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reply box */}
                  <div className="af-reply-box">
                    <label className="af-reply-box__label">
                      {selected.reply
                        ? <><FaEdit style={{ marginRight: 5 }} /> Update Reply</>
                        : <><FaEnvelope style={{ marginRight: 5 }} /> Write Reply</>
                      }
                    </label>
                    <textarea
                      className="af-reply-box__input"
                      placeholder="Write your reply to the student..."
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      rows={4}
                    />
                    {replySent && (
                      <div className="af-reply-box__success">
                        <FaCheckCircle style={{ marginRight: 6, color: '#27ae60' }} />
                        Reply sent and status marked as Resolved!
                      </div>
                    )}
                    <div className="af-reply-box__actions">
                      <button
                        className="af-btn af-btn--danger"
                        onClick={() => deleteFeedback(selected.id)}
                      >
                        <FaTrash style={{ marginRight: 5 }} /> Delete
                      </button>
                      <button
                        className="af-btn af-btn--primary"
                        onClick={sendReply}
                        disabled={!replyText.trim()}
                      >
                        <FaPaperPlane style={{ marginRight: 5 }} /> Send Reply
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminFeedback;