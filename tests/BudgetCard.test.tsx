import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BudgetCard from "../src/components/BudgetCard";

import { Budget, Expense } from "../src/types/entities";
import { currencyFormater } from "../src/utils/formaters";
import { fetchBudget, fetchExpensesForSingleBudget } from "./utils";

describe("BudgetCard", () => {
  let budget: Budget;
  let expensesForBudget: Expense[] = [];
  let amount: number;
  let progressBarValue: string;

  beforeAll(async () => {
    budget = await fetchBudget();
    expensesForBudget = await fetchExpensesForSingleBudget(budget.id);
    amount = expensesForBudget.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);
    progressBarValue = Math.floor((amount / budget.max) * 100).toFixed(2);
  });
  afterAll(() => {
    budget = {} as Budget;
    expensesForBudget = [];
  });

  const renderComponent = async () => {
    const addExpenseFn = vi.fn();
    const viewExpensesFn = vi.fn();
    const user = userEvent.setup();

    render(
      <BudgetCard
        name={budget.name}
        amount={amount}
        max={budget.max}
        hideButtons={false}
        addDefaultBudgetId={addExpenseFn}
        viewExpenses={viewExpensesFn}
      />
    );

    return {
      budget,
      expensesForBudget,
      amount,
      progressBarValue,
      progressBar: screen.getByRole("progressbar"),
      addExpenseButton: screen.getByRole("button", { name: /add expense/i }),
      viewExpensesButton: screen.getByRole("button", {
        name: /view expenses/i,
      }),
      addExpenseFn,
      viewExpensesFn,
      user,
    };
  };

  //
  it("should render BudgetCard with name and amount", async () => {
    const { amount, budget } = await renderComponent();
    //Check if the name is rendered
    expect(screen.getByText(budget.name)).toBeInTheDocument();

    // Check if the amount is formatted and rendered
    expect(
      screen.getByText(currencyFormater(amount).toString())
    ).toBeInTheDocument();
  });

  it("renders danger style when amount exceeds max", async () => {
    render(<BudgetCard name="Groceries" amount={120} max={100} />);

    // Check if the card has the 'bg-danger bg-opacity-25' class when out of limit
    const card = screen.getByLabelText("card"); // Card is an article in the accessibility tree
    expect(card).toHaveClass("bg-danger bg-opacity-25");
  });

  it("should render the progress bar when max is provided", async () => {
    const { progressBarValue, progressBar } = await renderComponent();

    // Check if the progress bar is present
    expect(progressBar).toBeInTheDocument();

    // Check if the progress bar label shows the correct percentage
    expect(progressBar).toHaveAttribute("aria-valuenow", progressBarValue);
    expect(screen.getByText(`${progressBarValue}%`)).toBeInTheDocument();
  });

  it("should render buttons when hideButtons is false", async () => {
    const { addExpenseButton, viewExpensesButton } = await renderComponent();

    // Check if the buttons are not present
    expect(addExpenseButton).toBeInTheDocument();
    expect(viewExpensesButton).toBeInTheDocument();
  });

  it("should call addExpense function when add expense button is clicked", async () => {
    const { user, addExpenseFn, addExpenseButton } = await renderComponent();

    await user.click(addExpenseButton);
    expect(addExpenseFn).toHaveBeenCalled();
  });

  it("should call viewExpense function when view expenses button is clicked", async () => {
    const { user, viewExpensesFn, viewExpensesButton } =
      await renderComponent();

    await user.click(viewExpensesButton);
    expect(viewExpensesFn).toHaveBeenCalled();
  });
});
