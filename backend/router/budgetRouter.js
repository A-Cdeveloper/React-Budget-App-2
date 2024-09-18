const express = require("express");
const {
  getAllBudgets,
  getSingleBudget,
  createNewBudget,
  deleteBudget,
} = require("../controllers/budgetController");

const router = express.Router();

router.route("/").get(getAllBudgets).post(createNewBudget);
router.route("/:id").get(getSingleBudget).delete(deleteBudget);

module.exports = router;
