// import { db } from "./db";
import { http, HttpResponse } from "msw";
import { API_URL } from "../../src/utils/constants";
import { faker } from "@faker-js/faker";
import { Budget, Expense } from "../../src/types/entities";

let budgets: Budget[] = [];
let expenses: Expense[] = [];

[1, 2].forEach(() => {
  budgets.push({
    id: faker.string.numeric(10),
    name: faker.commerce.department(),
    max: faker.number.int(1000),
  });
});

[1, 2, 3].forEach((_, index: number) => {
  expenses.push({
    id: faker.string.numeric(10),
    description: faker.food.dish(),
    amount: faker.number.int(90),
    budgetId: budgets[index]?.id || faker.string.numeric(10),
  });
});

export const handlers = [
  // Intercept "${API_URL}/budgets" requests...
  http.get(`${API_URL}/budgets`, () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      budgets: [...budgets],
    });
  }),
  http.get(`${API_URL}/expenses`, () => {
    return HttpResponse.json({
      expenses: [...expenses],
    });
  }),
];
