import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../components/assets/finallogo.jpeg";
import './Scholarship.css';
import axios from "axios";
import {
  FaSearch,
  FaTimes,
  FaGraduationCap,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCheckCircle,
  FaBookmark,
  FaBan,
} from 'react-icons/fa';
import { GiEarthAmerica } from 'react-icons/gi';

const navLinks = [
  { label: 'Home', to: '/home' },
  { label: 'Universities', to: '/StudyDestinations' },
  { label: 'Scholarships', to: '/Scholarship' },
  { label: 'Visa Guide', to: '/VisaGuide' },
  { label: 'Contact', to: '/ContactUs' },
];

const tagStyle = (tag) =>
  ({
    'Fully Funded': { background: '#e8f8ef', color: '#1a7a3a' },
    'Prestigious': { background: '#eef4ff', color: '#1a5cb0' },
    'Local': { background: '#fff4e6', color: '#a04000' },
    'Elite': { background: '#f3eeff', color: '#6c3db5' },
  }[tag] || { background: '#f0f4fb', color: '#4a6fa5' });

const levels = ['All Levels', "Bachelor's", "Master's", "PhD"];
const types = ['All Types', 'Government', 'University', 'EU', 'Private'];

function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [ref, v];
}

const Scholarship = () => {
  const navigate = useNavigate();

  // DATABASE DATA
  const [scholarships, setScholarships] = useState([]);

  // UI STATES
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // FILTER STATES
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All Levels');
  const [type, setType] = useState('All Types');
  const [selectedTag, setSelectedTag] = useState('All');

  // MODAL
  const [detailModal, setDetailModal] = useState(null);

  // ANIMATION
  const [heroRef, heroV] = useReveal();
  const [gridRef, gridV] = useReveal();

  // FETCH SCHOLARSHIPS
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/scholarships")
      .then((res) => {
        console.log(res.data);
        if (Array.isArray(res.data)) {
          setScholarships(res.data);
        } else if (res.data.scholarships) {
          setScholarships(res.data.scholarships);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // NAVBAR SCROLL
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // FILTER
  const filtered = scholarships.filter((s) => {
    const ms =
      (s.name || s.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.country || '').toLowerCase().includes(search.toLowerCase());

    const scholarshipLevel = s.level || s.degreeLevel || '';
    const ml =
      level === 'All Levels' ||
      scholarshipLevel.includes(
        level.replace("Bachelor's", "Bachelor").replace("Master's", "Master")
      );

    const mt = type === 'All Types' || s.type === type;
    const mtg = selectedTag === 'All' || s.tag === selectedTag;

    return ms && ml && mt && mtg;
  });

  // COUNTS
  const counts = {
    'Fully Funded': scholarships.filter((s) => s.tag === 'Fully Funded').length,
    'Prestigious': scholarships.filter((s) => s.tag === 'Prestigious').length,
    'Elite': scholarships.filter((s) => s.tag === 'Elite').length,
    'Local': scholarships.filter((s) => s.tag === 'Local').length,
  };

  // SAVE SCHOLARSHIP
  const saveScholarship = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/save-scholarship",
        {
          scholarshipId: id,
          userId: localStorage.getItem("userId"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setShowPopup(true);
      alert(response.data.message);
    
    } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("ERROR RESPONSE:", error.response);
  console.log("ERROR MESSAGE:", error.message);

  const msg = error.response?.data?.message || error.message || "Error Saving Scholarship";
  alert(msg);
}
  };

  return (
    <div className="sc2-root">

      {/* NAVBAR */}
      <nav className={`sc2-nav${scrolled ? ' sc2-nav--scrolled' : ''}`}>
        <div className="sc2-nav__inner">
          <Link to="/home" className="sc2-nav__brand">
          <div className="sc2-nav__logo-icon">
  <img src={logo} alt="EMA StudyGate Logo" className="hp-logo" />
</div>
            {/* <div className="sc2-nav__logo">
              <svg width="20" height="16" viewBox="0 0 28 22" fill="none">
                <path
                  d="M2 2H10L14 8L18 2H26"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 11H26"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M2 20H10L14 14L18 20H26"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div> */}
            <span>
              EMA <strong>StudyGate</strong>
            </span>
          </Link>

          <ul className={`sc2-nav__links${menuOpen ? ' open' : ''}`}>
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setMenuOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="sc2-nav__auth">
            <Link to="/login" className="sc2-nav__login">
              Login
            </Link>
            <Link to="/signup" className="sc2-nav__signup">
              Get Started
            </Link>
          </div>

          <button
            className={`sc2-nav__burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="sc2-hero" ref={heroRef}>
        <div className="sc2-hero__bg">
          <div className="sc2-hero__orb sc2-hero__orb--1" />
          <div className="sc2-hero__orb sc2-hero__orb--2" />
          <div className="sc2-hero__orb sc2-hero__orb--3" />
          <div className="sc2-hero__grid" />
        </div>

        <div className={`sc2-hero__content${heroV ? ' in' : ''}`}>
          <div className="sc2-hero__badge">
            <FaMoneyBillWave style={{ marginRight: 6 }} />
            {scholarships.length} Scholarships Available
          </div>

          <h1>
            Find Your <span>Perfect Scholarship</span>
          </h1>
          <p>Discover fully funded and partial scholarships for students.</p>

          {/* SEARCH */}
          <div className="sc2-hero__search">
            <FaSearch />
            <input
              placeholder="Search scholarships or countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')}>
                <FaTimes />
              </button>
            )}
          </div>

          {/* TAGS */}
          <div className="sc2-hero__tags">
            {['All', 'Fully Funded', 'Prestigious', 'Elite', 'Local'].map((t) => (
              <button
                key={t}
                className={`sc2-tag-pill${selectedTag === t ? ' active' : ''}`}
                onClick={() => setSelectedTag(t)}
              >
                {t} {t !== 'All' && counts[t] ? `(${counts[t]})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* FLOATS */}
        <div className="sc2-hero__floats">
          <div className="sc2-float sc2-float--1">
            <FaGraduationCap style={{ fontSize: '1.5rem' }} />
            <div>
              <strong>{scholarships.length}+</strong>
              <small>Scholarships</small>
            </div>
          </div>
          <div className="sc2-float sc2-float--2">
            <GiEarthAmerica style={{ fontSize: '1.5rem' }} />
            <div>
              <strong>15+</strong>
              <small>Countries</small>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="sc2-main">

        {/* FILTERS */}
        <div className="sc2-filters">
          <div className="sc2-filters__left">
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              {levels.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>

            <select value={type} onChange={(e) => setType(e.target.value)}>
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            {(level !== 'All Levels' ||
              type !== 'All Types' ||
              search ||
              selectedTag !== 'All') && (
              <button
                className="sc2-clear-btn"
                onClick={() => {
                  setLevel('All Levels');
                  setType('All Types');
                  setSearch('');
                  setSelectedTag('All');
                }}
              >
                <FaTimes style={{ marginRight: 4 }} />
                Clear
              </button>
            )}
          </div>

          <span className="sc2-count">
            <strong>{filtered.length}</strong> scholarships found
          </span>
        </div>

        {/* GRID */}
        <div ref={gridRef} className={`sc2-grid${gridV ? ' in' : ''}`}>
          {filtered.length === 0 ? (
            <div className="sc2-empty">
              <FaMoneyBillWave style={{ fontSize: '2rem' }} />
              <h3>No scholarships found</h3>
            </div>
          ) : (
            filtered.map((s, i) => (
              <div key={s._id || i} className="sc2-card">
                <div className="sc2-card__top">
                  <span className="sc2-card__tag" style={tagStyle(s.tag)}>
                    {s.tag || 'Scholarship'}
                  </span>
                </div>

                <h3 className="sc2-card__name">{s.name || s.title}</h3>
                <p className="sc2-card__country">
                  {s.country} · {s.type}
                </p>

                <div className="sc2-card__meta">
                  <div className="sc2-meta-item">
                    <FaMoneyBillWave />
                    <div>
                      <small>Amount</small>
                      <strong>{s.amount || 'Funded'}</strong>
                    </div>
                  </div>
                  <div className="sc2-meta-item">
                    <FaGraduationCap />
                    <div>
                      <small>Level</small>
                      <strong>{s.level || s.degreeLevel}</strong>
                    </div>
                  </div>
                  <div className="sc2-meta-item sc2-meta-item--full">
                    <FaCalendarAlt />
                    <div>
                      <small>Deadline</small>
                      <strong>{s.deadline || 'Open'}</strong>
                    </div>
                  </div>
                </div>

                <p className="sc2-card__eligibility">
                  <FaCheckCircle style={{ marginRight: 6, color: '#27ae60' }} />
                  {s.eligibility || s.description}
                </p>

                <div className="sc2-card__actions">
                  <button
                    className="sc2-btn sc2-btn--primary"
                    onClick={() => setDetailModal(s)}
                  >
                    View Details
                  </button>
                  <button
                    className="sc2-btn sc2-btn--outline"
                    onClick={() => saveScholarship(s._id)}
                  >
                    <FaBookmark style={{ marginRight: 5 }} />
                    Save
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* MODAL */}
      {detailModal && (
        <div className="sc2-overlay" onClick={() => setDetailModal(null)}>
          <div className="sc2-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sc2-modal__header">
              <div>
                <h2>{detailModal.name || detailModal.title}</h2>
                <p>{detailModal.country}</p>
              </div>
              <button onClick={() => setDetailModal(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="sc2-modal__body">
              <div className="sc2-modal__section">
                <h4>Description</h4>
                <p>{detailModal.description}</p>
              </div>

              <div className="sc2-modal__section">
                <h4>Requirements</h4>
                <ul className="sc2-modal__list">
                  <li>Minimum GPA: {detailModal.minGpa}</li>
                  <li>Minimum IELTS: {detailModal.minIelts}</li>
                </ul>
              </div>

              <div className="sc2-modal__cta">
                <p>
                  <FaBan style={{ marginRight: 6, color: '#e74c3c' }} />
                  Sign in to save this scholarship.
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <Link to="/signup" className="sc2-btn sc2-btn--primary">
                    Create Free Account
                  </Link>
                  <button
                    className="sc2-btn sc2-btn--outline"
                    onClick={() => saveScholarship(detailModal._id)}
                  >
                    <FaBookmark style={{ marginRight: 5 }} />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POPUP */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Scholarship Saved!</h3>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Scholarship;
