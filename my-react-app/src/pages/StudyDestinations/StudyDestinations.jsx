import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../components/assets/finallogo.jpeg";
import {
  University,
  Banknote,
  Bot,
  Stamp,
  Search,
  X,
  Scale,
  LayoutGrid,
  Globe,
  GraduationCap,
  CalendarDays,
  CircleCheck,
  Lock,
  ChevronDown,
  TrendingUp,
  Cpu,
  Leaf,
  Flame,
} from 'lucide-react';
import './StudyDestinations.css';
import axios from "axios";

/* ── Shared nav links ── */
const navLinks = [
  { label: 'Home',         to: '/home' },
  { label: 'Universities', to: '/StudyDestinations' },
  { label: 'Scholarships', to: '/Scholarship' },
  { label: 'Visa Guide',   to: '/VisaGuide' },
  { label: 'Contact',      to: '/ContactUs' },
];

/* ── Tag icon map ── */
const tagIconMap = {
  'Popular':    <Flame size={11} />,
  'Top Ranked': <TrendingUp size={11} />,
  'Research':   <Cpu size={11} />,
  'Affordable': <Banknote size={11} />,
  'Growing':    <Leaf size={11} />,
  'Tech Hub':   <Cpu size={11} />,
};



const countries = ['All','Germany','England','Italy','Finland'];
const fields    = ['All Fields','Computer Science','Business','Engineering','Medicine','Law','Sciences','Architecture','Arts'];

const tagStyle = (tag) => {
  const map = {
    'Popular':    { background:'#eef4ff', color:'#2d5fa6' },
    'Top Ranked': { background:'#e8f8ef', color:'#1a7a3a' },
    'Research':   { background:'#f3eeff', color:'#6c3db5' },
    'Affordable': { background:'#fff4e6', color:'#a04000' },
    'Growing':    { background:'#fef0e6', color:'#c0440a' },
    'Tech Hub':   { background:'#e0fff0', color:'#0a7a5a' },
  };
  return map[tag] || { background:'#f0f4fb', color:'#4a6fa5' };
};

function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

