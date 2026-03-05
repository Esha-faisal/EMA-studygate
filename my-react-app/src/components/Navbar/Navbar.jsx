import React from 'react'
import { Link } from "react-router-dom";
import logo from "../../components/assets/logo.jpg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav  className='container'>
         
       <img src={logo} alt="logo" className='logo' />
       <Link to="/">Home</Link>
       <Link to="/StudyDestinations"><button className="btn">StudyDestinations</button></Link>
       <Link to="/scholarship"><button className="btn">Scholarship</button></Link>
       <Link to="/VisaGuide"><button className="btn">Visa Guide</button></Link>
       <Link to="/signup"><button className='btn'>Sign Up</button></Link>
       <Link to="/login"><button className='btn'>login</button></Link>
       <Link to="/ContactUs"><button className='btn'>Contact Us</button></Link> 
       </nav>
  )
}

export default Navbar