import { Model } from '@nozbe/watermelondb'

export default class Category extends Model {
    static table = 'categories'
    static associations = {
      users: { type: 'belongs_to', key: 'user_id' },
    }

    @text('name') name
    @number('percent') percent
    @balance('percent') balance
  }