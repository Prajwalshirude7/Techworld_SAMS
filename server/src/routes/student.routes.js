const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  requireSuperAdmin
} = require("../middleware/role.middleware");

const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deactivateStudent
} = require("../controllers/student.controller");


// =====================================================
// CREATE STUDENT
// POST /api/admin/students
// =====================================================

router.post(
  "/",
  authMiddleware,
  requireSuperAdmin,
  createStudent
);


// =====================================================
// GET ALL STUDENTS
// GET /api/admin/students
// =====================================================

router.get(
  "/",
  authMiddleware,
  requireSuperAdmin,
  getStudents
);


// =====================================================
// GET STUDENT BY ID
// GET /api/admin/students/:id
// =====================================================

router.get(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  getStudentById
);


// =====================================================
// UPDATE STUDENT
// PUT /api/admin/students/:id
// =====================================================

router.put(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  updateStudent
);


// =====================================================
// DEACTIVATE STUDENT
// DELETE /api/admin/students/:id
// =====================================================

router.delete(
  "/:id",
  authMiddleware,
  requireSuperAdmin,
  deactivateStudent
);


module.exports = router;