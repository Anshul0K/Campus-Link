// src/components/UserNavbar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../services/authService";
import noBgLogo from "../assets/no_bg_logo.png"; // Import the logo

const UserNavbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-400 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Left: Logo */}
      <div className="cursor-pointer flex items-center" onClick={() => navigate("/user/dashboard")}>
        <img src={noBgLogo} alt="Logo" className="h-10 object-contain mr-2" />
        <h1 className="text-white text-xl font-bold">Dashboard</h1>
      </div>

      {/* Right: Nav Items */}
      <div className="flex items-center space-x-6">
        <button
          className="hover:underline cursor-pointer"
          onClick={() => navigate("/user/opportunities")}
        >
          All Opportunities
        </button>
        <button
          className="hover:underline cursor-pointer"
          onClick={() => navigate("/user/my-opportunities")}
        >
          My Opportunities
        </button>
        <button
          className="hover:underline cursor-pointer"
          onClick={() => navigate("/user/applied-opportunities")}
        >
          Applied Opportunities
        </button>

        {/* Profile Icon */}
        <div
          className="relative"
          onMouseEnter={() => setShowProfile(true)}
          onMouseLeave={() => setShowProfile(false)}
        >
          <div className="w-8 h-8 rounded-full bg-gray-200 text-blue-600 flex items-center justify-center cursor-default">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg p-3 z-10">
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm">{user?.email}</p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
