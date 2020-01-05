'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemMasterSchema extends Schema {
  up () {
    this.table('items', (table) => {
      // alter table
      table.integer('master_id')
        .unsigned()
        .references('id')
        .inTable('masters')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()

      table.integer('adventure_id')
        .unsigned()
        .references('id')
        .inTable('adventures')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.table('items', (table) => {
      // reverse alternations
      table.dropColumn('adventure_id')
      table.dropColumn('master_id')
    })
  }
}

module.exports = ItemMasterSchema
