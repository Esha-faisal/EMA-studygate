import React, { useState, useEffect } from 'react';
import './signupform.css';
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

function Loginform() {
  const initialvalue = { email: "", password: "" };
  const [formvalues, setformvalues] = useState(initialvalue);
  const [formerrors, setformerrors] = useState({});
  const [onSubmit, setonSubmit] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformvalues({ ...formvalues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setformerrors(validate(formvalues));
    setonSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formerrors).length === 0 && onSubmit) {
      console.log("Login successful:", formvalues);
    }
  }, [formerrors, onSubmit, formvalues]);

  const validate = (value) => {
    const error = {};
    const regox = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!value.email) {
      error.email = "Email is required!";
    } else if (!regox.test(value.email)) {
      error.email = "Invalid email format!";
    }

    if (!value.password) {
      error.password = "Password is required!";
    }

    return error;
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} noValidate>
        <h1>Login</h1>

        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formvalues.email}
            onChange={handlechange}
          />
          <MdEmail className="icon" />
        </div>
        <p className="error-msg">{formerrors.email}</p>

        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formvalues.password}
            onChange={handlechange}
          />
          <FaLock className="icon" />
        </div>
        <p className="error-msg">{formerrors.password}</p>

       

        <button type="submit">Login</button>

        <div className="already-account">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </div>
      </form>
    </div>
  );
}

export default Loginform;
