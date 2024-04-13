import { Model } from '@nozbe/watermelondb'
import { field, relation } from "@nozbe/watermelondb/decorators";

export default class Goal extends Model {
    static table = 'goals'
    
    static associations = {
        budgets: { type: 'belongs_to', key: 'budget_id' },
      }

      @field('name') name
      @field('goalamount') goalamount
      @field('balance') balance
      @field('description') description

      @relation('budgets', 'budget_id') budget
  }