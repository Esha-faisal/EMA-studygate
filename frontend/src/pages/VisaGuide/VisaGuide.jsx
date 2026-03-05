import React, { useState } from "react";
import './VisaGuide.css';
import studentvisatype from '../../components/assets/studentvisatype.png'
import reqdoc from '../../components/assets/reqdoc.jpeg'
import visaappoint from '../../components/assets/visaappoint.jpeg'
import visaguidance from '../../components/assets/visaguidance.png';
import Explore from '../../components/assets/Explore.png';
import Apply from '../../components/assets/Apply.png';
// NAVBAR SECTION
import { Link } from "react-router-dom";
// FOOTER SECTION
import social from '../../components/assets/social.png';
import twitter from '../../components/assets/twitter.png';
import facebook from '../../components/assets/facebook.png';
import logo from "../../components/assets/logo.jpg";


function VisaGuide() {
   const [menuOpen, setMenuOpen] = useState(false);  // tracks if menu is open
   const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    
      <>
       {/* <Navbar /> */}
      <nav className='container'>
       <img src={logo} alt="logo" className='logo' />

     <div className="menu-icon" onclick={handleToggle}>
      ☰
    </div>

       
        <ul className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <li> <a href="#"></a>Study Destinations</li>
        <li> <a href="#"></a>Scholarship</li>
        <li> <Link to="/VisaGuide"><button className="btn">Visa Guide</button></Link> </li>
        <li><Link to="/signup"><button className='btn'>Sign Up</button></Link></li>
        <li><Link to="/login"><button className='btn'>login</button></Link></li>
        
       </ul>
    </nav>
      
    {/* // HERO SECTION */}
    <div className="visabanner">
    <div className="hero-text">
      <h1>Visa Guidance</h1>
      <p>Navigate the visa process with our expert advice and resources</p>
      <div className="search-box">
        <button>Get Started</button>
      </div>
    </div>
    </div>


    {/* // GUIDANCE SECTION */}
    <section className='services'>
     <div> <h2>Step by Step Guide</h2>
      </div>

      <div className="ser-container">
        <div className="ser-card">
           <img src={visaappoint} alt="" />
          <h3>Visa Appointment</h3>
          <p>Book your required interview date and time to finalize your application process</p>
        </div>
      

      
        <div className="ser-card">
          <img src={visaguidance} alt="" />
          <h3>Visa Application</h3>
          <p>Learn how to properly complete and submit your official visa application form online</p>
        </div>
      

      
        <div className="ser-card">
           <img src={reqdoc} alt="" />
          <h3>Required Documents</h3>
          <p>Ensure all necessary supporting documents are collected and prepared for your interview</p>
        </div>
      

       
        <div className="ser-card">
          <img src={studentvisatype} alt="" />
          <h3>Student Visa Types</h3>
          <p>Explore the various categories of study visas to find the one that best fits your educational goals</p>
        </div>
      </div>  
    </section>

    <section className="work">
           
             <div className="work-container">
    
              <div className="work-card">
                <img src={Explore} alt="Explore Icon" />
                <h3>Explore</h3>
                <p>Browse universities and choose your ideal destination.</p>
              </div>

              <div className="work-card">
                           <img src={Apply} alt="Apply Icon" />
                          <h3>Apply</h3>
                          <p> Submit applications and required documents online.</p>
                        </div>

              </div>
              </section>

              {/* FOOTER */}
                    <footer>
                      <div className="footer-container">
                         {/* Left Section */}
                      <div className="footer-left">
                       <img src={logo} alt="" className='logo' />
                        <p>
                          Empowering students to achieve their dreams of studying 
                          abroad with ease.
                        </p>
                        <p>
                          <br/>
                      © 2025 EMA Study Gate — All Rights Reserved
                        </p>
                      </div>
                      {/* QUICK LINKS */}
                      <div className="footer-links">
                        <h3 className="footer-title">Quick Links</h3>
                        <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Find Universities</a></li>
                        <li><a href="#">Visa Guidance</a></li>
                        <li><a href="#">Resources</a></li>
                        </ul>
                      </div>
                      {/* RESOURCES */}
                      <div className="footer-links">
                        <h3 className="footer-title">Resources</h3>
                        <ul>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Bug</a></li>
                        <li><a href="#">Support</a></li>
                        </ul>
                      </div>
                      {/* SOCIAL-ICON */}
                      <div className="footer-social">
                        <h3 className="footer-title">Contact Us</h3>
                        
                        <ul>
                          <li><a href="#"><img src={social} alt="social" /></a> </li>
                          <li><a href="#"><img src={twitter} alt="twitter" /></a> </li>
                          <li><a href="#"><img src={facebook} alt="facebook" /></a> </li>
                        </ul>
              
                      </div>
                      
                      </div>
                    </footer>


    </>
  );
}

export default VisaGuide;