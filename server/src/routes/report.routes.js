const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
    requireSuperAdmin
} = require("../middleware/role.middleware");

const {
    overallReport,
    studentReport,
    revenueReport,
    feeCollectionReport,
    branchReport,
    productSalesReport,
    subscriptionReport,
    admissionReport
} = require("../controllers/report.controller");


// =====================================================
// OVERALL REPORT
// GET /api/admin/reports
// =====================================================

router.get(
    "/",
    authMiddleware,
    requireSuperAdmin,
    overallReport
);


// =====================================================
// STUDENT REPORT
// =====================================================

router.get(
    "/students",
    authMiddleware,
    requireSuperAdmin,
    studentReport
);


// =====================================================
// REVENUE REPORT
// =====================================================

router.get(
    "/revenue",
    authMiddleware,
    requireSuperAdmin,
    revenueReport
);


// =====================================================
// FEE REPORT
// =====================================================

router.get(
    "/fees",
    authMiddleware,
    requireSuperAdmin,
    feeCollectionReport
);


// =====================================================
// BRANCH REPORT
// =====================================================

router.get(
    "/branches",
    authMiddleware,
    requireSuperAdmin,
    branchReport
);


// =====================================================
// PRODUCT REPORT
// =====================================================

router.get(
    "/products",
    authMiddleware,
    requireSuperAdmin,
    productSalesReport
);


// =====================================================
// SUBSCRIPTION REPORT
// =====================================================

router.get(
    "/subscriptions",
    authMiddleware,
    requireSuperAdmin,
    subscriptionReport
);


// =====================================================
// ADMISSION REPORT
// =====================================================

router.get(
    "/admissions",
    authMiddleware,
    requireSuperAdmin,
    admissionReport
);


module.exports = router;