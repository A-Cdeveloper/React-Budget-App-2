import { useBudget } from "../context";
import BudgetCard from "./BudgetCard";
import { UNCATEGORIZER_BUDZET_ID } from "../context/BudgetContext";

type UncategorizedBudgetCardProps = {
  addDefaultBudgetId: () => void;
  viewExpenses: () => void;
};

const UncategorizedBudgetCard = (props: UncategorizedBudgetCardProps) => {
  const { getBudgetExpenses } = useBudget();

  const amount = getBudgetExpenses(UNCATEGORIZER_BUDZET_ID).reduce(
    (acc, cur) => {
      return acc + cur.amount;
    },
    0
  );

  return <BudgetCard name="Uncategorized" amount={amount} {...props} />;
};

export default UncategorizedBudgetCard;
