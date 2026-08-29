const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  requireSuperAdmin
} = require("../middleware/role.middleware");

const {
  createAchievement,
  getAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement
} = require("../controllers/achievement.controller");


// CREATE
router.post(
  "/",
  authMiddleware,
  requireSuperAdmin,
  createAchievement
);


// GET ALL
router.get(
  "/",
  authMiddleware,
  requireSuperAdmin,
  getAchievements
);


// GET BY ID
router.get(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  getAchievementById
);


// UPDATE
router.put(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  updateAchievement
);


// DELETE
router.delete(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  deleteAchievement
);

module.exports = router;