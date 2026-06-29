import React, { useState } from 'react';
import NavbarDashboard from '../../components/dashboard/NavbarDashboard';
import Sidebar from '../../components/dashboard/Sidebar';
import './UserScholarship.css';

import {
  BadgeDollarSign,
  Search,
  Bookmark,
  BookmarkCheck,
  X,
  CheckCircle,
  Tag,
} from 'lucide-react';

const scholarships = [
  { id: 1, name: 'Chevening Scholarship',   country: 'UK',        flag: '🇬🇧', amount: 'Full Funding',  deadline: 'Nov 5, 2025',  field: 'All Fields', level: "Master's",        eligibility: 'Work experience required', type: 'Government', tag: 'Fully Funded' },
  { id: 2, name: 'Fulbright Program',        country: 'USA',       flag: '🇺🇸', amount: 'Full Funding',  deadline: 'Oct 15, 2025', field: 'All Fields', level: "Master's / PhD",  eligibility: 'Pakistani nationals',      type: 'Government', tag: 'Fully Funded' },
  { id: 3, name: 'DAAD Scholarship',         country: 'Germany',   flag: '🇩🇪', amount: '€861/month',   deadline: 'Oct 31, 2025', field: 'All Fields', level: "Master's / PhD",  eligibility: 'GPA 3.0+',                 type: 'Government', tag: 'Prestigious'  },
  { id: 4, name: 'Australia Awards',         country: 'Australia', flag: '🇦🇺', amount: 'Full Funding',  deadline: 'Apr 30, 2026', field: 'All Fields', level: "Master's",        eligibility: 'Developing countries',     type: 'Government', tag: 'Fully Funded' },
  { id: 5, name: 'Commonwealth Scholarship', country: 'UK',        flag: '🇬🇧', amount: 'Full Funding',  deadline: 'Dec 16, 2025', field: 'All Fields', level: "Master's / PhD",  eligibility: 'Commonwealth nations',     type: 'Government', tag: 'Fully Funded' },
  { id: 6, name: 'HEC Overseas Scholarship', country: 'Pakistan',  flag: '🇵🇰', amount: 'Full Funding',  deadline: 'Open',         field: 'STEM',       level: 'PhD',             eligibility: 'Pakistani citizens',       type: 'Government', tag: 'Local'        },
  { id: 7, name: 'Erasmus Mundus',           country: 'Europe',    flag: '🇪🇺', amount: '€1,400/month', deadline: 'Jan 15, 2026', field: 'Various',    level: "Master's",        eligibility: 'Open internationally',     type: 'EU',         tag: 'Prestigious'  },
  { id: 8, name: 'Gates Cambridge Scholarship', country: 'UK',     flag: '🇬🇧', amount: 'Full Funding',  deadline: 'Oct 14, 2025', field: 'All Fields', level: "Master's / PhD",  eligibility: 'Academic excellence',      type: 'University', tag: 'Elite'        },
];

const levels    = ['All Levels', "Master's", 'PhD', "Bachelor's"];
const types     = ['All Types', 'Government', 'University', 'EU'];
const tagColors = { 'Fully Funded': 'green', 'Prestigious': 'blue', 'Local': 'orange', 'Elite': 'purple' };

