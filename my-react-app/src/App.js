import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home/Home";
import Signupform from './components/signup/signupform';
import Loginform from './components/signup/loginform';
import Layout from './components/layout/Layout';
import StudyDestinations from './pages/StudyDestinations/StudyDestinations';
import VisaGuide from './pages/VisaGuide/VisaGuide';
import Scholarship from "./pages/Scholarship/Scholarship";
import DocumentChecklist from "./pages/DocumentChecklist/DocumentChecklist";












function App() {
  return (
      <Router>

      <Routes>
       
        <Route path="/" element={<Home />} />
        {/* <Route path="/Home" element={<Home />} /> */}
        <Route path="/signup" element={<Signupform />} />
        <Route path="/login" element={<Loginform />} />
        <Route path="/VisaGuide" element={<VisaGuide />} />
        <Route path="/StudyDestinations" element={<StudyDestinations />} />
        <Route path="/Scholarship"  element={<Scholarship />} />
        <Route path="/DocumentChecklist "  element={< DocumentChecklist />} />
        
      </Routes>
        

      
    </Router>
  );
}

export default App;

