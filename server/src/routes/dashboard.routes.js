const express = require("express");

const router = express.Router();

const authenticateToken =
  require("../middleware/auth.middleware");

const requireSuperAdmin =
  require("../middleware/role.middleware");

const {
  getDashboard,
} = require("../controllers/dashboard.controller");

router.get(
  "/",
  authenticateToken,
  requireSuperAdmin,
  getDashboard
);

module.exports = router;