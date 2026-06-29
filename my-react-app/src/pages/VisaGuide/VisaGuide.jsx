import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './VisaGuide.css';
import logo from "../../components/assets/finallogo.jpeg";
import {
  FaPassport, FaFileAlt, FaCheckCircle, FaListUl,
  FaLightbulb, FaRobot, FaMapMarkerAlt, FaUniversity,
  FaMoneyBillWave, FaClock, FaShieldAlt, FaClipboardList,
  FaInfoCircle, FaExclamationTriangle, FaLock,
} from 'react-icons/fa';
import { MdSchool, MdPublic } from 'react-icons/md';
import { GiEarthAmerica } from 'react-icons/gi';

const navLinks = [
  { label:'Home',         to:'/home'              },
  { label:'Universities', to:'/StudyDestinations' },
  { label:'Scholarships', to:'/Scholarship'       },
  { label:'Visa Guide',   to:'/VisaGuide'         },
  { label:'Contact',      to:'/ContactUs'         },
];

const countries = [
  {
    id:'canada', name:'Canada', flag:'🇨🇦', color:'#c0392b',
    visaType:'Study Permit',  fee:'CAD 150', processing:'8–12 weeks', validity:'Course + 90 days',
    steps:[
      { n:'01', title:'Get Acceptance Letter',  desc:'Receive a Letter of Acceptance from a Designated Learning Institution (DLI).' },
      { n:'02', title:'Gather Documents',        desc:'Collect passport, financial proof (CAD 10,000+), photos and medical exam if required.' },
      { n:'03', title:'Apply Online (IRCC)',     desc:'Submit on the IRCC portal with all documents and pay CAD 150 fee.' },
      { n:'04', title:'Biometrics',              desc:'Book and attend biometrics collection at a Visa Application Centre (VAC).' },
      { n:'05', title:'Await Decision',          desc:'Processing takes 8–12 weeks. Track status on IRCC portal daily.' },
      { n:'06', title:'Receive Study Permit',    desc:'Obtain your study permit at port of entry on arrival in Canada.' },
    ],
    documents:['Valid Passport (6+ months)','Letter of Acceptance from DLI','Proof of Funds (CAD 10,000+/yr)','Biometrics','Passport-size Photos','Statement of Purpose','Medical Exam (if required)','Police Clearance Certificate'],
    tips:['Apply at least 3–4 months before your program start date.','Ensure financial proof covers tuition plus living expenses.','A strong SOP significantly improves your approval chances.','Track your application status on the IRCC portal regularly.'],
  },
  {
    id:'uk', name:'United Kingdom', flag:'🇬🇧', color:'#2980b9',
    visaType:'Student Visa (Tier 4)', fee:'£490', processing:'3–4 weeks', validity:'Course + extra',
    steps:[
      { n:'01', title:'Receive CAS Number',          desc:'Your university issues a Confirmation of Acceptance for Studies (CAS) number.' },
      { n:'02', title:'Check Financial Requirements', desc:'Prove you have £1,334/month for London or £1,023/month elsewhere for 28 days.' },
      { n:'03', title:'Apply Online (UKVI)',          desc:'Apply on UK Visas & Immigration portal up to 6 months before course start.' },
      { n:'04', title:'Pay IHS Surcharge',            desc:'Pay the Immigration Health Surcharge (IHS) for NHS access during study.' },
      { n:'05', title:'Biometrics (UKVCAS)',          desc:'Visit a UKVCAS centre to provide your biometric information.' },
      { n:'06', title:'Collect BRP',                  desc:'Collect your Biometric Residence Permit (BRP) after arriving in the UK.' },
    ],
    documents:['Valid Passport','CAS Number from University','Bank Statements (28 days consecutive)','ATAS Certificate (if required)','IELTS 6.0+ Certificate','Tuberculosis Test Results','Academic Transcripts','Passport-size Photos'],
    tips:['Apply no more than 6 months before course start date.','Bank statements must show continuous funds for 28 days.','Check if your course requires ATAS clearance before applying.','IHS surcharge must be paid during application, not after.'],
  },
  {
    id:'australia', name:'Australia', flag:'🇦🇺', color:'#27ae60',
    visaType:'Student Visa (Subclass 500)', fee:'AUD 650', processing:'4–6 weeks', validity:'Duration of course',
    steps:[
      { n:'01', title:'Enrol in CRICOS Course',  desc:'Get an offer from a CRICOS-registered institution and pay initial tuition fees.' },
      { n:'02', title:'Receive CoE',              desc:'Obtain a Confirmation of Enrolment (CoE) from your institution.' },
      { n:'03', title:'Purchase OSHC',            desc:'Buy Overseas Student Health Cover (OSHC) for entire visa duration.' },
      { n:'04', title:'Apply (ImmiAccount)',       desc:'Lodge visa application on the Australian ImmiAccount portal online.' },
      { n:'05', title:'Health Examination',       desc:'Complete a medical exam with a panel physician if required by DIBP.' },
      { n:'06', title:'Visa Grant',               desc:'Receive visa grant letter via email. Check all conditions carefully.' },
    ],
    documents:['Valid Passport','Confirmation of Enrolment (CoE)','GTE Statement','OSHC Policy Document','Financial Evidence (AUD 21,041/yr)','IELTS 6.0+','Academic Transcripts','Health Exam Results'],
    tips:['Write a detailed Genuine Temporary Entrant (GTE) statement — it is the most critical part.','Show strong ties to home country to prove temporary intent.','OSHC must be purchased before submitting visa application.','Apply for visa at least 6 weeks before your course starts.'],
  },
  {
    id:'germany', name:'Germany', flag:'🇩🇪', color:'#d35400',
    visaType:'National Visa (Study)', fee:'€75', processing:'6–12 weeks', validity:'3 months (extend on arrival)',
    steps:[
      { n:'01', title:'University Admission',    desc:'Get admission (Zulassung) from a German university or use uni-assist portal.' },
      { n:'02', title:'Open Blocked Account',    desc:'Open a blocked account with €11,208/year at Fintiba, Expatrio, or Deutsche Bank.' },
      { n:'03', title:'Apply at Embassy',        desc:'Book appointment at German Embassy/Consulate in your country.' },
      { n:'04', title:'Attend Interview',        desc:'Attend visa appointment with all original documents in person.' },
      { n:'05', title:'Receive Visa',            desc:'Receive 3-month national visa. Extend to residence permit after arrival.' },
      { n:'06', title:'Register Address',        desc:'Register at local Einwohnermeldeamt within 2 weeks of arrival in Germany.' },
    ],
    documents:['Valid Passport','University Admission Letter','Blocked Account Proof (€11,208+)','Health Insurance Certificate','IELTS/German Language Proof','APS Certificate (for Pakistan)','Notarised Academic Certificates','Biometric Passport Photos'],
    tips:['Open a blocked account at Fintiba or Expatrio early — it takes 1–2 weeks.','Pakistani students must obtain APS certificate before applying.','Health insurance is mandatory — get recognised German coverage.','Start the process 6–8 months before intended study start date.'],
  },
  {
    id:'netherlands', name:'Netherlands', flag:'🇳🇱', color:'#8e44ad',
    visaType:'MVV Study Visa', fee:'€192', processing:'3–4 weeks', validity:'Duration of study',
    steps:[
      { n:'01', title:'Admission from University', desc:'Receive unconditional admission from a Dutch university (IND-approved institution).' },
      { n:'02', title:'University Applies for MVV', desc:'Your Dutch university will apply for your MVV (entry permit) on your behalf.' },
      { n:'03', title:'Receive MVV Approval',       desc:'Collect your MVV sticker from the Dutch Embassy in your home country.' },
      { n:'04', title:'Travel to Netherlands',      desc:'Enter Netherlands using MVV. Your residence permit process starts on arrival.' },
      { n:'05', title:'Biometrics in Netherlands',  desc:'Provide biometrics at IND office within 3 days of arrival.' },
      { n:'06', title:'Residence Permit (VVR)',      desc:'Collect your Verblijfsvergunning Regulier (VVR) — residence permit card.' },
    ],
    documents:['Valid Passport','Unconditional Admission Letter','Proof of Financial Means (€900+/month)','Health Insurance','IELTS 6.0+ or TOEFL Equivalent','Passport Photos','Apostilled Academic Documents','Housing Confirmation (if available)'],
    tips:['Your university handles most of the visa process — communicate with them early.','Financial proof must show minimum €900 per month for duration of study.','Apostille your academic documents before sending to Netherlands.','Register at municipality (Gemeente) within 5 days of arrival.'],
  },
];

