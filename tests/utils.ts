import { HttpResponse, http } from "msw";
import { Expense } from "../src/types/entities";
import { API_URL, UNCATEGORIZER_BUDGET_ID } from "../src/utils/constants";
import { mockServer } from "./mocks/server";

export const fetchBudgets = async () => {
  const response = await fetch(`${API_URL}/budgets`);
  const data = await response.json();
  return data.budgets;
};

export const fetchUncategorizedBudgetExpenses = async () => {
  return [
    {
      id: "5047008137",
      description: "Pasta Carbonara",
      amount: 48,
      budgetId: UNCATEGORIZER_BUDGET_ID,
    },
    {
      id: "0661770884",
      description: "Souvlaki",
      amount: 35,
      budgetId: UNCATEGORIZER_BUDGET_ID,
    },
    {
      id: "8066923238",
      description: "Arepas",
      amount: 80,
      budgetId: UNCATEGORIZER_BUDGET_ID,
    },
  ];
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

export const fetchExpense = async () => {
  const response = await fetch(`${API_URL}/expenses`);
  const data = await response.json();
  return data.expenses[0];
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
