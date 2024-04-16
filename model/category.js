import { Model } from '@nozbe/watermelondb'
import { field, relation } from "@nozbe/watermelondb/decorators";

export default class Category extends Model {
    static table = 'categories'

    static associations = {
      budgets: { type: 'belongs_to', key: 'budget_id' },
    }

    @relation('budgets', 'budget_id') budget

    @field('name') name
    @field('percent') percent
    @field('balance') balance
  }