// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import Card from "../components/Labelcard"; // corrected path
import PostOpportunityModal from "../components/PostOpportunityModal";
import { getCurrentUser, getUsersRegisteredThisMonth } from "../services/authService";
import { getAllOpportunities, getMyOpportunities, getOpportunitiesThisMonth, getAllApprovedOpportunities } from "../services/opportunityService";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardChart = ({ stats }) => {
  const data = {
    labels: ["Users Registered", "All Opportunities", "Opportunities This Month", "Approved Opportunities"],
    datasets: [
      {
        label: "Counts",
        data: [
          stats.usersRegistered,
          stats.allOpportunities,
          stats.opportunitiesThisMonth,
          stats.approvedOpportunities,
        ],
        backgroundColor: ["#3b82f6", "#10b981", "#ef4444", "#f59e0b"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Dashboard Overview", font: { size: 18 } },
    },
  };

  return <Bar data={data} options={options}/>;
};

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    usersRegistered: 0,
    allOpportunities: 0,
    myOpportunities: 0,
    opportunitiesThisMonth: 0,
    approvedOpportunities: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    const fetchData = async () => {
      try {
        const usersThisMonth = await getUsersRegisteredThisMonth();
        const allOpps = await getAllOpportunities();
        const myOpps = await getMyOpportunities();
        const thisMonthOpps = await getOpportunitiesThisMonth();
        const approvedOpps = await getAllApprovedOpportunities();

        setStats({
          usersRegistered: usersThisMonth?.count || 0,
          allOpportunities: allOpps.length || 0,
          myOpportunities: myOpps.length || 0,
          opportunitiesThisMonth: thisMonthOpps?.approvedThisMonth || 0,
          approvedOpportunities: approvedOpps.length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>User not found. Please login again.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}</h1>

      {/* Dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <Card title="Users Registered This Month" value={stats.usersRegistered} bgColor="bg-white" textColor="text-gray-800" />
        <Card title="All Opportunities" value={stats.allOpportunities} bgColor="bg-white" textColor="text-gray-800" />
        <Card title="Opportunities This Month" value={stats.opportunitiesThisMonth} bgColor="bg-white" textColor="text-gray-800" />
        <Card title="Approved Opportunities" value={stats.approvedOpportunities} bgColor="bg-white" textColor="text-gray-800" />
        <Card title="My Opportunities" value={stats.myOpportunities} bgColor="bg-white" textColor="text-gray-800" />
      </div>

      {/* Post Opportunity Section */}
      <div className="flex justify-center mb-10">
        <button
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg text-xl transition-all cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          + Post Opportunity
        </button>
      </div>

      {/* Dashboard Chart */}
      <div className="mb-10 bg-white p-6 rounded-xl shadow-lg">
        <DashboardChart stats={stats} />
      </div>

      {/* Recent Admin Tips / Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Admin Tips</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Regularly check opportunities to ensure accuracy.</li>
            <li>Verify new user registrations from @nsut.ac.in emails only.</li>
            <li>Encourage posting timely opportunities to engage users.</li>
            <li>Monitor monthly stats to track growth and activity.</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Website Info</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Total opportunities posted: {stats.allOpportunities}</li>
            <li>Opportunities posted this month: {stats.opportunitiesThisMonth}</li>
            <li>Approved opportunities: {stats.approvedOpportunities}</li>
            <li>Users registered this month: {stats.usersRegistered}</li>
            <li>Admins can post, edit, or remove opportunities anytime.</li>
          </ul>
        </div>
      </div>

      {/* Modal */}
      {showModal && <PostOpportunityModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AdminDashboard;
