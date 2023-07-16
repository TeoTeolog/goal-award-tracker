const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// const Goal = require("../models/goalModel");

//@route POST api/user/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("This user is already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  if (!newUser) {
    res.status(400);
    throw new Error("Somethings going wrong");
  }

  res.status(201).json({
    _id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  });
});

//@route POST api/user/register
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const user = await User.findOne({ email });

  if (!(user && (await bcrypt.compare(password, user.password)))) {
    res.status(400);
    throw new Error("Invalide login or password");
  }

  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

//@route POST api/user/register
const getMeInfo = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findOne(req.user.id);

  res.status(200).json({
    id: _id,
    name: name,
    email: email,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMeInfo,
};
