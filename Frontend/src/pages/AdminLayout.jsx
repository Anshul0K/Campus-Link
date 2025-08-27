import React from "react";
import UserNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />  {/* Nested routes render here */}
      </main>
    </div>
  );
};

export default UserLayout;
