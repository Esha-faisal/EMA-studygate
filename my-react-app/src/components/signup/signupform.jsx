import React, { useState } from 'react';

import logo from "../../components/assets/finallogo.jpeg";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import {
  University,
  Banknote,
  BadgeCheck,
  Bot,
  Gift,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import './signupform.css';

const Signupform = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    country: '', degreeLevel: '', fieldOfStudy: '', agree: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [showTerms, setShowTerms] = useState(false);
const [showPrivacy, setShowPrivacy] = useState(false);

  const handleChange = e => {
  const { name, value, type, checked } = e.target;
  setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  setErrors(er => ({ ...er, [name]: '' }));
};

  const handleSubmit = async () => {
  const e = validateStep2();
  if (Object.keys(e).length) { setErrors(e); return; }

  try {
    setLoading(true);

    await axios.post("http://localhost:5000/api/students/register", {
      firstName: form.firstName,
      lastName: form.lastName,
      fullName: `${form.firstName} ${form.lastName}`,
      email: form.email,
      password: form.password,
      country: form.country,
      degreeLevel: form.degreeLevel,
      fieldOfStudy: form.fieldOfStudy,
    });

    setLoading(false);
    navigate('/login');

  } catch (err) {
    setLoading(false);
    if (err.response) {
      alert(err.response.data);
    } else {
      alert("Server error. Please try again.");
    }
  }
};
  const validateStep1 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim())  e.lastName  = 'Last name is required.';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email.';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.';
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.country) e.country = 'Please select your country.';
    if (!form.degreeLevel) e.degreeLevel = 'Please select degree level.';
    if (!form.fieldOfStudy.trim()) e.fieldOfStudy = 'Field of study is required.';
    if (!form.agree) e.agree = 'You must agree to the terms.';
    return e;
  };

  const nextStep = () => {
    const e = validateStep1();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(2);
  };

  

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^a-zA-Z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['', '#e74c3c', '#f39c12', '#3498db', '#27ae60'];

  

  return (
    <div className="su-root">
      {/* Left Panel */}
      <div className="su-panel su-panel--left">
        <div className="su-panel__bg">
          <div className="su-panel__orb su-panel__orb--1" />
          <div className="su-panel__orb su-panel__orb--2" />
          <div className="su-panel__grid" />
        </div>
        <div className="su-panel__content">
          <Link to="/" className="su-brand">

          <div className="su-nav__logo-icon">
  <img src={logo} alt="EMA StudyGate Logo" className="hp-logo" />
</div>
            {/* <div className="su-brand__logo">
              <svg width="20" height="16" viewBox="0 0 28 22" fill="none">
                <path d="M2 2H10L14 8L18 2H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 11H26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M2 20H10L14 14L18 20H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div> */}
            <span>EMA <strong>StudyGate</strong></span>
          </Link>

          <div className="su-panel__hero">
            <h2>Start Your Study<br />Abroad Journey</h2>
            <p>Students who found their path to international universities .</p>
          </div>

          
          <div className="su-panel__trust">
            <div className="su-avatars">
              {['Fatima','Ahmed','Sara','Bilal'].map(n => (
                <img key={n} src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${n}`} alt={n} />
              ))}
            </div>
            <p><strong>Create account</strong> </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="su-panel su-panel--right">
        <div className="su-form-box">

          {/* Step indicator */}
          <div className="su-steps">
            <div className={`su-steps__step${step >= 1 ? ' active' : ''}`}>
              <div className="su-steps__dot">1</div>
              <span>Account</span>
            </div>
            <div className="su-steps__line" />
            <div className={`su-steps__step${step >= 2 ? ' active' : ''}`}>
              <div className="su-steps__dot">2</div>
              <span>Profile</span>
            </div>
          </div>

          <div className="su-form-hdr">
            <h1>{step === 1 ? 'Create Your Account' : 'Complete Your Profile'}</h1>
            {/* <p>{step === 1 ? 'Start for free — no credit card needed.' : 'Help us personalise your experience.'}</p> */}
          </div>

          {step === 1 && (
            <div className="su-form">
              <div className="su-row">
                <div className="su-field">
                  <label>First Name *</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" />
                  {errors.firstName && <span className="su-err">{errors.firstName}</span>}
                </div>
                <div className="su-field">
                  <label>Last Name *</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" />
                  {errors.lastName && <span className="su-err">{errors.lastName}</span>}
                </div>
              </div>

              <div className="su-field">
                <label>Email Address *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                {errors.email && <span className="su-err">{errors.email}</span>}
              </div>

              <div className="su-field">
                <label>Password *</label>
                <div className="su-pass-wrap">
                  <input type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Minimum 8 characters" />
                  <button type="button" className="su-pass-toggle" onClick={() => setShowPass(v => !v)}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.password && (
                  <div className="su-strength">
                    <div className="su-strength__bar">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="su-strength__seg" style={{ background: i <= strength ? strengthColor[strength] : '#e0e8f5' }} />
                      ))}
                    </div>
                    <span style={{ color: strengthColor[strength], fontSize: '12px', fontWeight: 700 }}>{strengthLabel[strength]}</span>
                  </div>
                )}
                {errors.password && <span className="su-err">{errors.password}</span>}
              </div>

              <div className="su-field">
                <label>Confirm Password *</label>
                <div className="su-pass-wrap">
                  <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter password" />
                  <button type="button" className="su-pass-toggle" onClick={() => setShowConfirm(v => !v)}>
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="su-err">{errors.confirmPassword}</span>}
              </div>

              <button className="su-btn su-btn--primary" onClick={nextStep}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="su-form">
              <div className="su-field">
                <label>Your Country *</label>
                <select name="country" value={form.country} onChange={handleChange}>
                  <option value="">Select your country...</option>
                  <option>Pakistan</option>
                  <option>India</option>
                  <option>Bangladesh</option>
                  <option>Nigeria</option>
                  <option>Egypt</option>
                  <option>Other</option>
                </select>
                {errors.country && <span className="su-err">{errors.country}</span>}
              </div>

              <div className="su-field">
                <label>Target Degree Level *</label>
                <select name="degreeLevel" value={form.degreeLevel} onChange={handleChange}>
                  <option value="">Select degree level...</option>
                  <option>Bachelor's</option>
                  <option>Master's</option>
                  <option>PhD</option>
                  <option>Diploma / Certificate</option>
                </select>
                {errors.degreeLevel && <span className="su-err">{errors.degreeLevel}</span>}
              </div>

              <div className="su-field">
  <label>Field of Study *</label>

  <select
    name="fieldOfStudy"
    value={form.fieldOfStudy}
    onChange={handleChange}
  >
    <option value="">Select Field of Study</option>
    <option value="Computer Science">Computer Science</option>
    <option value="Software Engineering">Software Engineering</option>
    <option value="Information Technology">Information Technology</option>
    <option value="Artificial Intelligence">Artificial Intelligence</option>
    <option value="Cyber Security">Cyber Security</option>
    <option value="Data Science">Data Science</option>
    <option value="Medicine">Medicine</option>
    <option value="Dentistry">Dentistry</option>
    <option value="Pharmacy">Pharmacy</option>
    <option value="Nursing">Nursing</option>
    <option value="Engineering">Engineering</option>
    <option value="Civil Engineering">Civil Engineering</option>
    <option value="Mechanical Engineering">Mechanical Engineering</option>
    <option value="Electrical Engineering">Electrical Engineering</option>
    <option value="Business Administration">Business Administration</option>
    <option value="Accounting">Accounting</option>
    <option value="Finance">Finance</option>
    <option value="Economics">Economics</option>
    <option value="Law">Law</option>
    <option value="Education">Education</option>
    <option value="Psychology">Psychology</option>
    <option value="Architecture">Architecture</option>
    <option value="Media Studies">Media Studies</option>
    <option value="Political Science">Political Science</option>
    <option value="Other">Other</option>
  </select>

  {errors.fieldOfStudy && (
    <span className="su-err">{errors.fieldOfStudy}</span>
  )}
</div>


   <div className="su-checkbox">
  <input
    type="checkbox"
    id="agree"
    name="agree"
    checked={form.agree}
    onChange={handleChange}
  />

  <label htmlFor="agree">
    I agree to the{" "}
    <span
      className="su-link"
      onClick={() => setShowTerms(true)}
    >
      Terms of Service
    </span>
    {" "}and{" "}
    <span
      className="su-link"
      onClick={() => setShowPrivacy(true)}
    >
      Privacy Policy
    </span>
  </label>
</div>
              {errors.agree && <span className="su-err">{errors.agree}</span>}

              <div className="su-row">
                <button className="su-btn su-btn--outline" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  className={`su-btn su-btn--primary${loading ? ' su-btn--loading' : ''}`}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading
                    ? <><Loader2 size={16} className="su-spinner" /> Creating...</>
                    : <><BadgeCheck size={16} /> Create Account</>
                  }
                </button>
              </div>
            </div>
          )}

   

           <div className="su-divider"><span>or</span></div>
            {/* Terms Modal */}
{showTerms && (
  <div className="su-modal-overlay">
    <div className="su-modal">
      <button
        className="su-modal-close"
        onClick={() => setShowTerms(false)}
      >
        ✕
      </button>

      <h2>Terms of Service</h2>

      <p>
        By creating an account on EMA StudyGate, you agree to use the platform
        responsibly and provide accurate information.
      </p>

      <p>
        Scholarship, university, and visa information is provided for
        educational purposes only. Users should verify details from official
        sources before applying.
      </p>

      <p>
        EMA StudyGate reserves the right to modify these terms at any time.
      </p>
    </div>
  </div>
)}



{/* Privacy Modal */}
{showPrivacy && (
  <div className="su-modal-overlay">
    <div className="su-modal">
      <button
        className="su-modal-close"
        onClick={() => setShowPrivacy(false)}
      >
        ✕
      </button>

      <h2>Privacy Policy</h2>

      <p>
        EMA StudyGate respects your privacy and protects your personal data.
      </p>

      <p>
        We collect information such as your name, email address, study
        preferences, and account details to provide our services.
      </p>

      <p>
        Your personal information will not be sold to third parties.
      </p>
    </div>
  </div>
)
}
         

          <p className="su-login-link">
            Already have an account? <Link to="/login">Sign in here <ArrowRight size={13} /></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signupform;