import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../components/assets/logo.jpg";
import "./Navbar.css";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("studentEmail");
    navigate("/");
  };

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
    <Link to="/StudyDestinations">StudyDestinations</Link>
    <Link to="/scholarship">Scholarship</Link>
    <Link to="/VisaGuide">VisaGuide</Link>
    <Link to="/ContactUs">Contact</Link>
  </div>

 <div className="nav-right">

  {token ? (
    <>
      <Link to="/dashboard" className="login">
        Dashboard
      </Link>

      <button
        className="signup-btn"
        onClick={logout}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="login">
        Login
      </Link>

      <Link to="/signup">
        <button className="signup-btn">
          Sign Up
        </button>
      </Link>
    </>
  )}

</div>
    {/* Hamburger */}
        <div 
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

</nav>




  )
}

export default Navbar