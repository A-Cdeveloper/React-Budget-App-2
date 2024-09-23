import { render, screen } from "@testing-library/react";

import ViewExpensesModal from "../src/components/ViewExpensesModal";
import { BudgetContext } from "../src/context/BudgetContext";
import { ExpenseContext } from "../src/context/ExpenseContext";
import { Budget, Expense } from "../src/types/entities";
import { fetchBudgets, fetchExpensesForSingleBudget } from "./utils";
import userEvent from "@testing-library/user-event";

describe("ViewExpensesModal", () => {
  let expenses: Expense[] = [];
  let budgets: Budget[] = [];

  beforeAll(async () => {
    budgets = await fetchBudgets();
    expenses = await fetchExpensesForSingleBudget(budgets[0].id);
  });
  afterAll(() => {
    expenses = [];
    budgets = [];
  });

  const renderComponent = async () => {
    const deleteExpense = vi.fn();
    const closeModal = vi.fn();
    const user = userEvent.setup();
    const deleteBudget = vi.fn();
    render(
      <BudgetContext.Provider
        value={{
          budgets,
          addBudget: () => {},
          deleteBudget: deleteBudget,
        }}
      >
        <ExpenseContext.Provider
          value={{
            expenses,
            getBudgetExpenses: () => [...expenses],
            addExpense: () => {},
            deleteExpense: deleteExpense,
          }}
        >
          <ViewExpensesModal
            show={true}
            handleClose={closeModal}
            defaultBudgetId={budgets[0].id}
          />
        </ExpenseContext.Provider>
      </BudgetContext.Provider>
    );

    return {
      deleteExpense,
      closeModal,
      deletebudgetButton: screen.queryByRole("button", {
        name: "Delete Budget",
      }),
      expensesList: screen.queryAllByLabelText("expense-name"),
      user,
      deleteBudget,
    };
  };

  it("should render ViewExpensesModal budget title, close button and list of expenses", async () => {
    const { deletebudgetButton, expensesList } = await renderComponent();

    expect(screen.getByText(RegExp(budgets[0].name, "i"))).toBeInTheDocument();

    if (budgets[0].id === "Uncategorized") {
      expect(deletebudgetButton).not.toBeInTheDocument();
      expect(screen.getByText(/Uncategorized/i)).toBeInTheDocument();
    }

    expect(deletebudgetButton).not.toBeInTheDocument();
    expect(expensesList).toHaveLength(expenses.length);
  });

  it("should render delete budget button if no expenses", async () => {
    const { deletebudgetButton, expensesList, user, deleteBudget } =
      await renderComponent();
    if (expenses.length === 0) {
      expect(deletebudgetButton).toBeInTheDocument();
      await user.click(deletebudgetButton!);
      expect(deleteBudget).toHaveBeenCalledWith(budgets[0].id);
      expect(expensesList.length).toEqual(0);
    }
  });
});
