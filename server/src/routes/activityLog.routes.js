const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
    requireSuperAdmin
} = require("../middleware/role.middleware");

const {
    getActivityLogs,
    getActivityLogById
} = require("../controllers/activityLog.controller");


router.get(
    "/",
    authMiddleware,
    requireSuperAdmin,
    getActivityLogs
);


router.get(
    "/:id",
    authMiddleware,
    requireSuperAdmin,
    getActivityLogById
);


module.exports = router;