import { Expense } from "../types/entities";
import { API_URL } from "./constants";

export const getAllExpensesFromDb = async () => {
  const res = await fetch(`${API_URL}/expenses`);
  const data = await res.json();
  return data;
};

export const addNewExpenseToDb = async ({
  budgetId,
  amount,
  description,
}: Omit<Expense, "id">) => {
  const res = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ budgetId, amount, description }),
  });
  const data = await res.json();
  return data;
};

export const deleteExpenseFromDb = async (id: string) => {
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
