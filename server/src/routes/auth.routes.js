const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getLoginHistory,
} = require("../controllers/auth.controller");

router.post("/register", register);

router.post("/login", login);

router.get("/login-history", getLoginHistory);

module.exports = router;