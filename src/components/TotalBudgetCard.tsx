import { useBudget, useExpense } from "../context";
import BudgetCard from "./BudgetCard";

const TotalBudgetCard = () => {
  const { budgets } = useBudget();
  const { expenses } = useExpense();

  const amount = expenses.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);

  const max = budgets.reduce((acc, cur) => {
    return acc + cur.max;
  }, 0);

  return (
    <BudgetCard name="Total" amount={amount} max={max} hideButtons={true} />
  );
};

export default TotalBudgetCard;
