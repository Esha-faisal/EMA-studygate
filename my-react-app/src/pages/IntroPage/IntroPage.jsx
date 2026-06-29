import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../components/assets/logo.jpg";
import './IntroPage.css';

import { Landmark, BadgeDollarSign, Stamp, Bot } from 'lucide-react';

const FEATURE_PILLS = [
  { icon: <Landmark size={14} />,        label: 'Universities'  },
  { icon: <BadgeDollarSign size={14} />, label: 'Scholarships'  },
  { icon: <Stamp size={14} />,           label: 'Visa Guidance' },
  { icon: <Bot size={14} />,             label: 'AI Support'    },
];

const IntroPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1600);
    const t3 = setTimeout(() => setPhase(3), 3400);
    const t4 = setTimeout(() => navigate('/home'), 4000);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) clearInterval(interval);
    }, 18);

    return () => {
      clearTimeout(t1); clearTimeout(t2);
      clearTimeout(t3); clearTimeout(t4);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className={`intro-root${phase === 3 ? ' intro-root--fadeout' : ''}`}>

      {/* Animated background particles */}
      <div className="intro-bg">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="intro-particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            width:  `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            opacity: 0.15 + Math.random() * 0.25,
          }} />
        ))}
      </div>

      {/* Center content */}
      <div className="intro-center">

        {/* Logo icon */}
        <div className={`intro-logo-wrap${phase >= 0 ? ' intro-logo-wrap--visible' : ''}`}>
          <div className="intro-logo-icon">
            <img src={logo} alt="EMA Study Gate" className="logos" />
            <svg width="52" height="42" viewBox="0 0 28 22" fill="none">
              <path d="M2 2H10L14 8L18 2H26"       stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 11H26"                    stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M2 20H10L14 14L18 20H26"    stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="intro-logo-text">
            <span className="intro-logo-text--ema">EMA</span>
            <span className="intro-logo-text--rest"> Study Gate</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className={`intro-tagline${phase >= 1 ? ' intro-tagline--visible' : ''}`}>
          Empowering students to achieve their dreams of studying abroad
        </p>

        {/* Features row */}
        <div className={`intro-features${phase >= 1 ? ' intro-features--visible' : ''}`}>
          {FEATURE_PILLS.map((f, i) => (
            <span
              key={i}
              className="intro-feature-pill"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <span style={{ marginRight: 6, display: 'inline-flex', alignItems: 'center' }}>
                {f.icon}
              </span>
              {f.label}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className={`intro-progress-wrap${phase >= 2 ? ' intro-progress-wrap--visible' : ''}`}>
          <div className="intro-progress-bar">
            <div
              className="intro-progress-fill"
              style={{ width: phase >= 2 ? `${progress}%` : '0%' }}
            />
          </div>
          <p className="intro-loading-text">Loading your gateway...</p>
        </div>

        {/* Skip button */}
        <button
          className={`intro-skip${phase >= 1 ? ' intro-skip--visible' : ''}`}
          onClick={() => navigate('/home')}
        >
          Skip →
        </button>

      </div>

      {/* Bottom tagline */}
      <div className={`intro-bottom${phase >= 1 ? ' intro-bottom--visible' : ''}`}>
        <p>Free for all students · Verified information · No consultants needed</p>
      </div>

    </div>
  );
};

export default IntroPage;