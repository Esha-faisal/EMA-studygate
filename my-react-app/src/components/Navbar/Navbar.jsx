import React from 'react'
import { Link } from "react-router-dom";
import logo from "../../components/assets/logo.jpg";
import "./Navbar.css";

const Navbar = () => {
  return (
    // <nav  className='container'>

    //    <img src={logo} alt="logo" className='logo' />
    //    <Link to="/">Home</Link>
    //    <Link to="/StudyDestinations"><button className="btn">StudyDestinations</button></Link>
    //    <Link to="/scholarship"><button className="btn">Scholarship</button></Link>
    //    <Link to="/VisaGuide"><button className="btn">Visa Guide</button></Link>
    //    <Link to="/ContactUs"><button className='btn'>Contact Us</button></Link> 
    //    <Link to="/signup"><button className='btn'>Sign Up</button></Link>
    //    <Link to="/login"><button className='btn'>login</button></Link>
     
    //    </nav>
     <nav className="navbar">

  {/* Logo */}
  <div className="nav-left">
    <img src={logo} alt="logo" className="logo"/>
  </div>

  {/* Middle Menu */}
  <div className="nav-center">
    <Link to="/">Home</Link>
    <Link to="/StudyDestinations">Services</Link>
    <Link to="/scholarship">scholarship</Link>
    <Link to="/VisaGuide">VisaGuide</Link>
    <Link to="/ContactUs">Contact</Link>
  </div>

  {/* Right Side */}
  <div className="nav-right">
    <Link to="/login" className="login">Login</Link>
    <Link to="/signup">
      <button className="signup-btn">Sign Up</button>
    </Link>
  </div>

</nav>




  )
}

export default Navbar