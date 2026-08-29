const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/auth.middleware");

const {
  requireSuperAdmin
} = require("../middleware/role.middleware");

const {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch
} = require("../controllers/branch.controller");


// CREATE BRANCH
router.post(
  "/",
  authenticateToken,
  requireSuperAdmin,
  createBranch
);


// GET ALL BRANCHES
router.get(
  "/",
  authenticateToken,
  requireSuperAdmin,
  getAllBranches
);


// GET BRANCH BY ID
router.get(
  "/:id",
  authenticateToken,
  requireSuperAdmin,
  getBranchById
);


// UPDATE BRANCH
router.put(
  "/:id",
  authenticateToken,
  requireSuperAdmin,
  updateBranch
);


// DEACTIVATE BRANCH
router.delete(
  "/:id",
  authenticateToken,
  requireSuperAdmin,
  deleteBranch
);

module.exports = router;