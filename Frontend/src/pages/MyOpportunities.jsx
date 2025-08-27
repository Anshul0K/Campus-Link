import React, { useEffect, useState } from "react";
import { getMyOpportunities, deleteOpportunity } from "../services/opportunityService";
import OpportunityCard from "../components/OpportunityCard";

const MyOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    fetchMyOpportunities();
  }, []);

  const fetchMyOpportunities = async () => {
    try {
      const data = await getMyOpportunities();
      setOpportunities(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOpportunity(id);
      setOpportunities(opportunities.filter((opp) => opp._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Opportunities Posted by You
      </h1>

      {/* Cards container */}
      <div className="flex flex-wrap justify-center gap-6">
        {opportunities.map((opp) => (
          <OpportunityCard
            key={opp._id}
            opportunity={opp}
            showStatus={true}
            showDelete={true}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MyOpportunities;
