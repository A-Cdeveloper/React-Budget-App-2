import { PropsWithChildren } from "react";
import { BudgetContextProvider } from "./context/BudgetContext";
import { ExpenseContextProvider } from "./context/ExpenseContext";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <BudgetContextProvider>
      <ExpenseContextProvider>{children}</ExpenseContextProvider>
    </BudgetContextProvider>
  );
};

export default Providers;
