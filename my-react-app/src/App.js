import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home/Home";
import Signupform from './components/signup/signupform';
import Loginform from './components/signup/loginform';
import Dashboardpage from './pages/Dashboard/Dashboardpage';
import  VisaGuide  from './pages/VisaGuide/VisaGuide';
import StudyDestinations from './pages/StudyDestinations/StudyDestinations';
import Scholarship from './pages/Scholarship/Scholarship';








function App() {
  return (
      <Router>
       
      <Routes>
       
        <Route path="/" element={<Home />} />
        {/* <Route path="/Home" element={<Home />} /> */}
        <Route path="/signup" element={<Signupform />} />
        <Route path="/login" element={<Loginform />} />
        <Route path="/Dashboardpage" element={<Dashboardpage />} />
        <Route path="/VisaGuide" element={<VisaGuide />} />
        <Route path="/StudyDestinations" element={<StudyDestinations />} />
        <Route path="/Scholarship"  element={<Scholarship />} />
        
      </Routes>
        
      
    </Router>
  );
}

export default App;

