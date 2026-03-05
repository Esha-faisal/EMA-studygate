import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import "./StudyDestinations.css"
import Footer from '../../components/Footer/Footer'

const StudyDestinations = () => {
  const universities = [
    { name: "Massachusetts Institute of Tech", location: "MIT", rank: "#1" },
    { name: "University of Oxford", location: "United Kingdom", rank: "#2" },
    { name: "Stanford University", location: "Stanford", rank: "#3" },
    { name: "University of Cambridge", location: "United Kingdom", rank: "#4" },
    { name: "University of Toronto", location: "Canada", rank: "#25" },
    { name: "University of Melbourne", location: "Australia", rank: "#33" },
  ];
  return (
    <>
      <Navbar />
      {/* header */}
      <section>
           <div className='new'>
            <h2>Find Universities</h2>
            
           </div>
      </section>



      <section className="universities">
        
      <div className="container1">
        <h2 className="section-title">Top Universities</h2>
        
        <div className="university-grid">
          {universities.map((uni, index) => (
            <div key={index} className="university-card">
              <div className="icon-circle">
                <i className="fa-solid fa-building-columns"></i>
              </div>
              <h3>{uni.name}</h3>
              <p className="uni-location">{uni.location}</p>
              <p className="uni-rank">Ranked {uni.rank}</p>
              <button className="view-programs-btn">View Programs</button>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}

export default StudyDestinations