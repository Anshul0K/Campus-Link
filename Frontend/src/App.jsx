// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";  // import AuthProvider

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import MyOpportunities from "./pages/MyOpportunities";
import UserLayout from "./pages/UserLayout";
import AdminLayout from "./pages/AdminLayout";
import AllApprovedOpportunities from "./pages/ApprovedOpportunities";
import AppliedOpportunities from "./pages/AppliedOpportunities";
import Users from "./pages/Users";
import PendingOpportunities from "./pages/PendingOpportunities";
import AllOpportunities from "./pages/AllOpportunities";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/my-opportunities" element={<MyOpportunities />} />

          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="my-opportunities" element={<MyOpportunities />} />
            <Route path="opportunities" element={<AllApprovedOpportunities/>} />
            <Route path="applied-opportunities" element={<AppliedOpportunities/>} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="my-opportunities" element={<MyOpportunities />} />
            <Route path="users" element={<Users />} />
            <Route path="pending-opportunities" element={<PendingOpportunities/>} />
            <Route path="opportunities" element={<AllOpportunities/>} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
