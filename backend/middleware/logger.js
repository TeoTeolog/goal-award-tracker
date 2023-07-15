const moment = require("moment");

const logger = (req, res, next) => {
  console.log(
    "request URL:",
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

module.exports = logger;
