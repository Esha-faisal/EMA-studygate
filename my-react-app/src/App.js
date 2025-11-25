import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signupform from './components/signup/signupform.jsx';
import Loginform from './components/signup/loginform';





function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Signupform />} />
        <Route path="/signup" element={<Signupform />} />
        <Route path="/login" element={<Loginform />} />
      </Routes>
    </Router>
  );
}

export default App
