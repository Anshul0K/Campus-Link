import React, { useEffect, useState } from "react";
import OpportunityCard from "../components/OpportunityCard";
import { getAllPendingOpportunities, updateOpportunityStatus } from "../services/opportunityService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PendingOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingOpportunities();
  }, []);

  const fetchPendingOpportunities = async () => {
    try {
      setLoading(true);
      const data = await getAllPendingOpportunities();
      setOpportunities(data);
    } catch (err) {
      toast.error(typeof err === "string" ? err : err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await updateOpportunityStatus(id, { status: "approved" });
      toast.success("Opportunity accepted!");
      fetchPendingOpportunities(); 
    } catch (err) {
      toast.error(typeof err === "string" ? err : err.message || "Failed to accept opportunity");
    }
  };

  const handleReject = async (id) => {
    try {
      await updateOpportunityStatus(id, { status: "rejected" });
      toast.error("Opportunity rejected!");
      fetchPendingOpportunities(); 
    } catch (err) {
      toast.error(typeof err === "string" ? err : err.message || "Failed to reject opportunity");
    }
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4">Pending Opportunities</h1>
      {loading ? (
        <p>Loading...</p>
      ) : opportunities.length === 0 ? (
        <p>No pending opportunities found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {opportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity._id}
              opportunity={opportunity}
              showStatus={true}
              showAcceptReject={true}
              onAccept={() => handleAccept(opportunity._id)}
              onReject={() => handleReject(opportunity._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingOpportunities;
