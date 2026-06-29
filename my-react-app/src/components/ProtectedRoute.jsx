import React from "react";
import { Navigate } from "react-router-dom";


// ================= USER PROTECTED ROUTE =================

export const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");

  if (!token) {

    return <Navigate to="/login" />;

  }

  return children;

};


// ================= ADMIN PROTECTED ROUTE =================

export const AdminProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("adminToken");

  if (!token) {

    return <Navigate to="/admin/login" />;

  }

  return children;

};