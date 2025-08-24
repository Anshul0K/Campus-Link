// src/components/AdminNavbar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../services/authService";
import no_bg_logo from "../assets/no_bg_logo.png"; // make sure this file exists

const AdminNavbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-400 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Left: Logo + Dashboard title */}
      <div
        className="flex items-center gap-5 cursor-pointer"
        onClick={() => navigate("/admin-dashboard")}
      >
        <img src={no_bg_logo} alt="Logo" className="h-10 object-contain" />
        <span className="text-xl font-bold">Admin Dashboard</span>
      </div>

      {/* Right: Nav items */}
      <div className="flex items-center gap-6">
        <button onClick={() => navigate("/admin/opportunities")} className="hover:underline">
          All Opportunities
        </button>
        <button onClick={() => navigate("/admin/pending-opportunities")} className="hover:underline">
          Pending Opportunities
        </button>
        <button onClick={() => navigate("/admin/users")} className="hover:underline">
          All Users
        </button>
        <button onClick={() => navigate("/admin/add-admin")} className="hover:underline">
          Add Admin
        </button>

        <button onClick={() => navigate("/my-opportunities")} className="hover:underline">
          My Opportunities
        </button>


        {/* Profile icon */}
        <div
          className="relative cursor-default"
          onMouseEnter={() => setShowProfile(true)}
          onMouseLeave={() => setShowProfile(false)}
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg p-3 z-10">
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          )}
        </div>

        {/* Logout */}
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
