const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");

//@route GET api/goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

//@route POST api/goals
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});

//@route PUT api/goals/:id
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  //   const goal = await Goal.find({ id: req.params.id }); //jopa govna

  console.log(goal);

  if (!goal) {
    res.status(400);
    throw new Error("Goal was not found!");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

//@route DELETE api/goals/:id
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  console.log(goal);

  if (!goal) {
    res.status(400);
    throw new Error("Goal was not found!");
  }

  //   const deleteRes = await Goal.deleteOne({ id: req.params.id });
  //   res.status(200).json({ deleteRes, id: req.params.id });

  //   await goal.remove(); //jopa govnisha

  const deleteRes = await Goal.deleteOne({ _id: goal.id }); // "_id" crutch

  res.status(200).json({ deleteRes, id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
