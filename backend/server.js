const express = require("express");
const dotenv = require("dotenv").config();
const logger = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server was started on port:${PORT}...`));
