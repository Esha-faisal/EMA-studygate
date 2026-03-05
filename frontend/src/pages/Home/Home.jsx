import React from "react";
// NAVBAR SECTION
import { Link } from "react-router-dom";
import logo from "../../components/assets/logo.jpg";
import "./Home.css";
// SERVICES SECTION
import uni from '../../components/assets/uni.png';
import visaguidance from '../../components/assets/visaguidance.png';
import checklist from '../../components/assets/checklist.png';
import chatsupport from '../../components/assets/chatsupport.png';
// WORK SECTION
import Apply from '../../components/assets/Apply.png';
import Explore from '../../components/assets/Explore.png';
import Getaccepted from '../../components/assets/Getaccepted.png';
// CONTACT SECTION
import msgicon from '../../components/assets/msgicon.png';
import locationicon from '../../components/assets/locationicon.png';
import mailicon from '../../components/assets/mailicon.png';
import phoneicon from '../../components/assets/phoneicon.png';
import whitearrow from '../../components/assets/whitearrow.png';
// // FOOTER SECTION
// import footer from "../../components/footer/footer";





function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <nav className='container'>
       <img src={logo} alt="" className='logo' />
       <ul>
        <li>Study Destinations</li>
        <li>Scholarship</li>
        <li>Visa Guide</li>
        <li><Link to="/signup"><button className='btn'>Sign Up</button></Link></li>
        <li><Link to="/login"><button className='btn'>login</button></Link></li>
        <li> <button className='btn'>Contact Us</button></li>
       </ul>
    </nav>
  
      
      {/* HERO SECTION */}
      <div className="hero">
      
        <div className="hero-text">
          <h1>Study Abroad Made Simple</h1>
          <p>Explore universities, get expert advice and made your dream of study abroad a reality.</p>

          <div className="search-box">
            {/* <input type="text" placeholder="Search universities, courses, countries..." /> */}
            <button>Get Started</button>
            <button>Browse Universities</button>
          </div>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <section className="services">
        <div> <h2>Our Services</h2> </div>

         <div className="ser-container">

          <div className="ser-card">
            <img src={uni} alt="University Icon" />
            <h3>University Finder</h3>
            <p>Find universities that match your goals and budget.</p>
          </div>
          <div className="ser-card">
             <img src={visaguidance} alt="visaguidance Icon" />
            <h3>Visa Guidance</h3>
            <p>Get information on visa applications & requirements.</p>
          </div>
          <div className="ser-card">
             <img src={checklist} alt="checklist Icon" />
           <h3>Document Checklist</h3>
           <p>Get a personalized list of required documents.</p>

          </div>
          <div className="ser-card">
             <img src={chatsupport} alt="chatsupport Icon" />
           <h3>1:1 Chat Support</h3>
           <p>Talk to experts and get your questions answered.</p>

          </div>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="search">
         <h2 className="section-title">Find Your Dream University</h2>
  <div className="search-container">
    <input 
      type="text" 
      placeholder="Search by country or university name..." 
      className="search-input"
    />
    <button className="search-button">Search</button>
  </div>

        
      </section>
      {/* WORK */}
      <section className="work">
         <div> <h2>How it Works</h2> </div>
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
          <div className="work-card">
             <img src={Getaccepted} alt="Getaccepted Icon" />
           <h3>Get Accepted</h3>
           <p>Receive offers and admissions from top universities.</p>

          </div>
          </div>

      </section>
      {/* CONTACT SECTION */}
      <section className="contact">
        <div> <h3>Contact Us</h3></div>
        <div> <h1>Get in touch</h1></div>
        <div className="contact-container">
          <div className="contact-col">
            <h3>Send us a message <img src={msgicon} alt="msgicon" /></h3>
            <p> Feel free to reach us through contact form or find our contact 
              information below.Your feedback, questions, and suggestions are 
              important to us as we strive to provide exceptional service to our
               university community.</p>
               <ul>
                <li><img src={mailicon} alt="mailicon" />areebawaqar912@gmail.com</li>
                <li><img src={phoneicon} alt="phoneicon" /> +92 332-8989765</li>
                <li><img src={locationicon} alt="locationicon" />Jhelum, PAKISTAN</li>
               </ul>
               </div>
          <div className="contact-col">
            <form>
              <label>Your name</label>
              <input type="text" name='name' placeholder='Enter your name' required/>
              <label>Phone number</label>
              <input type="tel" name='phone' placeholder='Enter your Phone no' required/>
              <label>Write Your message here</label>
              <textarea name="message" rows="6" placeholder='Enter your message' required></textarea>
              <button type='submit' className='btn'>Submit now <img src={whitearrow} alt="whittearrow" /></button>

            </form>
            <span></span>
          </div>

        </div>

      </section>

 
        <footer />
      

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 EMA Study Gate. All Rights Reserved.</p>
      </footer>

      
    </>
  );
}

export default Home;
