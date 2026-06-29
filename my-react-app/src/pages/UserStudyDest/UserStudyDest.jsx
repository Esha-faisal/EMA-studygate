import React, { useState } from 'react';
import NavbarDashboard from '../../components/dashboard/NavbarDashboard';
import Sidebar from '../../components/dashboard/Sidebar';
import './UserStudyDest.css';
// react icons
import {
  FaBalanceScale,
  FaSearch,
  FaBookmark,
  FaTag,
  FaUniversity,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

const universities = [
  { id: 1, name: 'Technical University of Munich', country: 'Germany', flag: '🇩🇪', ranking: 37, tuition: '€500/sem', programs: ['Engineering', 'Sciences', 'IT'], deadline: 'May 31, 2026', type: 'Public', acceptance: '8%', link: 'https://www.tum.de/en/' },
  { id: 2, name: 'University of Stuttgart', country: 'Germany', flag: '🇩🇪', ranking: 381, tuition: '€1,500/sem', programs: ['Engineering', 'Architecture', 'Sciences'], deadline: 'May 15, 2026', type: 'Public', acceptance: '20%', link: 'https://www.uni-stuttgart.de/en/' },
  { id: 3, name: 'Technical University of Berlin', country: 'Germany', flag: '🇩🇪', ranking: 154, tuition: '€307/sem', programs: ['Engineering', 'Computer Science', 'Mathematics'], deadline: 'May 31, 2026', type: 'Public', acceptance: '15%', link: 'https://www.tu.berlin/en/' },
  { id: 4, name: 'Frankfurt University of Applied Sciences', country: 'Germany', flag: '🇩🇪', ranking: 800, tuition: '€300/sem', programs: ['Business', 'Engineering', 'IT'], deadline: 'Jul 15, 2026', type: 'Public', acceptance: '40%', link: 'https://www.frankfurt-university.de/en/' },
  { id: 5, name: 'University of Hamburg', country: 'Germany', flag: '🇩🇪', ranking: 237, tuition: '€500/sem', programs: ['Sciences', 'Arts', 'Business'], deadline: 'May 1, 2026', type: 'Public', acceptance: '30%', link: 'https://www.uni-hamburg.de/' },
  { id: 6, name: 'University of Ulm', country: 'Germany', flag: '🇩🇪', ranking: 351, tuition: '€623/sem', programs: ['Medicine', 'Engineering', 'Sciences'], deadline: 'May 31, 2026', type: 'Public', acceptance: '25%', link: 'https://www.uni-ulm.de/en/' },
  { id: 7, name: 'FAU Erlangen-Nürnberg', country: 'Germany', flag: '🇩🇪', ranking: 201, tuition: '€500/sem', programs: ['Engineering', 'Sciences', 'Business'], deadline: 'May 31, 2026', type: 'Public', acceptance: '20%', link: 'https://www.fau.eu' },
  { id: 8, name: 'University of Bournemouth', country: 'England', flag: '🇬🇧', ranking: 801, tuition: '£15,000', programs: ['Business', 'Arts', 'Computer Science'], deadline: 'Jun 30, 2026', type: 'Public', acceptance: '70%', link: 'https://www.bournemouth.ac.uk/' },
  { id: 9, name: 'University of Liverpool', country: 'England', flag: '🇬🇧', ranking: 176, tuition: '£22,000', programs: ['Medicine', 'Engineering', 'Sciences'], deadline: 'Jan 15, 2026', type: 'Public', acceptance: '55%', link: 'https://www.liverpool.ac.uk/' },
  { id: 10, name: 'University of Southampton', country: 'England', flag: '🇬🇧', ranking: 100, tuition: '£23,000', programs: ['Engineering', 'Computer Science', 'Sciences'], deadline: 'Jan 15, 2026', type: 'Public', acceptance: '45%', link: 'https://www.southampton.ac.uk/' },
  { id: 11, name: 'Brunel University London', country: 'England', flag: '🇬🇧', ranking: 601, tuition: '£19,000', programs: ['Engineering', 'Business', 'Arts'], deadline: 'Jun 30, 2026', type: 'Public', acceptance: '60%', link: 'https://www.brunel.ac.uk/' },
  { id: 12, name: 'Bradford University', country: 'England', flag: '🇬🇧', ranking: 801, tuition: '£16,000', programs: ['Engineering', 'Business', 'Sciences'], deadline: 'Jun 30, 2026', type: 'Public', acceptance: '65%', link: 'https://www.bradford.ac.uk/' },
  { id: 13, name: 'University of Lincoln', country: 'England', flag: '🇬🇧', ranking: 801, tuition: '£15,900', programs: ['Arts', 'Business', 'Sciences'], deadline: 'Jun 30, 2026', type: 'Public', acceptance: '68%', link: 'https://www.lincoln.ac.uk/' },
  { id: 14, name: 'Leeds Beckett University', country: 'England', flag: '🇬🇧', ranking: 1001, tuition: '£14,000', programs: ['Business', 'Arts', 'Engineering'], deadline: 'Jun 30, 2026', type: 'Public', acceptance: '72%', link: 'https://www.leedsbeckett.ac.uk/' },
  { id: 15, name: 'Oxford University', country: 'England', flag: '🇬🇧', ranking: 3, tuition: '£37,510', programs: ['Law', 'Medicine', 'Sciences'], deadline: 'Oct 15, 2025', type: 'Public', acceptance: '17%', link: 'https://www.ox.ac.uk/' },
  { id: 16, name: 'Cambridge University', country: 'England', flag: '🇬🇧', ranking: 2, tuition: '£35,000', programs: ['Engineering', 'Sciences', 'Law'], deadline: 'Oct 15, 2025', type: 'Public', acceptance: '21%', link: 'https://www.cam.ac.uk/' },
  { id: 17, name: 'University of Bologna', country: 'Italy', flag: '🇮🇹', ranking: 154, tuition: '€3,000', programs: ['Law', 'Medicine', 'Arts'], deadline: 'Apr 30, 2026', type: 'Public', acceptance: '55%', link: 'https://www.unibo.it/en' },
  { id: 18, name: 'University of Florence', country: 'Italy', flag: '🇮🇹', ranking: 401, tuition: '€2,500', programs: ['Arts', 'Sciences', 'Engineering'], deadline: 'Apr 30, 2026', type: 'Public', acceptance: '60%', link: 'https://apply.unifi.it/' },
  { id: 19, name: 'University of Pavia', country: 'Italy', flag: '🇮🇹', ranking: 401, tuition: '€2,800', programs: ['Medicine', 'Law', 'Sciences'], deadline: 'Apr 30, 2026', type: 'Public', acceptance: '58%', link: 'https://en.unipv.it/en' },
  { id: 20, name: 'University of Genoa', country: 'Italy', flag: '🇮🇹', ranking: 601, tuition: '€2,000', programs: ['Engineering', 'Sciences', 'Business'], deadline: 'Apr 30, 2026', type: 'Public', acceptance: '62%', link: 'https://unige.it/en' },
  { id: 21, name: 'University of Turin', country: 'Italy', flag: '🇮🇹', ranking: 301, tuition: '€2,500', programs: ['Law', 'Medicine', 'Arts'], deadline: 'Apr 30, 2026', type: 'Public', acceptance: '57%', link: 'https://en.unito.it/' },
  { id: 22, name: 'University of Milan', country: 'Italy', flag: '🇮🇹', ranking: 301, tuition: '€3,500', programs: ['Sciences', 'Arts', 'Medicine'], deadline: 'Apr 30, 2026', type: 'Public', acceptance: '50%', link: 'https://www.unimi.it/en' },
  { id: 23, name: 'Sapienza Università di Roma', country: 'Italy', flag: '🇮🇹', ranking: 201, tuition: '€2,000', programs: ['Engineering', 'Law', 'Medicine'], deadline: 'Apr 30, 2026', type: 'Public', acceptance: '52%', link: 'https://www.uniroma1.it/en/pagina-strutturale/home' },
  { id: 24, name: 'University of Helsinki', country: 'Finland', flag: '🇫🇮', ranking: 107, tuition: '€18,000', programs: ['Sciences', 'Medicine', 'Arts'], deadline: 'Jan 8, 2026', type: 'Public', acceptance: '10%', link: 'https://www.helsinki.fi/en' },
  { id: 25, name: 'Aalto University', country: 'Finland', flag: '🇫🇮', ranking: 115, tuition: '€15,000', programs: ['Engineering', 'Business', 'Arts'], deadline: 'Jan 20, 2026', type: 'Public', acceptance: '15%', link: 'https://www.aalto.fi/en' },
  { id: 26, name: 'University of Turku', country: 'Finland', flag: '🇫🇮', ranking: 350, tuition: '€12,000', programs: ['Medicine', 'Sciences', 'Arts'], deadline: 'Jan 8, 2026', type: 'Public', acceptance: '20%', link: 'https://www.utu.fi/en' },
  { id: 27, name: 'University of Oulu', country: 'Finland', flag: '🇫🇮', ranking: 401, tuition: '€10,000', programs: ['Engineering', 'Sciences', 'IT'], deadline: 'Jan 20, 2026', type: 'Public', acceptance: '25%', link: 'https://www.oulu.fi/en' },
  { id: 28, name: 'Tampere University', country: 'Finland', flag: '🇫🇮', ranking: 301, tuition: '€12,000', programs: ['Engineering', 'Sciences', 'Medicine'], deadline: 'Jan 20, 2026', type: 'Public', acceptance: '18%', link: 'https://www.tuni.fi/en' },
  { id: 29, name: 'University of Jyväskylä', country: 'Finland', flag: '🇫🇮', ranking: 601, tuition: '€10,000', programs: ['Sciences', 'Business', 'Arts'], deadline: 'Jan 8, 2026', type: 'Public', acceptance: '30%', link: 'https://www.jyu.fi/en' },
  { id: 30, name: 'University of Eastern Finland (UEF)', country: 'Finland', flag: '🇫🇮', ranking: 601, tuition: '€9,000', programs: ['Sciences', 'Medicine', 'Arts'], deadline: 'Jan 8, 2026', type: 'Public', acceptance: '32%', link: 'https://www.uef.fi/en' },
  { id: 31, name: 'University of Lapland', country: 'Finland', flag: '🇫🇮', ranking: 801, tuition: '€8,000', programs: ['Arts', 'Law', 'Sciences'], deadline: 'Jan 8, 2026', type: 'Public', acceptance: '40%', link: 'https://ulapland.fi/en/frontpage/' },
];

const countries  = ['All', 'Germany', 'England', 'Italy', 'Finland'];
const fields     = ['All Fields', 'Engineering', 'Computer Science', 'Business', 'Medicine', 'Law', 'Sciences', 'Arts', 'IT', 'Mathematics', 'Architecture'];
const sortOptions = ['Ranking', 'Tuition (Low-High)', 'Deadline'];

const UserStudyDest = () => {
  const [search, setSearch]         = useState('');
  const [country, setCountry]       = useState('All');
  const [field, setField]           = useState('All Fields');
  const [sortBy, setSortBy]         = useState('Ranking');
  const [bookmarks, setBookmarks]   = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [detailModal, setDetailModal] = useState(null);

  const toggleBookmark = (id) => {
    setBookmarks(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleCompare = (uni) => {
    setCompareList(prev => {
      if (prev.find(u => u.id === uni.id)) return prev.filter(u => u.id !== uni.id);
      if (prev.length >= 3) { alert('You can compare up to 3 universities at a time.'); return prev; }
      return [...prev, uni];
    });
  };

  const filtered = universities
    .filter(u => {
      const matchSearch  = u.name.toLowerCase().includes(search.toLowerCase()) || u.country.toLowerCase().includes(search.toLowerCase());
      const matchCountry = country === 'All' || u.country === country;
      const matchField   = field === 'All Fields' || u.programs.includes(field);
      return matchSearch && matchCountry && matchField;
    })
    .sort((a, b) => {
      if (sortBy === 'Ranking') return a.ranking - b.ranking;
      return 0;
    });

  return (
    <div className="sd-root">
      <NavbarDashboard />
      <div className="sd-body">
        <Sidebar />
        <main className="sd-main">

          {/* Header */}
          <div className="sd-header">
            <div>
              <h1 className="sd-header__title">Find Universities</h1>
              <p className="sd-header__sub">Search, compare and bookmark universities worldwide</p>
            </div>
            {compareList.length > 0 && (
              <button className="sd-compare-btn" onClick={() => setShowCompare(true)}>
                <FaBalanceScale /> Compare ({compareList.length}) Universities
              </button>
            )}
          </div>

          {/* Search & Filters */}
          <div className="sd-filters-wrap">
            <div className="sd-search">
              <span><FaSearch /></span>
              <input
                placeholder="Search universities or countries..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="sd-filters">
              <select value={country} onChange={e => setCountry(e.target.value)}>
                {countries.map(c => <option key={c}>{c}</option>)}
              </select>
              <select value={field} onChange={e => setField(e.target.value)}>
                {fields.map(f => <option key={f}>{f}</option>)}
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                {sortOptions.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="sd-results-count">
            Showing <strong>{filtered.length}</strong> universities
            {bookmarks.length > 0 && <span className="sd-bookmark-count"> ·  <FaBookmark /> {bookmarks.length} bookmarked</span>}
          </p>

          {/* Cards Grid */}
          {filtered.length === 0 ? (
            <div className="sd-empty">
              <span><FaUniversity /></span>
              <p>No universities found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="sd-grid">
              {filtered.map(uni => (
                <div key={uni.id} className="sd-card">
                  <div className="sd-card__top">
                    <div className="sd-card__flag">{uni.flag}</div>
                    <div className="sd-card__rank">#{uni.ranking} QS</div>
                    <button
                      className={`sd-bookmark-btn${bookmarks.includes(uni.id) ? ' sd-bookmark-btn--active' : ''}`}
                      onClick={() => toggleBookmark(uni.id)}
                      title={bookmarks.includes(uni.id) ? 'Remove bookmark' : 'Bookmark'}
                    >
                      {bookmarks.includes(uni.id) ? <FaBookmark />  : <FaTag />}
                    </button>
                  </div>

                  <h3 className="sd-card__name">{uni.name}</h3>
                  <p className="sd-card__country">{uni.flag} {uni.country}</p>

                  <div className="sd-card__stats">
                    <div className="sd-card__stat">
                      <span className="sd-card__stat-label">Tuition/yr</span>
                      <span className="sd-card__stat-val">{uni.tuition}</span>
                    </div>
                    <div className="sd-card__stat">
                      <span className="sd-card__stat-label">Acceptance</span>
                      <span className="sd-card__stat-val">{uni.acceptance}</span>
                    </div>
                    <div className="sd-card__stat">
                      <span className="sd-card__stat-label">Deadline</span>
                      <span className="sd-card__stat-val sd-card__stat-val--deadline">{uni.deadline}</span>
                    </div>
                  </div>

                  <div className="sd-card__programs">
                    {uni.programs.map(p => (
                      <span key={p} className="sd-card__program-tag">{p}</span>
                    ))}
                  </div>

                  <div className="sd-card__actions">
                    <button className="sd-btn sd-btn--primary" onClick={() => setDetailModal(uni)}>View Details</button>
                    <button
                      className={`sd-btn sd-btn--outline${compareList.find(u => u.id === uni.id) ? ' sd-btn--compare-active' : ''}`}
                      onClick={() => toggleCompare(uni)}
                    >
                      {compareList.find(u => u.id === uni.id) ? (
                                 <>
                         <FaCheck /> Added
                                 </>
                             ) : (
                            <>
                     <FaBalanceScale /> Compare
                           </>
                        )}
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
        <div className="sd-modal-overlay" onClick={() => setDetailModal(null)}>
          <div className="sd-modal" onClick={e => e.stopPropagation()}>
            <div className="sd-modal__header">
              <div>
                <h2>{detailModal.flag} {detailModal.name}</h2>
                <p>{detailModal.country} · Rank #{detailModal.ranking} · {detailModal.type}</p>
              </div>
              <button className="sd-modal__close" onClick={() => setDetailModal(null)}><FaTimes /></button>
            </div>
            <div className="sd-modal__body">
              <div className="sd-modal__stats-grid">
                {[
                  { label: 'Annual Tuition', val: detailModal.tuition },
                  { label: 'Acceptance Rate', val: detailModal.acceptance },
                  { label: 'Application Deadline', val: detailModal.deadline },
                  { label: 'University Type', val: detailModal.type },
                ].map(s => (
                  <div key={s.label} className="sd-modal__stat">
                    <p className="sd-modal__stat-label">{s.label}</p>
                    <p className="sd-modal__stat-val">{s.val}</p>
                  </div>
                ))}
              </div>
              <div className="sd-modal__section">
                <h4>Available Programs</h4>
                <div className="sd-modal__programs">
                  {detailModal.programs.map(p => <span key={p} className="sd-card__program-tag">{p}</span>)}
                </div>
              </div>
              <div className="sd-modal__section">
                <h4>Official Website</h4>
                <a href={detailModal.link} target="_blank" rel="noopener noreferrer" className="sd-modal__link">
                  {detailModal.link}
                </a>
              </div>
              <div className="sd-modal__section">
                <h4>Eligibility Requirements</h4>
                <ul className="sd-modal__list">
                  <li>Minimum GPA: 3.0 / 4.0</li>
                  <li>IELTS: 6.5 overall (no band below 6.0)</li>
                  <li>Statement of Purpose (SOP)</li>
                  <li>2 Letters of Recommendation</li>
                  <li>Valid Passport</li>
                </ul>
              </div>
            </div>
            <div className="sd-modal__footer">
              <button className="sd-btn sd-btn--outline" onClick={() => setDetailModal(null)}>Close</button>
              <button className="sd-btn sd-btn--primary" onClick={() => { toggleBookmark(detailModal.id); setDetailModal(null); }}>
                   {bookmarks.includes(detailModal.id) ? (
                     <><FaBookmark /> Bookmarked</>
                      ) : (
                 <><FaTag /> Bookmark This</>
                        )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompare && compareList.length >= 2 && (
        <div className="sd-modal-overlay" onClick={() => setShowCompare(false)}>
          <div className="sd-modal sd-modal--wide" onClick={e => e.stopPropagation()}>
            <div className="sd-modal__header">
              <h2><FaBalanceScale /></h2>
              <button className="sd-modal__close" onClick={() => setShowCompare(false)}>✕</button>
            </div>
            <div className="sd-modal__body">
              <div className="sd-compare-table">
                <div className="sd-compare-table__col sd-compare-table__col--label">
                  <div className="sd-compare-table__cell sd-compare-table__cell--head">University</div>
                  <div className="sd-compare-table__cell">Country</div>
                  <div className="sd-compare-table__cell">QS Ranking</div>
                  <div className="sd-compare-table__cell">Annual Tuition</div>
                  <div className="sd-compare-table__cell">Acceptance Rate</div>
                  <div className="sd-compare-table__cell">Deadline</div>
                  <div className="sd-compare-table__cell">Programs</div>
                </div>
                {compareList.map(uni => (
                  <div key={uni.id} className="sd-compare-table__col">
                    <div className="sd-compare-table__cell sd-compare-table__cell--head">{uni.flag} {uni.name}</div>
                    <div className="sd-compare-table__cell">{uni.country}</div>
                    <div className="sd-compare-table__cell">#{uni.ranking}</div>
                    <div className="sd-compare-table__cell">{uni.tuition}</div>
                    <div className="sd-compare-table__cell">{uni.acceptance}</div>
                    <div className="sd-compare-table__cell">{uni.deadline}</div>
                    <div className="sd-compare-table__cell">{uni.programs.join(', ')}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sd-modal__footer">
              <button className="sd-btn sd-btn--outline" onClick={() => { setCompareList([]); setShowCompare(false); }}>Clear All</button>
              <button className="sd-btn sd-btn--primary" onClick={() => setShowCompare(false)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStudyDest;