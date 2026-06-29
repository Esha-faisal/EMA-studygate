import React, { useState } from 'react';
import NavbarDashboard from '../../components/dashboard/NavbarDashboard';
import Sidebar from '../../components/dashboard/Sidebar';
import './UserVisaGuide.css';
// react icons 
import {
  HiOutlineSearch,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineLightBulb,
  HiOutlineClock,
  HiOutlineExclamationCircle
} from "react-icons/hi";

import {
  FaFileAlt,
  FaPhoneAlt
} from "react-icons/fa";

const countries = [
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    visaType: 'National Visa (Study)',
    processingTime: '6–12 weeks',
    fee: '€75',
    validity: '3 months (extended on arrival)',
    color: 'yellow',
    steps: [
      { step: 1, title: 'University Admission',      desc: 'Get admission from a German university such as TU Munich, University of Stuttgart, TU Berlin, FAU Erlangen-Nürnberg, University of Hamburg, University of Ulm, or Frankfurt University of Applied Sciences.' },
      { step: 2, title: 'Open Blocked Account',      desc: 'Open a blocked account with €934/month (€11,208/year) at a German bank such as Fintiba or Expatrio.' },
      { step: 3, title: 'Apply at German Embassy',   desc: 'Book appointment at the German Embassy/Consulate in your country.' },
      { step: 4, title: 'Attend Interview',          desc: 'Attend the visa appointment with all original documents.' },
      { step: 5, title: 'Receive Visa',              desc: 'Receive a 3-month entry visa. Extend to a residence permit on arrival.' },
      { step: 6, title: 'Register in Germany',       desc: 'Register your address at the local Einwohnermeldeamt within 2 weeks of arrival.' },
    ],
    documents: ['Valid Passport', 'University Admission Letter', 'Blocked Account Proof (€11,208+)', 'Health Insurance', 'IELTS/German Language Proof', 'Academic Certificates (Notarized)', 'CV / Motivation Letter', 'Passport-size Photos (Biometric)'],
    tips: ['Open a blocked account at Fintiba or Expatrio early.', 'German universities often require APS certificate from Pakistan.', 'Health insurance is mandatory — get recognized German coverage.'],
  },
  {
    id: 'england',
    name: 'England (UK)',
    flag: '🇬🇧',
    visaType: 'Student Visa (Tier 4)',
    processingTime: '3–4 weeks',
    fee: '£490',
    validity: 'Course length + extra time',
    color: 'blue',
    steps: [
      { step: 1, title: 'Receive CAS Number',           desc: 'Your university (Oxford, Cambridge, Liverpool, Southampton, Brunel, Bradford, Lincoln, or Leeds Beckett) will issue a Confirmation of Acceptance for Studies (CAS) number.' },
      { step: 2, title: 'Check Financial Requirements', desc: 'Prove you have enough funds: £1,334/month for London, £1,023/month elsewhere.' },
      { step: 3, title: 'Apply Online (UKVI)',           desc: 'Apply on the UK Visas & Immigration portal up to 6 months before course start.' },
      { step: 4, title: 'Pay IHS Surcharge',            desc: 'Pay the Immigration Health Surcharge (IHS) for NHS access.' },
      { step: 5, title: 'Attend Biometrics',            desc: 'Visit a UKVCAS centre to provide biometric information.' },
      { step: 6, title: 'Collect BRP',                  desc: 'Collect your Biometric Residence Permit (BRP) after arriving in the UK.' },
    ],
    documents: ['Valid Passport', 'CAS Number from University', 'Bank Statements (28 days consecutive)', 'ATAS Certificate (if required)', 'English Language Proof (IELTS 6.0+)', 'Tuberculosis Test Results', 'Academic Transcripts', 'Passport-size Photos'],
    tips: ['Apply no more than 6 months before course start.', 'Bank statements must show continuous funds for 28 days.', 'Check if your course requires ATAS clearance.'],
  },
  {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    visaType: 'Student Visa (Type D)',
    processingTime: '4–8 weeks',
    fee: '€50',
    validity: 'Duration of course',
    color: 'green',
    steps: [
      { step: 1, title: 'University Admission',      desc: 'Get an offer from a university such as University of Bologna, Florence, Pavia, Genoa, Turin, Milan, or Sapienza Università di Roma.' },
      { step: 2, title: 'Pre-Enrolment (if required)', desc: 'Complete pre-enrolment at the Italian Embassy or consulate in your home country.' },
      { step: 3, title: 'Apply for Student Visa',    desc: 'Submit your Type D student visa application at the Italian Embassy with all required documents.' },
      { step: 4, title: 'Attend Visa Interview',     desc: 'Attend your appointment with original documents and pay the visa fee.' },
      { step: 5, title: 'Receive Visa',              desc: 'Collect your visa. Processing typically takes 4–8 weeks.' },
      { step: 6, title: 'Apply for Residence Permit', desc: 'Within 8 days of arriving in Italy, apply for a Permesso di Soggiorno at the local post office.' },
    ],
    documents: ['Valid Passport', 'University Admission/Enrollment Letter', 'Proof of Financial Means (€448.50/month)', 'Health Insurance', 'IELTS/Italian Language Proof', 'Academic Transcripts (Translated & Notarized)', 'Passport-size Photos', 'Accommodation Proof'],
    tips: ['Apply for your visa at least 3 months before the course starts.', 'Sapienza and University of Bologna offer many English-taught programs.', 'Italian tuition fees are income-based and can be very low or even waived.'],
  },
  {
    id: 'finland',
    name: 'Finland',
    flag: '🇫🇮',
    visaType: 'Residence Permit (Study)',
    processingTime: '4–8 weeks',
    fee: '€350',
    validity: 'Duration of study',
    color: 'blue',
    steps: [
      { step: 1, title: 'University Admission',      desc: 'Get admission from a Finnish university such as University of Helsinki, Aalto University, University of Turku, University of Oulu, Tampere University, University of Jyväskylä, UEF, or University of Lapland.' },
      { step: 2, title: 'Apply Online (EnterFinland)', desc: 'Submit your residence permit application through the EnterFinland online portal.' },
      { step: 3, title: 'Book Biometrics Appointment', desc: 'Schedule an appointment at the Finnish Embassy or VFS Global service point in your country.' },
      { step: 4, title: 'Attend Appointment',        desc: 'Visit the embassy with your application, documents, and pay the permit fee.' },
      { step: 5, title: 'Wait for Decision',         desc: 'Processing typically takes 4–8 weeks. Track your application via EnterFinland.' },
      { step: 6, title: 'Collect Residence Permit Card', desc: 'Pick up your residence permit card from the Finnish Immigration Service (Migri) after arriving in Finland.' },
    ],
    documents: ['Valid Passport', 'University Admission Letter', 'Proof of Financial Means (€560/month)', 'Health Insurance', 'English Language Proof (IELTS 6.0+)', 'Academic Transcripts', 'Passport-size Photos', 'Completed Application Form'],
    tips: ['Apply as early as possible — Finnish universities have limited seats.', 'Aalto University and University of Helsinki are top-ranked and highly competitive.', 'Finland offers tuition-free education for EU/EEA citizens — non-EU students pay fees of €8,000–€18,000/yr.'],
  },
];

