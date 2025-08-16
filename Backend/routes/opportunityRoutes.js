// routes/opportunityRoutes.js
const express = require("express");
const router = express.Router();
const {
  createOpportunity,
  updateOpportunity,
  getAllApproved,
  getAllOpportunities,
  getMyOpportunities,
  getAppliedOpportunities,
  deleteOpportunity,
  opportunitiesThisMonth,
  applyToOpportunity,
} = require("../controllers/opportunityController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// Routes

// Create opportunity (any logged-in user)
router.post("/", protect, createOpportunity);

// Update opportunity status (admin only)
router.put("/:id", protect, adminOnly, updateOpportunity);

// Get all approved opportunities (all users)
router.get("/approved", protect, getAllApproved);

// Get all opportunities (admin only)
router.get("/", protect, adminOnly, getAllOpportunities);

// Get opportunities created by logged-in user
router.get("/my", protect, getMyOpportunities);

// Get opportunities applied by logged-in user
router.get("/applied", protect, getAppliedOpportunities);

// Delete opportunity (admin or creator)
router.delete("/:id", protect, deleteOpportunity);

// Get count of approved opportunities this month
router.get("/stats/this-month", protect, opportunitiesThisMonth);

// Apply to an opportunity (any logged-in user)
router.post("/:id/apply", protect, applyToOpportunity);


module.exports = router;
