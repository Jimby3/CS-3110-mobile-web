import { Model } from '@nozbe/watermelondb'

export default class User extends Model {
    static table = 'users'
    static associations = {
      categorys: { type: 'has_many', foreignKey: 'catagory_id' },
    }
  }