import { Model } from '@nozbe/watermelondb'
import { field, children } from "@nozbe/watermelondb/decorators";

export default class User extends Model {
    static table = 'users'
    static associations = {
      categories: { type: 'has_many', foreignKey: 'catagory_id' },
      taxes: { type: 'has_many', foreignKey: 'taxes_id' },
    }

    @field('username') username
    @field('email') email
    @field('password') password

    @children('budgets') budgets
    @children('taxes') taxes
  }