import React from 'react'
import { Link } from "react-router-dom";
import "./Service.css";
import uni from '../../components/assets/uni.png';
import visaguidance from '../../components/assets/visaguidance.png';
import checklist from '../../components/assets/checklist.png';
import chatsupport from '../../components/assets/chatsupport.png';

const Service = () => {
  return (
    <section className="services">
        <div> <h2>Our Services</h2> </div>

         <div className="ser-container">
          <Link to="/StudyDestinations" className="card-link">
          <div className="ser-card">
            <img src={uni} alt="University Icon" />
            <h3>University Finder</h3>
            <p>Find universities that match your goals and budget.</p>
          </div>
          </Link>
          <Link to="/VisaGuide" className="card-link">
          <div className="ser-card">
             <img src={visaguidance} alt="visaguidance Icon" />
            <h3>Visa Guidance</h3>
            <p>Get information on visa applications & requirements.</p>
          </div>
          </Link>
          <Link to="/DocumentChecklist" className="card-link">
          <div className="ser-card">
             <img src={checklist} alt="checklist Icon" />
           <h3>Document Checklist</h3>
           <p>Get a personalized list of required documents.</p>

          </div>
          </Link>
           <Link to="/ChatSupport">
          <div className="ser-card">
             <img src={chatsupport} alt="chatsupport Icon" />
           <h3>1:1 Chat Support</h3>
           <p>Talk to experts and get your questions answered.</p>

          </div>
          </Link>
        </div>
      </section>
  )
}

export default Service