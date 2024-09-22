import { render, screen } from "@testing-library/react";

import UncategorizedBudgetCard from "../src/components/UncategorizedBudgetCard";
import { ExpenseContext } from "../src/context/ExpenseContext";
import { fetchUncategorizedBudgetExpenses } from "./utils";
import { currencyFormater } from "../src/utils/formaters";
import userEvent from "@testing-library/user-event";

describe("UncategorizedBudgetCard", () => {
  const renderComponent = async () => {
    const uncatexpenses = await fetchUncategorizedBudgetExpenses();

    const amount = uncatexpenses.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);

    const addExpenseFn = vi.fn();
    const viewExpensesFn = vi.fn();
    const user = userEvent.setup();

    render(
      <ExpenseContext.Provider
        value={{
          expenses: [...uncatexpenses],
          getBudgetExpenses: () => uncatexpenses,
          addExpense: () => {},
          deleteExpense: () => {},
        }}
      >
        <UncategorizedBudgetCard
          addDefaultBudgetId={addExpenseFn}
          viewExpenses={viewExpensesFn}
        />
      </ExpenseContext.Provider>
    );
    return {
      amount,
      user,
      addExpenseButton: screen.getByRole("button", { name: /add expense/i }),
      viewExpensesButton: screen.getByRole("button", {
        name: /view expenses/i,
      }),
      addExpenseFn,
      viewExpensesFn,
    };
  };

  //   //
  it("should render BudgetCard with name and amount", async () => {
    const { amount } = await renderComponent();

    //Check if the name is rendered
    expect(screen.getByText("Uncategorized")).toBeInTheDocument();
    // Check if the amount is formatted and rendered
    expect(
      screen.getByText(currencyFormater(amount).toString())
    ).toBeInTheDocument();
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
