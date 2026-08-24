const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  requireSuperAdmin
} = require("../middleware/role.middleware");

const {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan
} = require("../controllers/subscriptionPlan.controller");


// CREATE PLAN
router.post(
  "/",
  authMiddleware,
  requireSuperAdmin,
  createPlan
);


// GET ALL PLANS
router.get(
  "/",
  authMiddleware,
  requireSuperAdmin,
  getPlans
);


// GET PLAN BY ID
router.get(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  getPlanById
);


// UPDATE PLAN
router.put(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  updatePlan
);


// DEACTIVATE PLAN
router.delete(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  deletePlan
);

module.exports = router;