const prisma = require("./db");

exports.getAllBudgetsFromDB = async () => {
  try {
    const budgets = await prisma.budgets.findMany({});
    return budgets;
  } catch (error) {
    throw new Error("Database connection was refused.");
  }
};

exports.getSingleBudgetFromDB = async (id) => {
  const budget = await prisma.budgets.findUnique({
    where: {
      id,
    },
  });
  return budget;
};

exports.creteNewBudgetFromDB = async (newBudget) => {
  const { name, max } = newBudget;
  const results = await prisma.budgets.create({
    data: {
      name,
      max,
    },
  });
  return results;
};

exports.deleteBudgetFromDB = async (id) => {
  try {
    const results = await prisma.budgets.delete({
      where: {
        id,
      },
    });
    return results;
  } catch (error) {
    throw new Error("Budget not found.");
  }
};
