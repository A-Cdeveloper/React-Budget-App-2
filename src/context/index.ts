import { useContext } from "react";
import { BudgetContext } from "./BudgetContext";
import { ExpenseContext } from "./ExpenseContext";

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) throw new Error("useBudget must be used within a CartProvider");

  return context;
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context)
    throw new Error("useExpense must be used within a CartProvider");

  return context;
};
