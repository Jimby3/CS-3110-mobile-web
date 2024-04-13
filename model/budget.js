import { Model } from '@nozbe/watermelondb'

export default class Budget extends Model {
    static table = 'budgets'
    static associations = {
      categories: { type: 'has_many', foreignKey: 'category_id' },
      goals: { type: 'has_many', foreignKey: 'goal_id' },
    }

    
  }