import { render, screen } from "@testing-library/react";

import TotalBudgetCard from "../src/components/TotalBudgetCard";
import { BudgetContext } from "../src/context/BudgetContext";
import { ExpenseContext } from "../src/context/ExpenseContext";
import { Budget, Expense } from "../src/types/entities";
import { fetchBudgets, fetchExpenses } from "./utils";
import { currencyFormater } from "../src/utils/formaters";

describe("TotalBudgetCard", () => {
  let expenses: Expense[] = [];
  let budgets: Budget[] = [];
  let amount: number;
  let max: number;
  let progressBarValue: string;

  beforeAll(async () => {
    expenses = await fetchExpenses();
    budgets = await fetchBudgets();
    amount = expenses.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);

    max = budgets.reduce((acc, cur) => {
      return acc + cur.max;
    }, 0);

    progressBarValue = Math.floor((amount / max) * 100).toFixed(2);
  });
  afterAll(() => {
    expenses = [];
    budgets = [];
  });

  const renderComponent = async () => {
    render(
      <BudgetContext.Provider
        value={{
          budgets,
          addBudget: () => {},
          deleteBudget: () => {},
        }}
      >
        <ExpenseContext.Provider
          value={{
            expenses,
            getBudgetExpenses: () => [],
            addExpense: () => {},
            deleteExpense: () => {},
          }}
        >
          <TotalBudgetCard />
        </ExpenseContext.Provider>
      </BudgetContext.Provider>
    );

    return {
      progressBar: screen.getByRole("progressbar"),
    };
  };

  //
  it("should render TotalBudgetCard caption Total", async () => {
    await renderComponent();
    expect(screen.getByText(/Total/i)).toBeInTheDocument();

    // // Check if the amount is formatted and rendered
    expect(
      screen.getByText(currencyFormater(amount).toString())
    ).toBeInTheDocument();
  });

  it("renders danger style when amount exceeds max", async () => {
    await renderComponent();

    if (amount > max) {
      const card = screen.getByLabelText("card");
      expect(card).toHaveClass("bg-danger bg-opacity-25");
    }
  });

  it("should render the progress bar when max is provided", async () => {
    const { progressBar } = await renderComponent();

    // Check if the progress bar is present
    expect(progressBar).toBeInTheDocument();

    // Check if the progress bar label shows the correct percentage
    expect(progressBar).toHaveAttribute("aria-valuenow", progressBarValue);
    expect(screen.getByText(`${progressBarValue}%`)).toBeInTheDocument();
  });
});
