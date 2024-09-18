import { PropsWithChildren, createContext, useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { Budget } from "../types/entities";
import {
  addNewBudgetToDb,
  getAllBudgetsFromDb,
  deleteBudgetFromDb,
} from "../utils/budgets";

type BudgetContextType = {
  budgets: Budget[];
  addBudget: (budget: Budget) => void;
  deleteBudget: (budgetId: string) => void;
};

export const BudgetContext = createContext<BudgetContextType>(
  {} as BudgetContextType
);

export const BudgetContextProvider = ({ children }: PropsWithChildren) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const fetchBudgets = async () => {
      const budgets = await getAllBudgetsFromDb();
      setBudgets(budgets.data.budgets);
    };

    fetchBudgets();
  }, [changed]);

  const addBudget = async ({ name, max }: Omit<Budget, "id">) => {
    await addNewBudgetToDb({ name, max });
    setChanged(!changed);
  };

  const deleteBudget = async (budgetid: string) => {
    await deleteBudgetFromDb(budgetid);
    setChanged(!changed);
  };

  const value: BudgetContextType = {
    budgets,
    addBudget,
    deleteBudget,
  };
  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};
