const moment = require("moment");

const logger = (req, res, next) => {
  console.log(
    "request Params METHOD:",
    req.method,
    " URL:",
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

module.exports = logger;
