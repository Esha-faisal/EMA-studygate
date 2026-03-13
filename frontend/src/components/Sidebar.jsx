import React from 'react'
import dashboard from '../components/assets/dashboard.png'

const Sidebar = () => {
  return (
      <aside className="sidebar">
     
      <ul>
        <li className="active"> Dashboard</li>
        <li>Find Universities</li>
        <li>Visa Guidance</li>
        <li>Resources</li>
        <li>Scholarship</li>
      </ul>
    </aside>
  )
}

export default Sidebar