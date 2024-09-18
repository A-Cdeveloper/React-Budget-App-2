const {
  getAllBudgetsFromDB,
  getSingleBudgetFromDB,
  creteNewBudgetFromDB,
  deleteBudgetFromDB,
} = require("../db/budgetQueries");

///
exports.getAllBudgets = async (_, res) => {
  try {
    const budgets = await getAllBudgetsFromDB();

    res.status(200).json({
      status: "success",
      results: budgets.length,
      data: {
        budgets,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getSingleBudget = async (req, res, next) => {
  const { id } = req.params;
  const budget = await getSingleBudgetFromDB(id);

  res.status(200).json({
    status: "success",
    data: {
      budget,
    },
  });
};

exports.createNewBudget = async (req, res) => {
  await creteNewBudgetFromDB(req.body);
  res.status(201).json({
    status: "success",
    message: "Budget successfuly created",
  });
};

exports.deleteBudget = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteBudgetFromDB(id);
    res.status(200).json({
      status: "success",
      message: "Budget successfuly deleted",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
