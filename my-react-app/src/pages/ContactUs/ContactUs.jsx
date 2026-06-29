import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../components/assets/finallogo.jpeg";
import './ContactUs.css';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock,
  FaUniversity, FaMoneyBillWave, FaPassport, FaRocket,
  FaPaperPlane, FaSpinner, FaCheckCircle,
} from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';

const faqs = [
  { q: 'Is EMA Study Gate free for students?',        a: 'Yes! EMA Study Gate is 100% free for students. No hidden charges, no consultant fees — ever.' },
  { q: 'How do I search for universities?',           a: 'After creating your account, navigate to the University Finder. Use filters like country, degree level, field of study, and budget to find your perfect match.' },
  { q: 'Can I apply directly through the platform?',  a: "EMA Study Gate provides all the information, documents checklist, and guidance you need. Direct application links redirect you to the university's official portal." },
  { q: 'How accurate is the visa guidance?',          a: 'Our visa guidance is regularly updated by our admin team. We cover 30+ countries with step-by-step requirements and document lists.' },
  { q: 'How does the AI chatbot work?',               a: 'Our AI chatbot is available 24/7 to answer your study abroad questions — from scholarship eligibility to visa requirements and deadlines.' },
];

const contactInfo = [
  { icon: <FaEnvelope />,      label: 'Email Us',      value: 'info@emastudygate.com',            link: 'mailto:info@emastudygate.com' },
  { icon: <FaPhone />,         label: 'Call Us',       value: '+92 332-8989765',                   link: 'tel:+923328989765'           },
  { icon: <FaMapMarkerAlt />,  label: 'Location',      value: 'IT Dept, GGC Jhelum, Punjab, Pakistan', link: null                    },
  { icon: <FaClock />,         label: 'Support Hours', value: 'Mon–Fri: 9AM – 5PM PKT',            link: null                         },
];

