const express = require("express");

const router = express.Router();

const {
  getAdmissions,
  getPendingAdmissions,
  getAdmissionById,
  approveAdmission,
  rejectAdmission
} = require("../controllers/admission.controller");

const authMiddleware = require("../middleware/auth.middleware");

const roleMiddleware = require("../middleware/role.middleware");


// =====================================================
// SUPER ADMIN ONLY
// =====================================================

// GET ALL ADMISSIONS
router.get(
  "/",
  authMiddleware,
  roleMiddleware.requireSuperAdmin,
  getAdmissions
);


// GET PENDING ADMISSIONS
router.get(
  "/pending",
  authMiddleware,
  roleMiddleware.requireSuperAdmin,
  getPendingAdmissions
);


// GET ADMISSION BY ID
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware.requireSuperAdmin,
  getAdmissionById
);


// APPROVE ADMISSION
router.put(
  "/:id/approve",
  authMiddleware,
  roleMiddleware.requireSuperAdmin,
  approveAdmission
);


// REJECT ADMISSION
router.put(
  "/:id/reject",
  authMiddleware,
  roleMiddleware.requireSuperAdmin,
  rejectAdmission
);


module.exports = router;