const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  requireSuperAdmin
} = require("../middleware/role.middleware");

const {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment
} = require("../controllers/payment.controller");


router.post(
  "/",
  authMiddleware,
  requireSuperAdmin,
  createPayment
);


router.get(
  "/",
  authMiddleware,
  requireSuperAdmin,
  getPayments
);


router.get(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  getPaymentById
);
// UPDATE PAYMENT
router.put(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  updatePayment
);


// DELETE PAYMENT
router.delete(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  deletePayment
);


module.exports = router;