function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold:0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

const VisaGuide = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [selected, setSelected]   = useState('canada');
  const [activeTab, setActiveTab] = useState('steps');

  const [heroRef, heroV]       = useReveal();
  const [contentRef, contentV] = useReveal();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const country = countries.find(c => c.id === selected);

  const tabs = [
    { id:'steps',     label: <><FaClipboardList style={{ marginRight:6 }} /> Step-by-Step</> },
    { id:'documents', label: <><FaFileAlt style={{ marginRight:6 }} /> Required Docs</>      },
    { id:'tips',      label: <><FaLightbulb style={{ marginRight:6 }} /> Pro Tips</>          },
  ];

  return (
    <div className="vg2-root">
      {/* NAVBAR */}
      <nav className={`vg2-nav${scrolled ? ' vg2-nav--scrolled' : ''}`}>
        <div className="vg2-nav__inner">
          <Link to="/home" className="vg2-nav__brand">
          <div className="vg2-nav__logo-icon">
  <img src={logo} alt="EMA StudyGate Logo" className="hp-logo" />
</div>
            {/* <div className="vg2-nav__logo">
              <svg width="20" height="16" viewBox="0 0 28 22" fill="none">
                <path d="M2 2H10L14 8L18 2H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 11H26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M2 20H10L14 14L18 20H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div> */}
            <span>EMA <strong>StudyGate</strong></span>
          </Link>
          <ul className={`vg2-nav__links${menuOpen ? ' open' : ''}`}>
            {navLinks.map(l => <li key={l.to}><Link to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</Link></li>)}
          </ul>
          <div className="vg2-nav__auth">
            <Link to="/login"  className="vg2-nav__login">Login</Link>
            <Link to="/signup" className="vg2-nav__signup">Get Started</Link>
          </div>
          <button className={`vg2-nav__burger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="vg2-hero" ref={heroRef}>
        <div className="vg2-hero__bg">
          <div className="vg2-hero__orb vg2-hero__orb--1"/>
          <div className="vg2-hero__orb vg2-hero__orb--2"/>
          <div className="vg2-hero__grid"/>
        </div>
        <div className={`vg2-hero__content${heroV ? ' in' : ''}`}>
          <div className="vg2-hero__badge">
            <FaPassport style={{ marginRight:6 }} /> 5 Countries · Step-by-Step Guides
          </div>
          <h1>Visa Guidance <span>Made Simple</span></h1>
          <p>Step-by-step student visa guides for Canada, UK, Australia, Germany and Netherlands. Never miss a requirement again.</p>
          <div className="vg2-hero__countries">
            {countries.map(c => (
              <button
                key={c.id}
                className={`vg2-hero__country${selected === c.id ? ' active' : ''}`}
                onClick={() => { setSelected(c.id); setActiveTab('steps'); }}
              >
                <span>{c.flag}</span> {c.name}
              </button>
            ))}
          </div>
        </div>
        <div className="vg2-hero__floats">
          <div className="vg2-float vg2-float--1">
            <FaCheckCircle style={{ fontSize:'1.4rem' }} />
            <div><strong>5</strong><small>Countries Covered</small></div>
          </div>
          <div className="vg2-float vg2-float--2">
            <FaClipboardList style={{ fontSize:'1.4rem' }} />
            <div><strong>6</strong><small>Steps per Guide</small></div>
          </div>
          <div className="vg2-float vg2-float--3">
            <FaFileAlt style={{ fontSize:'1.4rem' }} />
            <div><strong>Full</strong><small>Doc Checklists</small></div>
          </div>
        </div>
      </section>

      {/* GUIDE CONTENT */}
      <section ref={contentRef} className={`vg2-guide${contentV ? ' in' : ''}`}>

        {/* Country selector sidebar */}
        <aside className="vg2-sidebar">
          <p className="vg2-sidebar__title">Select Country</p>
          {countries.map(c => (
            <button
              key={c.id}
              className={`vg2-sidebar__btn${selected === c.id ? ' active' : ''}`}
              onClick={() => { setSelected(c.id); setActiveTab('steps'); }}
            >
              <span className="vg2-sidebar__flag">{c.flag}</span>
              <div>
                <p className="vg2-sidebar__name">{c.name}</p>
                <p className="vg2-sidebar__type">{c.visaType}</p>
              </div>
            </button>
          ))}
          <div className="vg2-sidebar__cta">
            <p>Need personalised visa help?</p>
            <Link to="/login" className="vg2-sidebar__cta-btn">
              <FaRobot style={{ marginRight:5 }} /> Get AI Guidance
            </Link>
          </div>
        </aside>

        {/* Content panel */}
        <div className="vg2-content" key={selected}>

          {/* Country hero */}
          <div className="vg2-country-hero" style={{ background:`linear-gradient(135deg,${country.color}dd,${country.color}88)` }}>
            <div className="vg2-country-hero__left">
              <span className="vg2-country-hero__flag">{country.flag}</span>
              <div>
                <h2>{country.name}</h2>
                <p>{country.visaType}</p>
              </div>
            </div>
            <div className="vg2-country-hero__stats">
              {[
                { l:'Visa Fee',        v:country.fee        },
                { l:'Processing Time', v:country.processing },
                { l:'Validity',        v:country.validity   },
              ].map(s => (
                <div key={s.l} className="vg2-country-hero__stat">
                  <strong>{s.v}</strong>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="vg2-tabs">
            {tabs.map(t => (
              <button key={t.id} className={`vg2-tab${activeTab === t.id ? ' active' : ''}`} onClick={() => setActiveTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Steps */}
          {activeTab === 'steps' && (
            <div className="vg2-steps">
              {country.steps.map((s, i) => (
                <div key={i} className="vg2-step" style={{ animationDelay:`${i * 0.1}s` }}>
                  <div className="vg2-step__left">
                    <div className="vg2-step__num" style={{ background:`linear-gradient(135deg,${country.color},${country.color}88)` }}>{s.n}</div>
                    {i < country.steps.length - 1 && <div className="vg2-step__line" />}
                  </div>
                  <div className="vg2-step__content">
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Documents */}
          {activeTab === 'documents' && (
            <div className="vg2-docs">
              <p className="vg2-docs__intro">Documents required for {country.name} {country.visaType}:</p>
              <div className="vg2-docs__grid">
                {country.documents.map((doc, i) => (
                  <div key={i} className="vg2-doc-item" style={{ animationDelay:`${i * 0.06}s` }}>
                    <div className="vg2-doc-item__icon" style={{ background:`${country.color}18`, color:country.color }}>
                      <FaFileAlt />
                    </div>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
              <div className="vg2-docs__note">
                <FaExclamationTriangle style={{ marginRight:6, color:'#f39c12' }} />
                Requirements may change. Always verify on the official embassy website before submitting your application.
              </div>
              <div className="vg2-docs__cta">
                <p>
                  <FaLock style={{ marginRight:6 }} />
                  Sign in to use our interactive Document Checklist and track your progress.
                </p>
                <Link to="/login" className="vg2-btn vg2-btn--primary">Use Document Checklist</Link>
              </div>
            </div>
          )}

          {/* Tips */}
          {activeTab === 'tips' && (
            <div className="vg2-tips">
              {country.tips.map((tip, i) => (
                <div key={i} className="vg2-tip" style={{ animationDelay:`${i * 0.1}s` }}>
                  <div className="vg2-tip__icon" style={{ background:`${country.color}18`, color:country.color }}>
                    <FaLightbulb />
                  </div>
                  <div>
                    <p className="vg2-tip__num">Tip #{i + 1}</p>
                    <p className="vg2-tip__text">{tip}</p>
                  </div>
                </div>
              ))}
              <div className="vg2-tips__ai-box">
                <FaRobot style={{ fontSize:'1.6rem', color:'#6c63ff' }} />
                <div>
                  <p className="vg2-tips__ai-title">Need personalised visa advice?</p>
                  <p className="vg2-tips__ai-sub">Our AI Assistant can answer your specific visa questions 24/7.</p>
                </div>
                <Link to="/login" className="vg2-btn vg2-btn--primary">
                  Chat with AI
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="vg2-cta">
        <div className="vg2-cta__inner">
          <div>
            <h2>Get Your Personalised Visa Checklist</h2>
            <p>Create a free account to access our interactive visa guide, document tracker and AI assistant.</p>
          </div>
          <div className="vg2-cta__btns">
            <Link to="/signup" className="vg2-btn vg2-btn--white">Create Free Account →</Link>
            <Link to="/login"  className="vg2-btn vg2-btn--ghost-w">Sign In</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="vg2-footer">
        <div className="vg2-footer__inner">
          <div className="vg2-footer__brand">
            <span>EMA StudyGate</span>
            <p>Empowering students to study abroad — free forever.</p>
          </div>
          <div className="vg2-footer__links">{navLinks.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}</div>
          <p className="vg2-footer__copy">© 2025 EMA Study Gate · All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default VisaGuide;