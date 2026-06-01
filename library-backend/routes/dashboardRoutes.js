const express = require("express");

const router = express.Router();

const {
getDashboard
} = require(
"../controllers/dashboardController"
);

const protect = require(
"../middlewares/authMiddleware"
);

const adminOnly = require(
"../middlewares/roleMiddleware"
);

router.get(
"/",
protect,
adminOnly,
getDashboard
);

module.exports = router;