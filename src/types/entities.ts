export type Budget = {
  id?: string;
  name: string;
  max: number;
};

export type Expense = {
  id?: string;
  budgetId: string;
  amount: number;
  description: string;
};
