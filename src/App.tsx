import { useState } from "react";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import { useBudget, useExpense } from "./context";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { UNCATEGORIZER_BUDGET_ID } from "./utils/constants";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewxpensesModal, setViewExpensesModal] = useState(false);
  const [defaultBudgetId, setDefaultBudgetId] = useState<string | undefined>();
  const { budgets } = useBudget();
  const { getBudgetExpenses } = useExpense();

  const addDefaultBudgetIdHandler = (budgetId: string) => {
    setShowAddExpenseModal(true);
    setDefaultBudgetId(budgetId);
  };

  const openViewExpensesHandler = (budgetId: string) => {
    setViewExpensesModal(true);
    setDefaultBudgetId(budgetId);
  };

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto fs-2">Budgets</h1>
          <ButtonGroup aria-label="Buttons">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddBudgetModal(true)}
            >
              Add Budget
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => addDefaultBudgetIdHandler(UNCATEGORIZER_BUDGET_ID)}
            >
              Add Expense
            </Button>
          </ButtonGroup>
        </Stack>
        <div className="cardBox">
          {budgets.map((budget) => {
            if (budget.id === UNCATEGORIZER_BUDGET_ID) {
              return (
                <UncategorizedBudgetCard
                  key={budget.id}
                  addDefaultBudgetId={() =>
                    addDefaultBudgetIdHandler(UNCATEGORIZER_BUDGET_ID)
                  }
                  viewExpenses={() =>
                    openViewExpensesHandler(UNCATEGORIZER_BUDGET_ID)
                  }
                />
              );
            }
            const amount = getBudgetExpenses(budget.id!).reduce((acc, cur) => {
              return acc + cur.amount;
            }, 0);
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                addDefaultBudgetId={() => addDefaultBudgetIdHandler(budget.id!)}
                viewExpenses={() => openViewExpensesHandler(budget.id!)}
              />
            );
          })}
        </div>
        <div className="cardBoxTotal">
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={defaultBudgetId}
      />
      <ViewExpensesModal
        show={showViewxpensesModal}
        handleClose={() => setViewExpensesModal(false)}
        defaultBudgetId={defaultBudgetId}
      />
    </>
  );
}

export default App;
