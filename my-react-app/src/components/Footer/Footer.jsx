import React from 'react'
import { Link } from "react-router-dom";
import "./Footer.css";
import social from '../../components/assets/social.png';
import twitter from '../../components/assets/twitter.png';
import facebook from '../../components/assets/facebook.png';
import logo from "../../components/assets/logo.jpg";
const Footer = () => {
  return (
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
  )
}

export default Footer