import { renderHook } from "@testing-library/react";
import { useBudget, useExpense } from "./../../src/context"; // Assuming useExpense is in the same file
import { BudgetContext } from "./../../src/context/BudgetContext";
import { ExpenseContext } from "./../../src/context/ExpenseContext";
import { describe, it, expect } from "vitest";
import { Budget, Expense } from "../../src/types/entities";
import { API_URL } from "../../src/utils/constants";
import { fetchExpenses } from "../utils";

describe("useBudget", () => {
  let budgets: Budget[] = [];

  const fetchBudget = async () => {
    const response = await fetch(`${API_URL}/budgets`);
    const data = await response.json();
    return data.budgets;
  };

  it("should throw an error if used outside BudgetContext", () => {
    const { result } = renderHook(() => useBudget());

    expect(result.current).toEqual({});
  });

  it("should return context value when inside BudgetContext", async () => {
    budgets = await fetchBudget();
    const { result } = renderHook(() => useBudget(), {
      wrapper: ({ children }) => (
        <BudgetContext.Provider
          value={{
            budgets,
            addBudget: () => {},
            deleteBudget: () => {},
          }}
        >
          {children}
        </BudgetContext.Provider>
      ),
    });
    expect(result.current.budgets).toEqual(budgets);
  });
});

describe("useExpense", () => {
  let expenses: Expense[] = [];

  it("should throw an error if used outside ExpenseContext", () => {
    const { result } = renderHook(() => useExpense());

    expect(result.current).toEqual({});
  });

  it("should return context value when inside ExpenseContext", async () => {
    expenses = await fetchExpenses();
    const { result } = renderHook(() => useExpense(), {
      wrapper: ({ children }) => (
        <ExpenseContext.Provider
          value={{
            expenses,
            addExpense: () => {},
            deleteExpense: () => {},
            getBudgetExpenses: () => [],
          }}
        >
          {children}
        </ExpenseContext.Provider>
      ),
    });
    expect(result.current.expenses).toEqual(expenses);
  });
});
