import React, { useEffect, useState } from "react";
import OpportunityCard from "../components/OpportunityCard";
import { getAppliedOpportunities } from "../services/opportunityService";

const AppliedOpportunities = () => {
  const [appliedOpportunities, setAppliedOpportunities] = useState([]);

  useEffect(() => {
    const fetchApplied = async () => {
      try {
        const data = await getAppliedOpportunities(); // use service
        setAppliedOpportunities(data); // data should be an array
      } catch (error) {
        console.error("Error fetching applied opportunities:", error);
      }
    };
    fetchApplied();
  }, []);

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Applied Opportunities</h1>

      {appliedOpportunities.length === 0 ? (
        <p className="text-gray-500">You have not applied to any opportunities yet.</p>
      ) : (
        appliedOpportunities.map((opp) => (
          <OpportunityCard
            key={opp._id}
            opportunity={opp}
            showApplied={true}
            applied={true} // always true for applied opportunities
          />
        ))
      )}
    </div>
  );
};

export default AppliedOpportunities;
