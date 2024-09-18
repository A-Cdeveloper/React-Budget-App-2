import { useExpense } from "../context";
import { UNCATEGORIZER_BUDGET_ID } from "../utils/constants";
import BudgetCard from "./BudgetCard";

type UncategorizedBudgetCardProps = {
  addDefaultBudgetId: () => void;
  viewExpenses: () => void;
};

const UncategorizedBudgetCard = (props: UncategorizedBudgetCardProps) => {
  const { getBudgetExpenses } = useExpense();

  const amount = getBudgetExpenses(UNCATEGORIZER_BUDGET_ID).reduce(
    (acc, cur) => {
      return acc + cur.amount;
    },
    0
  );

  return <BudgetCard name="Uncategorized" amount={amount} {...props} />;
};

export default UncategorizedBudgetCard;
