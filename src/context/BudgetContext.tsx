import { PropsWithChildren, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import { Budget, Expense } from "../types/entities";

type BudgetContextType = {
  budgets: Budget[];
  expenses: Expense[];
  getBudgetExpenses: (budgetId: string) => Expense[];
  addExpense: (expense: Expense) => void;
  addBudget: (budget: Budget) => void;
  deleteExpense: (expenseId: string) => void;
  deleteBudget: (budgetId: string) => void;
};

export const BudgetContext = createContext<BudgetContextType>(
  {} as BudgetContextType
);

export const UNCATEGORIZER_BUDZET_ID = "Uncategorized";

export const BudgetContextProvider = ({ children }: PropsWithChildren) => {
  const [budgets, setBudgets] = useLocalStorage<Budget[]>("budgets", []);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenses", []);

  const getBudgetExpenses = (budgetId: string) => {
    console.log(budgetId);
    return expenses.filter(
      (expense: Expense) => expense.budgetId === budgetId
    ) as Expense[];
  };

  const addExpense = ({
    budgetId,
    amount,
    description,
  }: Omit<Expense, "id">) => {
    setExpenses((prevExpenses: Expense[]) => {
      return [
        ...prevExpenses,
        {
          id: uuidv4(),
          budgetId,
          amount,
          description,
        },
      ];
    });
  };
  const addBudget = ({ name, max }: Omit<Budget, "id">) => {
    setBudgets((prevBudgets: Budget[]) => {
      if (prevBudgets.find((el) => el.name === name)) return prevBudgets;
      return [
        ...prevBudgets,
        {
          id: uuidv4(),
          name,
          max,
        },
      ];
    });
  };

  const deleteExpense = (expenseId: string) => {
    setExpenses((prevExpenses: Expense[]) => {
      return prevExpenses.filter((expense) => expense.id !== expenseId);
    });
  };
  const deleteBudget = (budgetid: string) => {
    //  FIX
    // extra logic for expenses - move expenses from deleted budget to Uncategorized

    setExpenses((prevExpenses: Expense[]) => {
      return prevExpenses.map((bexpense: Expense) => {
        return bexpense.budgetId === budgetid
          ? { ...bexpense, budgetId: UNCATEGORIZER_BUDZET_ID }
          : bexpense;
      });
    });

    setBudgets((prevBudgets: Budget[]) => {
      return prevBudgets.filter((budget) => budget.id !== budgetid);
    });
  };

  const value: BudgetContextType = {
    budgets,
    expenses,
    getBudgetExpenses,
    addExpense,
    addBudget,
    deleteExpense,
    deleteBudget,
  };
  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};
