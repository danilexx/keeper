'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InventorySchema extends Schema {
  up() {
    this.create('inventories', table => {
      table.increments()
      table
        .integer('item_id')
        .unsigned()
        .references('id')
        .inTable('items')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('character_id')
        .unsigned()
        .references('id')
        .inTable('characters')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('npc_id')
        .unsigned()
        .references('id')
        .inTable('npcs')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('quantity').defaultTo(1)
      table.timestamps()
    })
  }

  down() {
    this.drop('inventories')
  }
}

module.exports = InventorySchema