const UserScholarship = () => {
  const [search, setSearch]           = useState('');
  const [level, setLevel]             = useState('All Levels');
  const [type, setType]               = useState('All Types');
  const [bookmarks, setBookmarks]     = useState([]);
  const [detailModal, setDetailModal] = useState(null);

  const toggleBookmark = (id) =>
    setBookmarks(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const filtered = scholarships.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.country.toLowerCase().includes(search.toLowerCase());
    const matchLevel  = level === 'All Levels' || s.level.includes(level);
    const matchType   = type  === 'All Types'  || s.type === type;
    return matchSearch && matchLevel && matchType;
  });

  const isSaved = (id) => bookmarks.includes(id);

  return (
    <div className="sc-root">
      <NavbarDashboard />
      <div className="sc-body">
        <Sidebar />
        <main className="sc-main">

          {/* Header */}
          <div className="sc-header">
            <div>
              <h1 className="sc-header__title">Scholarships</h1>
              <p className="sc-header__sub">Discover and save scholarships to fund your education abroad</p>
            </div>
            <div className="sc-header__stat">
              <BadgeDollarSign size={22} />
              <div>
                <p className="sc-header__stat-num">{scholarships.length}</p>
                <p className="sc-header__stat-label">Available</p>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="sc-controls">
            <div className="sc-search">
              <Search size={15} />
              <input
                placeholder="Search scholarships or countries..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="sc-filters">
              <select value={level} onChange={e => setLevel(e.target.value)}>
                {levels.map(l => <option key={l}>{l}</option>)}
              </select>
              <select value={type} onChange={e => setType(e.target.value)}>
                {types.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <p className="sc-results-count">
            Showing <strong>{filtered.length}</strong> scholarships
            {bookmarks.length > 0 && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                {' · '}<Bookmark size={13} /> {bookmarks.length} saved
              </span>
            )}
          </p>

          {/* Cards */}
          {filtered.length === 0 ? (
            <div className="sc-empty">
              <BadgeDollarSign size={40} />
              <p>No scholarships found. Try different filters.</p>
            </div>
          ) : (
            <div className="sc-grid">
              {filtered.map(s => (
                <div key={s.id} className="sc-card">
                  <div className="sc-card__top">
                    <span className="sc-card__flag">{s.flag}</span>
                    <span className={`sc-tag sc-tag--${tagColors[s.tag] || 'blue'}`}>{s.tag}</span>
                    <button
                      className={`sc-bookmark-btn${isSaved(s.id) ? ' sc-bookmark-btn--active' : ''}`}
                      onClick={() => toggleBookmark(s.id)}
                    >
                      {isSaved(s.id)
                        ? <BookmarkCheck size={17} />
                        : <Bookmark size={17} />
                      }
                    </button>
                  </div>

                  <h3 className="sc-card__name">{s.name}</h3>
                  <p className="sc-card__country">{s.flag} {s.country} · {s.type}</p>

                  <div className="sc-card__info-grid">
                    <div className="sc-card__info-item">
                      <span className="sc-card__info-label">Amount</span>
                      <span className="sc-card__info-val sc-card__info-val--amount">{s.amount}</span>
                    </div>
                    <div className="sc-card__info-item">
                      <span className="sc-card__info-label">Level</span>
                      <span className="sc-card__info-val">{s.level}</span>
                    </div>
                    <div className="sc-card__info-item">
                      <span className="sc-card__info-label">Field</span>
                      <span className="sc-card__info-val">{s.field}</span>
                    </div>
                    <div className="sc-card__info-item">
                      <span className="sc-card__info-label">Deadline</span>
                      <span className={`sc-card__info-val${s.deadline !== 'Open' ? ' sc-card__info-val--deadline' : ''}`}>
                        {s.deadline}
                      </span>
                    </div>
                  </div>

                  <p className="sc-card__eligibility">
                    <CheckCircle size={14} style={{ marginRight: 5, flexShrink: 0 }} />
                    {s.eligibility}
                  </p>

                  <div className="sc-card__actions">
                    <button className="sc-btn sc-btn--primary" onClick={() => setDetailModal(s)}>
                      View Details
                    </button>
                    <button
                      className={`sc-btn sc-btn--outline${isSaved(s.id) ? ' sc-btn--saved' : ''}`}
                      onClick={() => toggleBookmark(s.id)}
                    >
                      {isSaved(s.id)
                        ? <><BookmarkCheck size={14} style={{ marginRight: 5 }} />Saved</>
                        : <><Tag size={14} style={{ marginRight: 5 }} />Save</>
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Detail Modal */}
      {detailModal && (
        <div className="sc-modal-overlay" onClick={() => setDetailModal(null)}>
          <div className="sc-modal" onClick={e => e.stopPropagation()}>
            <div className="sc-modal__header">
              <div>
                <h2>{detailModal.flag} {detailModal.name}</h2>
                <p>{detailModal.country} · {detailModal.type}</p>
              </div>
              <button className="sc-modal__close" onClick={() => setDetailModal(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="sc-modal__body">
              <div className="sc-modal__grid">
                {[
                  { l: 'Award Amount',   v: detailModal.amount   },
                  { l: 'Degree Level',   v: detailModal.level    },
                  { l: 'Field of Study', v: detailModal.field    },
                  { l: 'Deadline',       v: detailModal.deadline },
                ].map(i => (
                  <div key={i.l} className="sc-modal__stat">
                    <p className="sc-modal__stat-label">{i.l}</p>
                    <p className="sc-modal__stat-val">{i.v}</p>
                  </div>
                ))}
              </div>
              <div className="sc-modal__section">
                <h4>Eligibility</h4>
                <ul className="sc-modal__list">
                  <li>{detailModal.eligibility}</li>
                  <li>Minimum GPA: 3.0 or equivalent</li>
                  <li>IELTS 6.5+ or equivalent language test</li>
                  <li>Two reference letters</li>
                  <li>Personal statement / SOP</li>
                </ul>
              </div>
              <div className="sc-modal__section">
                <h4>How to Apply</h4>
                <ol className="sc-modal__list">
                  <li>Check official scholarship website for latest requirements</li>
                  <li>Prepare all required documents</li>
                  <li>Submit online application before the deadline</li>
                  <li>Await shortlisting and interview invitation</li>
                </ol>
              </div>
            </div>
            <div className="sc-modal__footer">
              <button className="sc-btn sc-btn--outline" onClick={() => setDetailModal(null)}>
                Close
              </button>
              <button
                className="sc-btn sc-btn--primary"
                onClick={() => { toggleBookmark(detailModal.id); setDetailModal(null); }}
              >
                {isSaved(detailModal.id)
                  ? <><BookmarkCheck size={14} style={{ marginRight: 6 }} />Saved</>
                  : <><Tag size={14} style={{ marginRight: 6 }} />Save Scholarship</>
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserScholarship;