const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        message: "No token provided ❌"
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN:", decoded);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found ❌"
      });
    }

    console.log("USER:", user.email);

    req.user = user;

    next();

  } catch (error) {
    console.log("AUTH ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token ❌"
    });
  }
};
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied ❌"
      });
    }

    next();
  };
};
module.exports = {
  protect,
  authorizeRoles
};
