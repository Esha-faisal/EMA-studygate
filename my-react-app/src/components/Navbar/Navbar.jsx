import React from 'react'
import './Navbar.css'
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";



const Navbar = () => {
  return (
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
  )
}

export default Navbar