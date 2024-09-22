import { render, screen } from "@testing-library/react";
import Expense from "../src/components/Expense";
import { fetchExpense, fetchExpenses } from "./utils";
import { currencyFormater } from "../src/utils/formaters";
import userEvent from "@testing-library/user-event";
import { ExpenseContext } from "../src/context/ExpenseContext";

describe("Expense", () => {
  it("should render expense name . amount and delete button", async () => {
    const expenses = await fetchExpenses();
    const deleteExpense = vi.fn();

    render(
      <ExpenseContext.Provider
        value={{
          expenses: [...expenses],
          getBudgetExpenses: () => expenses,
          addExpense: () => {},
          deleteExpense: deleteExpense,
        }}
      >
        <Expense expense={expenses[0]} />
      </ExpenseContext.Provider>
    );

    screen.debug();

    expect(screen.getByRole("heading").contains(expenses[0].name));
    expect(screen.getByText(currencyFormater(expenses[0].amount)));
    expect(screen.getByRole("button", { name: "×" }));

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "×" }));
    expect(deleteExpense).toHaveBeenCalledWith(expenses[0].id);
  });
});
