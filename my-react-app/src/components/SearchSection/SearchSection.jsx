import React from 'react'
import { Link } from "react-router-dom";
import "./SearchSection.css";

const SearchSection = () => {
  return (
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
    
  )
}

export default SearchSection