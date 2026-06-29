import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarDashboard from '../../components/dashboard/NavbarDashboard';
import Sidebar from '../../components/dashboard/Sidebar';
import './Feedback.css';
// react icons
import { 
  FaRegCommentDots, 
  FaUniversity,     
  FaRegFlag,        
  FaMoneyBillWave,  
  FaBug,            
  FaLightbulb,      
  FaRocket,        
  FaCheckCircle,    
  FaWrench,         
  FaBullseye,       
  FaEnvelope,
  FaStar, 
  FaRegStar,
  FaRobot        
} from 'react-icons/fa';

const categories = [
  { id: 'general',      label: 'General Feedback',    icon: <FaRegCommentDots />  },
  { id: 'universities', label: 'University Search',   icon: <FaUniversity /> },
  { id: 'visa',         label: 'Visa Guidance',       icon:  <FaRegFlag /> },
  { id: 'scholarships', label: 'Scholarships',        icon: <FaMoneyBillWave />  },
  { id: 'bug',          label: 'Report a Bug',        icon: <FaBug /> },
  { id: 'suggestion',   label: 'Feature Request',     icon: <FaLightbulb /> },
];

const Feedback = () => {
  const navigate  = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating]       = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm] = useState({
    category:  'general',
    subject:   '',
    message:   '',
    email:     'john.doe@email.com',
    anonymous: false,
  });
  const [errors, setErrors] = useState({});

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Please enter your feedback';
    if (form.message.trim().length < 10) e.message = 'Feedback must be at least 10 characters';
    if (rating === 0)          e.rating  = 'Please give a rating';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  const activeRating = hoverRating || rating;

  if (submitted) {
    return (
      <div className="fb-root">
        <NavbarDashboard />
        <div className="fb-body">
          <Sidebar />
          <main className="fb-main">
            <div className="fb-success">
              <div className="fb-success__icon"><FaCheckCircle /></div>
              <h2 className="fb-success__title">Thank You for Your Feedback!</h2>
              <p className="fb-success__sub">
                Your feedback has been submitted successfully. Our team reviews all feedback and uses it to improve EMA Study Gate.
              </p>
              <div className="fb-success__summary">
                <div className="fb-success__row">
                  <span>Category</span>
                  <span>{categories.find(c => c.id === form.category)?.label}</span>
                </div>
                <div className="fb-success__row">
                  <span>Rating</span>
                  <span>
                  {[1,2,3,4,5].map(n => (
               n <= rating ? <FaStar key={n} color="#ffc107" /> : <FaRegStar key={n} color="#ccc" />
                  ))} ({ratingLabels[rating]})
                      </span>
                </div>
                <div className="fb-success__row">
                  <span>Subject</span>
                  <span>{form.subject}</span>
                </div>
              </div>
              <div className="fb-success__actions">
                <button className="fb-btn fb-btn--outline" onClick={() => { setSubmitted(false); setRating(0); setForm({ category:'general', subject:'', message:'', email:'john.doe@email.com', anonymous:false }); }}>
                  Submit Another
                </button>
                <button className="fb-btn fb-btn--primary" onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="fb-root">
      <NavbarDashboard />
      <div className="fb-body">
        <Sidebar />
        <main className="fb-main">

          {/* Header */}
          <div className="fb-header">
            <div>
              <h1 className="fb-header__title">Submit Feedback</h1>
              <p className="fb-header__sub">Help us improve EMA Study Gate — your feedback matters</p>
            </div>
          </div>

          <div className="fb-layout">

            {/* ── Form ── */}
            <form className="fb-form" onSubmit={handleSubmit} noValidate>

              {/* Category */}
              <div className="fb-field">
                <label className="fb-field__label">What is your feedback about?</label>
                <div className="fb-category-grid">
                  {categories.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      className={`fb-category-btn${form.category === c.id ? ' fb-category-btn--active' : ''}`}
                      onClick={() => update('category', c.id)}
                    >
                      <span>{c.icon}</span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Star Rating */}
              <div className="fb-field">
                <label className="fb-field__label">Overall Experience *</label>
                <div className="fb-stars">
                  {[1,2,3,4,5].map(n => (
                    <button
                      key={n}
                      type="button"
                      className={`fb-star${activeRating >= n ? ' fb-star--active' : ''}`}
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHoverRating(n)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </button>
                  ))}
                  {activeRating > 0 && (
                    <span className="fb-rating-label">{ratingLabels[activeRating]}</span>
                  )}
                </div>
                {errors.rating && <span className="fb-error">{errors.rating}</span>}
              </div>

              {/* Subject */}
              <div className="fb-field">
                <label className="fb-field__label">Subject *</label>
                <input
                  className={`fb-input${errors.subject ? ' fb-input--error' : ''}`}
                  placeholder="Brief summary of your feedback"
                  value={form.subject}
                  onChange={e => update('subject', e.target.value)}
                  maxLength={100}
                />
                <div className="fb-field__row">
                  {errors.subject && <span className="fb-error">{errors.subject}</span>}
                  <span className="fb-char-count">{form.subject.length}/100</span>
                </div>
              </div>

              {/* Message */}
              <div className="fb-field">
                <label className="fb-field__label">Your Feedback *</label>
                <textarea
                  className={`fb-textarea${errors.message ? ' fb-input--error' : ''}`}
                  placeholder="Share your experience, suggestions, or report an issue in detail..."
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  rows={6}
                  maxLength={1000}
                />
                <div className="fb-field__row">
                  {errors.message && <span className="fb-error">{errors.message}</span>}
                  <span className="fb-char-count">{form.message.length}/1000</span>
                </div>
              </div>

              {/* Email + Anonymous */}
              <div className="fb-field">
                <label className="fb-field__label">Your Email</label>
                <input
                  className="fb-input"
                  type="email"
                  value={form.anonymous ? '' : form.email}
                  onChange={e => update('email', e.target.value)}
                  disabled={form.anonymous}
                  placeholder={form.anonymous ? 'Submitting anonymously' : 'your@email.com'}
                />
                <label className="fb-checkbox">
                  <input
                    type="checkbox"
                    checked={form.anonymous}
                    onChange={e => update('anonymous', e.target.checked)}
                  />
                  <span>Submit anonymously</span>
                </label>
              </div>

              <div className="fb-form__actions">
                <button type="button" className="fb-btn fb-btn--outline" onClick={() => navigate('/dashboard')}>
                  Cancel
                </button>
                <button type="submit" className="fb-btn fb-btn--primary">
                   <FaRocket /> Submit Feedback
                </button>
              </div>
            </form>

            {/* ── Side Info ── */}
            <aside className="fb-aside">
              <div className="fb-aside__card">
                <h3 className="fb-aside__title">Why your feedback matters</h3>
                <ul className="fb-aside__list">
                  <li><FaWrench /> Helps us fix bugs and improve features</li>
                  <li><FaUniversity /> Guides our university database updates</li>
                  <li><FaLightbulb /> Shapes new features we build</li>
                  <li><FaBullseye /> Makes the platform better for all students</li>
                </ul>
              </div>

              <div className="fb-aside__card fb-aside__card--blue">
                <h3 className="fb-aside__title">Need urgent help?</h3>
                <p className="fb-aside__text">For urgent issues, contact our support team directly.</p>
                <a href="mailto:info@emastudygate.com" className="fb-aside__link">
                  <FaEnvelope /> info@emastudygate.com
                </a>
              </div>

              <div className="fb-aside__card fb-aside__card--green">
                <h3 className="fb-aside__title"><FaRobot size={20} color="#6c63ff" style={{ marginRight: '0.5rem' }} /> Try our AI Assistant</h3>
                <p className="fb-aside__text">Get instant answers to your questions using our chatbot.</p>
              </div>
            </aside>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Feedback;