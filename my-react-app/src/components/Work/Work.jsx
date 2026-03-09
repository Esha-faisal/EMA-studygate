import React from 'react'
import { Link } from "react-router-dom";
import "./Work.css";
import Apply from '../../components/assets/Apply.png';
import Explore from '../../components/assets/Explore.png';
import Getaccepted from '../../components/assets/Getaccepted.png';

const Work = () => {
  return (
  <section className="work">
         <div> <h2>How it Works</h2> </div>
         <div className="work-container">
           <Link to="/Explore">
          <div className="work-card">
            <img src={Explore} alt="Explore Icon" />
            <h3>Explore</h3>
            <p>Browse universities and choose your ideal destination.</p>
          </div>
          </Link>
          <Link to="/Apply">
          <div className="work-card">
             <img src={Apply} alt="Apply Icon" />
            <h3>Apply</h3>
            <p> Submit applications and required documents online.</p>
          </div>
          </Link>
            <Link to="/Accepted">
          <div className="work-card">
             <img src={Getaccepted} alt="Getaccepted Icon" />
           <h3>Get Accepted</h3>
           <p>Receive offers and admissions from top universities.</p>

          </div>
          </Link>
          </div>

      </section>
  )
}

export default Work