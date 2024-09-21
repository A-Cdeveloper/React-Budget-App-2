import { render, screen } from "@testing-library/react";

import BudgetCard from "../src/components/BudgetCard";

import { API_URL } from "../src/utils/constants";
import { Expense, Budget } from "../src/types/entities";
import { currencyFormater } from "../src/utils/formaters";

describe("Component BudgetCard", () => {
  let budget: Budget;
  let expensesForBudget: Expense[] = [];

  const fetchBudget = async () => {
    const response = await fetch(`${API_URL}/budgets`);
    const data = await response.json();
    budget = data.budgets[0];
    return budget;
  };

  const fetchExpensesForSingleBudget = async (budgetId: string | undefined) => {
    const response = await fetch(`${API_URL}/expenses`);
    const data = await response.json();
    expensesForBudget = data.expenses.filter(
      (expense: Expense) => expense.budgetId === budgetId
    );
    return expensesForBudget;
  };

  //
  it("renders the BudgetCard with name and amount", async () => {
    const budget = await fetchBudget();
    const expensesForBudget = await fetchExpensesForSingleBudget(budget.id);
    const amount: number = expensesForBudget.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);

    render(<BudgetCard name={budget.name} amount={amount} max={budget.max} />);

    //Check if the name is rendered
    expect(screen.getByText(budget.name)).toBeInTheDocument();

    // Check if the amount is formatted and rendered
    expect(
      screen.getByText(currencyFormater(amount).toString())
    ).toBeInTheDocument();
  });

  it("renders the progress bar when max is provided", async () => {
    const budget = await fetchBudget();
    const expensesForBudget = await fetchExpensesForSingleBudget(budget.id);
    const amount: number = expensesForBudget.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);

    render(<BudgetCard name={budget.name} amount={amount} max={budget.max} />);

    const progressBarValue = Math.floor((amount / budget.max) * 100).toFixed(2);
    console.log(typeof amount);
    console.log(typeof progressBarValue);

    // Check if the progress bar is present
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();

    // Check if the progress bar label shows the correct percentage
    expect(progressBar).toHaveAttribute("aria-valuenow", progressBarValue);
    expect(screen.getByText(`${progressBarValue}%`)).toBeInTheDocument();
  });
});
