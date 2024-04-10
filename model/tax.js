import { Model } from '@nozbe/watermelondb'

export default class Tax extends Model {
    static table = 'taxes'


    @text('state_withholding') state_withholding
    @number('state_id') state_id
    @text('federal_withholding') federal_withholding
    @number('federal_id') federal_id
  }