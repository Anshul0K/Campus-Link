const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { registerUser, registerAdmin, login, usersRegisteredThisMonth, getAllUsers,
  deleteUser } = require("../controllers/authController");

const router = express.Router();

// User Register (UI)
router.post("/register", registerUser);

// Admin Register (Internal only - not exposed in frontend)
router.post("/register-admin", registerAdmin);

// Login (both user & admin)
router.post("/login", login);

router.get("/stats/this-month", protect, usersRegisteredThisMonth);

router.get("/all-users", protect, adminOnly, getAllUsers); // only admin
router.delete("/user/:id", protect, adminOnly, deleteUser); // only admin

module.exports = router;
