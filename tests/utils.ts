import { Expense } from "../src/types/entities";
import { API_URL } from "../src/utils/constants";

export const fetchBudgets = async () => {
  const response = await fetch(`${API_URL}/budgets`);
  const data = await response.json();
  return data.budgets;
};

export const fetchBudget = async () => {
  const response = await fetch(`${API_URL}/budgets`);
  const data = await response.json();
  return data.budgets[0];
};

export const fetchExpenses = async () => {
  const response = await fetch(`${API_URL}/expenses`);
  const data = await response.json();
  return data.expenses;
};

export const fetchExpensesForSingleBudget = async (
  budgetId: string | undefined
) => {
  const response = await fetch(`${API_URL}/expenses`);
  const data = await response.json();
  return data.expenses.filter(
    (expense: Expense) => expense.budgetId === budgetId
  );
};
