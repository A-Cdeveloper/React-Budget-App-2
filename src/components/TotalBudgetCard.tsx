import { useBudget } from "../context";
import BudgetCard from "./BudgetCard";

const TotalBudgetCard = () => {
  const { expenses, budgets } = useBudget();

  const amount = expenses.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);

  const max = budgets.reduce((acc, cur) => {
    return acc + cur.max;
  }, 0);

  return (
    <BudgetCard
      name="Total"
      amount={amount}
      max={max !== 0 ? max : undefined}
      hideButtons={true}
    />
  );
};

export default TotalBudgetCard;
