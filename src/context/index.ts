import { useContext } from "react";
import { BudgetContext } from "./BudgetContext";

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) throw new Error("useBudget must be used within a CartProvider");

  return context;
};
