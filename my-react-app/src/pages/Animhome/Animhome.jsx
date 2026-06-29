  import React, { useState, useEffect, useRef } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
import logo from "../../components/assets/finallogo.jpeg";
  import {
    University,
    Banknote,
    Bot,
    Stamp,
    ClipboardList,
    Bell,
    UserCircle,
    SlidersHorizontal,
    Target,
    Rocket,
    Search,
    Star,
    ShieldCheck,
    Gift,
    Cpu,
    Globe,
    GraduationCap,
    CalendarDays,
    ArrowRight,
    Mail,
    Phone,
    MapPin,
  } from 'lucide-react';
  import './Animhome.css';

  const services = [
    { icon: <University size={28} />,    title: 'University Finder',   desc: 'Search and filter 500+ universities by country, field, ranking and tuition. Find your perfect match.',     link: '/StudyDestinations', cta: 'Browse Universities' },
    { icon: <Banknote size={28} />,      title: 'Scholarships',         desc: 'Discover fully funded and partial scholarships tailored to your profile, eligibility and target country.', link: '/Scholarship',        cta: 'Find Scholarships' },
    { icon: <Stamp size={28} />,         title: 'Visa Guidance',        desc: 'Step-by-step visa guides for Canada, UK, Australia, Germany and more. Never miss a requirement.',          link: '/VisaGuide',          cta: 'Get Visa Help' },
    { icon: <ClipboardList size={28} />, title: 'Document Checklist',   desc: 'Get a personalised checklist of all required documents. Upload, track and manage everything in one place.', link: '/login',             cta: 'Start Checklist' },
    { icon: <Bot size={28} />,           title: 'AI Chat Support',      desc: 'Our AI assistant answers your study-abroad questions 24/7 — instant, accurate, and always available.',     link: '/login',              cta: 'Chat Now' },
    { icon: <Bell size={28} />,          title: 'Deadline Reminders',   desc: 'Set reminders for application deadlines and scholarship cutoffs. Never miss an important date again.',      link: '/login',              cta: 'Set Reminders' },
  ];

  const steps = [
    { num: '01', title: 'Create Your Profile',   desc: 'Sign up free and complete your academic profile with GPA, IELTS score, target country and budget.', icon: <UserCircle size={24} /> },
    { num: '02', title: 'Search & Filter',        desc: 'Browse universities and scholarships using smart filters. Compare options side-by-side easily.',     icon: <SlidersHorizontal size={24} /> },
    { num: '03', title: 'Get Personalised Plan',  desc: 'AI generates a 12-month study plan with deadlines, documents needed and scholarship matches.',       icon: <Target size={24} /> },
    { num: '04', title: 'Apply with Confidence',  desc: 'Follow your roadmap, upload documents, track applications and get visa guidance — all in one place.', icon: <Rocket size={24} /> },
  ];

  

  // const testimonials = [
  //   { name: 'Fatima Zahra',  role: 'Now studying in Canada 🇨🇦',   text: 'EMA Study Gate helped me find and apply for the University of Toronto in just 3 months. The visa guidance saved me so much time!',  avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Fatima', rating: 5 },
  //   { name: 'Ahmed Khan',    role: 'Chevening Scholar, UK 🇬🇧',    text: 'I won the Chevening Scholarship using the platform deadline reminders and SOP tips. Absolutely changed my life.',                     avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=AhmedK', rating: 5 },
  //   { name: 'Sara Malik',    role: 'DAAD Scholar, Germany 🇩🇪',    text: 'The document checklist was incredibly detailed. I never missed a single requirement. Highly recommend to every student.',             avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=SaraM',  rating: 5 },
  //   { name: 'Bilal Hussain', role: 'Now studying in Australia 🇦🇺', text: 'The AI chatbot answered my visa questions at 2am before my interview. This platform is available when consultants are not.',          avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=BilalH', rating: 5 },
  // ];

  // const statsData = [
  //   { val: '500+',   label: 'Universities',     icon: <University size={22} /> },
  //   { val: '80+',    label: 'Scholarships',      icon: <Banknote size={22} /> },
  //   { val: '1,200+', label: 'Students Helped',   icon: <GraduationCap size={22} /> },
  //   { val: '30+',    label: 'Countries',         icon: <Globe size={22} /> },
  //   { val: '100%',   label: 'Free for Students', icon: <Gift size={22} /> },
  //   { val: '24/7',   label: 'AI Support',        icon: <Bot size={22} /> },
  // ];

  const navLinks = [
    { label: 'Home',         to: '/' },
    { label: 'Universities', to: '/StudyDestinations' },
    { label: 'Scholarships', to: '/Scholarship' },
    { label: 'Visa Guide',   to: '/VisaGuide' },
    { label: 'Contact',      to: '/ContactUs' },
  ];

  const tagColors = {
    'Fully Funded': { background: '#e8f8ef', color: '#1a7a3a' },
    'Prestigious':  { background: '#eef4ff', color: '#1a5cb0' },
    'Local':        { background: '#fff4e6', color: '#a04000' },
  };

  function useReveal(threshold = 0.12) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
        { threshold }
      );
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
  }

  const Home = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen]       = useState(false);
    const [scrolled, setScrolled]       = useState(false);
    const [search, setSearch]           = useState('');
    const [activeTesti, setActiveTesti] = useState(0);

    useEffect(() => {
      const fn = () => setScrolled(window.scrollY > 60);
      window.addEventListener('scroll', fn);
      return () => window.removeEventListener('scroll', fn);
    }, []);

    
    const [statsRef,  statsVis]  = useReveal();
    const [svcRef,    svcVis]    = useReveal();
    const [stepsRef,  stepsVis]  = useReveal();
    const [schRef,    schVis]    = useReveal();
    const [testiRef,  testiVis]  = useReveal();
    const [ctaRef,    ctaVis]    = useReveal();

    const handleSearch = (e) => {
      e.preventDefault();
      navigate(`/StudyDestinations`);
    };

    const trustBadges = [
      { icon: <Gift size={13} />,        label: 'Free Forever' },
      { icon: <ShieldCheck size={13} />, label: 'Verified Info' },
      { icon: <Bot size={13} />,         label: 'AI Powered' },
      { icon: <ShieldCheck size={13} />, label: 'Secure' },
    ];

    return (
      <div className="hp-root">

        {/* ══ NAVBAR ══ */}
        <nav className={`hp-nav${scrolled ? ' hp-nav--scrolled' : ''}`}>
          <div className="hp-nav__inner">
            <Link to="/" className="hp-nav__brand">
             <div className="hp-nav__logo-icon">
    <img src={logo} alt="EMA StudyGate Logo" className="hp-logo" />
</div>
              <span>EMA <strong>StudyGate</strong></span>
            </Link>

            <ul className={`hp-nav__links${menuOpen ? ' hp-nav__links--open' : ''}`}>
              {navLinks.map(l => (
                <li key={l.to}><Link to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</Link></li>
              ))}
            </ul>

            <div className="hp-nav__auth">
              <Link to="/login"  className="hp-nav__login">Login</Link>
              <Link to="/signup" className="hp-nav__signup">Get Started</Link>
            </div>

            <button className={`hp-nav__burger${menuOpen ? ' hp-nav__burger--open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* ══ HERO ══ */}
        <section className="hp-hero">
          <div className="hp-hero__bg">
            <div className="hp-hero__orb hp-hero__orb--1" />
            <div className="hp-hero__orb hp-hero__orb--2" />
            <div className="hp-hero__orb hp-hero__orb--3" />
            <div className="hp-hero__grid" />
          </div>

          <div className="hp-hero__content">
            <div className="hp-hero__badge">
              <span className="hp-hero__badge-dot" />
              Trusted by 1,200+ students worldwide
            </div>

            <h1 className="hp-hero__title">
              Your Gateway to<br />
              <span className="hp-hero__highlight">Study Abroad</span><br />
              Made Simple
            </h1>

            <p className="hp-hero__sub">
              Find universities, scholarships, and visa guidance — all in one free platform.
              No consultants. No fees. Just your dreams, supported.
            </p>

            <form className="hp-hero__search" onSubmit={handleSearch}>
              <Search size={16} />
              <input
                placeholder="Search universities, countries, or programs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>

            <div className="hp-hero__ctas">
              <Link to="/signup" className="hp-btn hp-btn--primary hp-btn--lg">Get Started Free <ArrowRight size={16} /></Link>
              <Link to="/StudyDestinations" className="hp-btn hp-btn--ghost hp-btn--lg">Browse Universities</Link>
            </div>

            <div className="hp-hero__trust">
              {trustBadges.map(t => (
                <span key={t.label}>{t.icon} {t.label}</span>
              ))}
            </div>
          </div>

          {/* Floating cards */}
          <div className="hp-hero__floats">
            <div className="hp-float-card hp-float-card--1">
              <University size={20} />
              <div><p>University of Toronto</p><small>Canada · Rank #18</small></div>
            </div>
            <div className="hp-float-card hp-float-card--2">
              <Banknote size={20} />
              <div><p>Chevening Scholarship</p><small>UK · Full Funding</small></div>
            </div>
           
            <div className="hp-float-card hp-float-card--4">
              <GraduationCap size={20} />
              <div><p>Study Plan Ready</p><small>12-month roadmap</small></div>
            </div>
          </div>

          <div className="hp-hero__scroll">
            <div className="hp-hero__scroll-dot" />
          </div>
        </section>

       

        {/* ══ SERVICES ══ */}
        <section ref={svcRef} className={`hp-services hp-section${svcVis ? ' hp-section--in' : ''}`}>
          <div className="hp-section-hdr">
            <p className="hp-eyebrow">Everything you need</p>
            <h2>Our Services</h2>
            <p className="hp-section-sub">One platform for every step of your study abroad journey</p>
          </div>
          <div className="hp-services__grid">
            {services.map((s, i) => (
              <div key={i} className="hp-svc-card" style={{ animationDelay:`${i * 0.09}s` }} onClick={() => navigate(s.link)}>
                <div className="hp-svc-card__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="hp-svc-card__cta">{s.cta} <ArrowRight size={13} /></span>
              </div>
            ))}
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section ref={stepsRef} className={`hp-steps hp-section${stepsVis ? ' hp-section--in' : ''}`}>
          <div className="hp-steps__bg" />
          <div className="hp-section-hdr hp-section-hdr--light">
            <p className="hp-eyebrow hp-eyebrow--light">Simple process</p>
            <h2 className="hp-title--light">How It Works</h2>
            <p className="hp-section-sub hp-section-sub--light">From dream to destination in 4 simple steps</p>
          </div>
          <div className="hp-steps__row">
            {steps.map((s, i) => (
              <div key={i} className="hp-step" style={{ animationDelay:`${i * 0.13}s` }}>
                <div className="hp-step__bubble">
                  <span className="hp-step__num">{s.num}</span>
                  <span className="hp-step__emoji">{s.icon}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                {i < steps.length - 1 && <div className="hp-step__arrow"><ArrowRight size={18} /></div>}
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'40px'}}>
            <Link to="/signup" className="hp-btn hp-btn--white hp-btn--lg">Start Your Journey Free <ArrowRight size={16} /></Link>
          </div>
        </section>

       

       

        {/* ══ CTA BANNER ══ */}
        <section ref={ctaRef} className={`hp-cta${ctaVis ? ' hp-cta--in' : ''}`}>
          <div className="hp-cta__orb hp-cta__orb--1" />
          <div className="hp-cta__orb hp-cta__orb--2" />
          <div className="hp-cta__inner">
            <h2>Ready to Start Your Study Abroad Journey?</h2>
            <p>Join 1,200+ students who found their path with EMA Study Gate. 100% free. No consultants needed.</p>
            <div className="hp-cta__btns">
              <Link to="/signup" className="hp-btn hp-btn--white hp-btn--lg">Create Free Account <ArrowRight size={16} /></Link>
              <Link to="/StudyDestinations" className="hp-btn hp-btn--ghost-white hp-btn--lg">Explore Universities</Link>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="hp-footer">
          <div className="hp-footer__top">
            <div className="hp-footer__brand">
              <div className="hp-footer__logo">
                <div className="hp-nav__logo-icon" style={{width:'34px',height:'34px'}}>
                  <svg width="18" height="14" viewBox="0 0 28 22" fill="none">
                    <path d="M2 2H10L14 8L18 2H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 11H26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M2 20H10L14 14L18 20H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>EMA StudyGate</span>
              </div>
              <p>Empowering students to achieve their dreams of studying abroad with ease, confidence and zero cost.</p>
              <div className="hp-footer__socials">
                {['f','t','in'].map(s => <a key={s} href="#">{s}</a>)}
              </div>
            </div>
            <div className="hp-footer__col">
              <h4>Quick Links</h4>
              <Link to="/">Home</Link>
              <Link to="/StudyDestinations">Find Universities</Link>
              <Link to="/Scholarship">Scholarships</Link>
              <Link to="/VisaGuide">Visa Guidance</Link>
              <Link to="/ContactUs">Contact Us</Link>
            </div>
            <div className="hp-footer__col">
              <h4>Student Tools</h4>
              <Link to="/login">Dashboard</Link>
              <Link to="/login">Document Checklist</Link>
              <Link to="/login">Study Plan Generator</Link>
              <Link to="/login">AI Chatbot</Link>
              <Link to="/login">Deadline Reminders</Link>
            </div>
            <div className="hp-footer__col">
              <h4>Contact</h4>
              <a href="mailto:info@emastudygate.com"><Mail size={13} /> info@emastudygate.com</a>
              <a href="tel:+923328989765"><Phone size={13} /> +92 332-8989765</a>
              <span><MapPin size={13} /> Jhelum, Punjab, Pakistan</span>
              <Link to="/admin/login" style={{opacity:0.4,fontSize:'11px'}}>Admin Login</Link>
            </div>
          </div>
          <div className="hp-footer__bottom">
            <span>© 2025 EMA Study Gate · All Rights Reserved</span>
            <span>Built by students, for students · IT Dept, GPC Jhelum</span>
          </div>
        </footer>

      </div>
    );
  };

  export default Home;