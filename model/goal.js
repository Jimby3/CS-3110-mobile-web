import { Model } from '@nozbe/watermelondb'

export default class Goal extends Model {
    static table = 'goals'
    static associations = {
        budgets: { type: 'belongs_to', key: 'budget_id' },
      }
  }