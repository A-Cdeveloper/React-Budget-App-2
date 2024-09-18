const {
  getAllExpensesFromDB,
  getSingleExpenseFromDB,
  createNeweExpenseFromDB,
  deleteExpenseFromDB,
} = require("../db/expenseQueries");

///
exports.getAllExpenses = async (_, res) => {
  try {
    const expenses = await getAllExpensesFromDB();

    res.status(200).json({
      status: "success",
      results: expenses.length,
      data: {
        expenses,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getSingleExpense = async (req, res, next) => {
  const { id } = req.params;
  const expense = await getSingleExpenseFromDB(id);

  res.status(200).json({
    status: "success",
    data: {
      expense,
    },
  });
};

exports.createNewExpense = async (req, res) => {
  await createNeweExpenseFromDB(req.body);
  res.status(201).json({
    status: "success",
    message: "Expense successfuly created",
  });
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteExpenseFromDB(id);
    res.status(200).json({
      status: "success",
      message: "Expense successfuly deleted",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
