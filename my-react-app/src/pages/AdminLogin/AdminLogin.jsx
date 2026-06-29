import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./AdminLogin.css";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        "http://localhost:5000/api/admin/login",

        formData

      );

      // SAVE TOKEN
      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      alert("Login Successful");

      navigate("/admin/dashboard");

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");

    }

  };

 return (

  <div className="al-root">

    <div className="al-bg">
      <div className="al-bg__circle al-bg__circle--1"></div>
      <div className="al-bg__circle al-bg__circle--2"></div>
      <div className="al-bg__circle al-bg__circle--3"></div>
    </div>

    <div className="al-card">

      <h2 className="al-title">
        Admin Login
      </h2>

      <p className="al-sub">
        Login to access admin dashboard
      </p>

      <form
        className="al-form"
        onSubmit={handleSubmit}
      >

        <div className="al-field">

          <label>Email</label>

          <input
            className="al-input"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

        </div>

        <div className="al-field">

          <label>Password</label>

          <input
            className="al-input"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

        </div>

        <button
          type="submit"
          className="al-btn"
        >
          Login
        </button>

      </form>

    </div>

  </div>

);
};

export default AdminLogin;