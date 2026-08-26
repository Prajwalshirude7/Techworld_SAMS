const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  requireSuperAdmin
} = require("../middleware/role.middleware");

const {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement
} = require("../controllers/announcement.controller");


// CREATE ANNOUNCEMENT

router.post(
  "/",
  authMiddleware,
  requireSuperAdmin,
  createAnnouncement
);


// GET ALL ANNOUNCEMENTS

router.get(
  "/",
  authMiddleware,
  requireSuperAdmin,
  getAnnouncements
);


// GET ANNOUNCEMENT BY ID

router.get(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  getAnnouncementById
);


// UPDATE ANNOUNCEMENT

router.put(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  updateAnnouncement
);


// DELETE ANNOUNCEMENT

router.delete(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  deleteAnnouncement
);


module.exports = router;