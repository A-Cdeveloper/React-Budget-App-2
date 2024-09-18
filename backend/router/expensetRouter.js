const express = require("express");
const {
  getAllExpenses,
  getSingleExpense,
  createNewExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.route("/").get(getAllExpenses).post(createNewExpense);
router.route("/:id").get(getSingleExpense).delete(deleteExpense);

module.exports = router;
