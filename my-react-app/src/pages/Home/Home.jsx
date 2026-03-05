import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import Service from '../../components/Service/Service'
import SearchSection from '../../components/SearchSection/SearchSection'
import Work from '../../components/Work/Work'
import Contact from '../../components/Contact/Contact'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Header />
    <Service />
    <SearchSection />
    <Work />
    <Contact />
    <Footer />

    </>
  )
}

export default Home