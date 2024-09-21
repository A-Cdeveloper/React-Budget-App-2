import { PropsWithChildren } from "react";
import { BudgetContextProvider } from "../src/context/BudgetContext";
import { ExpenseContextProvider } from "../src/context/ExpenseContext";

const AllProviders = ({ children }: PropsWithChildren) => {
  return (
    <BudgetContextProvider>
      <ExpenseContextProvider>{children}</ExpenseContextProvider>
    </BudgetContextProvider>
  );
};

export default AllProviders;
