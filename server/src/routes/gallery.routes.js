const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  requireSuperAdmin
} = require("../middleware/role.middleware");

const {
  createGallery,
  getGallery,
  getGalleryById,
  updateGallery,
  deleteGallery
} = require("../controllers/gallery.controller");


// CREATE
router.post(
  "/",
  authMiddleware,
  requireSuperAdmin,
  createGallery
);


// GET ALL
router.get(
  "/",
  authMiddleware,
  requireSuperAdmin,
  getGallery
);


// GET BY ID
router.get(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  getGalleryById
);


// UPDATE
router.put(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  updateGallery
);


// DELETE
router.delete(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  deleteGallery
);


module.exports = router;