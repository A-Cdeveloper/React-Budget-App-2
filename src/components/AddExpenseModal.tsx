import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useBudget, useExpense } from "../context";
import { UNCATEGORIZER_BUDGET_ID } from "../utils/constants";

type AddExpensesModalProps = {
  show: boolean;
  handleClose: () => void;
  defaultBudgetId: string | undefined;
};

const AddExpenseModal = ({
  show,
  handleClose,
  defaultBudgetId,
}: AddExpensesModalProps) => {
  const { budgets } = useBudget();
  const { addExpense } = useExpense();
  const budgetIdInputRef = useRef<HTMLSelectElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addExpense({
      budgetId: budgetIdInputRef.current!.value,
      amount: +amountInputRef.current!.value,
      description: descriptionInputRef.current!.value,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Form onSubmit={handlerSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control required type="text" ref={descriptionInputRef} />
          </Form.Group>
          <Form.Group controlId="amount" className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              required
              type="number"
              min={0}
              step={0.01}
              ref={amountInputRef}
            />
          </Form.Group>

          <Form.Group controlId="budget" className="mb-3">
            <Form.Select
              aria-label="select budget"
              ref={budgetIdInputRef}
              defaultValue={defaultBudgetId}
              required
            >
              {budgets.map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
