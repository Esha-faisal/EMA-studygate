import React from 'react'
import { Link } from "react-router-dom";
import "./Header.css";


const Header = () => {
  return (
   <div className="hero">

  <div className="hero-overlay"></div>

  <div className="hero-text">
    <h1>Made Study Abroad Simple</h1>

    <p>
      Explore top universities worldwide, get expert guidance,
      and make your dream of studying abroad a reality.
    </p>

    <div className="search-box">
     <Link to="/get-started"> <button>Get Started</button></Link>
       <Link to="/get-started"> <button className="secondary">Browse Universities</button></Link>
    </div>
  </div>

</div>

  )
}

export default Header