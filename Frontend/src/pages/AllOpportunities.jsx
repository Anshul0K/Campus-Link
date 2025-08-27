import React, { useEffect, useState } from "react";
import OpportunityCard from "../components/OpportunityCard";
import { getAllOpportunities } from "../services/opportunityService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const data = await getAllOpportunities();
      setOpportunities(data);
    } catch (err) {
      toast.error(typeof err === "string" ? err : err.message || "Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4">All Opportunities</h1>
      {loading ? (
        <p>Loading...</p>
      ) : opportunities.length === 0 ? (
        <p>No opportunities found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {opportunities.map((opp) => (
            <OpportunityCard
              key={opp._id}
              opportunity={opp}
              showStatus={true}
              showPostedBy={true} // added posted by logic
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOpportunities;
