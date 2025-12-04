import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";


function Home() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <div className="hero">
        
        <div className="hero-text">
          <h1>Find the Best Study Abroad Opportunities</h1>
          <p>Explore universities, scholarships, and top study destinations.</p>

          <div className="search-box">
            <input type="text" placeholder="Search universities, courses, countries..." />
            <button>Search</button>
          </div>
        </div>
      </div>

      {/* DESTINATIONS SECTION */}
      <section className="destinations">
        <h2>Popular Study Destinations</h2>
        <div className="dest-grid">
          <div className="dest-card">USA</div>
          <div className="dest-card">Canada</div>
          <div className="dest-card">UK</div>
          <div className="dest-card">Australia</div>
          <div className="dest-card">Germany</div>
          <div className="dest-card">Turkey</div>
        </div>
      </section>

      {/* SCHOLARSHIP SECTION */}
      <section className="scholarships">
        <h2>Top Scholarships</h2>
        <div className="scholarship-grid">
          <div className="sch-card">Fulbright Scholarship</div>
          <div className="sch-card">Chevening Scholarship</div>
          <div className="sch-card">DAAD Scholarship</div>
          <div className="sch-card">Turkiye Burslari</div>
        </div>
      </section>

      

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 EMA Study Gate. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Home;
