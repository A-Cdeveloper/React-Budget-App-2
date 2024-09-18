# **React-Budget-App 2**

1.  Convert existing  [\*\*React-Budget-App \*\*](https://github.com/A-Cdeveloper/React-Budget-App) from JS -> TS
2.  Create backend - Node.js/Express Postgres DB/Prisma. Create REST API nodes.

```xml
GET
Get All Budgets
http://localhost:8000/api/v1/budgets
﻿
POST
Create New Budget
http://localhost:8000/api/v1/budgets
﻿
body
raw (json)
json
{
   "name": "New Budget",
   "max": 1500
}

GET
Get Single Budget
http://localhost:8000/api/v1/budgets/budget_id
﻿
DELETE
Delete Budget
http://localhost:8000/api/v1/budgets/budget_id
﻿

﻿
GET
Get Alll Expenses
http://localhost:8000/api/v1/expenses
﻿
POST
Create New Expense
http://localhost:8000/api/v1/expenses
﻿
body
raw (json)
json
{
   "amount": 250,
   "description": "new expense",
   "budgetId" : budget_id
}
GET
Get Single Expense
http://localhost:8000/api/v1/expenses/expense_id
﻿
DELETE
Delete Expense
http://localhost:8000/api/v1/expenses/expense_id
```

1.  Refactor App code / Store/Read data in/from Postgres DB
