import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Product from './Product'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({serializeAs:null})
  public user_id:number

  @belongsTo(()=>User, {foreignKey:"user_id"})
  public user: BelongsTo<typeof User>

  @hasMany(()=>Product, {foreignKey:"store_id"})
  public product: HasMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
