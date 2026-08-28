const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
    requireSuperAdmin
} = require("../middleware/role.middleware");

const {
    getSettings,
    getSetting,
    createSetting,
    updateSetting
} = require("../controllers/settings.controller");


// GET ALL SETTINGS

router.get(
    "/",
    authMiddleware,
    requireSuperAdmin,
    getSettings
);


// GET SETTING BY KEY

router.get(
    "/:key",
    authMiddleware,
    requireSuperAdmin,
    getSetting
);


// CREATE SETTING

router.post(
    "/",
    authMiddleware,
    requireSuperAdmin,
    createSetting
);


// UPDATE SETTING

router.put(
    "/:key",
    authMiddleware,
    requireSuperAdmin,
    updateSetting
);


module.exports = router;