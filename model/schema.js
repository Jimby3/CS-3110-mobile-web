//https://watermelondb.dev/docs/Schema
import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
        name: 'users',
        columns: [
            //I Dont think an ID is needed it might be implied?
          { name: 'username', type: 'string' },
          { name: 'email', type: 'string'},
          { name: 'password', type: 'string' },
        ]
      }),
      tableSchema({
        name: 'budgets',
        columns: [
          { name: 'catagory_id', type: 'number' },
        ]
      }),

      tableSchema({
        name: 'categories',
        columns: [
          { name: 'name', type: 'string' },
          { name: 'percent', type: 'number'},
          { name: 'balance', type: 'number'},
        ]
      }),

      tableSchema({
        name: 'goals',
        columns: [
          { name: 'name', type: 'string' },
          { name: 'goalamount', type: 'number' },
          { name: 'balance', type: 'number'},
          { name: 'description', type: 'string' },
        ]
      }),

      tableSchema({
        name: 'taxes',
        columns: [
          { name: 'state_withholding', type: 'string' },
          { name: 'state_id', type: 'number'},
          { name: 'federal_withholding', type: 'string' },
          { name: 'federal_id', type: 'number'},
        ]
      }),
  ]
})