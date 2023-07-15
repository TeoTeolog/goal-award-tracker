const express = require("express");
const route = express.Router();

const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

route.route("/").get(getGoals).post(setGoal);
route.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = route;
