import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../components/assets/finallogo.jpeg";
import axios from "axios";

import {
 
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  ShieldCheck,
  
  GraduationCap,
}
from 'lucide-react';

import './loginform.css';

  const Loginform = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }
}, [navigate]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors(er => ({ ...er, [name]: '' }));
  };

 const handleSubmit = async (e) => {

  e.preventDefault();

  const errs = {};

  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errs.email = 'Enter a valid email.';
  }

  if (!form.password) {
    errs.password = 'Password is required.';
  }

  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  try {

    setLoading(true);

    const res = await axios.post(
      "http://localhost:5000/api/students/login",
      {
        email: form.email,
        password: form.password
      }
    );

    console.log("LOGIN SUCCESS:", res.data);

    // Save token
    localStorage.setItem("token", res.data.token);

    // Save user email if needed
    localStorage.setItem("studentEmail", form.email);

    setLoading(false);

    // Redirect
    navigate("/dashboard");

  } catch (err) {

    setLoading(false);

    console.log("LOGIN ERROR:", err);

    if (err.response) {
      alert(err.response.data);
    } else {
      alert("Server error");
    }
  }
};

  

  return (
    <div className="li-root">

      {/* Left Panel */}
      <div className="li-left">
        <div className="li-left__bg">
          <div className="li-orb li-orb--1" />
          <div className="li-orb li-orb--2" />
          <div className="li-orb li-orb--3" />
          <div className="li-grid" />
        </div>

        <div className="li-left__content">
          <Link to="/" className="li-brand">
          <div className="li-nav__logo-icon">
  <img src={logo} alt="EMA StudyGate Logo" className="hp-logo" />
</div>
            {/* <div className="li-brand__logo">
              <svg width="20" height="16" viewBox="0 0 28 22" fill="none">
                <path d="M2 2H10L14 8L18 2H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 11H26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M2 20H10L14 14L18 20H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div> */}
            <span>EMA <strong>StudyGate</strong></span>
          </Link>

          <div className="li-left__hero">
            <h2>Welcome!</h2>
            <p>Sign in to access your personalised dashboard, saved universities and study roadmap.</p>
          </div>

          

          <div className="li-quote">
            <p>"EMA Study Gate helped me win the Chevening Scholarship. Life-changing platform!"</p>
            <div className="li-quote__author">
              <img src="https://api.dicebear.com/7.x/thumbs/svg?seed=AhmedK" alt="Ahmed" />
              <div>
                <strong>Ahmed Khan</strong>
                <span>Chevening Scholar 🇬🇧</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="li-right">
        <div className="li-form-box">

          <div className="li-form-hdr">
            <h1>Sign In</h1>
            <p>Enter your credentials to access your account.</p>
          </div>

          <form className="li-form" onSubmit={handleSubmit}>

            <div className="li-field">
              <label>Email Address *</label>
              <div className="li-input-wrap">
                <span className="li-input-icon"><Mail size={16} /></span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={errors.email ? 'li-input--err' : ''}
                />
              </div>
              {errors.email && <span className="li-err">{errors.email}</span>}
            </div>

            <div className="li-field">
              <div className="li-field__header">
                <label>Password *</label>
                <a href="#" className="li-forgot">Forgot password?</a>
              </div>
              <div className="li-input-wrap">
                <span className="li-input-icon"><Lock size={16} /></span>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  className={errors.password ? 'li-input--err' : ''}
                />
                <button type="button" className="li-pass-toggle" onClick={() => setShowPass(v => !v)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className="li-err">{errors.password}</span>}
            </div>

            <div className="li-remember">
              <label className="li-check">
                <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
                <span className="li-check__box" />
                <span>Keep me signed in</span>
              </label>
            </div>

            <button
              type="submit"
              className={`li-btn li-btn--primary${loading ? ' li-btn--loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <><Loader2 size={16} className="li-spinner" /> Signing In...</>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>

          </form>

          <div className="li-divider"><span>New to EMA StudyGate?</span></div>

          <Link to="/signup" className="li-btn li-btn--outline">
            <GraduationCap size={16} /> Create Account
          </Link>

          <p className="li-admin-link">
            Are you an admin? <Link to="/admin/login">Admin Login <ArrowRight size={13} /></Link>
          </p>


        </div>
      </div>
    </div>
  );
};

export default Loginform;