const UserVisaGuide = () => {
  const [selected, setSelected]     = useState('germany');
  const [activeTab, setActiveTab]   = useState('steps');
  const [search, setSearch]         = useState('');

  const country = countries.find(c => c.id === selected);
  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="vg-root">
      <NavbarDashboard />
      <div className="vg-body">
        <Sidebar />
        <main className="vg-main">

          {/* Header */}
          <div className="vg-header">
            <div>
              <h1 className="vg-header__title">Visa Guidance</h1>
              <p className="vg-header__sub">Step-by-step visa guides for top study destinations</p>
            </div>
          </div>

          <div className="vg-layout">
            {/* Country Selector Panel */}
            <aside className="vg-sidebar">
              <div className="vg-sidebar__search">
                <span><HiOutlineSearch /></span>
                <input
                  placeholder="Search country..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="vg-country-list">
                {filtered.map(c => (
                  <button
                    key={c.id}
                    className={`vg-country-btn${selected === c.id ? ' vg-country-btn--active' : ''}`}
                    onClick={() => { setSelected(c.id); setActiveTab('steps'); }}
                  >
                    <span className="vg-country-btn__flag">{c.flag}</span>
                    <div>
                      <p className="vg-country-btn__name">{c.name}</p>
                      <p className="vg-country-btn__visa">{c.visaType}</p>
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            {/* Content Panel */}
            <div className="vg-content">
              {/* Country Hero */}
              <div className={`vg-hero vg-hero--${country.color}`}>
                <div className="vg-hero__left">
                  <span className="vg-hero__flag">{country.flag}</span>
                  <div>
                    <h2 className="vg-hero__name">{country.name}</h2>
                    <p className="vg-hero__visa">{country.visaType}</p>
                  </div>
                </div>
                <div className="vg-hero__stats">
                  <div className="vg-hero__stat">
                    <p className="vg-hero__stat-val">{country.fee}</p>
                    <p className="vg-hero__stat-label">Visa Fee</p>
                  </div>
                  <div className="vg-hero__stat">
                    <p className="vg-hero__stat-val">{country.processingTime}</p>
                    <p className="vg-hero__stat-label">Processing Time</p>
                  </div>
                  <div className="vg-hero__stat">
                    <p className="vg-hero__stat-val"><HiOutlineClock /></p>
                    <p className="vg-hero__stat-label">{country.validity}</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="vg-tabs">
                {['steps', 'documents', 'tips'].map(t => (
                  <button
                    key={t}
                    className={`vg-tab${activeTab === t ? ' vg-tab--active' : ''}`}
                    onClick={() => setActiveTab(t)}
                  >
                    {t === 'steps' 
      ? <><HiOutlineClipboardList /> Step-by-Step</> 
      : t === 'documents' 
      ? <><HiOutlineDocumentText /> Required Docs</> 
      : <><HiOutlineLightBulb /> Pro Tips</>
    }
                  </button>
                ))}
              </div>

              {/* Steps */}
              {activeTab === 'steps' && (
                <div className="vg-steps">
                  {country.steps.map((s, i) => (
                    <div key={s.step} className="vg-step">
                      <div className="vg-step__num">{s.step}</div>
                      <div className="vg-step__line" style={{ opacity: i < country.steps.length - 1 ? 1 : 0 }} />
                      <div className="vg-step__content">
                        <h4 className="vg-step__title">{s.title}</h4>
                        <p className="vg-step__desc">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Documents */}
              {activeTab === 'documents' && (
                <div className="vg-documents">
                  <p className="vg-documents__intro">
                    You will need all of the following documents to apply for a {country.name} student visa:
                  </p>
                  <div className="vg-doc-list">
                    {country.documents.map((doc, i) => (
                      <div key={i} className="vg-doc-item">
                        <span className="vg-doc-item__icon"><FaFileAlt /></span>
                        <span className="vg-doc-item__text">{doc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="vg-documents__note">
                    <HiOutlineExclamationCircle /> Requirements may change. Always verify on the official embassy/consulate website before applying.
                  </div>
                </div>
              )}

              {/* Tips */}
              {activeTab === 'tips' && (
                <div className="vg-tips">
                  {country.tips.map((tip, i) => (
                    <div key={i} className="vg-tip-card">
                      <span className="vg-tip-card__num"><HiOutlineLightBulb /> {i + 1}</span>
                      <p className="vg-tip-card__text">{tip}</p>
                    </div>
                  ))}
                  <div className="vg-tip-card vg-tip-card--info">
                    <span className="vg-tip-card__num"><FaPhoneAlt /></span>
                    <p className="vg-tip-card__text">
                      Need personal guidance? Use the <strong>AI Chatbot</strong> on the dashboard or contact our team directly for expert help with your visa application.
                    </p>
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

export default UserVisaGuide;