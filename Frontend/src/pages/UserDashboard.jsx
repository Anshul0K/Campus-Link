// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import Card from "../components/Labelcard";
import PostOpportunityModal from "../components/PostOpportunityModal";
import { getCurrentUser, getUsersRegisteredThisMonth } from "../services/authService";
import { getAllApprovedOpportunities, getOpportunitiesThisMonth, getMyOpportunities, getAppliedOpportunities } from "../services/opportunityService";
import { FaBriefcase, FaCheckCircle, FaCalendarAlt, FaUsers } from "react-icons/fa";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    approvedOpportunities: 0,
    myOpportunities: 0,
    appliedOpportunities: 0,
    opportunitiesThisMonth: 0,
    usersRegistered: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        setLoading(false);
        return;
      }
      setUser(currentUser);

      try {
        const [approvedOpps, myOpps, appliedOpps, thisMonthOpps, usersThisMonth] = await Promise.all([
          getAllApprovedOpportunities(),
          getMyOpportunities(),
          getAppliedOpportunities(),
          getOpportunitiesThisMonth(),
          getUsersRegisteredThisMonth(),
        ]);

        setStats({
          approvedOpportunities: approvedOpps.length,
          myOpportunities: myOpps.length,
          appliedOpportunities: appliedOpps.length,
          opportunitiesThisMonth: thisMonthOpps?.approvedThisMonth || 0,
          usersRegistered: usersThisMonth?.count || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="flex justify-center items-center min-h-screen">Loading dashboard...</p>;
  if (!user)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p>User not found. Please login again.</p>
        <a href="/" className="mt-4 text-blue-600 underline">Go to Login</a>
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-xl font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <Card title="All Verified Opportunities" value={stats.approvedOpportunities} icon={<FaBriefcase />} bgColor="bg-white" />
        <Card title="My Opportunities" value={stats.myOpportunities} icon={<FaBriefcase />} bgColor="bg-white" />
        <Card title="Opportunities Applied" value={stats.appliedOpportunities} icon={<FaCheckCircle />} bgColor="bg-white" />
        <Card title="Opportunities Posted This Month" value={stats.opportunitiesThisMonth} icon={<FaCalendarAlt />} bgColor="bg-white" />
        <Card title="Users Registered This Month" value={stats.usersRegistered} icon={<FaUsers />} bgColor="bg-white" />
      </div>

      {/* Modal Section */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition cursor-pointer"
        >
          + Post Opportunity
        </button>
      </div>
      {showModal && <PostOpportunityModal onClose={() => setShowModal(false)} />}

      {/* Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Your Progress</h3>
          <p className="text-sm text-gray-500 mb-2">Applied Opportunities vs Total Approved</p>
          <div className="w-full bg-gray-200 h-4 rounded-full">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${stats.approvedOpportunities ? (stats.appliedOpportunities / stats.approvedOpportunities) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1 text-gray-600">{stats.appliedOpportunities} / {stats.approvedOpportunities} applied</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Quick Actions</h3>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            <li>Check new opportunities</li>
            <li>Apply for pending opportunities</li>
            <li>Update your profile</li>
            <li>View upcoming deadlines</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