const ContactUs = () => {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className="cu-root">

      {/* ── NAVBAR ── */}
      <nav className="cu-nav">
        <div className="cu-nav__inner">
          <Link to="/" className="cu-nav__brand">
          <div className="cu-nav__logo-icon">
  <img src={logo} alt="EMA StudyGate Logo" className="hp-logo" />
</div>
            {/* <div className="cu-nav__logo">
              <svg width="20" height="16" viewBox="0 0 28 22" fill="none">
                <path d="M2 2H10L14 8L18 2H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 11H26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M2 20H10L14 14L18 20H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div> */}
            <span>EMA <strong>StudyGate</strong></span>
          </Link>
          <div className="cu-nav__links">
            <Link to="/">Home</Link>
            <Link to="/StudyDestinations">Universities</Link>
            <Link to="/Scholarship">Scholarships</Link>
            <Link to="/VisaGuide">Visa Guide</Link>
            <Link to="/ContactUs" className="active">Contact</Link>
          </div>
          <div className="cu-nav__auth">
            <Link to="/login"  className="cu-nav__login">Login</Link>
            <Link to="/signup" className="cu-nav__signup">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={`cu-hero${heroVisible ? ' cu-hero--in' : ''}`}>
        <div className="cu-hero__bg">
          <div className="cu-hero__orb cu-hero__orb--1" />
          <div className="cu-hero__orb cu-hero__orb--2" />
          <div className="cu-hero__grid" />
        </div>
        <div className="cu-hero__content">
          <div className="cu-hero__badge">
            <span className="cu-hero__dot" />
            We're here to help
          </div>
          <h1>Get in <span className="cu-hero__highlight">Touch</span></h1>
          <p>Have questions about studying abroad? Our team is ready to help you every step of the way.</p>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ── */}
      <section className="cu-info">
        <div className="cu-info__grid">
          {contactInfo.map((c, i) => (
            <div key={i} className="cu-info__card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="cu-info__icon">{c.icon}</div>
              <h4>{c.label}</h4>
              {c.link
                ? <a href={c.link}>{c.value}</a>
                : <p>{c.value}</p>
              }
            </div>
          ))}
        </div>
      </section>

      {/* ── MAIN: FORM + FAQ ── */}
      <section className="cu-main">
        <div className="cu-main__inner">

          {/* FORM */}
          <div className="cu-form-wrap">
            <div className="cu-form-hdr">
              <h2>Send Us a Message</h2>
              <p>Fill out the form and we'll get back to you within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="cu-success">
                <div className="cu-success__icon"><FaCheckCircle /></div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll reply to <strong>{form.email}</strong> within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:'', email:'', subject:'', message:'' }); }}
                  className="cu-btn cu-btn--primary"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className="cu-form" onSubmit={handleSubmit}>
                <div className="cu-form__row">
                  <div className="cu-field">
                    <label>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ahmed Khan" required />
                  </div>
                  <div className="cu-field">
                    <label>Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                  </div>
                </div>
                <div className="cu-field">
                  <label>Subject *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="">Select a subject...</option>
                    <option>University Search Help</option>
                    <option>Scholarship Inquiry</option>
                    <option>Visa Guidance</option>
                    <option>Account &amp; Profile Issue</option>
                    <option>Technical Support</option>
                    <option>General Inquiry</option>
                    <option>Feedback / Suggestion</option>
                  </select>
                </div>
                <div className="cu-field">
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Describe your question or issue in detail..." rows={5} required />
                </div>
                <button
                  type="submit"
                  className={`cu-btn cu-btn--primary cu-btn--full${sending ? ' cu-btn--loading' : ''}`}
                  disabled={sending}
                >
                  {sending
                    ? <><FaSpinner className="cu-spinner" /> Sending...</>
                    : <><FaPaperPlane style={{ marginRight: 6 }} /> Send Message</>
                  }
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div className="cu-faq-wrap">
            <div className="cu-form-hdr">
              <h2>Frequently Asked Questions</h2>
              <p>Quick answers to common questions from students like you.</p>
            </div>
            <div className="cu-faq__list">
              {faqs.map((f, i) => (
                <div key={i} className={`cu-faq__item${openFaq === i ? ' cu-faq__item--open' : ''}`}>
                  <button className="cu-faq__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{f.q}</span>
                    <span className="cu-faq__arrow">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="cu-faq__a">
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div className="cu-quick">
              <h4>Quick Links</h4>
              <div className="cu-quick__grid">
                <Link to="/StudyDestinations" className="cu-quick__item">
                  <FaUniversity style={{ marginRight: 6 }} /> Find Universities
                </Link>
                <Link to="/Scholarship" className="cu-quick__item">
                  <FaMoneyBillWave style={{ marginRight: 6 }} /> Scholarships
                </Link>
                <Link to="/VisaGuide" className="cu-quick__item">
                  <FaPassport style={{ marginRight: 6 }} /> Visa Guidance
                </Link>
                <Link to="/signup" className="cu-quick__item">
                  <FaRocket style={{ marginRight: 6 }} /> Get Started
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── MAP / LOCATION BANNER ── */}
      <section className="cu-location">
        <div className="cu-location__inner">
          <div className="cu-location__text">
            <h2>Visit Our College</h2>
            <p>We're based at the IT Department, Government Graduate College, Jhelum, Punjab, Pakistan.</p>
            <p style={{ marginTop: '8px', color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>
              Approved by: <strong style={{ color: '#7eb8f7' }}>Mr. Muhammad Ikram-ul-haq</strong>
            </p>
          </div>
          <div className="cu-location__card">
            <div className="cu-location__map-placeholder">
              <div className="cu-location__pin">
                <FaMapMarkerAlt style={{ fontSize: '2rem', color: '#e74c3c' }} />
              </div>
              <p>GGC Jhelum</p>
              <small>Punjab, Pakistan</small>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="cu-footer">
        <div className="cu-footer__inner">
          <span>© 2025 EMA Study Gate · All Rights Reserved</span>
          <span>Built by students, for students · IT Dept, GGC Jhelum</span>
        </div>
      </footer>

    </div>
  );
};

export default ContactUs;