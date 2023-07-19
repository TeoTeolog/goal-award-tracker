const path = require("path");
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server was started on port:${PORT}...`));
