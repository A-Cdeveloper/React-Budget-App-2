import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { Expense } from "../types/entities";
import {
  addNewExpenseToDb,
  deleteExpenseFromDb,
  getAllExpensesFromDb,
} from "../utils/expenses";

type ExpenseContextType = {
  expenses: Expense[];
  getBudgetExpenses: (budgetId: string) => Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (expenseId: string) => void;
};

export const ExpenseContext = createContext<ExpenseContextType>(
  {} as ExpenseContextType
);

export const ExpenseContextProvider = ({ children }: PropsWithChildren) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await getAllExpensesFromDb();
      setExpenses(expenses.data.expenses);
    };
    fetchExpenses();
  }, [changed]);

  const getBudgetExpenses = (budgetId: string) => {
    return expenses.filter(
      (expense: Expense) => expense.budgetId === budgetId
    ) as Expense[];
  };

  const addExpense = async ({
    budgetId,
    amount,
    description,
  }: Omit<Expense, "id">) => {
    await addNewExpenseToDb({ budgetId, amount, description });
    setChanged(!changed);
  };

  const deleteExpense = async (expenseId: string) => {
    await deleteExpenseFromDb(expenseId);
    setChanged(!changed);
  };

  const value: ExpenseContextType = {
    expenses,
    getBudgetExpenses,
    addExpense,
    deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
