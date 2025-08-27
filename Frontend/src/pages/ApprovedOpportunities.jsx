// src/pages/AllApprovedOpportunities.jsx
import React, { useEffect, useState } from "react";
import OpportunityCard from "../components/OpportunityCard";
import {
  getAllApprovedOpportunities,
  getAppliedOpportunities,
  applyToOpportunity,
} from "../services/opportunityService";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllApprovedOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const [allApproved, applied] = await Promise.all([
        getAllApprovedOpportunities(),
        getAppliedOpportunities(),
      ]);

      setOpportunities(allApproved);
      setAppliedIds(applied.map((op) => op._id)); // store applied IDs
    } catch (err) {
      console.error("Error fetching opportunities:", err);
    }
  };

  const handleApply = async (id) => {
    try {
      await applyToOpportunity(id);
      setAppliedIds((prev) => [...prev, id]); // mark as applied immediately
      toast.success("Applied to opportunity!"); // success toast
    } catch (err) {
      console.error("Error applying to opportunity:", err);
      toast.error("Failed to apply. Please try again."); // error toast
    }
  };

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        All Approved Opportunities
      </h1>

      {opportunities.length === 0 ? (
        <p className="text-gray-600">No opportunities available.</p>
      ) : (
        opportunities.map((op) => (
          <OpportunityCard
            key={op._id}
            opportunity={op}
            showApplied={true} // always show Apply/Applied
            applied={appliedIds.includes(op._id)} // true if already applied
            onApply={handleApply}
          />
        ))
      )}
    </div>
  );
};

export default AllApprovedOpportunities;
