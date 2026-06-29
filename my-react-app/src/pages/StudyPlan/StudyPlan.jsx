import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarDashboard from '../../components/dashboard/NavbarDashboard';
import Sidebar from '../../components/dashboard/Sidebar';
import './StudyPlan.css';

import {
  GraduationCap,
  Globe,
  Wallet,
  Target,
  RefreshCw,
  Printer,
  FileText,
  Landmark,
  BadgeDollarSign,
  CalendarDays,
  ClipboardList,
  Upload,
  Check,
  Sparkles,
  Loader2,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

/* ── Step config ── */
const STEPS = [
  { id: 1, label: 'Academic Background' },
  { id: 2, label: 'Study Preferences'   },
  { id: 3, label: 'Timeline & Budget'   },
  { id: 4, label: 'Your Study Plan'     },
];

/* ── Mock generated plan ── */
const generatePlan = (data) => ({
  universities: [
    { name: 'Technical University of Munich',     country: 'Germany',  flag: '🇩🇪', match: 94, tuition: '€500/sem',   deadline: 'May 31, 2026', reason: 'Strong match for your GPA and field.' },
    { name: 'Oxford University',                  country: 'England',  flag: '🇬🇧', match: 88, tuition: '£37,510/yr', deadline: 'Oct 15, 2025', reason: 'Great research opportunities in your area.' },
    { name: 'Aalto University',                   country: 'Finland',  flag: '🇫🇮', match: 82, tuition: '€15,000/yr', deadline: 'Jan 20, 2026', reason: 'Affordable fees matching your budget.' },
  ],
  scholarships: [
    { name: 'Chevening Scholarship', amount: 'Full Funding',  deadline: 'Nov 5, 2025',  match: 91 },
    { name: 'DAAD Scholarship',      amount: '€861/month',    deadline: 'Oct 31, 2025', match: 85 },
    { name: 'Erasmus Mundus',        amount: '€1,400/month',  deadline: 'Jan 15, 2026', match: 78 },
  ],
  timeline: [
    { month: 'Now – Month 2',   task: 'Complete IELTS preparation and target 7.0+ band score' },
    { month: 'Month 3',         task: 'Finalize university shortlist and request transcripts' },
    { month: 'Month 4',         task: 'Write Statement of Purpose (SOP) drafts' },
    { month: 'Month 5',         task: 'Request Letters of Recommendation from professors' },
    { month: 'Month 6',         task: 'Submit scholarship applications (Chevening, DAAD)' },
    { month: 'Month 7–8',       task: 'Submit university applications before deadlines' },
    { month: 'Month 9–10',      task: 'Await decisions and prepare visa documents' },
    { month: 'Month 11–12',     task: 'Apply for student visa and arrange accommodation' },
  ],
  documents: [
    { name: 'Academic Transcripts',         status: 'pending' },
    { name: 'IELTS Score Card',             status: 'pending' },
    { name: 'Statement of Purpose (SOP)',   status: 'pending' },
    { name: '2 Letters of Recommendation', status: 'pending' },
    { name: 'Valid Passport',               status: 'pending' },
    { name: 'Financial Documents',          status: 'pending' },
  ],
});

const StudyPlan = () => {
  const navigate = useNavigate();
  const [step, setStep]             = useState(1);
  const [plan, setPlan]             = useState(null);
  const [generating, setGenerating] = useState(false);

  const [formData, setFormData] = useState({
    degreeLevel:   'masters',
    fieldOfStudy:  '',
    currentGpa:    '',
    ieltsScore:    '',
    institution:   '',
    targetCountry: 'germany',
    studyField:    '',
    programType:   'fulltime',
    intake:        'fall2026',
    budget:        '20000',
    selfFunded:    'partial',
    timeline:      '12months',
    workExperience:'1-2',
  });

  const update = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setPlan(generatePlan(formData));
      setGenerating(false);
      setStep(4);
    }, 2200);
  };

  const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="sp-root">
      <NavbarDashboard />
      <div className="sp-body">
        <Sidebar />
        <main className="sp-main">

          {/* Header */}
          <div className="sp-header">
            <div>
              <h1 className="sp-header__title">Personalized Study Plan</h1>
              <p className="sp-header__sub">Answer a few questions — get a tailored roadmap for studying abroad</p>
            </div>
            {plan && (
              <button className="sp-btn sp-btn--outline" onClick={() => { setStep(1); setPlan(null); }}>
                <RefreshCw size={14} style={{ marginRight: 6 }} /> Regenerate Plan
              </button>
            )}
          </div>

          {/* Step Progress */}
          <div className="sp-progress">
            <div className="sp-progress__bar">
              <div className="sp-progress__fill" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="sp-progress__steps">
              {STEPS.map(s => (
                <div
                  key={s.id}
                  className={`sp-progress__step${step >= s.id ? ' sp-progress__step--done' : ''}${step === s.id ? ' sp-progress__step--active' : ''}`}
                >
                  <div className="sp-progress__step-dot">
                    {step > s.id ? <Check size={12} /> : s.id}
                  </div>
                  <span className="sp-progress__step-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── STEP 1: Academic Background ── */}
          {step === 1 && (
            <div className="sp-card sp-card--anim">
              <div className="sp-card__icon-header">
                <GraduationCap size={32} />
              </div>
              <h2 className="sp-card__title">Tell us about your academic background</h2>
              <p className="sp-card__sub">This helps us find universities that match your qualifications</p>

              <div className="sp-form">
                <div className="sp-field">
                  <label>Degree Level You're Applying For</label>
                  <div className="sp-radio-group">
                    {[['bachelors', "Bachelor's"], ['masters', "Master's"], ['phd', 'PhD']].map(([val, lbl]) => (
                      <label key={val} className={`sp-radio${formData.degreeLevel === val ? ' sp-radio--active' : ''}`}>
                        <input type="radio" name="degreeLevel" value={val} checked={formData.degreeLevel === val} onChange={() => update('degreeLevel', val)} />
                        {lbl}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="sp-grid-2">
                  <div className="sp-field">
                    <label>Current / Last Institution</label>
                    <input placeholder="e.g. University of Punjab" value={formData.institution} onChange={e => update('institution', e.target.value)} />
                  </div>
                  <div className="sp-field">
                    <label>Field of Study</label>
                    <input placeholder="e.g. Computer Science" value={formData.fieldOfStudy} onChange={e => update('fieldOfStudy', e.target.value)} />
                  </div>
                  <div className="sp-field">
                    <label>Current GPA (out of 4.0)</label>
                    <input type="number" step="0.01" min="0" max="4" placeholder="e.g. 3.5" value={formData.currentGpa} onChange={e => update('currentGpa', e.target.value)} />
                  </div>
                  <div className="sp-field">
                    <label>IELTS / TOEFL Score</label>
                    <input placeholder="e.g. 7.0 or N/A" value={formData.ieltsScore} onChange={e => update('ieltsScore', e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="sp-card__footer">
                <button className="sp-btn sp-btn--primary" onClick={() => setStep(2)}>
                  Continue <ChevronRight size={15} style={{ marginLeft: 4 }} />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Study Preferences ── */}
          {step === 2 && (
            <div className="sp-card sp-card--anim">
              <div className="sp-card__icon-header">
                <Globe size={32} />
              </div>
              <h2 className="sp-card__title">Where and what do you want to study?</h2>
              <p className="sp-card__sub">We'll find matching programs at top universities</p>

              <div className="sp-form">
                <div className="sp-field">
                  <label>Preferred Country</label>
                  <div className="sp-country-grid">
                    {[
                      ['germany', '🇩🇪', 'Germany'],
                      ['england', '🇬🇧', 'England'],
                      ['italy',   '🇮🇹', 'Italy'],
                      ['finland', '🇫🇮', 'Finland'],
                      ['any',     null,  'Any Country'],
                    ].map(([val, flag, lbl]) => (
                      <button
                        key={val}
                        className={`sp-country-btn${formData.targetCountry === val ? ' sp-country-btn--active' : ''}`}
                        onClick={() => update('targetCountry', val)}
                      >
                        {flag
                          ? <span>{flag}</span>
                          : <Globe size={16} style={{ marginRight: 4 }} />
                        }
                        {' '}{lbl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sp-grid-2">
                  <div className="sp-field">
                    <label>Intended Field of Study Abroad</label>
                    <select value={formData.studyField} onChange={e => update('studyField', e.target.value)}>
                      <option value="">Select field...</option>
                      {['Computer Science','Business & Management','Engineering','Medicine','Law','Data Science','Architecture','Finance','Education','Other'].map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sp-field">
                    <label>Program Type</label>
                    <select value={formData.programType} onChange={e => update('programType', e.target.value)}>
                      <option value="fulltime">Full-time</option>
                      <option value="parttime">Part-time</option>
                      <option value="online">Online / Hybrid</option>
                    </select>
                  </div>
                  <div className="sp-field">
                    <label>Target Intake</label>
                    <select value={formData.intake} onChange={e => update('intake', e.target.value)}>
                      <option value="fall2025">Fall 2025</option>
                      <option value="spring2026">Spring 2026</option>
                      <option value="fall2026">Fall 2026</option>
                      <option value="spring2027">Spring 2027</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="sp-card__footer">
                <button className="sp-btn sp-btn--ghost" onClick={() => setStep(1)}>
                  <ChevronLeft size={15} style={{ marginRight: 4 }} /> Back
                </button>
                <button className="sp-btn sp-btn--primary" onClick={() => setStep(3)}>
                  Continue <ChevronRight size={15} style={{ marginLeft: 4 }} />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Timeline & Budget ── */}
          {step === 3 && (
            <div className="sp-card sp-card--anim">
              <div className="sp-card__icon-header">
                <Wallet size={32} />
              </div>
              <h2 className="sp-card__title">Your timeline and financial situation</h2>
              <p className="sp-card__sub">We'll find scholarships and universities that fit your budget</p>

              <div className="sp-form">
                <div className="sp-grid-2">
                  <div className="sp-field">
                    <label>Annual Budget (USD)</label>
                    <input type="number" placeholder="e.g. 20000" value={formData.budget} onChange={e => update('budget', e.target.value)} />
                    <span className="sp-field__hint">Tuition + living expenses per year</span>
                  </div>
                  <div className="sp-field">
                    <label>Funding Type</label>
                    <select value={formData.selfFunded} onChange={e => update('selfFunded', e.target.value)}>
                      <option value="self">Fully Self-Funded</option>
                      <option value="partial">Partial — Seeking Scholarship</option>
                      <option value="scholarship">Need Full Scholarship</option>
                    </select>
                  </div>
                  <div className="sp-field">
                    <label>How soon are you planning to apply?</label>
                    <select value={formData.timeline} onChange={e => update('timeline', e.target.value)}>
                      <option value="3months">Within 3 months</option>
                      <option value="6months">Within 6 months</option>
                      <option value="12months">Within 12 months</option>
                      <option value="later">More than a year</option>
                    </select>
                  </div>
                  <div className="sp-field">
                    <label>Work Experience</label>
                    <select value={formData.workExperience} onChange={e => update('workExperience', e.target.value)}>
                      <option value="none">No experience</option>
                      <option value="less1">Less than 1 year</option>
                      <option value="1-2">1–2 years</option>
                      <option value="3+">3+ years</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="sp-card__footer">
                <button className="sp-btn sp-btn--ghost" onClick={() => setStep(2)}>
                  <ChevronLeft size={15} style={{ marginRight: 4 }} /> Back
                </button>
                <button className="sp-btn sp-btn--generate" onClick={handleGenerate} disabled={generating}>
                  {generating ? (
                    <><Loader2 size={15} className="sp-spinner" style={{ marginRight: 6 }} /> Generating your plan...</>
                  ) : (
                    <><Sparkles size={15} style={{ marginRight: 6 }} /> Generate My Study Plan</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4: Generated Plan ── */}
          {step === 4 && plan && (
            <div className="sp-plan sp-card--anim">

              {/* Plan hero */}
              <div className="sp-plan__hero">
                <div className="sp-plan__hero-left">
                  <span className="sp-plan__hero-icon">
                    <Target size={28} />
                  </span>
                  <div>
                    <h2 className="sp-plan__hero-title">Your Personalized Study Plan</h2>
                    <p className="sp-plan__hero-sub">
                      Based on your profile — {formData.fieldOfStudy || 'your field'} · {formData.degreeLevel} · {formData.targetCountry}
                    </p>
                  </div>
                </div>
                <div className="sp-plan__hero-actions">
                  <button className="sp-btn sp-btn--outline" onClick={() => window.print()}>
                    <Printer size={14} style={{ marginRight: 6 }} /> Print Plan
                  </button>
                  <button className="sp-btn sp-btn--primary" onClick={() => navigate('/DocumentChecklist')}>
                    <FileText size={14} style={{ marginRight: 6 }} /> Start Documents
                  </button>
                </div>
              </div>

              {/* Recommended Universities */}
              <div className="sp-section">
                <h3 className="sp-section__title">
                  <Landmark size={18} style={{ marginRight: 8 }} /> Recommended Universities
                </h3>
                <div className="sp-uni-list">
                  {plan.universities.map((u, i) => (
                    <div key={i} className="sp-uni-card">
                      <div className="sp-uni-card__match-bar">
                        <div className="sp-uni-card__match-fill" style={{ width: `${u.match}%` }} />
                      </div>
                      <div className="sp-uni-card__info">
                        <div className="sp-uni-card__top">
                          <p className="sp-uni-card__name">{u.name}</p>
                          <span className="sp-uni-card__match-badge">{u.match}% match</span>
                        </div>
                        <p className="sp-uni-card__country">{u.flag} {u.country}</p>
                        <p className="sp-uni-card__reason">{u.reason}</p>
                        <div className="sp-uni-card__stats">
                          <span>
                            <Wallet size={13} style={{ marginRight: 4 }} /> {u.tuition}
                          </span>
                          <span>
                            <CalendarDays size={13} style={{ marginRight: 4 }} /> Deadline: {u.deadline}
                          </span>
                        </div>
                      </div>
                      <button className="sp-btn sp-btn--sm" onClick={() => navigate('/dashboard/find-uni')}>
                        View <ChevronRight size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scholarship Matches */}
              <div className="sp-section">
                <h3 className="sp-section__title">
                  <BadgeDollarSign size={18} style={{ marginRight: 8 }} /> Scholarship Matches
                </h3>
                <div className="sp-scholarship-list">
                  {plan.scholarships.map((s, i) => (
                    <div key={i} className="sp-scholarship-card">
                      <div className="sp-scholarship-card__left">
                        <p className="sp-scholarship-card__name">{s.name}</p>
                        <p className="sp-scholarship-card__amount">{s.amount}</p>
                      </div>
                      <div className="sp-scholarship-card__right">
                        <span className="sp-scholarship-card__match">{s.match}% match</span>
                        <span className="sp-scholarship-card__deadline">
                          <CalendarDays size={13} style={{ marginRight: 4 }} /> {s.deadline}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 12-Month Timeline */}
              <div className="sp-section">
                <h3 className="sp-section__title">
                  <CalendarDays size={18} style={{ marginRight: 8 }} /> 12-Month Action Timeline
                </h3>
                <div className="sp-timeline">
                  {plan.timeline.map((t, i) => (
                    <div key={i} className="sp-timeline-item">
                      <div className="sp-timeline-item__dot" />
                      {i < plan.timeline.length - 1 && <div className="sp-timeline-item__line" />}
                      <div className="sp-timeline-item__content">
                        <span className="sp-timeline-item__month">{t.month}</span>
                        <p className="sp-timeline-item__task">{t.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Checklist */}
              <div className="sp-section">
                <h3 className="sp-section__title">
                  <FileText size={18} style={{ marginRight: 8 }} /> Documents You Need
                </h3>
                <div className="sp-docs-grid">
                  {plan.documents.map((d, i) => (
                    <div key={i} className="sp-doc-item">
                      <span className="sp-doc-item__icon">
                        <ClipboardList size={16} />
                      </span>
                      <span className="sp-doc-item__name">{d.name}</span>
                      <span className="sp-doc-item__status">Pending</span>
                    </div>
                  ))}
                </div>
                <button className="sp-btn sp-btn--primary sp-btn--mt" onClick={() => navigate('/DocumentChecklist')}>
                  <Upload size={14} style={{ marginRight: 6 }} /> Upload Documents
                </button>
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default StudyPlan;