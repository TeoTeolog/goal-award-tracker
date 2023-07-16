const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(`[${__dirname}/${__filename}/protect] auth error:`, error);
      res.status(401);
      throw new Error("Unauthorized user!");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized user, no token!");
  }
});

module.exports = { protect };
