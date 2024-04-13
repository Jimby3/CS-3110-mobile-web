import { Model } from '@nozbe/watermelondb'
import { field, relation } from "@nozbe/watermelondb/decorators";

export default class Tax extends Model {
    static table = 'taxes'

    static associations = {
      users: { type: 'belongs_to', key: 'users_id' },
    }

    @relation('users', 'user_id') user

    @field('state_withholding') state_withholding
    @field('state_id') state_id
    @field('federal_withholding') federal_withholding
    @field('federal_id') federal_id
  }