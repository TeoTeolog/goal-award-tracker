const express = require("express");
const route = express.Router();

const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authorizeMiddleware");

route.route("/").get(protect, getGoals).post(protect, setGoal);
route.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = route;
