const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
    requireSuperAdmin
} = require("../middleware/role.middleware");

const {
    getSections,
    getSection,
    createSection,
    updateSection,
    deleteSection
} = require("../controllers/cms.controller");


// GET ALL CMS SECTIONS

router.get(
    "/",
    authMiddleware,
    requireSuperAdmin,
    getSections
);


// GET SINGLE SECTION

router.get(
    "/:section",
    authMiddleware,
    requireSuperAdmin,
    getSection
);


// CREATE SECTION

router.post(
    "/",
    authMiddleware,
    requireSuperAdmin,
    createSection
);


// UPDATE SECTION

router.put(
    "/:section",
    authMiddleware,
    requireSuperAdmin,
    updateSection
);


// DELETE SECTION

router.delete(
    "/:section",
    authMiddleware,
    requireSuperAdmin,
    deleteSection
);


module.exports = router;