import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Header from '../Header/Header';
import SearchSection from '../SearchSection/SearchSection';
import Work from '../Work/Work';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';
const Layout = () => {
  return (
    <>
      <Navbar />
      <Header />
      <SearchSection />
      <Work />
      <Contact />
      <Outlet />
      <Footer />
       </>
  )
}

export default Layout