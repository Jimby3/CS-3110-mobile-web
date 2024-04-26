import { schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: 'users',
          columns: [
            { name: 'username', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'password', type: 'string' },
          ],
        }),

        createTable({
          name: 'budgets',
          columns: [
            { name: 'category_id', type: 'string', isIndexed: true },
            { name: 'user_id', type: 'string', isIndexed: true },
          ],
        }),

        createTable({
          name: 'categories',
          columns: [
            { name: 'name', type: 'string' },
            { name: 'percent', type: 'number' },
            { name: 'balance', type: 'number' },
            { name: 'budget_id', type: 'string', isIndexed: true },
          ],
        }),

        createTable({
          name: 'goals',
          columns: [
            { name: 'name', type: 'string' },
            { name: 'goal_amount', type: 'number' },
            { name: 'balance', type: 'number' },
            { name: 'description', type: 'string' },
            { name: 'budget_id', type: 'string', isIndexed: true },
          ],
        }),

        createTable({
          name: 'taxes',
          columns: [
            { name: 'state_withholding', type: 'number' },
            { name: 'state_id', type: 'number' },
            { name: 'federal_withholding', type: 'number' },
            { name: 'federal_id', type: 'number' },
            { name: 'user', type: 'string', isIndexed: true },
          ],
        }),

      ],
    },
  ],
})