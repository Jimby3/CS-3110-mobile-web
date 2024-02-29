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
            //I Dont think an ID is needed it might be implied?
          { name: 'username', type: 'string' },
          { name: 'email', type: 'string'},
          { name: 'password', type: 'string' },
        ]
      }),

      tableSchema({
        name: 'catagories',
        columns: [
            //I Dont think an ID is needed it might be implied?
          { name: 'username', type: 'string' },
          { name: 'email', type: 'string'},
          { name: 'password', type: 'string' },
        ]
      }),

      tableSchema({
        name: 'goals',
        columns: [
            //I Dont think an ID is needed it might be implied?
          { name: 'username', type: 'string' },
          { name: 'email', type: 'string'},
          { name: 'password', type: 'string' },
        ]
      }),

      tableSchema({
        name: 'taxes',
        columns: [
            //I Dont think an ID is needed it might be implied?
          { name: 'username', type: 'string' },
          { name: 'email', type: 'string'},
          { name: 'password', type: 'string' },
        ]
      }),
  ]
})