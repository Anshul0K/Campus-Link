const jwt = require("jsonwebtoken");

// Protect routes: verifies JWT and attaches user to req
const protect = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log decoded token for debugging
    console.log("Decoded token:", decoded);

    // Attach user info to request
    req.user = decoded; // { id: "...", role: "user/admin" }

    next();
  } catch (err) {
    console.error("Token error:", err.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Allow only admin users
const adminOnly = (req, res, next) => {
  console.log("User in adminOnly:", req.user);
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
};

module.exports = { protect, adminOnly };
