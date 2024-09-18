const prisma = require("./db");

exports.getAllExpensesFromDB = async () => {
  try {
    const expenses = await prisma.expenses.findMany();
    return expenses;
  } catch (error) {
    throw new Error("Database connection was refused.");
  }
};

exports.getSingleExpenseFromDB = async (id) => {
  const expense = await prisma.expenses.findUnique({
    where: {
      id,
    },
  });
  return expense;
};

exports.createNeweExpenseFromDB = async (newexpense) => {
  const { amount, description, budgetId } = newexpense;
  const results = await prisma.expenses.create({
    data: {
      amount,
      description,
      budgetId,
    },
  });
  return results;
};

exports.deleteExpenseFromDB = async (id) => {
  try {
    const results = await prisma.expenses.delete({
      where: {
        id,
      },
    });
    return results;
  } catch (error) {
    throw new Error("expense not found.");
  }
};
