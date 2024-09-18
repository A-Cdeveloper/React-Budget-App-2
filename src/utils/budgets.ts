import { Budget } from "../types/entities";
import { API_URL } from "./constants";

export const getAllBudgetsFromDb = async () => {
  const res = await fetch(`${API_URL}/budgets`);
  const data = await res.json();
  return data;
};

export const addNewBudgetToDb = async ({ name, max }: Omit<Budget, "id">) => {
  const res = await fetch(`${API_URL}/budgets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, max }),
  });
  const data = await res.json();
  return data;
};

export const deleteBudgetFromDb = async (id: string) => {
  const res = await fetch(`${API_URL}/budgets/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
