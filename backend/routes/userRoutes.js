const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMeInfo,
} = require("../controllers/userController");

const { protect } = require("../middleware/authorizeMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMeInfo);

module.exports = router;
