import React, { useEffect, useState } from 'react';
import logo from "../../components/assets/finallogo.jpeg";
import './NavbarDashboard.css';
import axios from "axios";



const NavbarDashboard = () => {
  const [user, setUser] = useState(null);

useEffect(() => {
  axios.get("http://localhost:5000/api/students/profile", {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  })
  .then(res => {
    setUser(res.data);
  })
  .catch(err => {
    console.log(err);
  });
}, []);




  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="dash-navbar">
     <div className="nav-left">
    <img src={logo} alt="EMA StudyGate" className="logo" />

    <div className="brand-text">
        <span className="brand-ema">EMA</span>
        <span className="brand-studygate">StudyGate</span>
    </div>
</div>
      <div className="dash-navbar__links">
        <a href="/" className="dash-navbar__link">Home</a>
        <a href="/StudyDestinations" className="dash-navbar__link">Find Universities</a>
        <div className="dash-navbar__dropdown-wrap">
          <a href="/VisaGuide" className="dash-navbar__link">
            Visa Guidance
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{marginLeft:'4px'}}>
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="dash-navbar__user" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <div className="dash-navbar__avatar">
          <img
  src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user?.fullName || "student"}`}
  alt={user?.fullName || "student"}
/>
        </div>
        <span className="dash-navbar__username">{user?.fullName || "Student"}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>

        {dropdownOpen && (
          <div className="dash-navbar__dropdown">
            <a href="/dashboard" className="dash-navbar__dropdown-item">My Dashboard</a>
            <a href="/profile/edit" className="dash-navbar__dropdown-item">Profile Settings</a>
            <div className="dash-navbar__dropdown-divider" />
           <button
             className="dash-navbar__dropdown-item dash-navbar__dropdown-item--danger"
             onClick={() => {
                 localStorage.removeItem("token");
                window.location.href = "/login";
         }}
        >
         Logout
      </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarDashboard;