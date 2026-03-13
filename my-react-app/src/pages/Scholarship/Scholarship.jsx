import React from 'react';
import './Scholarship.css';
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
// import scholarshipBanner from '../../components/assets/scholarship.png';
// import merit from '../../components/assets/merit.png';
// import need from '../../components/assets/need.png';
// import international from '../../components/assets/international.png';
import Footer from '../../components/Footer/Footer';

function Scholarship() {
  return (
    <>
    <Navbar />
      {/* HERO SECTION */}
      <div className="scholarship-hero">
        <div className="scholarship-content">
          <h1>Scholarship Opportunities</h1>
          <p>
            Discover fully funded and partial scholarships to support your
            international education journey.
          </p>
         <Link to="/view-scholarship"> <button>Explore Scholarships</button> </Link>
        </div>

        <div className="scholarship-image">
          {/* <img src={scholarshipBanner} alt="Scholarship" /> */}
        </div>
      </div>

      {/* TYPES SECTION */}
      <div className="scholarship-types">
        <h2>Types of Scholarships</h2>

        <div className="types-container">
          <div className="type-card">
            {/* <img src={merit} alt="Merit Based" /> */}
            <h3>Merit-Based</h3>
            <p>For students with outstanding academic achievements.</p>
          </div>

          <div className="type-card">
            {/* <img src={need} alt="Need Based" /> */}
            <h3>Need-Based</h3>
            <p>Financial support for students requiring assistance.</p>
          </div>

          <div className="type-card">
            {/* <img src={international} alt="International" /> */}
            <h3>International</h3>
            <p>Special scholarships for global students.</p>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="scholarship-cta">
        <h2>Ready to Apply?</h2>
        <p>Let EMA Study Gate guide you through the process.</p>
        <button>Get Consultation</button>
      </div>

      <Footer />
    </>
  );
}

export default Scholarship;
