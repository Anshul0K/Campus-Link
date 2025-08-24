import API from "./api"; // your axios instance

// ------------------- CREATE OPPORTUNITY (Any logged-in user) ------------------- //
export const createOpportunity = async (opportunityData) => {
  try {
    const { data } = await API.post("/opportunities", opportunityData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Network error";
  }
};

// ------------------- UPDATE OPPORTUNITY STATUS (Admin only) ------------------- //
export const updateOpportunityStatus = async (id, statusData) => {
  try {
    const { data } = await API.put(`/opportunities/${id}`, statusData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Network error";
  }
};

// ------------------- GET ALL APPROVED OPPORTUNITIES (All users) ------------------- //
export const getAllApprovedOpportunities = async () => {
  try {
    const { data } = await API.get("/opportunities/approved");
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Network error";
  }
};

// ------------------- GET ALL OPPORTUNITIES (Admin only) ------------------- //
export const getAllOpportunities = async () => {
  try {
    const { data } = await API.get("/opportunities");
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Network error";
  }
};

// ------------------- GET MY OPPORTUNITIES (Creator only) ------------------- //
export const getMyOpportunities = async () => {
  try {
    const { data } = await API.get("/opportunities/my");
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Network error";
  }
};

// ------------------- GET APPLIED OPPORTUNITIES (User only) ------------------- //
export const getAppliedOpportunities = async () => {
  try {
    const { data } = await API.get("/opportunities/applied");
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Network error";
  }
};

// ------------------- DELETE OPPORTUNITY (Admin or creator) ------------------- //
export const deleteOpportunity = async (id) => {
  try {
    const { data } = await API.delete(`/opportunities/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Network error";
  }
};

// ------------------- GET APPROVED OPPORTUNITIES THIS MONTH  ------------------- //
export const getOpportunitiesThisMonth = async () => {
  try {
    const { data } = await API.get("/opportunities/stats/this-month");
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Network error";
  }
};

// ------------------- APPLY TO OPPORTUNITY (Any logged-in user) ------------------- //
export const applyToOpportunity = async (id) => {
  try {
    const { data } = await API.post(`/opportunities/${id}/apply`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Network error";
  }
};
