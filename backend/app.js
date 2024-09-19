const express = require("express");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const budgetRouter = require("./router/budgetRouter");
const expesnseRouter = require("./router/expensetRouter");
app.use("/api/v1/budgets", budgetRouter);
app.use("/api/v1/expenses", expesnseRouter);

app.all("*", (req, res, next) => {
  const err = new Error("Wrong route");
  err.statusCode = 404;
  err.status = "failed";
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
