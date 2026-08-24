const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  requireSuperAdmin
} = require("../middleware/role.middleware");

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controllers/category.controller");


router.post(
  "/",
  authMiddleware,
  requireSuperAdmin,
  createCategory
);


router.get(
  "/",
  authMiddleware,
  requireSuperAdmin,
  getCategories
);


router.get(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  getCategoryById
);


router.put(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  updateCategory
);


router.delete(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  deleteCategory
);


module.exports = router;