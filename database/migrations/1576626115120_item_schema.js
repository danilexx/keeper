'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemSchema extends Schema {
  up () {
    this.create('items', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.enu('main_attribute', ['strength', 'intelligence', 'agility', 'faith']).notNullable()
      table.integer('main_attribute_value').notNullable()
      table.enu('secondary_attribute', ['strength', 'intelligence', 'agility', 'faith'])
      table.integer('secondary_attribute_value')
      table.string('description').notNullable()
      table.enu('type', ['weapon', 'acessory', 'armor', 'consumable', 'common']).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }
}

module.exports = ItemSchema
