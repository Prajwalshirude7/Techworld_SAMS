const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  requireSuperAdmin
} = require("../middleware/role.middleware");

const {
  createFee,
  getFees,
  getFeeById,
  updateFee,
  deleteFee
} = require("../controllers/fee.controller");


router.post(
  "/",
  authMiddleware,
  requireSuperAdmin,
  createFee
);


router.get(
  "/",
  authMiddleware,
  requireSuperAdmin,
  getFees
);


router.get(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  getFeeById
);


router.put(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  updateFee
);

// DELETE FEE
router.delete(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  deleteFee
);

module.exports = router;