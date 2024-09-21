import { render, screen } from "@testing-library/react";

import TotalBudgetCard from "../src/components/TotalBudgetCard";
import { Budget, Expense } from "../src/types/entities";
import { API_URL } from "../src/utils/constants";

describe("TotalBudgetCard", () => {
  // let budget: Budget;
  // let expensesForBudget: Expense[] = [];

  // const renderComponent = async () => {
  //   const fetchBudget = async () => {
  //     const response = await fetch(`${API_URL}/budgets`);
  //     const data = await response.json();
  //     budget = data.budgets[0];
  //     return budget;
  //   };

  //   const fetchExpensesForSingleBudget = async (
  //     budgetId: string | undefined
  //   ) => {
  //     const response = await fetch(`${API_URL}/expenses`);
  //     const data = await response.json();
  //     expensesForBudget = data.expenses.filter(
  //       (expense: Expense) => expense.budgetId === budgetId
  //     );
  //     return expensesForBudget;
  //   };

  //   budget = await fetchBudget();
  //   expensesForBudget = await fetchExpensesForSingleBudget(budget.id);
  //   const amount = expensesForBudget.reduce((acc, cur) => {
  //     return acc + cur.amount;
  //   }, 0);

  //   render(<TotalBudgetCard />);

  //   return {
  //     budget,
  //     expensesForBudget,
  //     amount,

  //     progressBar: screen.getByRole("progressbar"),
  //     addExpenseButton: screen.getByRole("button", { name: /add expense/i }),
  //     viewExpensesButton: screen.getByRole("button", {
  //       name: /view expenses/i,
  //     }),
  //   };
  // };

  it("renders correctly", () => {
    //render(<TotalBudgetCard />);
    // const totalBudgetCard = screen.getByTestId("total-budget-card");
    // expect(totalBudgetCard).toBeInTheDocument();
  });
});
