import React from 'react'
import { Link } from "react-router-dom";
import './VisaGuide.css';
import Navbar from '../../components/Navbar/Navbar';
import studentvisatype from '../../components/assets/studentvisatype.png'
import reqdoc from '../../components/assets/reqdoc.jpeg'
import visaappoint from '../../components/assets/visaappoint.jpeg'
import visaguidance from '../../components/assets/visaguidance.png';
import Explore from '../../components/assets/Explore.png';
import Apply from '../../components/assets/Apply.png';
// import visabanner from '../../components/assets/visabanner.png';
import Footer from '../../components/Footer/Footer';

function VisaGuide() {
  return (
    
      <>
       <Navbar />
      
    {/* // HERO SECTION */}
    <div className="visa-hero">
  
  <div className="visa-hero-content">
    <h1>Visa Guidance</h1>
    <p>Navigate the visa process with our expert advice and resources.</p>
   <Link to="/get-started"> <button>Get Started</button></Link>
  </div>

  <div className="visa-hero-image">
    {/* <img src={visabanner} alt="Visa" /> */}
  </div>

</div>

  r
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
              <Footer/>

    </>
  );
}

export default VisaGuide;