'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemIconSchema extends Schema {
  up () {
    this.table('items', (table) => {
      // alter table
      table.integer('icon_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.table('items', (table) => {
      // reverse alternations
      table.dropColumn('icon_id')
    })
  }
}

module.exports = ItemIconSchema
