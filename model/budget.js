import { Model } from '@nozbe/watermelondb'

export default class Budget extends Model {
    static table = 'budgets'
    static associations = {
      goals: { type: 'has_many', foreignKey: 'budget_id' },
    }
  }