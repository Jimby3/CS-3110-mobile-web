//https://watermelondb.dev/docs/Schema
import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
        name: 'users',
        columns: [
          { name: 'username', type: 'string' },
          { name: 'email', type: 'string'},
          { name: 'password', type: 'string' },
        ]
      }),
      tableSchema({
        name: 'budgets',
        columns: [
          { name: 'category_id', type: "string", isIndexed: true },
          { name: 'user_id', type: "string", isIndexed: true },
        ]
      }),

      tableSchema({
        name: 'categories',
        columns: [
          { name: 'name', type: 'string' },
          { name: 'percent', type: 'number'},
          { name: 'balance', type: 'number'},
          { name: 'budget_id', type: "string", isIndexed: true },
        ]
      }),

      tableSchema({
        name: 'goals',
        columns: [
          { name: 'name', type: 'string' },
          { name: 'goal_amount', type: 'number' },
          { name: 'balance', type: 'number'},
          { name: 'description', type: 'string' },
          { name: 'budget_id', type: "string", isIndexed: true },
        ]
      }),

      tableSchema({
        name: 'taxes',
        columns: [
          { name: 'state_withholding', type: 'string' },
          { name: 'state_id', type: 'number'},
          { name: 'federal_withholding', type: 'string' },
          { name: 'federal_id', type: 'number'},
          { name: 'user_id', type: "string", isIndexed: true },
        ]
      }),
  ]
})