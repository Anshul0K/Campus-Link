// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";  // import AuthProvider

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
