// controllers/opportunityController.js
const mongoose = require("mongoose");
const Opportunity = require("../models/Opportunity");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const User = require("../models/User");

const applyToOpportunity = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    // Check if already applied
    if (user.appliedOpportunities.includes(opportunity._id)) {
      return res.status(400).json({ message: "Already applied" });
    }

    user.appliedOpportunities.push(opportunity._id);
    await user.save();

    res.status(200).json({ message: "Successfully applied" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Create Opportunity (any user or admin)
const createOpportunity = async (req, res) => {
  try {
    const { title, description, deadline, link, eligibility } = req.body;

    // Check required fields
    if (!title || !description || !deadline || !link || !eligibility) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const opportunity = new Opportunity({
      title,
      description,
      deadline,
      link,
      eligibility,
      status: "pending",
      postedBy: req.user.id,
    });

    await opportunity.save();

    // Push to user's opportunitiesCreated
    await User.findByIdAndUpdate(req.user.id, {
      $push: { opportunitiesCreated: opportunity._id },
    });

    res.status(201).json({ message: "Opportunity created", opportunity });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Update Opportunity (only admin can approve/reject)
const updateOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "approved" or "rejected"

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const opportunity = await Opportunity.findById(id);
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    opportunity.status = status;
    await opportunity.save();

    res.json({ message: `Opportunity ${status}`, opportunity });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get all approved opportunities (all users)
const getAllApproved = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ status: "approved" });
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get all opportunities (admin only, includes pending, approved, rejected)
const getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get opportunities created by the logged-in user
const getMyOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ postedBy: req.user.id });
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get opportunities applied by the logged-in user
const getAppliedOpportunities = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("appliedOpportunities");
    res.json(user.appliedOpportunities);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete opportunity (admin or creator only)
const deleteOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const opportunity = await Opportunity.findById(id);
    if (!opportunity) return res.status(404).json({ message: "Opportunity not found" });

    // Only admin or creator can delete
    if (req.user.role !== "admin" && opportunity.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    await opportunity.remove();

    // Remove from creator's opportunitiesCreated list
    await User.findByIdAndUpdate(opportunity.postedBy, {
      $pull: { opportunitiesCreated: opportunity._id },
    });

    res.json({ message: "Opportunity deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

// Count of approved opportunities posted this month
const opportunitiesThisMonth = async (req, res) => {
  try {
    const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    const count = await Opportunity.countDocuments({
      status: "approved",
      createdAt: { $gte: start, $lte: end },
    });

    res.json({ approvedThisMonth: count });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  createOpportunity,
  updateOpportunity,
  getAllApproved,
  getAllOpportunities,
  getMyOpportunities,
  getAppliedOpportunities,
  deleteOpportunity,
  opportunitiesThisMonth,
  applyToOpportunity,
};