const StudyDestinations = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [search, setSearch]           = useState('');
  const [country, setCountry]         = useState('All');
  const [field, setField]             = useState('All Fields');
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [detailModal, setDetailModal] = useState(null);
  const [universities, setUniversities] = useState([]);

  const [heroRef, heroV] = useReveal();
  const [cardRef, cardV] = useReveal();


  const fetchUniversities = async () => {
  try {

    const res = await axios.get(
      "http://localhost:5000/api/universities"
    );

    console.log("FRONTEND DATA:", res.data);

   const formattedData = res.data.map((u) => ({
  id: u._id,
  name: u.universityName,
  country: u.country,
  flag: u.flag || "🎓",
  ranking: u.qsRanking,
  tuition: u.annualTuition,
  field: Array.isArray(u.programs)
    ? u.programs.join(", ")
    : "",
  acceptance: u.acceptance || "N/A",
  deadline: u.applicationDeadline,
  type: u.type || "Public",
  tag: u.tag || "Popular",
  link: u.website || "#",
  status: u.status,
}));

    setUniversities(formattedData);

  } catch (error) {

    console.log("FETCH ERROR:", error);

  }
};

  
   useEffect(() => {

  fetchUniversities();

  const fn = () => setScrolled(window.scrollY > 60);

  window.addEventListener('scroll', fn);

  return () => window.removeEventListener('scroll', fn);

}, []);

  const filtered = universities.filter(u => {
    const ms = u.name.toLowerCase().includes(search.toLowerCase()) || u.country.toLowerCase().includes(search.toLowerCase());
    const mc = country === 'All' || u.country === country;
    const mf = field   === 'All Fields' || u.field.includes(field);
    return ms && mc && mf;
  });

  const toggleCompare = (uni) => {
    setCompareList(prev => {
      if (prev.find(u => u.id === uni.id)) return prev.filter(u => u.id !== uni.id);
      if (prev.length >= 3) { alert('Compare up to 3 universities at a time.'); return prev; }
      return [...prev, uni];
    });
  };

  const quickCountries = [
    { label: 'Germany', flag: '🇩🇪' },
    { label: 'England',      flag: '🇬🇧' },
    { label: 'Italy',   flag: '🇮🇹' },
    { label: 'Finland', flag: '🇫🇮' },
  ];

  return (
    <div className="sd2-root">

      {/* ── NAVBAR ── */}
      <nav className={`sd2-nav${scrolled ? ' sd2-nav--scrolled' : ''}`}>
        <div className="sd2-nav__inner">
          <Link to="/home" className="sd2-nav__brand">
            <div className="hp-nav__logo-icon">
  <img src={logo} alt="EMA StudyGate Logo" className="hp-logo" />
</div>
            <span>EMA <strong>StudyGate</strong></span>
          </Link>
          <ul className={`sd2-nav__links${menuOpen ? ' open' : ''}`}>
            {navLinks.map(l => <li key={l.to}><Link to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</Link></li>)}
          </ul>
          <div className="sd2-nav__auth">
            <Link to="/login"  className="sd2-nav__login">Login</Link>
            <Link to="/signup" className="sd2-nav__signup">Get Started</Link>
          </div>
          <button className={`sd2-nav__burger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="sd2-hero" ref={heroRef}>
        <div className="sd2-hero__bg">
          <div className="sd2-hero__orb sd2-hero__orb--1"/>
          <div className="sd2-hero__orb sd2-hero__orb--2"/>
          <div className="sd2-hero__grid"/>
        </div>
        <div className={`sd2-hero__content${heroV ? ' in' : ''}`}>
          <div className="sd2-hero__badge"><University size={14} /> </div>
          <h1>Find Your <span>Dream University</span></h1>
          <p>Search, compare and bookmark top universities from 30+ countries. Filter by country, field, ranking and tuition to find your perfect match.</p>

          <div className="sd2-hero__search">
            <Search size={16} />
            <input
              placeholder="Search universities or countries..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="sd2-hero__search-clear" onClick={() => setSearch('')}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="sd2-hero__pills">
            {quickCountries.map(c => (
              <button key={c.label} className="sd2-hero__pill" onClick={() => setCountry(c.label)}>
                {c.flag} {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="sd2-hero__floats">
          <div className="sd2-float sd2-float--1"><LayoutGrid size={18} /><div><strong>500+</strong><small>Universities</small></div></div>
          <div className="sd2-float sd2-float--2"><Globe size={18} /><div><strong>30+</strong><small>Countries</small></div></div>
          <div className="sd2-float sd2-float--3"><GraduationCap size={18} /><div><strong>1,200+</strong><small>Students Helped</small></div></div>
        </div>
      </section>

      {/* ── FILTERS + GRID ── */}
      <section className="sd2-main">

        <div className="sd2-filters">
          <div className="sd2-filters__left">
            <select value={country} onChange={e => setCountry(e.target.value)}>
              {countries.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={field} onChange={e => setField(e.target.value)}>
              {fields.map(f => <option key={f}>{f}</option>)}
            </select>
            {(country !== 'All' || field !== 'All Fields' || search) && (
              <button className="sd2-clear-btn" onClick={() => { setCountry('All'); setField('All Fields'); setSearch(''); }}>
                <X size={13} /> Clear Filters
              </button>
            )}
          </div>
          <div className="sd2-filters__right">
            <span className="sd2-result-count"><strong>{filtered.length}</strong> universities found</span>
            {compareList.length >= 2 && (
              <button className="sd2-compare-btn" onClick={() => setShowCompare(true)}>
                <Scale size={15} /> Compare ({compareList.length})
              </button>
            )}
          </div>
        </div>

        <div ref={cardRef} className={`sd2-grid${cardV ? ' in' : ''}`}>
          {filtered.length === 0 ? (
            <div className="sd2-empty">
              <University size={40} />
              <h3>No universities found</h3>
              <p>Try adjusting your search or filters</p>
              <button className="sd2-btn sd2-btn--primary" onClick={() => { setCountry('All'); setField('All Fields'); setSearch(''); }}>
                Reset Filters
              </button>
            </div>
          ) : (
            filtered.map((uni, i) => (
              <div key={uni.id} className="sd2-card" style={{ animationDelay:`${(i % 6) * 0.07}s` }}>
                <div className="sd2-card__top">
                  <div className="sd2-card__flag-wrap">
                    <span className="sd2-card__flag">{uni.flag}</span>
                    <span className="sd2-card__rank">#{uni.ranking} QS</span>
                  </div>
                  <span className="sd2-card__tag" style={tagStyle(uni.tag)}>
                    {tagIconMap[uni.tag]} {uni.tag}
                  </span>
                </div>

                <h3 className="sd2-card__name">{uni.name}</h3>
                <p className="sd2-card__country">{uni.flag} {uni.country}</p>

                <div className="sd2-card__stats">
                  <div className="sd2-card__stat">
                    <Banknote size={16} />
                    <div><small>Tuition/yr</small><strong>{uni.tuition}</strong></div>
                  </div>
                  <div className="sd2-card__stat">
                    <CircleCheck size={16} />
                    <div><small>Acceptance</small><strong>{uni.acceptance}</strong></div>
                  </div>
                  <div className="sd2-card__stat">
                    <CalendarDays size={16} />
                    <div><small>Deadline</small><strong className="sd2-deadline">{uni.deadline}</strong></div>
                  </div>
                </div>

                <div className="sd2-card__programs">
                  {uni.field.split(', ').slice(0,3).map(p => (
                    <span key={p} className="sd2-program-tag">{p}</span>
                  ))}
                </div>

                <div className="sd2-card__actions">
                  <button className="sd2-btn sd2-btn--primary" onClick={() => setDetailModal(uni)}>
                    View Details
                  </button>
                  <button
                    className={`sd2-btn sd2-btn--outline${compareList.find(u => u.id === uni.id) ? ' sd2-btn--compared' : ''}`}
                    onClick={() => toggleCompare(uni)}
                  >
                    {compareList.find(u => u.id === uni.id) ? <><CircleCheck size={14} /> Added</> : <Scale size={14} />}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="sd2-cta">
        <div className="sd2-cta__inner">
          <div>
            <h2>Ready to apply? Create account</h2>
            <p>Save universities, set reminders, track deadlines and get your personalised study plan.</p>
          </div>
          <div className="sd2-cta__btns">
            <Link to="/signup" className="sd2-btn sd2-btn--white">Get Started Free →</Link>
            <Link to="/login"  className="sd2-btn sd2-btn--ghost-white">Sign In</Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="sd2-footer">
        <div className="sd2-footer__inner">
          <div className="sd2-footer__brand">
            <span>EMA StudyGate</span>
            <p>Empowering students to study abroad — free forever.</p>
          </div>
          <div className="sd2-footer__links">
            {navLinks.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}
          </div>
          <p className="sd2-footer__copy">© 2026 EMA Study Gate · All Rights Reserved</p>
        </div>
      </footer>

      {/* ── DETAIL MODAL ── */}
      {detailModal && (
        <div className="sd2-overlay" onClick={() => setDetailModal(null)}>
          <div className="sd2-modal" onClick={e => e.stopPropagation()}>
            <div className="sd2-modal__header">
              <div>
                <h2>{detailModal.flag} {detailModal.name}</h2>
                <p>{detailModal.country} · Rank #{detailModal.ranking} · {detailModal.type}</p>
              </div>
              <button className="sd2-modal__close" onClick={() => setDetailModal(null)}><X size={18} /></button>
            </div>
            <div className="sd2-modal__body">
              <div className="sd2-modal__stats">
                {[
                  { l:'Annual Tuition',       v:detailModal.tuition },
                  { l:'Acceptance Rate',      v:detailModal.acceptance },
                  { l:'Application Deadline', v:detailModal.deadline },
                  { l:'University Type',      v:detailModal.type },
                ].map(s => (
                  <div key={s.l} className="sd2-modal__stat">
                    <p className="sd2-modal__stat-label">{s.l}</p>
                    <p className="sd2-modal__stat-val">{s.v}</p>
                  </div>
                ))}
              </div>
              <div className="sd2-modal__section">
                <h4>Available Programs</h4>
                <div className="sd2-card__programs">
                  {detailModal.field.split(', ').map(p => <span key={p} className="sd2-program-tag">{p}</span>)}
                </div>
              </div>
              <div className="sd2-modal__section">
                <h4>Official Website</h4>
                <a href={detailModal.link} target="_blank" rel="noopener noreferrer" className="sd2-btn sd2-btn--outline" style={{display:'inline-flex',marginTop:'8px'}}>
                  Visit University Website ↗
                </a>
              </div>
              <div className="sd2-modal__section">
                <h4>Eligibility Requirements</h4>
                <ul className="sd2-modal__list">
                  <li>Minimum GPA 3.0 / 4.0</li>
                  <li>IELTS 6.5 (no band below 6.0)</li>
                  <li>Statement of Purpose</li>
                  <li>2 Letters of Recommendation</li>
                  <li>Valid Passport</li>
                  <li>Financial Proof</li>
                </ul>
              </div>
              <div className="sd2-modal__login-cta">
                <p><Lock size={14} /> Create account to bookmark this university, set a deadline reminder, and get your personalised application checklist.</p>
                <div style={{display:'flex',gap:'10px',marginTop:'14px'}}>
                  <Link to="/signup" className="sd2-btn sd2-btn--primary">Create Account</Link>
                  <Link to="/login"  className="sd2-btn sd2-btn--outline">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── COMPARE MODAL ── */}
      {showCompare && compareList.length >= 2 && (
        <div className="sd2-overlay" onClick={() => setShowCompare(false)}>
          <div className="sd2-modal sd2-modal--wide" onClick={e => e.stopPropagation()}>
            <div className="sd2-modal__header">
              <h2><Scale size={18} /> Compare Universities</h2>
              <button className="sd2-modal__close" onClick={() => setShowCompare(false)}><X size={18} /></button>
            </div>
            <div className="sd2-modal__body" style={{overflowX:'auto'}}>
              <div className="sd2-compare-table">
                <div className="sd2-compare-table__col sd2-compare-table__col--label">
                  {['University','Country','QS Ranking','Tuition','Acceptance','Deadline'].map(h => (
                    <div key={h} className="sd2-compare-cell sd2-compare-cell--label">{h}</div>
                  ))}
                </div>
                {compareList.map(uni => (
                  <div key={uni.id} className="sd2-compare-table__col">
                    <div className="sd2-compare-cell sd2-compare-cell--head">{uni.flag} {uni.name}</div>
                    <div className="sd2-compare-cell">{uni.country}</div>
                    <div className="sd2-compare-cell">#{uni.ranking}</div>
                    <div className="sd2-compare-cell">{uni.tuition}</div>
                    <div className="sd2-compare-cell">{uni.acceptance}</div>
                    <div className="sd2-compare-cell">{uni.deadline}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sd2-modal__footer">
              <button className="sd2-btn sd2-btn--outline" onClick={() => { setCompareList([]); setShowCompare(false); }}>Clear All</button>
              <button className="sd2-btn sd2-btn--primary" onClick={() => setShowCompare(false)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyDestinations;