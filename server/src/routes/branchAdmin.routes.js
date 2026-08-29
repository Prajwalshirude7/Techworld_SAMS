const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/auth.middleware");

const {
  requireSuperAdmin
} = require("../middleware/role.middleware");

const {
  createBranchAdmin,
  getBranchAdmins,
  getBranchAdminById,
  updateBranchAdmin,
  deleteBranchAdmin
} = require("../controllers/branchAdmin.controller");


// CREATE BRANCH ADMIN
router.post(
  "/",
  authenticateToken,
  requireSuperAdmin,
  createBranchAdmin
);


// GET ALL BRANCH ADMINS
router.get(
  "/",
  authenticateToken,
  requireSuperAdmin,
  getBranchAdmins
);


// GET BRANCH ADMIN BY ID
router.get(
  "/:id",
  authenticateToken,
  requireSuperAdmin,
  getBranchAdminById
);


// UPDATE BRANCH ADMIN
router.put(
  "/:id",
  authenticateToken,
  requireSuperAdmin,
  updateBranchAdmin
);


// DEACTIVATE BRANCH ADMIN
router.delete(
  "/:id",
  authenticateToken,
  requireSuperAdmin,
  deleteBranchAdmin
);

module.exports = router;