const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { registerUser, registerAdmin, login, usersRegisteredThisMonth } = require("../controllers/authController");

const router = express.Router();

// User Register (UI)
router.post("/register", registerUser);

// Admin Register (Internal only - not exposed in frontend)
router.post("/register-admin", registerAdmin);

// Login (both user & admin)
router.post("/login", login);

router.get("/stats/this-month", protect, adminOnly, usersRegisteredThisMonth);

module.exports = router;
