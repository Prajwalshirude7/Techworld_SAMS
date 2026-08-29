const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateStock,
  deleteProduct
} = require("../controllers/product.controller");

const authMiddleware = require("../middleware/auth.middleware");
const { requireSuperAdmin } = require("../middleware/role.middleware");


// CREATE PRODUCT
router.post(
  "/",
  authMiddleware,
  requireSuperAdmin,
  createProduct
);


// GET ALL PRODUCTS
router.get(
  "/",
  authMiddleware,
  requireSuperAdmin,
  getProducts
);


// GET PRODUCT BY ID
router.get(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  getProductById
);


// UPDATE PRODUCT
router.put(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  updateProduct
);


// UPDATE STOCK
router.put(
  "/:id/stock",
  authMiddleware,
  requireSuperAdmin,
  updateStock
);


// DISCONTINUE PRODUCT
router.delete(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  deleteProduct
);


module.exports = router;