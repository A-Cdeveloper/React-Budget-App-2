import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";

import { useBudget } from "../context";
import Expense from "./Expense";
import Button from "react-bootstrap/Button";
import { UNCATEGORIZER_BUDZET_ID } from "../context/BudgetContext";

type ViewExpensesModalProps = {
  show: boolean;
  handleClose: () => void;
  defaultBudgetId: string | undefined;
};

const ViewExpensesModal = ({
  show,
  handleClose,
  defaultBudgetId,
}: ViewExpensesModalProps) => {
  const { getBudgetExpenses, budgets, deleteBudget } = useBudget();

  const budgetName =
    defaultBudgetId === "Uncategorized"
      ? "Uncategorized"
      : budgets.filter((el) => el.id === defaultBudgetId)[0]?.name;

  const expenses = getBudgetExpenses(defaultBudgetId!);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          Expenses - {budgetName}{" "}
          {defaultBudgetId !== UNCATEGORIZER_BUDZET_ID && (
            <Button
              type="button"
              variant="outline-danger"
              className="ms-2"
              onClick={() => {
                deleteBudget(defaultBudgetId!);
                handleClose();
              }}
            >
              Delete
            </Button>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack>
          {expenses.map((expense) => {
            return <Expense key={expense.id} expense={expense} />;
          })}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModal;
