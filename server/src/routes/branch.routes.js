const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/auth.middleware");
const requireSuperAdmin = require("../middleware/role.middleware");

const {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} = require("../controllers/branch.controller");

// All Branch Management APIs require Super Admin access

router.post(
  "/",
  authenticateToken,
  requireSuperAdmin,
  createBranch
);

router.get(
  "/",
  authenticateToken,
  requireSuperAdmin,
  getAllBranches
);

router.get(
  "/:id",
  authenticateToken,
  requireSuperAdmin,
  getBranchById
);

router.put(
  "/:id",
  authenticateToken,
  requireSuperAdmin,
  updateBranch
);

router.delete(
  "/:id",
  authenticateToken,
  requireSuperAdmin,
  deleteBranch
);

module.exports = router;