const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  requireSuperAdmin
} = require("../middleware/role.middleware");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder
} = require("../controllers/order.controller");


// =====================================================
// CREATE ORDER
// =====================================================

router.post(
  "/",
  authMiddleware,
  requireSuperAdmin,
  createOrder
);


// =====================================================
// GET ALL ORDERS
// =====================================================

router.get(
  "/",
  authMiddleware,
  requireSuperAdmin,
  getOrders
);


// =====================================================
// GET ORDER BY ID
// =====================================================

router.get(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  getOrderById
);


// =====================================================
// UPDATE ORDER STATUS
// =====================================================

router.put(
  "/:id/status",
  authMiddleware,
  requireSuperAdmin,
  updateOrderStatus
);


// =====================================================
// CANCEL ORDER
// =====================================================

router.put(
  "/:id/cancel",
  authMiddleware,
  requireSuperAdmin,
  cancelOrder
);


module.exports = router;