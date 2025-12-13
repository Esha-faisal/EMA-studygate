import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home/Home";
import Signupform from './components/signup/signupform';
import Loginform from './components/signup/loginform';









function App() {
  return (
      <Router>
       
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signupform />} />
        <Route path="/login" element={<Loginform />} />
        
      </Routes>
        
      
    </Router>
  );
}

export default App;
