import { Model } from '@nozbe/watermelondb'

export default class Category extends Model {
    static table = 'categories'
    static associations = {
      budgets: { type: 'belongs_to', key: 'budget_id' },
    }

    @relation('users', 'author_id') author
    @text('name') name
    @number('percent') percent
    @balance('percent') balance
  }